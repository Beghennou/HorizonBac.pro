
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 501,
    duree: '1h30',
    titre: 'Contrôle et Mise à Niveau des Fluides',
    niveau: 'cap1',
    situation: 'Un véhicule est présenté pour un contrôle de routine. Vous devez vérifier l\'ensemble des niveaux des fluides et effectuer les appoints nécessaires.',
    objectif: 'Contrôler les niveaux d\'huile, de liquide de refroidissement, de frein et de lave-glace et réaliser les ajustements. (Compétences C1.2, C1.3)',
    materiel: ['Chiffons', 'Entonnoir', 'Huile moteur préconisée', 'Liquide de refroidissement', 'Liquide de frein', 'Produit lave-glace'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi doit-on contrôler le niveau d\'huile moteur à froid et sur un sol plat ?', r: 'Pour que toute l\'huile soit redescendue dans le carter et obtenir une lecture exacte à la jauge.' },
        { type: 'text', q: 'Quelle est la principale précaution à prendre avant d\'ouvrir le bouchon du vase d\'expansion ?', r: 'S\'assurer que le moteur est complètement froid pour éviter tout risque de brûlure par projection de liquide chaud sous pression.' }
    ],
    activitePratique: [
        { titre: 'Contrôle Niveau d\'Huile', duree: '15 min', etapes: ['Tirer la jauge, l\'essuyer, la replonger et lire le niveau.', 'S\'assurer que le niveau est entre le MIN et le MAX.', 'Effectuer l\'appoint si nécessaire.']},
        { titre: 'Contrôle Liquide de Refroidissement', duree: '15 min', etapes: ['Vérifier le niveau dans le vase d\'expansion (entre MIN et MAX).', 'Effectuer l\'appoint avec le liquide de même type.']},
        { titre: 'Contrôle Liquide de Frein et Lave-Glace', duree: '15 min', etapes: ['Vérifier le niveau de liquide de frein (proche du MAX).', 'Remplir le réservoir de lave-glace.']}
    ],
    securiteRangement: ['Ne jamais ouvrir un circuit de refroidissement chaud.', 'Utiliser des entonnoirs pour éviter les déversements.', 'Recycler les bidons vides.'],
    pointsCles: ['Respect des repères MIN/MAX', 'Utilisation des fluides préconisés', 'Contrôles à froid'],
    validationRequise: false,
};

export default tp;
