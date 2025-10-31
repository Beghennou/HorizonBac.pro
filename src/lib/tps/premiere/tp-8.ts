
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 8,
    duree: '3h00',
    titre: 'BAC PRO Première • Diagnostic d\'un circuit électrique (feux stop)',
    situation: 'Un client se présente pour le contrôle technique de sa Peugeot 207. Lors de la pré-visite, vous constatez qu\'aucun des feux de stop ne s\'allume lorsque vous appuyez sur la pédale de frein. C\'est un défaut critique qui entraîne une contre-visite immédiate.',
    objectif: 'Mener un diagnostic électrique complet pour trouver la cause de la panne et rendre le véhicule sûr. (Compétences C3.1, C3.3, C3.4, C2.1)',
    materiel: ['Schéma électrique', 'Multimètre', 'Jeu de fusibles', 'Jeu d\'ampoules'],
    etudePrelim: [
        { type: 'text', q: "Méthodologie : Expliquez en quoi consiste la méthode de diagnostic 'du point-milieu' et comment vous l'appliqueriez pour diagnostiquer cette panne de feux stop.", r: 'On commence par tester un point au milieu du circuit (ex: la sortie du contacteur de stop). Si le courant passe, le problème est en aval. Sinon, il est en amont. Cela permet de diviser par deux la zone de recherche à chaque mesure.' },
        { type: 'qcm', q: "Le 3ème feu stop fonctionne, mais les deux autres non. Quelle est votre première hypothèse logique ?", options: ["Le fusible est grillé", "Le contacteur de pédale est HS", "Les ampoules des deux feux sont grillées ou le faisceau est coupé après la dérivation vers le 3ème feu"], r: "Les ampoules des deux feux sont grillées ou le faisceau est coupé après la dérivation vers le 3ème feu" },
        { type: 'text', q: "Analyse de schéma : Sur le schéma, identifiez si le contacteur de pédale de frein coupe le +12V ou la masse. Quelle est l'incidence sur la méthode de test ?", r: 'Si le contacteur coupe le +12V, on doit mesurer 12V en entrée et en sortie (pédale appuyée). S\'il coupe la masse, on mesure la continuité vers la masse.' },
        { type: 'text', q: "Une lampe de feu stop a une puissance de 21W sous 12V. Calculez l'intensité (I) qui la traverse et sa résistance (R).", r: 'I = P/U = 21/12 = 1.75 A. R = U/I = 12/1.75 ≈ 6.86 Ω.' }
    ],
    activitePratique: [
        etape('Contrôles Simples & Visuels', '45 min', [
            'Vérifier visuellement les ampoules et le fusible correspondant.',
            'Inspecter les connecteurs des feux arrière et les points de masse visibles.',
            'Tester manuellement le fonctionnement du contacteur de pédale de frein (clic audible).'
        ]),
        etape('Mesures Ciblées avec Multimètre', '60 min', [
            'Suivre le schéma électrique pour mesurer la tension en entrée et en sortie du contacteur (pédale appuyée).',
            'Vérifier la présence de 12V sur le connecteur d\'alimentation des feux arrière.',
            'Mesurer la continuité et la qualité de la mise à la masse des platines de feux.',
            'Contrôler la résistance de l\'ampoule si elle est accessible et comparer au calcul théorique.'
        ]),
        etape('Diagnostic Final et Validation', '25 min', [
            'À partir des mesures, identifier l\'élément défaillant (fusible, contacteur, faisceau, ampoule, masse).',
            'Effectuer la réparation nécessaire (remplacement de l\'élément).',
            'Recontrôler le fonctionnement complet des feux stop pour valider la réparation.'
        ])
    ],
    securiteRangement: [
        'Couper le contact avant de manipuler les fusibles ou les connecteurs.',
        'Respecter les calibres des fusibles et les types d\'ampoules.',
        'Fixer correctement les faisceaux et les connecteurs après réparation.',
        'Ranger le multimètre et les outils.'
    ],
    pointsCles: [
        'Utilisation rigoureuse du schéma électrique comme guide.',
        'Application d\'une méthode de diagnostic logique (ex: point-milieu).',
        'Différencier une panne d\'alimentation, de commande ou de masse.',
        'La validation par le calcul (Loi d\'Ohm) permet de confirmer une mesure.'
    ],
    validationRequise: true,
  };

export default tp;
