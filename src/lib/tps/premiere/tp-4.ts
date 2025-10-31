
import type { TP } from './tp-1';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = { id: 4, duree:'2h00', titre:'UE 207 • Contrôle du démarreur', situation:'Le diagnostic précédent a mis en cause le démarreur. Vous devez le déposer, le contrôler sur banc et le remplacer pour confirmer la panne et réparer le véhicule.', objectif:'Valider l’état du démarreur, le remplacer et effectuer un contrôle qualité. (Compétences C2.1, C2.2, C2.4)', materiel:['Banc de test démarreur','Multimètre','Jeu de clés','Pièces de rechange (solénoïde, balais)'], 
    etudePrelim:[
        {type: 'qcm', q:"Vous entendez un 'clac' mais le démarreur ne tourne pas. Quel composant est probablement fonctionnel et lequel est défaillant ?", options: ["Le solénoïde est HS, le moteur électrique est OK.", "Le solénoïde fonctionne, le moteur électrique est HS.", "Les deux sont HS."], r:"Le solénoïde fonctionne, le moteur électrique est HS."},
        {type: 'text', q:"Analyse de risque : Vous testez un démarreur sur un banc. Quelle est la mesure de sécurité la plus importante à prendre concernant la fixation du démarreur ?",r:'Le fixer très solidement dans un étau ou sur le banc. Le couple de démarrage est très violent et peut projeter le démarreur s\'il est mal fixé.'},
        {type: 'text', q:"Réflexion critique : Pourquoi un démarreur peut-il fonctionner parfaitement à vide sur le banc, mais ne pas entraîner le moteur une fois monté sur le véhicule ?",r:'Parce qu\'à vide, il n\'a aucune charge. Une fois monté, il doit vaincre la compression du moteur. S\'il est faible (usure des charbons, court-circuit partiel), il n\'aura pas assez de force pour le faire.'}
    ], 
    activitePratique:[ etape('Dépose du Démarreur','30 min',['Débrancher la batterie.','Déposer les câbles d\'alimentation et les fixations du démarreur.','Extraire le démarreur du véhicule.']), etape('Contrôles des Composants','40 min',['Mesurer les résistances de l\'inducteur et de l\'induit.','Vérifier l\'isolement à la masse.','Contrôler l\'état du solénoïde et des balais.']), etape('Test sur Banc','35 min',['Mesurer l\'intensité à vide (doit être < 80A).','Écouter les bruits anormaux et vérifier la rotation.','Effectuer un test en charge si le banc le permet.']), etape('Repose et Validation','15 min',['Respecter les couples de serrage.','Effectuer un test de démarrage sur le véhicule.']) ], securiteRangement:['Batterie débranchée avant toute intervention','Ranger et nettoyer le banc après usage','Nettoyer les pièces et le poste de travail'], pointsCles:['Contrôles d\'isolement','Usure des balais','Validation sur banc'], validationRequise: false, };

export default tp;
