
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 19, duree:'2h00', titre:'MA 208 • Contrôle des injecteurs moteur diesel classique', situation:'Sur un moteur diesel ancienne génération, vous devez tester les injecteurs mécaniques sur un banc pour vérifier leur tarage et leur pulvérisation.', objectif:'Tester au banc, remplacer et conclure. (Compétences C2.2, C2.4)', materiel:['Banc de test d\'injecteurs','Gasoil propre','Éprouvettes graduées'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de défaut : Un injecteur 'pisse' (laisse couler du gasoil) au lieu de pulvériser. Quelle sera la conséquence sur la combustion dans le cylindre concerné ?",r:'Une mauvaise combustion, provoquant de la fumée noire, des imbrûlés, un manque de puissance et potentiellement la fonte du piston à long terme.'},
        {type: 'qcm', q:"La pression d'ouverture d'un injecteur est trop basse. Comment cela va-t-il affecter le moment de l'injection et le bruit du moteur (claquements) ?", options: ["L'injection sera retardée et le moteur plus silencieux", "L'injection sera avancée et le moteur claquera davantage", "Ça n'a aucun effet"], r:"L'injection sera avancée et le moteur claquera davantage"},
        {type: 'text', q:"Réflexion : Pourquoi un joint d'injecteur non remplacé ou mal monté peut-il causer des dommages importants au moteur ?",r:'Une fuite sur le joint peut provoquer une perte de compression et permettre aux gaz de combustion de remonter et de \'coker\' l\'injecteur, le rendant inutilisable et difficile à démonter.'}
    ], 
    activitePratique:[ etape('Dépose des Injecteurs','30 min',['Nettoyer la zone de travail.','Déposer les lignes haute pression et les retours.','Extraire les injecteurs et leurs joints en cuivre.']), etape('Test sur Banc','60 min',['Mesurer la pression d\'ouverture (tarage).','Observer la forme du cône de pulvérisation.','Vérifier l\'étanchéité du nez de l\'injecteur.']), etape('Repose et Validation','30 min',['Utiliser des joints en cuivre neufs.','Serrer les injecteurs au couple préconisé.','Purger le circuit haute pression et démarrer.']) ], securiteRangement:['Protection des yeux obligatoire','Gérer les déchets de gasoil','Tracer les pressions relevées'], pointsCles:['Pression de tarage','Qualité de pulvérisation','Étanchéité parfaite'], validationRequise: false, };

export default tp;
