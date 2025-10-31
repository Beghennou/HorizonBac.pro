
import type { TP } from './tp-501';

function etape(titre: string, duree: string, etapes: string[]): any {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 603,
    duree: '1h30',
    titre: 'CAP 2ème Année • Remplacement des Bougies d\'Allumage',
    situation: 'Le moteur d\'un véhicule essence présente des ratés. L\'entretien préconise le remplacement des bougies d\'allumage.',
    objectif: 'Remplacer les bougies d\'allumage en respectant le couple de serrage. (Compétence C2.2)',
    materiel: ['Jeu de bougies neuves', 'Clé à bougie', 'Clé dynamométrique'],
    etudePrelim: [
        { type: 'text', q: 'Quelle précaution prendre lors du démontage pour éviter que des impuretés ne tombent dans le cylindre ?', r: 'Nettoyer ou souffler autour du puits de bougie avant de la dévisser.' },
        { type: 'text', q: 'Pourquoi le serrage au couple est-il si important pour une bougie ?', r: 'Un serrage insuffisant cause une mauvaise dissipation de la chaleur et des fuites. Un serrage excessif peut endommager le filetage de la culasse.' }
    ],
    activitePratique: [
        etape('Dépose', '20 min', ['Nettoyer les puits de bougies.', 'Débrancher les bobines ou fils de bougies.', 'Dévisser et retirer les anciennes bougies.']),
        etape('Repose et Serrage', '25 min', ['Vérifier l\'écartement des électrodes des bougies neuves.', 'Visser les bougies neuves à la main, puis serrer au couple préconisé.']),
    ],
    securiteRangement: ['Travailler sur moteur froid.', 'Respecter impérativement le couple de serrage.'],
    pointsCles: ['Propreté des puits de bougie', 'Serrage au couple'],
    validationRequise: false,
};

export default tp;
