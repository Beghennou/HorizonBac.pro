
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 10, duree:'2h00', titre:'UE 205 • Câblage d\'un circuit de moto-ventilateur', situation:'Sur maquette, vous devez câbler un circuit de refroidissement moteur complet, incluant Petite Vitesse (PV) et Grande Vitesse (GV) via des relais et une résistance.', objectif:'Réaliser un montage, valider les déclenchements et effectuer les réglages. (Compétence C2.3)', materiel:['Relais double','Résistance de puissance (PV)','Sonde de température','Fusibles 40A'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de conception : Quel est l'intérêt d'avoir deux vitesses de ventilation plutôt qu'une seule ? Pensez en termes de consommation d'énergie et de bruit.",r:'La petite vitesse est plus silencieuse et consomme moins d\'énergie, elle est suffisante pour la régulation dans la plupart des cas (embouteillages). La grande vitesse est une sécurité pour les situations extrêmes (fortes chaleurs, charge importante).'},
        {type: 'qcm', q:"La grande vitesse (GV) fonctionne, mais la petite vitesse (PV) ne se déclenche jamais. Quel composant spécifique est très probablement en cause ?", options: ["Le fusible principal du motoventilateur", "La résistance de puissance pour la petite vitesse", "Le relais de grande vitesse"], r:"La résistance de puissance pour la petite vitesse"},
        {type: 'text', q:"Analyse de schéma : Sur le schéma du circuit, où placeriez-vous votre pince ampèremétrique pour mesurer uniquement l'intensité consommée par le motoventilateur, sans inclure celle des bobines de relais ?",r:'Directement sur le câble d\'alimentation principal du moteur du ventilateur, après les relais.'}
    ], 
    activitePratique:[ etape('Câblage du Circuit','50 min',['Câbler l\'alimentation + batterie via le fusible de puissance.','Brancher les relais Petite Vitesse et Grande Vitesse.','Intégrer la résistance pour la commande PV du motoventilateur.']), etape('Tests et Mesures','45 min',['Mesurer l\'intensité en PV (environ 10A).','Mesurer l\'intensité en GV (environ 25A).','Valider le déclenchement via le thermocontact ou la commande de diagnostic.']), etape('Application sur Véhicule','25 min',['Identifier les relais et la résistance sur un véhicule réel.','Vérifier les déclenchements PV/GV.']) ], securiteRangement:['Débrancher la maquette après usage','Fixer solidement les câbles de puissance','Tracer le schéma réalisé'], pointsCles:['Résistance = PV','Intensités distinctes','Rôle des relais'], validationRequise: false, };

export default tp;
