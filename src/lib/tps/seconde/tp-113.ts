
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 113,
    duree: '2h00',
    titre: 'BAC PRO Seconde • Remplacement Plaquettes et Disques de Frein Avant',
    situation: 'Un client se plaint d\'un bruit strident et de vibrations au volant lors du freinage. Après contrôle, vous constatez que les plaquettes et les disques avant sont usés au-delà de la cote minimale et doivent être remplacés.',
    objectif: 'Effectuer le remplacement des plaquettes et disques de frein avant en respectant les procédures de sécurité et de nettoyage, et réaliser le rodage. (Compétences C1.2, C1.3, C1.4)',
    materiel: ['Jeu de plaquettes neuves', 'Jeu de disques neufs', 'Repousse-piston', 'Nettoyant frein', 'Graisse au cuivre', 'Clé dynamométrique', 'Pied à coulisse'],
    etudePrelim: [
        { type: 'qcm', q: 'Quelle est la première action à réaliser avant de repousser le piston de l\'étrier ?', options: ['Ouvrir le bocal de liquide de frein', 'Frapper sur l\'étrier', 'Purger le circuit'], r: 'Ouvrir le bocal de liquide de frein' },
        { type: 'text', q: 'Pourquoi est-il crucial de nettoyer parfaitement la surface du moyeu avant de monter un disque de frein neuf ?', r: 'Pour assurer que le disque soit parfaitement plan. La moindre saleté ou rouille peut induire un faux voile qui provoquera des vibrations au freinage.' },
        { type: 'qcm', q: 'À quoi sert le témoin d\'usure des plaquettes ?', options: ['À faire un bruit strident par contact métallique', 'À allumer un voyant au tableau de bord', 'Les deux sont possibles selon le système'], r: 'Les deux sont possibles selon le système' },
        { type: 'text', q: 'Expliquez pourquoi il est impératif de ne jamais réutiliser les vis de fixation de l\'étrier après leur démontage sur certains modèles.', r: 'Car ce sont souvent des vis pré-enduites de frein-filet ou des vis conçues pour un serrage angulaire qui se déforment et ne garantissent plus le couple de serrage requis si elles sont réutilisées.' },
        { type: 'text', q: 'Quelle est la consigne principale à donner au client après un remplacement des freins ?', r: 'Effectuer un rodage sur environ 200 km, en évitant les freinages brusques et prolongés, pour permettre aux plaquettes de s\'adapter à la surface du disque et garantir une efficacité maximale.' }
    ],
    activitePratique: [
        etape('Préparation et Dépose', '40 min', [
            'Lever et sécuriser le véhicule, puis déposer la roue.',
            'Nettoyer la zone de travail avec du nettoyant frein.',
            'Ouvrir le bocal de liquide de frein.',
            'Déposer l\'étrier de frein et le suspendre pour ne pas abîmer le flexible.',
            'Retirer les anciennes plaquettes et le disque de frein.'
        ]),
        etape('Contrôle et Nettoyage', '30 min', [
            'Nettoyer et inspecter le moyeu de roue, éliminer toute trace de rouille ou d\'impureté.',
            'Nettoyer et contrôler l\'étrier, notamment l\'état du soufflet de piston et des colonnettes.',
            'Repousser doucement le piston d\'étrier à l\'aide de l\'outil adéquat.'
        ]),
        etape('Remontage des Éléments Neufs', '30 min', [
            'Dégraisser le disque neuf et l\'installer sur le moyeu.',
            'Lubrifier légèrement les points de contact des nouvelles plaquettes (pas la garniture !).',
            'Installer les plaquettes neuves dans l\'étrier.',
            'Remonter l\'étrier et serrer les vis de fixation au couple préconisé.'
        ]),
        etape('Finalisation et Validation', '20 min', [
            'Remonter la roue et la serrer au couple.',
            'Pomper plusieurs fois sur la pédale de frein pour rapprocher les plaquettes du disque.',
            'Vérifier le niveau de liquide de frein et le compléter si besoin.',
            'Effectuer un court essai routier pour valider l\'absence de bruit anormal.'
        ])
    ],
    securiteRangement: [
        'Toujours suspendre l\'étrier, ne jamais le laisser pendre par son flexible.',
        'Utiliser des gants et des lunettes de protection (poussière de frein et nettoyant).',
        'Respecter impérativement les couples de serrage pour les roues et les étriers.',
        'Manipuler le liquide de frein avec précaution (corrosif).'
    ],
    pointsCles: [
        'Propreté absolue du moyeu avant montage du disque neuf.',
        'Contrôle des colonnettes de l\'étrier pour un mouvement libre.',
        'Ne pas oublier de pomper sur la pédale de frein avant de rendre le véhicule.',
        'Informer le client de la nécessité de la période de rodage.'
    ],
    ressources: [
        '[VIDÉO] Tutoriel complet : Remplacer disques et plaquettes - https://www.youtube.com/watch?v=example1',
        '[PDF] Schéma éclaté d\'un étrier de frein flottant - /docs/etrier-flottant.pdf',
        '[TEXTE] Procédure de rodage des freins neufs - /docs/rodage-freins.txt'
    ],
    validationRequise: false,
};

export default tp;
