
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 3, duree:'1h45', titre:'BAC PRO Première • Contrôle circuit de démarrage', situation:'Un client se plaint que son véhicule refuse de démarrer. Le démarreur ne tourne pas. Vous devez diagnostiquer le circuit de démarrage pour identifier la cause de la panne.', objectif:'Identifier la cause d’un non-démarrage et valider le diagnostic. (Compétences C2.1, C2.4)', materiel:['Multimètre','Schéma électrique','Pince ampèremétrique','Chargeur de batterie'], 
    etudePrelim:[
        {type: 'qcm', q:"Le démarreur ne tourne pas. Quelle est la première chose à contrôler ?", options: ["Le démarreur lui-même", "L'alternateur", "La tension et l'état des cosses de la batterie"], r:"La tension et l'état des cosses de la batterie"},
        {type: 'text', q:"Interprétation de mesure : Vous mesurez 12,5V à la batterie, mais seulement 9V sur la borne de commande (solénoïde) lorsque vous tournez la clé. Que suspectez-vous ?",r:'Une chute de tension importante sur le circuit de commande, probablement due à un mauvais contact sur le Neiman, un relais défectueux ou un faisceau endommagé.'},
        {type: 'text', q:"Analyse de schéma : Sur le schéma électrique du circuit de démarrage, identifiez le chemin exact du courant de commande (du Neiman au solénoïde) et celui du courant de puissance.",r:'Le courant de commande va de la batterie au Neiman, puis au relais de démarreur et enfin à la borne 50 du solénoïde. Le courant de puissance va directement de la borne + de la batterie à la borne 30 du démarreur.'}
    ], 
    activitePratique:[ etape('Contrôles Préliminaires','25 min',['Vérifier la tension de la batterie (>12,4 V).','Inspecter le serrage et l\'oxydation des cosses.','Contrôler la continuité des masses moteur et châssis.']), etape('Mesures Électriques','45 min',['Mesurer la tension en sortie du contacteur à clé (position Démarrage).','Vérifier la présence de 12V sur la borne 50 du démarreur.','Mesurer les chutes de tension sur le câble positif et la masse.','Mesurer l\'intensité au démarrage (doit être entre 150A et 300A).']), etape('Conclusion et Diagnostic','25 min',['Déterminer si la panne vient de la batterie, du câblage, du relais ou du démarreur.','Préconiser les actions correctives à mener.']) ], securiteRangement:['Prudence lors de la manipulation de la batterie','Ranger la pince ampèremétrique','Tracer toutes les mesures effectuées'], pointsCles:['Batterie OK en premier','Chutes de tension révélatrices','Intensité de démarrage élevée'], validationRequise: false, };

export default tp;
