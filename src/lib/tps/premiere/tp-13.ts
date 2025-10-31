
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 13, duree:'1h45', titre:'CA 208 • Diagnostic essuie-vitre', situation:'Les essuie-glaces d\'un véhicule fonctionnent de manière erratique : la vitesse intermittente ne marche plus et ils ne reviennent pas à leur position de repos ("parking").', objectif:'Identifier le défaut (moteur/relais/commodo/parking) et le réparer. (Compétences C2.1, C2.2)', materiel:['Multimètre','Relais de test','Jeu de fusibles','Schéma électrique'], 
    etudePrelim:[
        {type: 'qcm', q:"Les essuie-glaces fonctionnent en vitesse rapide, mais pas en vitesse lente. Où se situe probablement le défaut : dans le commodo, le moteur, ou le relais ?", options: ["Dans le moteur", "Dans le commodo ou le relais de vitesse lente", "Le fusible est grillé"], r:"Dans le commodo ou le relais de vitesse lente"},
        {type: 'text', q:"Scénario : Les essuie-glaces s'arrêtent au milieu du pare-brise lorsque vous les coupez. Quel composant spécifique est très probablement en panne ?",r:'Le contacteur de \'position de repos\' (ou \'parking\') situé à l\'intérieur du moteur d\'essuie-glace.'},
        {type: 'text', q:"Réflexion : Pourquoi les moteurs d'essuie-glace modernes intègrent-ils souvent leur propre électronique plutôt que de dépendre de relais externes ?",r:'Pour gérer des fonctions plus complexes comme la cadence variable, la détection de pluie, et pour réduire le nombre de pièces et la complexité du faisceau.'}
    ], 
    activitePratique:[ etape('Diagnostic Fonctionnel','25 min',['Tester toutes les positions du commodo.','Vérifier le fusible correspondant.','Tester le fonctionnement du lave-glace.']), etape('Contrôles Électriques','50 min',['Vérifier l\'alimentation du moteur d\'essuie-glace.','Tester la continuité des différentes positions du commodo.','Contrôler le relais d\'intermittence.','Vérifier le signal du contacteur de "parking".']), etape('Contrôles Mécaniques','25 min',['Inspecter l\'état de la biellette et des axes.','Vérifier la tension du ressort des bras.','Contrôler le fonctionnement de la pompe de lave-glace.']) ], securiteRangement:['Couper le contact avant intervention','Ranger les caches et protections','Tracer le diagnostic'], pointsCles:['Test du commodo','Rôle du relais','Position "parking"'], validationRequise: false, };

export default tp;
