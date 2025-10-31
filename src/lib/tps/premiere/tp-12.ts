
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 12, duree:'2h00', titre:'BAC PRO Première • Vitres électriques', situation:'La vitre électrique côté passager ne fonctionne plus, ni depuis la commande conducteur, ni depuis la commande passager. Vous devez en trouver la cause.', objectif:'Discriminer panne moteur/mécanique/commande et remplacer l’élément défectueux. (Compétences C2.1, C2.2)', materiel:['Multimètre','Graisse silicone','Outils de dégarnissage','Schéma électrique'], 
    etudePrelim:[
        {type: 'qcm', q:"La vitre descend mais ne remonte pas. Le problème est-il probablement le moteur lui-même, ou plutôt sa commande (l'interrupteur) ?", options: ["Le moteur est HS", "C'est probablement la commande (interrupteur) qui est défectueuse sur la fonction 'montée'", "C'est un problème mécanique"], r:"C'est probablement la commande (interrupteur) qui est défectueuse sur la fonction 'montée'"},
        {type: 'text', q:"Scénario : Après avoir débranché la batterie, la vitre passager fonctionne par à-coups et l'anti-pincement ne marche plus. Quelle est l'action corrective immédiate à réaliser ?",r:'Il faut réinitialiser le système. La procédure consiste généralement à maintenir le bouton en position montée pendant quelques secondes une fois la vitre fermée.'},
        {type: 'text', q:"Réflexion : Pourquoi un moteur de lève-vitre possède-t-il une protection thermique interne ?",r:'Pour éviter la surchauffe et un risque d\'incendie si on maintient le bouton appuyé alors que la vitre est déjà en butée (haute ou basse).'}
    ], 
    activitePratique:[ etape('Diagnostic Initial','25 min',['Tester les commandes conducteur et passager.','Vérifier le fusible correspondant aux lève-vitres.','Contrôler que le verrouillage enfant n\'est pas activé.']), etape('Contrôles Électriques','45 min',['Mesurer l\'alimentation du moteur (inversion +/- 12V).','Mesurer la résistance du moteur (environ 5–15 Ω).','Tester la continuité de l\'interrupteur inverseur.']), etape('Contrôles Mécaniques','35 min',['Inspecter l\'état des rails et des câbles.','Graisser le mécanisme si nécessaire.','Vérifier l\'état des butées.']), etape('Initialisation','15 min',['Effectuer des cycles complets montée/descente pour réapprendre les butées.','Tester le bon fonctionnement de l\'anti-pincement.']) ], securiteRangement:['Protéger les garnitures de porte','Protéger les vitres lors des manipulations','Tracer l\'intervention'], pointsCles:['Panne moteur vs mécanique','Nécessité d\'initialisation','Graissage du mécanisme'], validationRequise: false, };

export default tp;
