
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 26, duree:'3h00', titre:'T 206 • Découverte de la boîte de vitesses', situation:'Sur une boîte de vitesses déposée et destinée à la formation, vous devez effectuer un démontage partiel pour analyser son fonctionnement interne.', objectif:'Identifier pignons, synchros, arbres et fourchettes pour préparer une intervention. (Compétence C2.1)', materiel:['Boîte de vitesses didactique', 'Jeu d\'extracteurs', 'Bac de nettoyage', 'Schéma éclaté de la BV'], 
    etudePrelim:[
        { type: 'text', q: "Analyse fonctionnelle : Observez deux pignons de rapports différents. Pourquoi le pignon du 1er rapport est-il beaucoup plus grand que celui du 5ème rapport ?", r: 'Le 1er rapport a besoin de plus de couple (force) pour lancer le véhicule. Un grand pignon mené par un petit pignon moteur démultiplie la force (au détriment de la vitesse).' },
        { type: 'qcm', q: "Quel est le rôle des petites dents (crabots) sur le côté des pignons et des baladeurs de synchro ?", options: ["À lubrifier la boîte", "À freiner la rotation des pignons", "À verrouiller mécaniquement le pignon sur l'arbre une fois les vitesses synchronisées"], r: "À verrouiller mécaniquement le pignon sur l'arbre une fois les vitesses synchronisées" },
        { type: 'text', q: "Méthodologie : Pourquoi le repérage et le rangement méthodique des pièces (vis, rondelles, circlips) sont-ils absolument critiques lors du démontage d'une boîte de vitesses ?", r: 'Parce que chaque pièce a une place et une fonction précise. Une erreur de remontage peut bloquer la boîte ou entraîner sa destruction rapide.' }
    ], 
    activitePratique:[ etape('Ouverture de la Boîte', '50 min', ['Vidanger l\'huile de la boîte.','Ouvrir le carter de sélection et le carter principal.','Repérer les différents ensembles (arbres, différentiel).']), etape('Analyse des Composants', '80 min', ['Examiner l\'usure des bagues de synchro et des crabots.','Contrôler le jeu des roulements d\'arbres.','Observer le fonctionnement de la sélection et des fourchettes.']),etape('Remontage Partiel', '70 min', ['Remplacer les joints et les circlips si nécessaire.','Appliquer la graisse adaptée sur les points de friction.','Contrôler la libre rotation des arbres et le bon passage des rapports.'])], securiteRangement:['Recycler l\'huile de boîte usagée','Nettoyer les pièces avant analyse','Ranger l\'outillage spécifique (extracteurs)'], pointsCles:['Méthode et rigueur','Repérage des pièces','Analyse des jeux fonctionnels'], validationRequise: false, };

export default tp;
