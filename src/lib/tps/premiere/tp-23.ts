import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 23,
    duree:'2h00',
    titre:'Diagnostic assistance au freinage',
    niveau: 'premiere',
    situation:'La pédale de frein d\'un véhicule est anormalement dure. Vous devez diagnostiquer le système d\'assistance au freinage (servofrein).',
    objectif:'Tester l’assistance, vérifier dépression/pression et remplacer les composants. (Compétences C2.1, C2.2)',
    materiel:['Vacuomètre', 'Manomètre de pression', 'Valise de diagnostic', 'Schéma du système'],
    etudePrelim:[
        { type: 'text', q: "Analyse de symptôme : Une pédale dure signifie un manque d'assistance. Comment différencier une panne du servofrein lui-même d'une panne de la source de dépression (pompe à vide ou collecteur d'admission) ?", r: 'On mesure la dépression à l\'entrée du servofrein. Si la dépression est bonne, le problème vient du servofrein. Si elle est mauvaise ou nulle, le problème vient de la source de dépression.' },
        { type: 'qcm', q: "Moteur tournant, vous débranchez la durite du servofrein et vous n'entendez aucune aspiration. Quelle est votre conclusion immédiate ?", options: ["Le servofrein est percé", "Il n'y a pas de dépression qui arrive au servofrein", "C'est normal"], r: "Il n'y a pas de dépression qui arrive au servofrein" },
        { type: 'text', q: "Réflexion : Sur un véhicule électrique, il n'y a pas de dépression moteur. Par quelle technologie l'assistance au freinage est-elle assurée ?", r: 'Par un système électro-hydraulique avec une pompe électrique qui génère de la pression, ou un système \'brake-by-wire\' entièrement électronique.' }
    ],
    activitePratique:[
        { titre: 'Test Fonctionnel du Servofrein', duree: '30 min', etapes: ['Moteur éteint, pomper plusieurs fois sur la pédale puis la maintenir enfoncée. Démarrer : la pédale doit s\'enfoncer légèrement.','Tester le maintien de la dépression après coupure du moteur.']},
        { titre: 'Mesure de la Dépression', duree: '40 min', etapes: ['Brancher le vacuomètre sur la durite entre la source (collecteur/pompe à vide) et le servofrein.','Mesurer la dépression au ralenti (environ -500 à -700 mbar).','Contrôler l\'étanchéité du clapet anti-retour et des durites.']},
        { titre: 'Diagnostic Systèmes Hydrauliques (si équipé)', duree: '35 min', etapes: ['Lire les codes défauts via la valise.','Mesurer la pression dans l\'accumulateur hydraulique.','Tester le capteur de pression et le contacteur de pédale.']}
    ],
    securiteRangement:['Raccorder correctement les durites de dépression', 'Ranger les instruments de mesure', 'Tracer les mesures relevées'],
    pointsCles:['La pédale s\'enfonce au démarrage', 'Dépression suffisante et stable', 'Clapet anti-retour étanche'],
    validationRequise: false,
};

export default tp;
