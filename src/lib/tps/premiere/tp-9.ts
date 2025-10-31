
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 9,
    duree:'1h45',
    titre:'Câblage des clignotants',
    niveau: 'premiere',
    situation:'Sur une maquette pédagogique, vous devez réaliser de A à Z le câblage fonctionnel du circuit de clignotants et de feux de détresse.',
    objectif:'Câbler un circuit conforme et effectuer le réglage de la fréquence. (Compétence C2.3)',
    materiel:['Centrale clignotante','Commodo','Ampoules 21W','Câbles et cosses diverses'],
    etudePrelim:[
        {type: 'qcm', q:"Après câblage, vos clignotants flashent beaucoup trop vite. Quelle est la cause la plus probable ?", options: ["La batterie est trop chargée", "Une des ampoules est grillée ou a une mauvaise puissance", "La centrale clignotante est trop puissante"], r:"Une des ampoules est grillée ou a une mauvaise puissance"},
        {type: 'text', q:"Analyse de fonctionnement : Pourquoi les feux de détresse (warning) doivent-ils pouvoir fonctionner même si le contact du véhicule est coupé ?",r:'Pour des raisons de sécurité évidentes. Si le véhicule est en panne sur le bord de la route, il doit pouvoir signaler sa présence même si le moteur est coupé.'},
        {type: 'text', q:"Réflexion : Sur un véhicule moderne, la 'centrale clignotante' est souvent intégrée dans un calculateur (ex: BSI). Quels avantages cette intégration apporte-t-elle (diagnostic, fonctionnalités) ?",r:'Cela permet un diagnostic via la valise, des fonctions confort (ex: clignotement 3 fois sur impulsion), et une meilleure fiabilité (pas de pièce mécanique).'}
    ],
    activitePratique:[
        { titre: 'Câblage sur Maquette', duree: '40 min', etapes: ['Alimenter la centrale clignotante.','Câbler le commodo pour les directions Gauche/Droite.','Relier les ampoules Avant/Arrière de chaque côté.']},
        { titre: 'Tests et Validation', duree: '40 min', etapes: ['Vérifier le fonctionnement des clignotants Gauche et Droit.','Câbler et tester la fonction feux de détresse (warning).','Mesurer la fréquence de clignotement et la valider.']},
        { titre: 'Application sur Véhicule', duree: '25 min', etapes: ['Identifier la centrale clignotante sur un véhicule réel.','Contrôler le relais et les ampoules correspondantes.','Tracer le schéma de câblage réalisé.']}
    ],
    securiteRangement:['Débrancher la maquette après usage','Ranger les câbles et cosses','Archiver le schéma de câblage'],
    pointsCles:['Rôle de la centrale','Warning = test global','Fréquence de clignotement'],
    validationRequise: false,
};

export default tp;
