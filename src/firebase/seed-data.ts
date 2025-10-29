import { Firestore, writeBatch, doc, getDoc, setDoc } from 'firebase/firestore';
import { initialTps } from '@/lib/data-manager';

const initialClasses = [
    {
        id: "2MV1 - Pierre Lartigue",
        studentNames: ["Martin Dubois", "Léa Petit", "Thomas Robert", "Chloé Durand", "Hugo Bernard", "Manon Girard", "Lucas Moreau", "Camille Lefevre", "Enzo Roux", "Clara Fournier", "Pierre Lartigue", "AKROUCHI Yanis"],
    },
    {
        id: "2MV2",
        studentNames: ["Alice Martin", "Paul Garcia", "Jade Dubois", "Louis Laurent", "Emma Simon", "Gabriel Michel"],
    },
    {
        id: "1MV1",
        studentNames: ["Jules Royer", "Rose Gauthier", "Adam Lemaire", "Louise Lambert", "Raphaël Picard", "Juliette Leclerc"],
    },
    {
        id: "TMV1",
        studentNames: ["Arthur Caron", "Lina Mercier", "Noah Philippe", "Eva Chevalier", "Léo Andre", "Romy Bonnet"],
    }
];

const initialTeachers = [
    { name: 'M. Dubois' },
    { name: 'Mme. Martin' },
];


export const seedInitialData = async (firestore: Firestore) => {
    const batch = writeBatch(firestore);

    // Seed classes
    initialClasses.forEach(classData => {
        const classRef = doc(firestore, 'classes', classData.id);
        batch.set(classRef, { studentNames: classData.studentNames });
    });

    // Seed teachers
    initialTeachers.forEach(teacherData => {
        const teacherRef = doc(collection(firestore, 'teachers'));
        batch.set(teacherRef, teacherData);
    });

    // Seed TPs
    Object.values(initialTps).forEach(tp => {
        const tpRef = doc(firestore, 'tps', tp.id.toString());
        batch.set(tpRef, tp);
    });

    try {
        await batch.commit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        // Here you might want to handle the error, e.g., by re-throwing or logging
    }
};


export const checkAndSeedData = async (firestore: Firestore) => {
    const seedDocRef = doc(firestore, 'config', 'initial_seed_v4'); // Incremented version
    try {
        const seedDoc = await getDoc(seedDocRef);
        if (!seedDoc.exists()) {
            console.log("No initial data found. Seeding database...");
            await seedInitialData(firestore);
            await setDoc(seedDocRef, { seeded: true, date: new Date() });
            console.log("Database seeded successfully.");
        }
    } catch (error) {
        console.error("Error checking or seeding data:", error);
    }
};
