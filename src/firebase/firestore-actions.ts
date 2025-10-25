
'use client';
import { Firestore, doc, setDoc, writeBatch, DocumentData, collection, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { TP } from '@/lib/data-manager';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';
type TpStatus = 'non-commencé' | 'en-cours' | 'terminé';
type PrelimAnswer = string | string[];

type AssignedTp = {
  id: number;
  status: TpStatus;
};

type StoredEvaluation = {
  date: string;
  prelimNote?: string;
  tpNote?: string;
  competences: Record<string, EvaluationStatus>;
  isFinal?: boolean;
}

export const assignTpToStudents = async (firestore: Firestore, studentNames: string[], tpId: number, allAssignedTps: Record<string, AssignedTp[]>) => {
    const batch = writeBatch(firestore);

    studentNames.forEach(studentName => {
        const currentTps = allAssignedTps[studentName] || [];
        if (!currentTps.some(tp => tp.id === tpId)) {
            const newTps = [...currentTps, { id: tpId, status: 'non-commencé' as TpStatus }];
            const studentDocRef = doc(firestore, `assignedTps/${studentName}`);
            batch.set(studentDocRef, { tps: newTps });
        }
    });

    await batch.commit().catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: 'batch assignTp',
            operation: 'write',
        }));
    });
};

export const saveStudentEvaluation = async (firestore: Firestore, studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, evaluations: Record<string, any>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
    const evalDate = new Date().toLocaleDateString('fr-FR');
    
    const newStoredEval: StoredEvaluation = {
        date: evalDate,
        prelimNote,
        tpNote,
        competences: currentEvals,
        isFinal
    };
    
    const studentStoredEvalsDocRef = doc(firestore, `students/${studentName}/storedEvals`, tpId.toString());
    setDoc(studentStoredEvalsDocRef, newStoredEval).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: studentStoredEvalsDocRef.path,
            operation: 'write',
            requestResourceData: newStoredEval,
        }))
    });

    const batch = writeBatch(firestore);
    const studentEvalsDocRef = doc(firestore, `evaluations/${studentName}`);
    const updatedCompetences: Record<string, any> = { ...evaluations[studentName] };
     Object.entries(currentEvals).forEach(([competenceId, status]) => {
        const history = updatedCompetences[competenceId]?.history || [];
        updatedCompetences[competenceId] = { history: [...history, status] };
     });
     
    batch.set(studentEvalsDocRef, { competences: updatedCompetences });

    await batch.commit().catch(error => {
         errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: `evaluations/${studentName}`,
            operation: 'write',
        }))
    });
};

export const updateStudentTpStatus = async (firestore: Firestore, studentName: string, tpId: number, status: TpStatus, assignedTpsForStudent: AssignedTp[]) => {
    const studentDocRef = doc(firestore, `assignedTps/${studentName}`);
    const tpIndex = assignedTpsForStudent.findIndex(tp => tp.id === tpId);
    
    if (tpIndex > -1) {
        const newTps = [...assignedTpsForStudent];
        newTps[tpIndex] = { ...newTps[tpIndex], status };
         setDoc(studentDocRef, { tps: newTps }).catch(error => {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: studentDocRef.path,
                operation: 'update',
                requestResourceData: { tps: newTps }
            }));
        });
    }
};

export const saveStudentPrelimAnswer = (firestore: Firestore, studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
    const prelimDocRef = doc(firestore, `students/${studentName}/prelimAnswers`, tpId.toString());
    const newAnswers = { [questionIndex]: answer };
    setDoc(prelimDocRef, { answers: newAnswers }, { merge: true }).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: prelimDocRef.path,
            operation: 'update',
            requestResourceData: { answers: newAnswers },
        }));
    });
};

export const saveStudentFeedback = (firestore: Firestore, studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher', currentFeedbacks: Record<string, any>) => {
    const feedbackDocRef = doc(firestore, `students/${studentName}/feedbacks`, tpId.toString());
    const updatedFeedbacks = { ...currentFeedbacks, [author]: feedback };

    setDoc(feedbackDocRef, { tps: updatedFeedbacks }, { merge: true }).catch(error => {
         errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: feedbackDocRef.path,
            operation: 'update',
            requestResourceData: { tps: updatedFeedbacks },
        }));
    });
};

export const setTeacherNameInDb = (firestore: Firestore, name: string) => {
    const configDoc = doc(firestore, 'config', 'teacher');
    setDoc(configDoc, { name }, { merge: true }).catch(error => {
         errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: configDoc.path,
              operation: 'write',
              requestResourceData: { name },
          }));
    });
};

export const deleteStudent = async (firestore: Firestore, studentId: string, studentName: string) => {
    const batch = writeBatch(firestore);
    
    batch.delete(doc(firestore, 'students', studentId));
    batch.delete(doc(firestore, 'assignedTps', studentName));
    batch.delete(doc(firestore, 'evaluations', studentName));
    
    await batch.commit().catch(error => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: `batch delete for student ${studentName}`,
          operation: 'delete',
      }));
    });
};

export const emptyClass = async (firestore: Firestore, className: string) => {
    const classDocRef = doc(firestore, 'classes', className);
    await updateDoc(classDocRef, { studentNames: [] }).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: `classes/${className}`,
            operation: 'update',
            requestResourceData: { studentNames: [] }
        }));
    });
};

export const updateClassWithStudents = async (firestore: Firestore, className: string, studentNames: string[]) => {
    const classDocRef = doc(firestore, 'classes', className);
    await setDoc(classDocRef, { studentNames }, { merge: true }).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: classDocRef.path,
            operation: 'write'
        }));
    });
};

export const resetAllStudentListsInClasses = async (firestore: Firestore, classes: DocumentData[]) => {
    const batch = writeBatch(firestore);
    classes.forEach(classDoc => {
        const classRef = doc(firestore, 'classes', classDoc.id);
        batch.update(classRef, { studentNames: [] });
    });
    await batch.commit().catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: 'batch reset student lists',
            operation: 'update'
        }));
    });
};

export const addCustomTp = (firestore: Firestore, newTp: TP) => {
    const tpDoc = doc(firestore, 'tps', newTp.id.toString());
    setDoc(tpDoc, newTp, {}).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: tpDoc.path,
            operation: 'create',
            requestResourceData: newTp,
        }));
    });
};
