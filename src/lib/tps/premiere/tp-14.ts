
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = { id: 14, duree:'3h00', titre:'BAC PRO Première • Remplacement distribution et pompe à eau', situation:'Un véhicule arrive à l\'échéance de remplacement de sa courroie de distribution. L\'intervention inclut préventivement le remplacement de la pompe à eau.', objectif:'Respecter la procédure constructeur, le calage et remplacer les pièces. (Compétences C2.1, C2.2, C2.4)', materiel:['Kit de distribution','Jeu de piges de calage','Clé dynamométrique','Liquide de refroidissement'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de risque : Quelle est la conséquence catastrophique d'un décalage, même d'une seule dent, sur un moteur dit à 'interférence' ?",r:'Les soupapes et les pistons entreraient en collision, ce qui causerait des dommages très importants et coûteux au moteur (soupapes tordues, pistons marqués).'},
        {type: 'text', q:"Réflexion critique : Pourquoi est-il impératif de remplacer la pompe à eau et les galets en même temps que la courroie, même s'ils ne semblent pas usés ?",r:'Car ils ont la même durée de vie que la courroie. Un galet ou une pompe qui lâche peut détruire la courroie neuve, entraînant les mêmes conséquences qu\'une courroie cassée.'},
        {type: 'qcm', q:"Après avoir monté la nouvelle courroie, vous devez effectuer deux tours complets du vilebrequin à la main. Quel est le double objectif de cette étape cruciale ?", options: ["Pour bien tendre la courroie", "Pour vérifier l'absence de point dur (collision) et s'assurer que les repères de calage reviennent en place", "Pour lubrifier la nouvelle courroie"], r:"Pour vérifier l'absence de point dur (collision) et s'assurer que les repères de calage reviennent en place"}
    ], 
    activitePratique:[ etape('Calage et Préparation','35 min',['Déposer les protections et carters.','Aligner les repères et insérer les piges de calage (vilo/AAC).','Marquer le sens de rotation de l\'ancienne courroie.']), etape('Remplacement des Composants','90 min',['Remplacer la pompe à eau, les galets tendeurs et enrouleurs.','Poser la nouvelle courroie en respectant le sens.','Appliquer la tension préconisée à l\'aide de l\'outil spécifique.','Effectuer deux tours moteur manuels et recontrôler le calage.']), etape('Finition et Validation','35 min',['Remplir et purger le circuit de refroidissement.','Contrôler l\'absence de fuites et de bruits anormaux.','Documenter l\'intervention avec traçabilité des pièces.']) ], securiteRangement:['Batterie débranchée','Respect strict des couples de serrage','Propreté des plans de joint'], pointsCles:['Calage moteur exact','Tension correcte de la courroie','Purge du circuit de refroidissement'], validationRequise: false, };

export default tp;
