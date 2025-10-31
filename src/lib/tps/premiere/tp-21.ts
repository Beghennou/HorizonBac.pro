
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 21, duree:'1h45', titre:'BAC PRO Première • Relevé de pressions de freinage', situation:'Pour diagnostiquer un déséquilibre de freinage, vous devez mesurer les pressions hydrauliques aux 4 roues à l\'aide de manomètres.', objectif:'Détecter les déséquilibres, localiser la cause et effectuer le réglage. (Compétences C2.1, C2.3)', materiel:['Jeu de 4 manomètres haute pression','Adaptateurs de purge','Assistant pour actionner la pédale'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de données : Pression AVD=100b, AVG=60b, ARD=40b, ARG=40b. Quelle est l'anomalie principale et quel composant est probablement en cause ?",r:'Un déséquilibre avant important. La cause est probablement un étrier AVG grippé ou une canalisation bouchée.'},
        {type: 'qcm', q:"Les pressions avant sont bonnes mais vous n'avez quasiment aucune pression à l'arrière. Quelle est la cause la plus probable ?", options: ["Les plaquettes arrière sont neuves", "Le répartiteur de freinage est défectueux ou bloqué", "Le liquide de frein est trop vieux"], r:"Le répartiteur de freinage est défectueux ou bloqué"},
        {type: 'text', q:"Réflexion : Sur un véhicule sans ABS, le répartiteur de freinage est souvent asservi à la charge. Comment fonctionne-t-il et pourquoi ?",r:'Il est connecté au train arrière par un levier. Plus le véhicule est chargé, plus le levier ouvre le répartiteur pour donner plus de pression à l\'arrière, évitant ainsi un blocage des roues arrière à vide.'}
    ], 
    activitePratique:[ etape('Installation des Manomètres','30 min',['Brancher les manomètres sur les vis de purge de chaque roue.','Repérer clairement chaque manomètre (AVD, AVG, ARD, ARG).']), etape('Mesures de Pression','45 min',['Relever les pressions à mi-course et en pression maximale.','Comparer les pressions Avant/Arrière et Gauche/Droite.','Identifier et interpréter les déséquilibres.']) ], securiteRangement:['Déposer les manomètres proprement','Effectuer une purge si de l\'air a été introduit','Tracer tous les relevés'], pointsCles:['Symétrie des pressions','Pression AR < Pression AV','Rôle du répartiteur'], validationRequise: false, };

export default tp;
