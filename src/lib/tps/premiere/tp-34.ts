
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 34, duree:'2h30', titre:'MA 204 • Diagnostic système injection essence', situation:'Un véhicule essence présente un manque de puissance et le témoin moteur est allumé. Vous devez mener un diagnostic complet du système d\'injection.', objectif:'Lier DTC/PIDs à des tests capteurs/actionneurs et réparer. (Compétences C2.1, C2.2, C2.4)', materiel:['Valise de diagnostic','Multimètre','Oscilloscope','Manomètre de pression essence'], 
    etudePrelim:[
        {type: 'text', q:"Méthodologie : La valise affiche 'P0171 - Système trop pauvre'. Listez 3 causes possibles, allant de la plus simple à la plus complexe, et expliquez comment les tester.",r:'1. Prise d\'air à l\'admission (test avec fumigène). 2. Pompe à essence faible ou filtre colmaté (test de pression/débit). 3. Injecteur bouché ou débitmètre défectueux (test des paramètres).'},
        {type: 'qcm', q:"La sonde lambda amont reste bloquée à 0.1V. Le mélange est-il riche ou pauvre ? Le calculateur va-t-il essayer d'enrichir ou d'appauvrir ?", options: ["Riche / Il va appauvrir", "Pauvre / Il va enrichir", "Normal / Il ne fait rien"], r:"Pauvre / Il va enrichir"},
        {type: 'text', q:"Scénario : Le moteur cale au ralenti, mais fonctionne bien à haut régime. Quel capteur est le plus probablement en cause ?",r:'Le régulateur de ralenti ou le boîtier papillon motorisé.'}
    ], 
    activitePratique:[ etape('Lecture et Analyse Initiale', '30 min', ['Lire les codes défauts (DTC) et les données figées (freeze frame).','Analyser les paramètres clés : MAF/MAP, ratio lambda, pression de rampe (FRP).','Effacer les codes et effectuer un test pour voir ce qui revient.']),etape('Contrôle des Capteurs', '60 min', ['Mesurer la tension du débitmètre d\'air.','Vérifier la cohérence du capteur de pression d\'admission par rapport à la dépression.','Contrôler le signal des sondes lambda amont et aval.','Visualiser les signaux des capteurs PMH et AAC à l\'oscilloscope.']),etape('Contrôle des Actionneurs', '40 min', ['Mesurer la résistance et le signal de commande des injecteurs.','Tester le fonctionnement du boîtier papillon motorisé et de la vanne EGR.','Vérifier le régulateur de pression de carburant.'])], securiteRangement:['Effectuer les déconnexions proprement','Ranger les appareils de mesure après usage','Tracer toutes les étapes du diagnostic'], pointsCles:['Corrélation DTC et paramètres','Les capteurs confirment le symptôme','Les actionneurs valident la panne'], validationRequise: false, };

export default tp;
