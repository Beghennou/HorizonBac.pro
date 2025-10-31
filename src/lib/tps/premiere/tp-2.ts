
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 2, duree:'1h30', titre:'BAC PRO Première • Utilisation d\'un multimètre', situation:'Un véhicule présente des dysfonctionnements électriques intermittents. Avant tout diagnostic, le chef d\'atelier vous demande de valider votre maîtrise du multimètre sur une maquette puis sur le véhicule.', objectif:'Mesurer tension, résistance et continuité correctement et en sécurité pour préparer un diagnostic. (Compétence C2.1)', materiel:['Multimètre','Pointes de touche','Fusibles de test','Schéma électrique simple'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de risque : Vous devez mesurer l'intensité du courant consommé par le démarreur. Pourquoi est-ce une opération risquée avec un multimètre standard et quel outil faut-il utiliser à la place ?",r:'Un multimètre standard est limité à 10A ou 20A, or un démarreur consomme plus de 150A. Cela ferait griller le fusible interne du multimètre. Il faut utiliser une pince ampèremétrique.'},
        {type: 'qcm', q:"Vous mesurez 0V aux bornes d'un consommateur qui devrait fonctionner. Quelle est la cause la plus probable ?", options: ["Le consommateur est en court-circuit.", "Le circuit est ouvert en amont (câble coupé, fusible HS).", "La batterie est trop chargée."], r:"Le circuit est ouvert en amont (câble coupé, fusible HS)."},
        {type: 'text', q:"Réflexion : Pourquoi doit-on impérativement couper l'alimentation du circuit avant de mesurer une résistance (Ω) ?",r:'Parce que le multimètre injecte son propre petit courant pour mesurer la résistance. La présence d\'une tension extérieure fausserait la mesure et pourrait endommager l\'appareil.'}
    ], 
    activitePratique:[ etape('Mesures de Tension (V)','25 min',['Mesurer la tension batterie au repos, moteur tournant, et avec consommateurs actifs.','Mesurer les chutes de tension aux bornes des connexions positives et négatives.']), etape('Mesures de Résistance (Ω) et Continuité','30 min',['Tester la continuité d\'un fusible avec la fonction buzzer.','Mesurer la résistance d\'une sonde CTN/CTP à différentes températures.','Contrôler la continuité et l\'isolement d\'un faisceau électrique.']), etape('Validation et Interprétation','20 min',['Remplir un tableau de relevés de mesures.','Analyser les erreurs fréquentes (inversion des pointes, mauvais calibre) et comment les éviter.']) ], securiteRangement:['Couper le contact avant toute mesure de résistance','Ne jamais percer les isolants des fils','Ranger les cordons du multimètre après usage'], pointsCles:['Bon calibre','Polarité correcte','Sécurité électrique'], validationRequise: false, };

export default tp;
