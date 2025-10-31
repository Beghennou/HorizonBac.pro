
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 115,
    duree: '2h30',
    titre: 'BAC PRO Seconde • Entretien des Freins Arrière à Tambours',
    situation: 'Un client amène sa citadine pour un entretien. Le carnet préconise un contrôle et un nettoyage des freins à tambour arrière. Le client se plaint également d\'une faible efficacité du frein à main.',
    objectif: 'Déposer, contrôler, nettoyer et régler un système de freinage à tambours, y compris le mécanisme de rattrapage de jeu automatique. (Compétences C1.2, C1.3)',
    materiel: ['Kit de freins arrière neuf (si nécessaire)', 'Nettoyant frein', 'Graisse haute température', 'Pince à ressorts de frein', 'Clé dynamométrique'],
    etudePrelim: [
        { type: 'text', q: 'Quelle est la précaution essentielle à prendre lors du nettoyage de l\'intérieur d\'un tambour de frein et pourquoi ?', r: 'Porter un masque de protection respiratoire. Les poussières de frein sont très nocives et ne doivent pas être inhalées. Utiliser un nettoyant frein pour humidifier la poussière et éviter sa dispersion.' },
        { type: 'text', q: 'À quoi sert le mécanisme de rattrapage de jeu automatique ? Comment fonctionne-t-il brièvement ?', r: 'Il sert à maintenir une distance constante entre les mâchoires et le tambour à mesure que les garnitures s\'usent. Il est souvent activé par l\'action du frein à main, via une molette crantée.' },
        { type: 'qcm', q: 'Un cylindre de roue fuit. Quelle est la conséquence directe sur le freinage ?', options: ['Le freinage sera plus efficace', 'Le liquide de frein va contaminer les garnitures, rendant le freinage inefficace', 'Aucune conséquence immédiate'], r: 'Le liquide de frein va contaminer les garnitures, rendant le freinage inefficace' },
        { type: 'text', q: 'Pourquoi est-il conseillé de remplacer le kit de frein (mâchoires et cylindres) en entier plutôt qu\'une seule mâchoire ?', r: 'Pour garantir un freinage équilibré entre la gauche et la droite. Remplacer les deux côtés assure une usure et une efficacité symétriques, ce qui est crucial pour la sécurité.' },
        { type: 'text', q: 'Comment s\'appelle l\'effet qui fait qu\'une mâchoire "s\'auto-serre" contre le tambour en rotation, et laquelle des deux mâchoires en bénéficie ?', r: 'C\'est l\'effet "servo" ou auto-énergisant. C\'est la mâchoire primaire (celle qui est "attaquée" par la rotation du tambour) qui en bénéficie.' }
    ],
    activitePratique: [
        etape('Préparation et Dépose du Tambour', '30 min', [
            'Lever et sécuriser le véhicule, déposer la roue.',
            'S\'assurer que le frein à main est complètement desserré.',
            'Déposer la vis de fixation du tambour (si présente).',
            'Extraire le tambour. S\'il est bloqué, utiliser les trous taraudés pour l\'extraire ou détendre le rattrapage de jeu par l\'arrière.'
        ]),
        etape('Nettoyage et Contrôle des Composants', '50 min', [
            'Dépoussiérer l\'ensemble avec du nettoyant frein (porter un masque).',
            'Inspecter l\'épaisseur des garnitures des mâchoires.',
            'Vérifier l\'absence de fuite au niveau du cylindre de roue en soulevant les caches-poussière.',
            'Contrôler l\'état des ressorts de rappel et du mécanisme de rattrapage de jeu.',
            'Mesurer le diamètre interne du tambour pour vérifier s\'il est dans la cote d\'usure maximale.'
        ]),
        etape('Remplacement du Kit de Frein (si nécessaire)', '45 min', [
            'À l\'aide des pinces spécifiques, déposer les ressorts et les mâchoires usées.',
            'Déconnecter et remplacer le cylindre de roue.',
            'Monter le nouveau kit en respectant la position de chaque mâchoire (primaire/secondaire).',
            'Pré-régler le mécanisme de rattrapage de jeu.'
        ]),
        etape('Remontage, Réglage et Validation', '25 min', [
            'Remonter le tambour. Il doit lécher légèrement les garnitures ("léchage").',
            'Actionner plusieurs fois la pédale de frein et le frein à main pour activer le rattrapage automatique.',
            'Régler la tension du câble de frein à main.',
            'Remonter la roue et valider l\'absence de frottement excessif.'
        ])
    ],
    securiteRangement: [
        'Porter un masque FFP3 lors du dépoussiérage des tambours.',
        'Utiliser les outils spécifiques pour les ressorts afin d\'éviter les blessures.',
        'Purger le circuit de freinage si les cylindres de roue ont été remplacés.',
        'Recycler les anciennes garnitures et le liquide de frein usagé.'
    ],
    pointsCles: [
        'Dépoussiérage humide pour éviter l\'inhalation.',
        'Contrôle des fuites sur les cylindres de roue.',
        'Fonctionnement et réglage du rattrapage de jeu automatique.',
        'Le "léchage" correct au remontage du tambour.'
    ],
    validationRequise: false,
};

export default tp;
