
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 17, duree:'2h00', titre:'BAC PRO Première • Pression d\'huile (circuit de lubrification)', situation:'Le témoin de pression d\'huile s\'allume par intermittence au ralenti. Vous devez mesurer la pression d\'huile pour diagnostiquer une éventuelle défaillance du circuit.', objectif:'Mesurer la pression ralenti/3000 tr/min et préparer le diagnostic. (Compétence C2.1)', materiel:['Manomètre de pression d\'huile (0–10 bar)','Adaptateur pour capteur de pression','Multimètre','Documentation technique (RTA)'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de données : Pression à chaud : 0.5 bar au ralenti, 2.0 bar à 3000 tr/min. Le problème vient-il probablement de la pompe à huile elle-même ou de l'usure générale du moteur (coussinets) ? Justifiez.",r:'L\'usure générale du moteur. La pompe semble capable de fournir de la pression à haut régime, mais les jeux internes excessifs (coussinets) font chuter la pression au ralenti.'},
        {type: 'qcm', q:"Vous venez de faire la vidange avec une huile 0W20 au lieu de 5W40 préconisée. Quel impact cela aura-t-il sur la pression d'huile à chaud ?", options: ["Aucun, la viscosité ne change rien", "La pression sera plus élevée", "La pression sera plus faible car l'huile est plus fluide à chaud"], r:"La pression sera plus faible car l'huile est plus fluide à chaud"},
        {type: 'text', q:"Formulation d'hypothèses : Le témoin s'allume, mais la pression mesurée au manomètre est correcte. Citez deux causes possibles pour ce symptôme contradictoire.",r:'1. Le capteur de pression d\'huile (manocontact) est défectueux. 2. Il y a un problème électrique sur le faisceau entre le capteur et le tableau de bord.'}
    ], 
    activitePratique:[ etape('Installation du Manomètre','30 min',['Faire chauffer le moteur.','Déposer le capteur de pression d\'huile et installer le manomètre.','Vérifier le niveau et la viscosité de l\'huile.']), etape('Mesures de Pression','50 min',['Mesurer la pression au ralenti (doit être > 1–2 bar).','Mesurer la pression à 3000 tr/min (doit être de 3–6 bar).','Observer la stabilité de la pression.']), etape('Pré-Diagnostic','30 min',['Orienter le diagnostic : filtre colmaté, huile inadaptée, pompe, clapet, coussinets.','Corréler avec d\'éventuels codes défauts du calculateur.']) ], securiteRangement:['Attention à l\'huile chaude','Nettoyer toute fuite après dépose du manomètre','Tracer les pressions relevées'], pointsCles:['Pression cible atteinte','Stabilité de la pression','Identification des causes possibles'], validationRequise: false, };

export default tp;
