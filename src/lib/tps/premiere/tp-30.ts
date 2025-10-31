import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 30,
    duree:'2h30',
    titre:'Découverte et entretien suspension hydraulique',
    niveau: 'premiere',
    situation:'Un véhicule équipé d\'une suspension hydropneumatique présente une assiette incorrecte. Vous devez diagnostiquer et entretenir le système.',
    objectif:'Contrôler assiette, pressions sphères, et réparer le circuit. (Compétences C2.1, C2.2)',
    materiel:['Manomètre haute pression','Station de gonflage azote','Liquide hydraulique (LHM/LDS)','Valise de diagnostic'],
    etudePrelim:[
        {type: 'qcm', q:"La suspension est extrêmement dure et 'tape' sur les bosses. Quel est le diagnostic le plus probable concernant les sphères ?", options: ["Les sphères sont trop gonflées", "Les sphères sont dégonflées ou leur membrane est percée, il n'y a plus d'amortissement par le gaz", "C'est normal pour ce type de suspension"], r:"Les sphères sont dégonflées ou leur membrane est percée, il n'y a plus d'amortissement par le gaz"},
        {type: 'text', q:"Analyse de risque : Pourquoi est-il vital de dépressuriser complètement le circuit hydraulique avant d'intervenir sur une sphère ou une canalisation ?",r:'Parce que le circuit est sous haute pression (jusqu\'à 170 bars). Une ouverture non contrôlée peut provoquer une projection violente de liquide, causant de graves blessures.'},
        {type: 'text', q:"Scénario : Vous remplacez le liquide LHM (vert) par du LDS (orange). Quelles seront les conséquences catastrophiques pour le système ?",r:'Le LDS (liquide de synthèse) va détruire tous les joints en caoutchouc conçus pour le LHM (liquide minéral), provoquant des fuites massives sur tout le système.'}
    ],
    activitePratique:[
        { titre: 'Diagnostic de l\'Assiette', duree: '40 min', etapes: ['Mesurer les hauteurs de caisse aux 4 coins.','Comparer les valeurs aux tolérances constructeur.','Lire les codes défauts du calculateur de suspension.']},
        { titre: 'Contrôle des Sphères', duree: '50 min', etapes: ['Dépressuriser le circuit.','Mesurer et regonfler la pression d\'azote de chaque sphère.','Remplacer une sphère si sa membrane est défectueuse.']},
        { titre: 'Purge et Validation', duree: '50 min', etapes: ['Compléter le niveau de liquide hydraulique.','Purger le circuit et actionner les différentes hauteurs.','Effectuer un essai pour valider le confort et la réactivité.']}
    ],
    securiteRangement:['Utiliser uniquement de l\'azote pour le gonflage','Protection des yeux obligatoire','Éliminer le liquide hydraulique usagé correctly'],
    pointsCles:['Pression des sphères = confort','Correction d\'assiette','Purge du circuit'],
    validationRequise: false,
};

export default tp;
