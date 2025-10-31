
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 33, duree:'2h00', titre:'BAC PRO Première • Identification structurelle du système d\'injection', situation:'Afin de pouvoir intervenir efficacement sur n\'importe quel système d\'injection, vous devez apprendre à identifier rapidement sa structure, ses capteurs et ses actionneurs.', objectif:'Localiser capteurs/actionneurs et flux air/carburant pour préparer une intervention. (Compétence C2.1)', materiel:['Schémas de systèmes d\'injection','Photos de moteurs','Étiquettes de repérage','Documentation technique (RTA)'], 
    etudePrelim:[
        {type: 'qcm', q:"Quel est le capteur le plus important pour que le calculateur puisse déterminer le moment précis de l'injection et de l'allumage ?", options: ["Le capteur de température d'eau", "Le capteur de position du vilebrequin (PMH)", "La sonde lambda"], r:"Le capteur de position du vilebrequin (PMH)"},
        {type: 'text', q:"Réflexion : Sur un moteur diesel Common Rail, situez le régulateur de pression. Pourquoi est-il un élément si crucial pour le bon fonctionnement du moteur ?",r:'Il est généralement situé sur la pompe haute pression ou sur la rampe commune. Il est crucial car il ajuste en temps réel la pression du carburant, qui influence directement la puissance, la consommation et les émissions.'},
        {type: 'text', q:"Analyse de système : Suivez le chemin de l'air sur un moteur essence turbocompressé : du filtre à air jusqu'à la soupape d'admission, en listant les composants clés rencontrés.",r:'Filtre à air → Débitmètre → Turbo (partie compresseur) → Échangeur (intercooler) → Boîtier papillon → Collecteur d\'admission → Soupape d\'admission.'}
    ], 
    activitePratique:[ etape('Analyse Système Essence', '50 min', ['Identifier l\'ECU, la rampe d\'injection et les injecteurs.','Localiser le débitmètre (MAF) ou capteur de pression (MAP), et les sondes lambda.','Repérer le boîtier papillon motorisé et le système d\'allumage.']),etape('Analyse Système Diesel', '50 min', ['Identifier la pompe haute pression, le rail commun et les injecteurs.','Localiser les capteurs PMH et AAC, indispensables au séquencement.','Repérer la vanne EGR et les capteurs du FAP (pression différentielle).'])], securiteRangement:['Ne jamais débrancher de composant moteur tournant','Protéger les connecteurs lors des interventions','Archiver les schémas étudiés'], pointsCles:['Cartographie mentale du système','Connaître les noms exacts des composants','Comprendre les flux d\'air et de carburant'], validationRequise: false, };

export default tp;
