
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 103,
    duree: '2h00',
    titre: 'BAC PRO Seconde • Utilisation d\'un Pont Élévateur 2 Colonnes',
    situation: 'Un SUV est confié à l\'atelier pour le remplacement des plaquettes de frein. L\'intervention nécessite l\'utilisation du pont élévateur à deux colonnes pour un accès optimal.',
    objectif: 'Positionner et lever un véhicule avec un pont 2 colonnes en respectant les règles de centrage et de sécurité. (Compétence C1.1)',
    materiel: ['Pont élévateur 2 colonnes', 'Patins de levage adaptés au véhicule', 'Documentation technique constructeur', 'Télécommande pont'],
    etudePrelim: [
        { type: 'text', q: 'Où se trouve généralement l\'information concernant les points de levage spécifiques d\'un véhicule ?', r: 'Dans la documentation technique du constructeur (RTA) ou parfois indiqué par un symbole sous la caisse.' },
        { type: 'text', q: 'Quelle est l\'étape la plus critique juste après avoir levé le véhicule de quelques centimètres ?', r: 'Arrêter la montée, et vérifier la stabilité et le bon positionnement des 4 patins avant de continuer à lever.' }
    ],
    activitePratique: [
        etape('Positionnement précis du véhicule', '30 min', [
            'Avancer le véhicule entre les colonnes en respectant parfaitement le centrage longitudinal.',
            'Vérifier l\'alignement avec les repères visuels du pont (lignes de guidage au sol).',
            'S\'assurer que le véhicule est en position neutre, frein à main serré fermement.',
            'Identifier les points de prise sous caisse selon la documentation technique constructeur.',
            'Vérifier la répartition des masses et l\'équilibrage du véhicule sur le pont.'
        ]),
        etape('Mise en place des bras et préparation du levage', '45 min', [
            'Consulter impérativement la RTA pour localiser les points de prise sous coque autorisés.',
            'Positionner avec précision les bras télescopiques du pont sous les points adéquats.',
            'Ajuster et orienter les patins pour obtenir une surface de contact optimale et stable.',
            'Vérifier que les bras sont symétriquement positionnés et bien verrouillés.',
            'S\'assurer que rien ne gêne la montée du véhicule (câbles, tuyaux, échappement).',
            'Effectuer un dernier contrôle visuel général avant levage.'
        ]),
        etape('Levage progressif et sécurisation', '30 min', [
            'Lever le véhicule de quelques centimètres seulement et arrêter immédiatement.',
            'Vérifier scrupuleusement la stabilité, l\'équilibre et le bon positionnement.',
            'Contrôler que les patins épousent parfaitement les surfaces de contact.',
            'Continuer le levage très progressivement jusqu\'à la hauteur de travail optimale.',
            'Enclencher impérativement la sécurité mécanique (crans de verrouillage automatique).',
            'Effectuer un test de stabilité en secouant légèrement le véhicule.'
        ]),
        etape('Vérifications finales et descente', '15 min', [
            'Vérifier une dernière fois que le véhicule ne présente aucun déséquilibre dangereux.',
            'S\'assurer que la zone sous le pont est parfaitement dégagée pour la descente.',
            'Désengager la sécurité mécanique uniquement au moment de la descente.',
            'Descendre le pont très progressivement en s\'assurant que personne ne se trouve dessous.',
            'Une fois au sol, replier soigneusement les bras du pont.',
            'Nettoyer les patins et ranger tous les accessoires à leur place.'
        ])
    ],
    securiteRangement: [
        'Vérification obligatoire de l\'état du pont avant chaque utilisation',
        'Respecter impérativement la charge maximale autorisée indiquée',
        'Toujours enclencher la sécurité mécanique pendant le travail',
        'Maintenir la zone sous le pont parfaitement dégagée pendant la descente'
    ],
    pointsCles: [
        'Centrage parfait du véhicule selon les repères',
        'Points de prise constructeur respectés scrupuleusement',
        'Sécurité mécanique obligatoirement enclenchée',
        'Stabilité vérifiée systématiquement avant intervention'
    ],
    validationRequise: false,
};

export default tp;
