
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 38, duree:'1h30', titre:'BAC PRO Première • Contrôle des sondes lambda', situation:'Le témoin moteur est allumé et le diagnostic pointe vers un défaut sur les sondes lambda. Vous devez les contrôler pour valider le diagnostic.', objectif:'Vérifier oscillations, temps de réponse et effectuer les réglages. (Compétences C2.2, C2.3)', materiel:['Valise de diagnostic','Oscilloscope','Multimètre','Clé à sonde lambda'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de signal : À l'oscilloscope, le signal de la sonde amont varie lentement, prenant plus d'une seconde pour passer de 0.2V à 0.8V. Quel est le diagnostic pour cette sonde ?",r:'La sonde est \'vieillissante\' ou \'paresseuse\'. Elle ne réagit plus assez vite aux changements de richesse, ce qui nuit à la régulation et à la consommation.'},
        {type: 'qcm', q:"La sonde aval oscille de la même manière que la sonde amont. Quelle est la conclusion sur l'état du catalyseur ?", options: ["Le catalyseur fonctionne parfaitement", "Le catalyseur est HS, il ne traite plus les gaz.", "C'est un problème de sonde"], r:"Le catalyseur est HS, il ne traite plus les gaz."},
        {type: 'text', q:"Réflexion : Pourquoi la sonde doit-elle être chauffée pour fonctionner correctement ? Quelle information supplémentaire vous donne la mesure de la résistance de son circuit de chauffage ?",r:'L\'élément sensible de la sonde (zircone) ne devient conducteur d\'ions oxygène qu\'à partir de 300°C. La mesure de la résistance permet de vérifier si l\'élément chauffant interne n\'est pas coupé.'}
    ], 
    activitePratique:[ etape('Lecture des Paramètres', '25 min', ['Observer les signaux des sondes amont et aval via l\'outil de diagnostic.','Vérifier que la boucle de régulation est fermée à chaud.','Effectuer des tests d\'enrichissement / appauvrissement.']),etape('Mesures Physiques', '35 min', ['Visualiser le signal de la sonde amont à l\'oscilloscope (pentes nettes).','Mesurer la résistance et l\'alimentation du réchauffeur de sonde.','Vérifier que le signal de la sonde aval est stable si le catalyseur est efficace.']),etape('Diagnostic Final', '25 min', ['Une sonde amont lente ou non réactive doit être remplacée.','Une sonde aval qui oscille indique un catalyseur hors service.']) ], securiteRangement:['Prudence avec l\'échappement chaud','Respecter le couple de serrage de la sonde','Tracer les signaux observés'], pointsCles:['Sonde amont oscille','Sonde aval contrôle le catalyseur','Temps de réponse de la sonde'], validationRequise: false, };

export default tp;
