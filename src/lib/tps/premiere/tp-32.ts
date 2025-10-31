import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 32,
    duree:'2h00',
    titre:'Diagnostic (prise en main matériel). Lecture paramètres',
    niveau: 'premiere',
    situation:'Pour initier un diagnostic sur un véhicule moderne, le chef d\'atelier vous demande de vous connecter au calculateur moteur pour lire les codes défauts et analyser les paramètres clés.',
    objectif:'Lire/interpréter les données pour préparer une intervention. (Compétence C2.1)',
    materiel:['Valise de diagnostic','Chargeur de maintien de tension','Adaptateurs OBD'],
    etudePrelim:[
        {type: 'text', q:"Analyse de données : Les 'données figées' (freeze frame) d'un code défaut indiquent T° moteur = 25°C, Régime = 2800 tr/min, Charge = 80%. Que pouvez-vous déduire sur les conditions d'apparition de la panne ?",r:'La panne est survenue moteur froid, lors d\'une forte accélération, peu après le démarrage.'},
        {type: 'text', q:"Réflexion critique : Pourquoi est-il méthodologiquement incorrect d'effacer les codes défauts sans les avoir notés et analysés au préalable ?",r:'Parce qu\'on perd des informations cruciales sur l\'origine de la panne (codes, données figées). Certains défauts peuvent être intermittents et ne pas réapparaître tout de suite.'},
        {type: 'qcm', q:"Vous lisez une valeur de pression de suralimentation de 1.5 bar, moteur à l'arrêt. Quelle est votre première conclusion logique ?", options: ["Le turbo est très performant", "Le capteur de pression de suralimentation est défectueux ou son câblage est en court-circuit", "C'est normal"], r:"Le capteur de pression de suralimentation est défectueux ou son câblage est en court-circuit"}
    ],
    activitePratique:[
        { titre: 'Connexion et Lecture Initiale', duree: '25 min', etapes: ['Brancher l\'outil de diagnostic sur la prise OBD, identifier le véhicule et l\'ECU.','Effectuer une lecture complète et enregistrer tous les codes défauts.','Effacer les codes pour vérifier s\'ils réapparaissent au test suivant.']},
        { titre: 'Analyse des Paramètres (PIDs)', duree: '40 min', etapes: ['Sélectionner une liste de paramètres pertinents pour le symptôme observé.','Observer les valeurs au ralenti, puis en charge (essai routier ou accélération).','Comparer les valeurs aux données de référence de la RTA.']},
        { titre: 'Validation du Diagnostic', duree: '15 min', etapes: ['Reproduire les conditions d\'apparition du défaut.','Effectuer une nouvelle lecture des codes défauts.']}
    ],
    securiteRangement:['Maintenir la charge de la batterie','Déconnecter proprement l\'outil de diagnostic','Archiver les journaux de diagnostic (logs)'],
    pointsCles:['Lecture des codes défauts','Analyse des paramètres pertinents','Validation par reproduction du défaut'],
    validationRequise: false,
};

export default tp;
