
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 6, duree:'2h00', titre:'UE 206 • Contrôle de l\'alternateur', situation:'Suite au diagnostic précédent, l\'alternateur est suspecté. Vous devez le déposer pour un contrôle détaillé de ses composants internes (pont de diodes, régulateur).', objectif:'Tester et remplacer les composants défectueux de l’alternateur. (Compétences C2.1, C2.2)', materiel:['Banc de test alternateur','Multimètre','Jeu de diodes','Régulateur neuf'], 
    etudePrelim:[
        {type: 'qcm', q:"Un alternateur ne charge pas. Avec un multimètre en mode 'test diode', vous trouvez une valeur dans les deux sens sur une des diodes du pont. Quelle est votre conclusion ?", options: ["La diode est bonne", "La diode est en court-circuit (passante dans les deux sens)", "La diode est coupée (ne conduit dans aucun sens)"], r:"La diode est en court-circuit (passante dans les deux sens)"},
        {type: 'text', q:"Analyse de risque : Vous remplacez uniquement le régulateur sur un alternateur dont les roulements sont bruyants. Quelle est la conséquence probable à court terme ?",r:'Les roulements risquent de gripper, de détruire la courroie et de provoquer une panne majeure, rendant la première réparation inutile.'},
        {type: 'text', q:"Réflexion : Pourquoi est-il souvent plus pertinent économiquement et techniquement de remplacer l'alternateur complet plutôt que de changer un seul de ses composants internes ?",r:'Le coût de la main-d\'œuvre pour le démontage/remontage et le test des composants internes dépasse souvent le prix d\'un alternateur en échange standard, qui est garanti.'}
    ], 
    activitePratique:[ etape('Dépose de l\'Alternateur','25 min',['Débrancher la batterie, détendre la courroie.','Déconnecter les câbles et retirer les vis de fixation.','Extraire l\'alternateur du compartiment moteur.']), etape('Contrôles des Composants','45 min',['Mesurer la résistance du rotor (environ 3–5 Ω).','Contrôler la continuité du stator (environ 0,1–0,3 Ω).','Tester le pont de diodes (sens unique de passage).','Inspecter le régulateur et les balais.']), etape('Test sur Banc','35 min',['Vérifier que la tension de régulation est d\'environ 14V.','Mesurer l\'intensité nominale en charge.','Contrôler la stabilité sans surtension.']), etape('Repose et Validation','15 min',['Respecter les couples de serrage et la tension de la courroie.','Effectuer un test de charge sur le véhicule.']) ], securiteRangement:['Batterie débranchée','Ranger et nettoyer le banc de test','Nettoyer le poste de travail'], pointsCles:['Pont de diodes fonctionnel','Régulation de tension < 14,8V','Validation sur banc'], validationRequise: false, };

export default tp;
