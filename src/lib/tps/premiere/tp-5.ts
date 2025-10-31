
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 5, duree:'1h45', titre:'BAC PRO Première • Contrôle circuit de charge', situation:'Le témoin de batterie s\'allume par intermittence. Le client craint une panne imminente. Vous devez contrôler le circuit de charge pour diagnostiquer le problème.', objectif:'Mesurer la tension de charge et les chutes de tension pour diagnostiquer. (Compétence C2.1)', materiel:['Multimètre','Pince ampèremétrique','Schéma électrique'], 
    etudePrelim:[
        {type: 'text', q:"Scénario : Moteur tournant, vous mesurez 13.9V aux bornes de la batterie, mais le témoin reste allumé. Quelle pourrait être la cause, autre que l'alternateur lui-même ?",r:'Le fil d\'excitation (borne L/D+) de l\'alternateur est peut-être coupé ou le voyant lui-même est en défaut, car la tension de charge est correcte.'},
        {type: 'qcm', q:"Analyse Cause à Effet : Une courroie d'accessoires détendue patine. Quel sera l'impact sur la tension de charge mesurée aux bornes de la batterie ?", options: ["Aucun, l'alternateur compensera", "La tension sera instable et souvent trop basse", "La tension sera trop élevée"], r:"La tension sera instable et souvent trop basse"},
        {type: 'text', q:"Formulation d'hypothèses : La tension de charge mesurée est de 15.5V. Citez deux composants qui pourraient être la cause de cette surcharge et expliquez pourquoi.",r:'1. Le régulateur de tension de l\'alternateur est défectueux et ne limite plus la tension. 2. Une mauvaise masse sur l\'alternateur peut fausser la mesure du régulateur.'}
    ], 
    activitePratique:[ etape('Mesures de Tension','35 min',['Mesurer la tension batterie au repos, au ralenti, puis à 2000 tr/min.','Activer les consommateurs et vérifier la stabilité de la tension.','Mesurer les chutes de tension sur les câbles +B et la masse.']), etape('Inspection Visuelle','30 min',['Contrôler l\'état et la tension de la courroie d\'accessoires.','Vérifier l\'oxydation des bornes de la batterie et de l\'alternateur.','Écouter les bruits anormaux provenant de l\'alternateur.']), etape('Conclusion Diagnostique','20 min',['Déterminer si la panne vient des connexions, de la courroie ou de l\'alternateur.','Proposer les actions correctives.']) ], securiteRangement:['Attention aux pièces en rotation (courroie, ventilateur)','Débrancher la batterie avant toute dépose','Tracer les résultats de mesures'], pointsCles:['Tension de charge correcte','Connexions propres et serrées','Bonne tension de la courroie'], validationRequise: false, };

export default tp;
