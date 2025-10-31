
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 28, duree:'1h30', titre:'BAC PRO Première • Effectuer un pré-contrôle géométrie', situation:'Avant de monter un véhicule sur le banc de géométrie 3D, un pré-contrôle rigoureux des trains roulants est indispensable pour garantir la fiabilité des mesures.', objectif:'Valider la préparation du véhicule avant de passer au banc 3D. (Compétence C2.1)', materiel:['Pont élévateur','Manomètre de pression pneus','Jauge de profondeur','Lampe d\'inspection'], 
    etudePrelim:[
        {type: 'text', q:"Analyse critique : Vous constatez une usure beaucoup plus prononcée sur le pneu avant droit que sur le gauche. Quelles sont les 3 hypothèses de défaut géométrique les plus probables ?",r:'1. Défaut de parallélisme (ouverture/pincement excessif). 2. Défaut de carrossage (angle de la roue). 3. Problème sur le train arrière qui fait \'marcher en crabe\' le véhicule.'},
        {type: 'qcm', q:"En secouant une roue, vous détectez un jeu important. Comment déterminez-vous si ce jeu provient de la rotule de direction ou du roulement de roue ?", options: ["C'est impossible à dire", "Le jeu de rotule est horizontal, celui du roulement est souvent vertical et diagonal", "Il faut tout démonter"], r:"Le jeu de rotule est horizontal, celui du roulement est souvent vertical et diagonal"},
        {type: 'text', q:"Réflexion : Pourquoi un simple réglage de géométrie est-il inutile et non professionnel si un silentbloc de bras de suspension est complètement déchiré ?",r:'Parce que le silentbloc déchiré introduit un jeu. Le réglage sera donc instable et faux. La position de la roue changera constamment en roulant, annulant le réglage.'}
    ], 
    activitePratique:[ etape('Contrôle des Pneumatiques', '20 min', ['Ajuster les pressions selon les préconisations.','Mesurer la profondeur des sculptures et vérifier l\'homogénéité.','Analyser les usures irrégulières (indices de défauts géométriques).']),etape('Contrôle du Train Avant', '35 min', ['Vérifier l\'absence de jeu dans les rotules de direction et de suspension.','Inspecter l\'état des silentblocs de bras de suspension.','Contrôler le jeu des roulements de roue et l\'état des amortisseurs.']),etape('Contrôle du Train Arrière', '25 min', ['Inspecter les bras de suspension et les biellettes.','Vérifier les fixations et l\'état des silentblocs.'])], securiteRangement:['Descendre le pont en sécurité','Ranger les outils de mesure','Remplir la fiche de pré-contrôle'], pointsCles:['Pressions conformes','Absence totale de jeu','Véhicule prêt pour le banc'], validationRequise: false, };

export default tp;
