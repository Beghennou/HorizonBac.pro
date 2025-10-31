import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 15,
    duree:'2h00',
    titre:'Relevé de compression / fuite',
    niveau: 'premiere',
    situation:'Un moteur essence manque de puissance et présente un ralenti instable. Un relevé des compressions est nécessaire pour évaluer l\'état de santé du moteur.',
    objectif:'Identifier un cylindre faible, localiser la fuite et réaliser un contrôle qualité. (Compétence C2.4)',
    materiel:['Compressiomètre','Testeur de fuite cylindre (air 6–8 bar)','Jeu de clés à bougie','Burette d\'huile'],
    etudePrelim:[
        {type: 'text', q:"Interprétation de données : Compression Cyl.1=12b, Cyl.2=11.5b, Cyl.3=7b, Cyl.4=12b. Quelle est votre première conclusion ? Quelle est la prochaine étape de votre diagnostic ?",r:'Le cylindre 3 a un problème d\'étanchéité. L\'étape suivante est de refaire le test après avoir mis une cuillère d\'huile dans ce cylindre.'},
        {type: 'qcm', q:"Lors du test de fuite sur le Cyl.3, vous entendez un sifflement d'air dans le pot d'échappement. Quelle soupape est probablement en cause ?", options: ["La soupape d'admission", "La soupape d'échappement", "Aucune, c'est normal"], r:"La soupape d'échappement"},
        {type: 'text', q:"Scénario : Après avoir ajouté de l'huile dans le Cyl.3, la compression remonte à 10b. Vers quelle partie du moteur votre diagnostic s'oriente-t-il désormais ?",r:'Vers la segmentation (segments/pistons). L\'huile a temporairement amélioré l\'étanchéité, ce qui indique que le problème ne vient pas des soupapes.'}
    ],
    activitePratique:[
        { titre: 'Préparation du Test', duree: '25 min', etapes: ['Faire chauffer le moteur.','Déposer toutes les bougies d\'allumage ou injecteurs.','Couper l\'allumage et l\'injection pour le test.']},
        { titre: 'Test de Compression', duree: '50 min', etapes: ['Actionner le démarreur pendant 5 à 7 tours pour chaque cylindre.','Relever et noter la pression de chaque cylindre.','Si un cylindre est faible, refaire le test après avoir injecté une cuillère d\'huile.']},
        { titre: 'Test de Fuite', duree: '40 min', etapes: ['Positionner le cylindre faible au PMH compression.','Injecter de l\'air sous pression (6 bar) et mesurer le pourcentage de fuite.','Écouter où l\'air s\'échappe : admission, échappement, reniflard, radiateur.']}
    ],
    securiteRangement:['Débrancher la batterie avant dépose','Respecter le couple de serrage des bougies','Tracer tous les relevés de mesure'],
    pointsCles:['Écart < 10% entre cylindres','Segmentation / Soupapes / Joint de culasse','Position PMH exacte'],
    validationRequise: false,
};

export default tp;
