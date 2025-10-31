import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 10,
    duree:'2h00',
    titre:'Câblage d\'un circuit de moto-ventilateur',
    niveau: 'premiere',
    situation:'Sur maquette, vous devez câbler un circuit de refroidissement moteur complet, incluant Petite Vitesse (PV) et Grande Vitesse (GV) via des relais et une résistance.',
    objectif:'Réaliser un montage, valider les déclenchements et effectuer les réglages. (Compétence C2.3)',
    materiel:['Relais double','Résistance de puissance (PV)','Sonde de température','Fusibles 40A'],
    etudePrelim:[
        {type: 'text', q:"Analyse de conception : Quel est l'intérêt d'avoir deux vitesses de ventilation plutôt qu'une seule ? Pensez en termes de consommation d'énergie et de bruit.",r:'La petite vitesse est plus silencieuse et consomme moins d\'énergie, elle est suffisante pour la régulation dans la plupart des cas (embouteillages). La grande vitesse est une sécurité pour les situations extrêmes (fortes chaleurs, charge importante).'},
        {type: 'qcm', q:"La grande vitesse (GV) fonctionne, mais la petite vitesse (PV) ne se déclenche jamais. Quel composant spécifique est très probablement en cause ?", options: ["Le fusible principal du motoventilateur", "La résistance de puissance pour la petite vitesse", "Le relais de grande vitesse"], r:"La résistance de puissance pour la petite vitesse"},
        {type: 'text', q:"Analyse de schéma : Sur le schéma du circuit, où placeriez-vous votre pince ampèremétrique pour mesurer uniquement l'intensité consommée par le motoventilateur, sans inclure celle des bobines de relais ?",r:'Directement sur le câble d\'alimentation principal du moteur du ventilateur, après les relais.'}
    ],
    activitePratique:[
        { titre: 'Câblage du Circuit', duree: '50 min', etapes: ['Câbler l\'alimentation + batterie via le fusible de puissance.','Brancher les relais Petite Vitesse et Grande Vitesse.','Intégrer la résistance pour la commande PV du motoventilateur.']},
        { titre: 'Tests et Mesures', duree: '45 min', etapes: ['Mesurer l\'intensité en PV (environ 10A).','Mesurer l\'intensité en GV (environ 25A).','Valider le déclenchement via le thermocontact ou la commande de diagnostic.']},
        { titre: 'Application sur Véhicule', duree: '25 min', etapes: ['Identifier les relais et la résistance sur un véhicule réel.','Vérifier les déclenchements PV/GV.']}
    ],
    securiteRangement:['Débrancher la maquette après usage','Fixer solidement les câbles de puissance','Tracer le schéma réalisé'],
    pointsCles:['Résistance = PV','Intensités distinctes','Rôle des relais'],
    validationRequise: false,
};

export default tp;
