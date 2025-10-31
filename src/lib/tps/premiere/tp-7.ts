
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 7, duree:'2h00', titre:'BAC PRO Première • Fermeture centralisée', situation:'La télécommande de la voiture d\'un client ne fonctionne plus, l\'obligeant à utiliser la clé. Vous devez diagnostiquer le système de fermeture centralisée.', objectif:'Tester moteurs/commande, appairer la télécommande et effectuer les réglages. (Compétences C2.1, C2.3)', materiel:['Valise de diagnostic','Multimètre','Télécommande neuve','Pile CR2032'], 
    etudePrelim:[
        {type: 'qcm', q:"La centralisation fonctionne avec la clé dans la serrure, mais pas avec la télécommande (pile neuve). Où orientez-vous votre diagnostic en priorité ?", options: ["Les moteurs de portes", "Le récepteur haute fréquence (RF) du véhicule ou la synchronisation de la clé", "Le fusible de la centralisation"], r:"Le récepteur haute fréquence (RF) du véhicule ou la synchronisation de la clé"},
        {type: 'text', q:"Analyse de panne : Aucune porte ne se verrouille, mais vous entendez le 'clac' des relais dans l'habitacle. Quelle est l'hypothèse la plus probable (panne électrique, mécanique ou de commande) ?",r:'Panne électrique. La commande (relais) fonctionne, mais l\'alimentation n\'arrive pas aux moteurs ou la masse est mauvaise.'},
        {type: 'text', q:"Recherche d'information : Dans quelle section de la documentation technique trouveriez-vous la procédure exacte de resynchronisation (appairage) d'une nouvelle télécommande ?",r:'Dans la section \'Équipements de confort\', \'Carrosserie\' ou \'Système de verrouillage\'.'}
    ], 
    activitePratique:[ etape('Diagnostic Initial','25 min',['Tester le fonctionnement avec la clé et la télécommande.','Lire les codes défauts dans le calculateur confort.','Vérifier la tension de la pile de la télécommande (doit être > 3V).']), etape('Contrôle des Actionneurs','50 min',['Vérifier l\'alimentation des moteurs de serrure (inversion de polarité).','Tester les microrupteurs de position de porte.','Contrôler l\'état et la continuité des faisceaux de porte.']), etape('Synchronisation de la Télécommande','30 min',['Vérifier l\'émission du signal (infrarouge ou radio).','Suivre la procédure d\'appairage du constructeur.','Valider le fonctionnement de la nouvelle télécommande.']) ], securiteRangement:['Attention aux clips de garniture de porte','Protéger les vitres lors des manipulations','Tracer la procédure d\'appairage'], pointsCles:['Tester la pile en premier','Moteur ou mécanisme ?','Procédure d\'appairage'], validationRequise: false, };

export default tp;
