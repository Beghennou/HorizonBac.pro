import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 31,
    duree:'1h45',
    titre:'Contrôle étanchéité circuit de refroidissement',
    niveau: 'premiere',
    situation:'Une odeur de liquide de refroidissement est perceptible et le niveau baisse légèrement. Vous devez mettre le circuit sous pression pour localiser la fuite.',
    objectif:'Pressuriser, traquer les fuites et effectuer un contrôle qualité final. (Compétence C2.4)',
    materiel:['Pompe de test d\'étanchéité avec manomètre','Adaptateur de bouchon de radiateur','Traceur UV et lampe UV'],
    etudePrelim:[
        {type: 'text', q:"Analyse de risque : Pourquoi est-il impératif d'effectuer ce test sur un moteur complètement FROID ?",r:'Un circuit chaud est sous pression. L\'ouvrir présente un risque de brûlure grave par projection de liquide chaud.'},
        {type: 'qcm', q:"Vous mettez le circuit sous pression et celle-ci chute lentement, mais aucune fuite n'est visible à l'extérieur. Quelles sont vos deux principales hypothèses ?", options: ["C'est normal, il y a une évaporation", "Le radiateur de chauffage fuit dans l'habitacle, ou le joint de culasse est défectueux", "Le manomètre est en panne"], r:"Le radiateur de chauffage fuit dans l'habitacle, ou le joint de culasse est défectueux"},
        {type: 'text', q:"Réflexion : La pression de test est généralement de 1,2 bar. Le bouchon du vase d'expansion est souvent taré à 1,4 bar. Pourquoi cette différence ?",r:'Pour éviter d\'endommager un élément du circuit (radiateur, durite) en appliquant une pression supérieure à celle pour laquelle il est conçu. On teste en dessous de la pression maximale de sécurité.'}
    ],
    activitePratique:[
        { titre: 'Test de Pression à Froid', duree: '50 min', etapes: ['Moteur froid, mettre le circuit sous pression (1,2 à 1,6 bar).','Observer si la pression chute sur le manomètre et localiser les points humides.','Utiliser le traceur UV si la fuite est difficile à localiser.']},
        { titre: 'Contrôles Complémentaires', duree: '30 min', etapes: ['Utiliser un kit de détection de CO2 pour rechercher des gaz d\'échappement dans le liquide.','Vérifier l\'absence d\'huile émulsionnée ("mayonnaise").']},
        { titre: 'Conclusion et Réparation', duree: '10 min', etapes: ['Localiser précisément la fuite.','Effectuer un re-test d\'étanchéité après la réparation.']}
    ],
    securiteRangement:['Intervenir exclusivement sur moteur froid','Relâcher la pression avant toute déconnexion','Tracer la localisation de la fuite'],
    pointsCles:['La pression doit tenir','Traceur UV pour fuites discrètes','Recherche de CO2 pour le joint de culasse'],
    validationRequise: false,
};

export default tp;
