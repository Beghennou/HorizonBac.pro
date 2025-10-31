import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 20,
    duree:'2h30',
    titre:'Remplacement maître-cylindre',
    niveau: 'premiere',
    situation:'La pédale de frein est spongieuse et s\'enfonce lentement. Le diagnostic indique une fuite interne du maître-cylindre. Vous devez le remplacer.',
    objectif:'Reposer et purger correctement pour réparer le circuit. (Compétence C2.2)',
    materiel:['Maître-cylindre neuf','Liquide de frein DOT 4','Appareil de purge sous pression','Clés à tuyauter'],
    etudePrelim:[
        {type: 'text', q:"Analyse de symptôme : Pédale spongieuse = Air dans le circuit. Pédale qui s'enfonce lentement au plancher = Fuite interne. Expliquez la différence physique entre ces deux défauts.",r:'Spongieuse : l\'air se comprime. Enfoncement lent : le liquide passe à travers les coupelles usées à l\'intérieur du maître-cylindre, il n\'y a pas de perte de liquide mais pas de maintien en pression.'},
        {type: 'qcm', q:"Pourquoi est-il conseillé de pré-remplir le maître-cylindre sur l'établi avant de le monter sur le véhicule ?", options: ["Pour le nettoyer", "Pour rendre la purge ultérieure beaucoup plus facile et rapide", "Ce n'est pas nécessaire"], r:"Pour rendre la purge ultérieure beaucoup plus facile et rapide"},
        {type: 'text', q:"Méthodologie : Quel est l'ordre de purge standard des roues et pourquoi cet ordre est-il si important ?",r:'Du plus loin au plus près du maître-cylindre (généralement ARD, ARG, AVD, AVG). Pour chasser l\'air progressivement dans tout le circuit sans en réintroduire.'}
    ],
    activitePratique:[
        { titre: 'Dépose du Maître-cylindre', duree: '40 min', etapes: ['Aspirer le liquide de frein du réservoir.','Débrancher les canalisations et les fixations.','Extraire le maître-cylindre.']},
        { titre: 'Repose et Purge', duree: '60 min', etapes: ['Pré-remplir le maître-cylindre neuf sur l\'établi.','Raccorder les canalisations.','Purger le circuit complet en respectant l\'ordre : ARD→ARG→AVD→AVG.']},
        { titre: 'Validation', duree: '10 min', etapes: ['Vérifier que la pédale est ferme.','Contrôler l\'absence totale de fuites.']}
    ],
    securiteRangement:['Liquide de frein corrosif (protéger la peinture)','Nettoyer immédiatement toute projection','Éliminer le liquide usagé via la filière agréée'],
    pointsCles:['Purge complète du circuit','Niveau du réservoir correct','Pédale dure et stable'],
    validationRequise: false,
};

export default tp;
