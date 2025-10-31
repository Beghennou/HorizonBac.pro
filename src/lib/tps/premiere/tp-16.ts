
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 16, duree:'2h00', titre:'BAC PRO Première • Pré-contrôle technique', situation:'Un client souhaite faire un bilan complet de son véhicule avant de le présenter au contrôle technique officiel afin d\'éviter une contre-visite.', objectif:'Préparer le véhicule à la visite et réaliser un contrôle qualité final. (Compétence C2.4)', materiel:['Check-list officielle du contrôle technique','Lecteur EOBD','Luxmètre','Manomètre de pression pneus'], 
    etudePrelim:[
        {type: 'text', q:"Jeu de rôle : Vous détectez une usure irrégulière des pneus. Comment l'expliquez-vous au client et quelle prestation complémentaire lui proposez-vous ?",r:'J\'explique que l\'usure anormale est souvent due à un défaut de géométrie des trains roulants, ce qui est un motif de contre-visite. Je lui propose un contrôle et un réglage de la géométrie.'},
        {type: 'qcm', q:"Un code défaut moteur est présent mais le témoin est éteint. Le véhicule passera-t-il le contrôle technique ?", options: ["Oui, si le témoin est éteint, tout va bien", "Non, la simple présence d'un code défaut dans le calculateur est un motif de contre-visite depuis 2019", "Peut-être, ça dépend du code"], r:"Non, la simple présence d'un code défaut dans le calculateur est un motif de contre-visite depuis 2019"},
        {type: 'text', q:"Prise de décision : Le client refuse la réparation d'une défaillance 'majeure'. Quelle mention devez-vous absolument faire figurer sur l'OR avant de lui restituer le véhicule ?",r:'Il faut écrire "Le client refuse la réparation de [défaut]. Le véhicule est susceptible d\'être refusé au contrôle technique et présente un risque pour la sécurité." et le faire signer.'}
    ], 
    activitePratique:[ etape('Contrôles Visuels Majeurs','35 min',['Vérifier l\'éclairage, le vitrage, la corrosion perforante.','Inspecter l\'usure et la pression des pneus, les fuites visibles, l\'état de l\'échappement.']), etape('Mesures et Diagnostics','35 min',['Contrôler le réglage des phares avec le luxmètre.','Ajuster la pression des pneus.','Effectuer une lecture des codes défauts via la prise OBD.']), etape('Restitution et Préconisations','20 min',['Lister les défaillances constatées et leur niveau de gravité (mineur, majeur, critique).','Fournir des préconisations chiffrées de remise en état.']) ], securiteRangement:['Respecter les consignes de sécurité de l\'atelier','Ranger tous les outils de mesure','Archiver la fiche de pré-contrôle'], pointsCles:['Respect du cadre réglementaire','Calculateur "propre" (sans DTC)','Traçabilité des défauts'], validationRequise: false, };

export default tp;
