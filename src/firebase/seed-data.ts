
import { Firestore, writeBatch, doc, getDoc, setDoc, collection, getDocs, query } from 'firebase/firestore';
import { initialTps } from '@/lib/data-manager';

const initialClasses = [
    {
        id: "2VP1",
        studentNames: ["Martin Dubois", "Léa Petit", "Thomas Robert", "Chloé Durand", "Hugo Bernard", "Manon Girard", "Lucas Moreau", "Camille Lefevre", "Enzo Roux", "Clara Fournier", "Pierre Lartigue", "AKROUCHI Yanis", "Élève TEST (2VP1)"],
    },
    {
        id: "2VP2",
        studentNames: ["Alice Martin", "Paul Garcia", "Jade Dubois", "Louis Laurent", "Emma Simon", "Gabriel Michel", "Élève TEST (2VP2)"],
    },
    {
        id: "1VP1",
        studentNames: ["Jules Royer", "Rose Gauthier", "Adam Lemaire", "Louise Lambert", "Raphaël Picard", "Juliette Leclerc", "Élève TEST (1VP1)"],
    },
    {
        id: "TVP1",
        studentNames: ["Arthur Caron", "Lina Mercier", "Noah Philippe", "Eva Chevalier", "Léo Andre", "Romy Bonnet", "Élève TEST (TVP1)"],
    }
];

const initialTeachers: { name: string }[] = [
    // La liste est vide pour empêcher la création de doublons.
    // Les enseignants doivent être ajoutés manuellement via la page Paramètres.
];


export const seedInitialData = async (firestore: Firestore) => {
    const batch = writeBatch(firestore);
    
    const teachersQuery = query(collection(firestore, "teachers"));
    const teachersSnapshot = await getDocs(teachersQuery);

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
        batch.set(classRef, { studentNames: classData.studentNames.sort((a,b) => a.localeCompare(b)) });
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
    const seedDocRef = doc(firestore, 'config', 'initial_seed_v7'); // Version incrémentée pour garantir la cohérence
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
