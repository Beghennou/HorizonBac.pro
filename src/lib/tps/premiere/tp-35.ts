
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 35, duree:'2h00', titre:'BAC PRO Première • Contrôle du circuit d\'allumage', situation:'Un véhicule essence a des ratés à l\'accélération. Le diagnostic s\'oriente vers le circuit d\'allumage. Vous devez contrôler les bougies, câbles et bobines.', objectif:'Diagnostiquer les ratés, réparer et valider l’étincelle. (Compétences C2.2, C2.3)', materiel:['Multimètre','Oscilloscope','Clé à bougie dynamométrique','Testeur d\'étincelle'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de panne : Un code 'P0302 - Raté d'allumage Cylindre 2' est enregistré. Décrivez la méthode la plus rapide pour déterminer si la panne vient de la bougie ou de la bobine.",r:'Inverser la bobine du cylindre 2 avec celle d\'un autre cylindre (ex: le 3). Effacer le défaut et refaire un test. Si le défaut se déplace en P0303, c\'est la bobine. Sinon, c\'est probablement la bougie.'},
        {type: 'qcm', q:"Vous observez une bougie dont l'isolant est fendu et présente des traces noires. Quelle est la cause probable de ce défaut ?", options: ["L'essence est de mauvaise qualité", "C'est de l'usure normale", "Un arc électrique s'est formé à l'extérieur de la bougie (défaut d'isolement)"], r:"Un arc électrique s'est formé à l'extérieur de la bougie (défaut d'isolement)"},
        {type: 'text', q:"Analyse de signal : À l'oscilloscope, la tension de l'étincelle sur un cylindre est beaucoup plus élevée que sur les autres. Qu'est-ce que cela indique sur l'état de la bougie ou du circuit ?",r:'Cela indique une résistance élevée dans le circuit secondaire : écartement des électrodes de la bougie trop grand, ou câble haute tension défectueux.'}
    ], 
    activitePratique:[ etape('Pré-Diagnostic', '20 min', ['Lire les codes défauts (ex: P030x pour raté d\'allumage).','Inspecter visuellement les bougies et les bobines.','Écouter le moteur au ralenti pour détecter les ratés.']), etape('Contrôle des Bobines', '45 min', ['Mesurer les résistances des enroulements primaire et secondaire.','Vérifier l\'isolement.','Visualiser le signal de commande primaire à l\'oscilloscope.','Effectuer un test d\'étincelle.']),etape('Contrôle des Bougies', '40 min', ['Inspecter l\'état des électrodes et mesurer l\'écartement.','Analyser la couleur (indice de richesse).','Remplacer les bougies défectueuses en respectant le couple de serrage.']) ], securiteRangement:['Attention à la haute tension (HT)','Respecter les couples de serrage des bougies','Tracer le diagnostic'], pointsCles:['Bobine fonctionnelle','Bougie en bon état','Analyse des courbes à l\'oscilloscope'], validationRequise: false, };

export default tp;
