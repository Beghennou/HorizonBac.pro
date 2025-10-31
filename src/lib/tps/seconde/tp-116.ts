
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 116,
    duree: '1h30',
    titre: 'Remplacement d\'un Pneumatique sur Jante',
    niveau: 'seconde',
    situation: 'Suite à une crevaison non réparable, vous devez déposer un pneu usagé de sa jante, monter un pneu neuf, l\'équilibrer et le remonter sur le véhicule du client.',
    objectif: 'Maîtriser la chaîne complète du remplacement d\'un pneumatique : démontage, montage, équilibrage et remontage sur véhicule. (Compétences C1.3, C1.1)',
    materiel: ['Démonte-pneu', 'Équilibreuse', 'Masses d\'équilibrage', 'Valve neuve', 'Graisse à pneu', 'Clé dynamométrique'],
    etudePrelim: [
        { type: 'text', q: 'Quelles sont les trois informations essentielles à vérifier sur un pneu neuf pour s\'assurer qu\'il est compatible avec la jante et le véhicule ?', r: '1. Les dimensions (ex: 205/55 R16). 2. L\'indice de charge (ex: 91). 3. L\'indice de vitesse (ex: V). Ces informations doivent être égales ou supérieures aux préconisations constructeur.' },
        { type: 'text', q: 'Pourquoi doit-on systématiquement remplacer la valve (ou son mécanisme interne pour les valves électroniques) lors d\'un changement de pneu ?', r: 'La valve assure l\'étanchéité. Elle vieillit et se craquelle avec le temps et les contraintes. La remplacer est une sécurité peu coûteuse pour éviter les fuites lentes.' },
        { type: 'qcm', q: 'Qu\'est-ce que l\'équilibrage et pourquoi est-il indispensable ?', options: ['C\'est pour rendre le pneu plus rond', 'C\'est pour compenser les défauts de parallélisme', 'C\'est pour répartir uniformément la masse de la roue et éviter les vibrations à haute vitesse'], r: 'C\'est pour répartir uniformément la masse de la roue et éviter les vibrations à haute vitesse' },
        { type: 'text', q: 'Certains pneus ont un sens de rotation ou un côté extérieur ("Outside"). Quelle est la consequence si l\'on ne respecte pas ces indications au montage ?', r: 'Le pneu ne pourra pas évacuer l\'eau correctement (risque d\'aquaplaning) et ses performances en termes d\'adhérence et de bruit seront dégradées. Le montage sera non conforme et dangereux.' },
        { type: 'text', q: 'Quelle est la pression de "claquage" généralement utilisée pour coller les talons du pneu sur les rebords de la jante, et quelle précaution prendre ?', r: 'Environ 3 à 3.5 bars. Il faut se tenir à distance de la roue pendant cette opération et ne jamais dépasser cette pression pour éviter un éclatement.' }
    ],
    activitePratique: [
        {
            titre: 'Préparation et Démontage',
            duree: '25 min',
            etapes: [
                'Déposer la roue du véhicule et la dégonfler complètement en retirant l\'obus de valve.',
                'Placer la roue sur le démonte-pneu et décoller les deux talons du pneu de la jante.',
                'À l\'aide du levier et de la tête de démontage, extraire le pneu de la jante en protégeant celle-ci.'
            ]
        },
        {
            titre: 'Nettoyage et Montage',
            duree: '30 min',
            etapes: [
                'Nettoyer les portées de la jante où le pneu vient faire l\'étanchéité.',
                'Installer une valve neuve.',
                'Lubrifier les talons du pneu neuf avec de la graisse à pneu.',
                'Monter le pneu sur la jante en respectant le sens de rotation ou le côté "Outside" si applicable.'
            ]
        },
        {
            titre: 'Gonflage et Équilibrage',
            duree: '25 min',
            etapes: [
                'Gonfler le pneu jusqu\'au "claquage" des talons (environ 3.5 bars) puis ajuster à la pression d\'utilisation.',
                'Monter la roue sur l\'équilibreuse, entrer les paramètres de la jante.',
                'Lancer la mesure et poser les masses d\'équilibrage aux endroits indiqués par la machine.',
                'Relancer une mesure de contrôle qui doit indiquer "0" ou "OK".'
            ]
        },
        {
            titre: 'Remontage et Contrôle Final',
            duree: '10 min',
            etapes: [
                'Remonter la roue sur le véhicule.',
                'Serrer les écrous en étoile et au couple préconisé avec la clé dynamométrique.',
                'Vérifier la pression une dernière fois.'
            ]
        }
    ],
    securiteRangement: [
        'Porter des lunettes de protection pendant toutes les opérations.',
        'Ne jamais placer ses mains entre le pneu et la jante lors de l\'utilisation de la machine.',
        'Rester à distance de la roue pendant le gonflage de "claquage".',
        'Recycler l\'ancien pneu et les masses d\'équilibrage usagées.'
    ],
    pointsCles: [
        'Respect du sens de montage du pneu.',
        'Remplacement systématique de la valve.',
        'Équilibrage précis jusqu\'à obtenir un résultat nul.',
        'Serrage final de la roue au couple dynamométrique.'
    ],
    validationRequise: false,
};

export default tp;
