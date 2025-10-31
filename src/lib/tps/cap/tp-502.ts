
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 502,
    duree: '1h00',
    titre: 'Remplacement du Filtre à Air',
    niveau: 'cap1',
    situation: 'Dans le cadre de l\'entretien périodique d\'un véhicule, le remplacement du filtre à air est préconisé.',
    objectif: 'Remplacer le filtre à air pour garantir une bonne qualité de l\'air admis par le moteur. (Compétence C1.3)',
    materiel: ['Filtre à air neuf', 'Tournevis', 'Chiffon'],
    etudePrelim: [
        { type: 'text', q: 'Quel est l\'impact d\'un filtre à air encrassé sur la consommation de carburant ?', r: 'Il augmente la consommation car le moteur doit forcer pour aspirer l\'air, ce qui enrichit le mélange.' },
    ],
    activitePratique: [
        { titre: 'Dépose', duree: '15 min', etapes: ['Localiser et ouvrir le boîtier du filtre à air.', 'Retirer l\'ancien filtre.']},
        { titre: 'Nettoyage et Repose', duree: '20 min', etapes: ['Nettoyer l\'intérieur du boîtier.', 'Installer le filtre neuf en respectant le sens de montage.', 'Refermer et visser le boîtier.']},
    ],
    securiteRangement: ['S\'assurer de la bonne étanchéité du boîtier.', 'Jeter l\'ancien filtre à la poubelle.'],
    pointsCles: ['Nettoyage du boîtier', 'Sens de montage du filtre'],
    validationRequise: false,
};

export default tp;
