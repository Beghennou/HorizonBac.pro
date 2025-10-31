
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 24, duree:'4h00', titre:'BAC PRO Première • Dépose-pose embrayage', situation:'Un véhicule patine à l\'accélération. Le diagnostic confirme l\'usure de l\'embrayage. Vous êtes chargé du remplacement complet du kit (disque, mécanisme, butée).', objectif:'Remplacer le kit et valider un débrayage correct après réparation. (Compétence C2.2)', materiel:['Kit d\'embrayage neuf', 'Centreur d\'embrayage', 'Cric de fosse pour boîte de vitesses', 'Clé dynamométrique'], 
    etudePrelim:[
        { type: 'qcm', q: "Le moteur prend des tours mais la voiture n'accélère pas. C'est du patinage. Mais si les vitesses craquent au passage, quel autre symptôme cela indique-t-il ?", options: ["L'embrayage est neuf", "L'embrayage ne débraye plus correctement", "Le moteur est trop puissant"], r: "L'embrayage ne débraye plus correctement" },
        { type: 'text', q: "Réflexion critique : Pourquoi faut-il éviter de laisser la boîte de vitesses suspendue par l'arbre primaire lors de la dépose ?", r: 'Pour ne pas endommager l\'arbre primaire, le disque d\'embrayage ou le roulement pilote. Le poids de la boîte doit être supporté par un cric adapté.' },
        { type: 'text', q: "Méthodologie : Expliquez l'importance de serrer les vis du mécanisme d'embrayage progressivement et en étoile (ou en croix).", r: 'Pour appliquer une pression uniforme sur le diaphragme et le disque, éviter de voiler le mécanisme et assurer un contact parfait avec le volant moteur.' }
    ], 
    activitePratique:[ etape('Dépose de la Boîte de Vitesses', '80 min', ['Lever et sécuriser le véhicule sur pont.','Déposer les cardans, supports, tringlerie et connexions électriques.','Extraire la boîte de vitesses à l\'aide du cric de fosse.']),etape('Remplacement de l\'Embrayage', '50 min', ['Remplacer la butée et graisser son guide.','Centrer le disque neuf avec l\'outil spécifique.','Serrer le mécanisme en étoile et au couple préconisé.']),etape('Repose et Validation', '80 min', ['Accoupler et reposer la boîte de vitesses, les supports et cardans.','Rétablir la commande d\'embrayage (câble ou purge si hydraulique).','Effectuer un essai routier pour valider le point de touche et l\'absence de patinage.'])], securiteRangement:['Sécurité absolue lors du levage et de la dépose de la BV', 'Couples de serrage scrupuleusement respectés', 'Ranger et nettoyer l\'outillage'], pointsCles:['Centrage parfait du disque','Commande d\'embrayage correctement réglée','Essai routier validé'], validationRequise: false, };

export default tp;
