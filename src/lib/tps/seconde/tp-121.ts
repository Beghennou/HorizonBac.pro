
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 121,
    duree: '1h45',
    titre: 'Remplacement d\'un Soufflet de Cardan',
    niveau: 'seconde',
    situation: 'Lors d\'une inspection, vous constatez qu\'un soufflet de cardan est déchiré, projetant de la graisse dans le passage de roue. Pour éviter d\'endommager la transmission, le soufflet doit être remplacé.',
    objectif: 'Remplacer un soufflet de cardan en assurant le bon graissage et l\'étanchéité de la transmission. (Compétences C1.3)',
    materiel: ['Kit soufflet de cardan (soufflet, graisse, colliers)', 'Pince à colliers de cardan', 'Clé dynamométrique', 'Douille pour écrou de cardan', 'Extracteur de rotule', 'Outillage de base'],
    etudePrelim: [
        { type: 'text', q: 'Quel est le rôle principal d\'un soufflet de cardan ?', r: 'Il a un double rôle : contenir la graisse indispensable à la lubrification du joint de transmission (cardan) et le protéger de la contamination extérieure (eau, poussière, sable).' },
        { type: 'text', q: 'Quelle est la conséquence à court terme d\'un soufflet déchiré ?', r: 'La graisse est éjectée par la force centrifuge, et des contaminants entrent dans le joint, ce qui provoque une usure très rapide du cardan et sa destruction.' },
        { type: 'qcm', q: 'Quel type de graisse est généralement fournie dans les kits de remplacement ?', options: ['Graisse au cuivre', 'Graisse marine', 'Graisse au bisulfure de molybdène'], r: 'Graisse au bisulfure de molybdène' }
    ],
    activitePratique: [
        {
            titre: 'Dépose de la Transmission',
            duree: '45 min',
            etapes: [
                'Lever et sécuriser le véhicule, déposer la roue.',
                'Desserrer l\'écrou central de la transmission (cardan).',
                'Désaccoupler la rotule de suspension ou de direction pour libérer le porte-fusée.',
                'Dégager l\'arbre de transmission du moyeu, puis le déposer côté boîte de vitesses.'
            ]
        },
        {
            titre: 'Remplacement du Soufflet',
            duree: '40 min',
            etapes: [
                'Fixer la transmission dans un étau.',
                'Retirer les anciens colliers et couper le vieux soufflet.',
                'Désassembler le joint de transmission (si nécessaire, selon le type).',
                'Nettoyer soigneusement le joint et l\'arbre de toute l\'ancienne graisse.',
                'Enfiler le nouveau soufflet, remplir le joint avec la totalité de la graisse fournie.',
                'Remonter le joint, positionner le soufflet et sertir les deux colliers neufs avec la pince spécifique.'
            ]
        },
        {
            titre: 'Repose et Validation',
            duree: '20 min',
            etapes: [
                'Remonter la transmission sur le véhicule.',
                'Serrer le nouvel écrou de cardan au couple préconisé.',
                'Remonter tous les éléments de suspension et la roue.',
                'Effectuer un essai routier en braquant à fond des deux côtés pour vérifier l\'absence de bruit.'
            ]
        }
    ],
    securiteRangement: [
        'Utiliser la pince spécifique pour garantir un sertissage efficace des colliers.',
        'Ne jamais frapper sur l\'extrémité filetée de la transmission pour la déloger.',
        'Respecter impérativement le couple de serrage de l\'écrou de cardan, qui est un élément de sécurité majeur.'
    ],
    pointsCles: [
        'Nettoyage parfait du joint avant regraissage.',
        'Utilisation de la totalité du sachet de graisse fourni.',
        'Sertissage correct des colliers pour une étanchéité parfaite.'
    ],
    validationRequise: false,
};

export default tp;
