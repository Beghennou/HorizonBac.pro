
import { Firestore, writeBatch, doc, getDoc, setDoc, collection, getDocs, query } from 'firebase/firestore';
import { initialTps, Niveau } from '@/lib/data-manager';

const initialClasses: { id: string, studentNames: string[], cursus: 'bacpro' | 'cap', niveau: Niveau }[] = [
    {
        id: "2BAC-A",
        studentNames: ["Martin Dubois", "Léa Petit", "Thomas Robert", "Chloé Durand", "Hugo Bernard", "Manon Girard", "Lucas Moreau", "Camille Lefevre", "Enzo Roux", "Clara Fournier", "Pierre Lartigue", "AKROUCHI Yanis", "Élève TEST (2BAC)"].sort((a, b) => a.localeCompare(b)),
        cursus: "bacpro",
        niveau: "seconde",
    },
    {
        id: "1BAC-B",
        studentNames: ["Jules Royer", "Rose Gauthier", "Adam Lemaire", "Louise Lambert", "Raphaël Picard", "Juliette Leclerc", "Élève TEST (1BAC)"].sort((a, b) => a.localeCompare(b)),
        cursus: "bacpro",
        niveau: "premiere",
    },
    {
        id: "TBAC-C",
        studentNames: ["Arthur Caron", "Lina Mercier", "Noah Philippe", "Eva Chevalier", "Léo Andre", "Romy Bonnet", "Élève TEST (TBAC)"].sort((a, b) => a.localeCompare(b)),
        cursus: "bacpro",
        niveau: "terminale",
    },
    {
        id: "1CAP-A",
        studentNames: ["Tom Lefebvre", "Zoe Da Silva", "Élève TEST (1CAP)"].sort((a, b) => a.localeCompare(b)),
        cursus: "cap",
        niveau: "cap1",
    },
    {
        id: "2CAP-B",
        studentNames: ["Maxime Petit", "Eva Leroy", "Élève TEST (2CAP)"].sort((a, b) => a.localeCompare(b)),
        cursus: "cap",
        niveau: "cap2",
    }
];

const initialTeachers: { name: string, cursus: 'bacpro' | 'cap' }[] = [
    // La liste est vide pour empêcher la création de doublons.
    // Les enseignants doivent être ajoutés manuellement via la page Paramètres.
];


export const seedInitialData = async (firestore: Firestore) => {
    const batch = writeBatch(firestore);
    
    // --> DEBUT DE LA CORRECTION : Suppression des enseignants existants
    const teachersQuery = query(collection(firestore, "teachers"));
    const teachersSnapshot = await getDocs(teachersQuery);
    if (!teachersSnapshot.empty) {
        console.log("Deleting existing teachers to prevent duplicates...");
        teachersSnapshot.forEach(teacherDoc => {
            batch.delete(teacherDoc.ref);
        });
    }
    // <-- FIN DE LA CORRECTION

    // Seed teachers only if the collection is empty and the initial list is not.
    if (teachersSnapshot.empty && initialTeachers.length > 0) {
        console.log("Seeding initial teachers...");
        initialTeachers.forEach(teacherData => {
            const teacherRef = doc(collection(firestore, 'teachers'));
            batch.set(teacherRef, teacherData);
        });
    }

    // Seed classes - assuming we want to reset them on each version bump
    initialClasses.forEach(classData => {
        const classRef = doc(firestore, 'classes', classData.id);
        batch.set(classRef, { studentNames: classData.studentNames, cursus: classData.cursus, niveau: classData.niveau });
    });

    // Seed TPs - assuming we want to reset them on each version bump
    Object.values(initialTps).forEach(tp => {
        const tpRef = doc(firestore, 'tps', tp.id.toString());
        batch.set(tpRef, tp);
    });

    try {
        await batch.commit();
        console.log("Batch commit successful.");
    } catch (error) {
        console.error("Error seeding data: ", error);
    }
};


export const checkAndSeedData = async (firestore: Firestore) => {
    const seedDocRef = doc(firestore, 'config', 'initial_seed_v11'); // Version incrémentée pour garantir la cohérence
    try {
        const seedDoc = await getDoc(seedDocRef);
        if (!seedDoc.exists()) {
            console.log("No initial data found for this version. Seeding database...");
            await seedInitialData(firestore);
            await setDoc(seedDocRef, { seeded: true, date: new Date() });
            console.log("Database seeded successfully for this version.");
        }
    } catch (error) {
        console.error("Error checking or seeding data:", error);
    }
};
