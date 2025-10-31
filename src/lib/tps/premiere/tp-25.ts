import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 25,
    duree:'2h30',
    titre:'Remplacement commande d\'embrayage hydraulique',
    niveau: 'premiere',
    situation:'La pédale d\'embrayage est molle et reste parfois au plancher. Une fuite est détectée sur le circuit hydraulique (émetteur ou récepteur).',
    objectif:'Remplacer l’organe défectueux et purger correctement. (Compétence C2.2)',
    materiel:['Émetteur ou récepteur d\'embrayage', 'Liquide de frein DOT 4', 'Appareil de purge', 'Clés à tuyauter'],
    etudePrelim:[
        { type: 'text', q: "Analyse de panne : La fuite est visible sur le récepteur, près de la boîte de vitesses. Quelle est la conséquence si le liquide de frein coule sur le disque d'embrayage ?", r: 'Le liquide contamine la garniture du disque, qui va patiner. L\'embrayage est alors à remplacer, même s\'il n\'est pas usé.' },
        { type: 'qcm', q: "Vous remplacez l'émetteur, mais la pédale reste molle après la purge. Quelle est la prochaine étape logique de votre diagnostic ?", options: ["Changer le liquide de frein", "Vérifier le récepteur et les canalisations, car il y a peut-être une autre fuite ou de l'air coincé", "Régler la garde de la pédale"], r: "Vérifier le récepteur et les canalisations, car il y a peut-être une autre fuite ou de l'air coincé" },
        { type: 'text', q: "Réflexion : Pourquoi utilise-t-on du liquide de frein pour une commande d'embrayage hydraulique et non de l'huile ?", r: 'Parce que le liquide de frein est incompressible, résiste à l\'ébullition et n\'endommage pas les joints en caoutchouc du circuit, contrairement à une huile minérale.' }
    ],
    activitePratique:[
        { titre: 'Dépose de l\'Organe Défectueux', duree: '40 min', etapes: ['Aspirer le liquide du bocal.','Débrancher les durites et les fixations.','Extraire l\'émetteur (côté pédalier) ou le récepteur (sur la boîte).']},
        { titre: 'Repose et Purge du Circuit', duree: '60 min', etapes: ['Monter l\'élément neuf.','Remplir avec du liquide de frein DOT 4 neuf.','Purger le circuit jusqu\'à disparition complète des bulles d\'air.']},
        { titre: 'Validation de l\'Intervention', duree: '10 min', etapes: ['Vérifier que la course de la pédale est normale.','Contrôler que les vitesses passent bien à l\'arrêt.','Documenter l\'intervention.']}
    ],
    securiteRangement:['Liquide de frein corrosif (protéger la peinture)','Nettoyage immédiat de toute projection','Élimination des déchets selon les normes environnementales'],
    pointsCles:['Purge complète du circuit','Absence totale de fuites','Course de pédale validée'],
    validationRequise: false,
};

export default tp;
