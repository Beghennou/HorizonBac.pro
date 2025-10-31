import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 22,
    duree:'2h00',
    titre:'Diagnostic du circuit de freinage avec passage au banc',
    niveau: 'premiere',
    situation:'Un véhicule doit passer au banc de freinage pour évaluer objectivement son efficacité et son équilibre avant le contrôle technique.',
    objectif:'Mesurer efficacité/équilibre/frein à main et effectuer un contrôle qualité. (Compétence C2.4)',
    materiel:['Banc de freinage à rouleaux','Fiche de résultats imprimée'],
    etudePrelim:[
        {type: 'text', q:"Analyse de résultats : Efficacité globale = 55% (OK). Déséquilibre AV = 15% (OK). Déséquilibre AR = 45% (KO). Quelle est votre conclusion sur l'état du véhicule ?",r:'Le véhicule sera refusé au contrôle technique à cause du déséquilibre arrière supérieur à 30%. Il y a un problème sur un des freins arrière (étrier grippé, cylindre de roue HS...).'},
        {type: 'qcm', q:"Le véhicule tire à droite lors du test sur le banc. Quelle est la cause la plus probable en dehors du système de freinage lui-même ?", options: ["Le volant n'est pas droit", "Un pneu avant est sous-gonflé", "Le moteur est trop puissant"], r:"Un pneu avant est sous-gonflé"},
        {type: 'text', q:"Réflexion critique : Pourquoi le test du frein de stationnement est-il aussi important pour la sécurité, même si on l'utilise peu en conduite ?",r:'Car il constitue un système de freinage de secours en cas de défaillance totale du circuit hydraulique principal.'}
    ],
    activitePratique:[
        { titre: 'Préparation du Test', duree: '20 min', etapes: ['Vérifier les pressions des pneus.','Effectuer une inspection visuelle rapide des freins.','Suivre les consignes de sécurité du banc.']},
        { titre: 'Test Essieu Avant', duree: '30 min', etapes: ['Mesurer les forces de freinage AVD et AVG.','Calculer le déséquilibre avant.']},
        { titre: 'Test Essieu Arrière', duree: '30 min', etapes: ['Mesurer les forces ARD et ARG.','Tester l\'efficacité du frein de stationnement.']},
        { titre: 'Interprétation des Résultats', duree: '20 min', etapes: ['Vérifier la conformité : efficacité totale > 50%, déséquilibre < 30%, frein à main > 16%.']}
    ],
    securiteRangement:['Sortir prudemment du banc de freinage','Ranger les équipements','Archiver la fiche de résultats'],
    pointsCles:['Efficacité de freinage','Équilibre G/D','Efficacité du frein à main'],
    validationRequise: false,
};

export default tp;
