
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 27, duree:'3h30', titre:'BAC PRO Première • Échange synchro 5e', situation:'Un véhicule présente un craquement systématique lors du passage de la 5ème vitesse. Le diagnostic pointe vers un synchroniseur usé. Vous devez le remplacer.', objectif:'Supprimer les craquements, remplacer le synchro et valider l’engagement. (Compétence C2.2)', materiel:['Kit synchroniseur 5ème vitesse', 'Jeu d\'extracteurs', 'Circlips neufs', 'Huile de boîte préconisée'], 
    etudePrelim:[
        { type: 'qcm', q: "Le passage 3ème -> 4ème craque, mais pas 4ème -> 3ème. La bague de synchro est-elle la seule cause possible ? Quelle autre pièce pourrait être en cause ?", options: ["Non, le crabot du pignon peut aussi être usé", "Oui, c'est forcément la bague", "C'est un problème d'huile"], r: "Non, le crabot du pignon peut aussi être usé" },
        { type: 'text', q: "Réflexion : Pourquoi la bague de synchroniseur est-elle souvent faite en laiton ou en bronze, un métal plus 'tendre' que les pignons en acier ?", r: 'C\'est une pièce d\'usure volontaire. Le métal tendre sert de cône de friction pour égaliser les vitesses de rotation. Il s\'use à la place des pignons qui sont plus chers et difficiles à remplacer.' },
        { type: 'text', q: "Méthodologie : Vous devez remonter un roulement sur un arbre. Préférez-vous utiliser une presse ou le chauffer légèrement ? Justifiez votre choix en termes de sécurité et de préservation des pièces.", r: 'Une presse est préférable. Elle applique une force contrôlée et droite. Chauffer un roulement peut altérer ses propriétés métallurgiques s\'il n\'est pas fait correctement dans un bain d\'huile à température contrôlée.' }
    ], 
    activitePratique:[ etape('Accès au Pignon de 5ème', '80 min', ['Déposer la boîte de vitesses du véhicule.','Ouvrir le carter de 5ème.','Bloquer l\'arbre pour desserrer l\'écrou de maintien.']), etape('Remplacement du Synchroniseur', '60 min', ['Extraire le pignon et le baladeur de 5ème.','Remplacer les bagues et les ressorts du synchroniseur.','Contrôler les jeux avec un comparateur.']),etape('Validation de la Réparation', '60 min', ['Remonter la boîte, faire le plein d\'huile.','Effectuer un essai routier en insistant sur le passage 4ème ↔ 5ème.','Documenter l\'intervention.']) ], securiteRangement:['Recycler l\'huile usagée','Respecter les couples de serrage','Archiver les photos des étapes clés'], pointsCles:['Jeux fonctionnels corrects','Passage de vitesse doux','Absence de craquement validée'], validationRequise: false, };

export default tp;
