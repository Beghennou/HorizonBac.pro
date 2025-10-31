
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 102,
    duree: '1h30',
    titre: 'Levage d\'un Véhicule en Sécurité',
    situation: 'Un client dépose sa berline pour une inspection du soubassement. Vous devez lever le véhicule en utilisant un cric rouleur et des chandelles pour permettre une intervention en toute sécurité.',
    objectif: 'Maîtriser la procédure de levage sécurisé pour permettre une intervention sous le véhicule en respectant les points de levage constructeur. (Compétence C1.1)',
    materiel: ['Cric rouleur hydraulique', 'Paire de chandelles (capacité adaptée)', 'Cales de roues', 'Documentation technique (points de levage)', 'Clé de roue'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi est-il interdit de travailler sous un véhicule qui n\'est supporté que par un cric ?', r: 'Un cric est un appareil de levage, pas de support. Son système hydraulique peut céder, provoquant la chute du véhicule.' },
        { type: 'qcm', q: 'Quelle est la première action à effectuer avant même de positionner le cric ?', options: ['Desserrer les écrous de roue', 'Caler les roues qui restent au sol et serrer le frein à main', 'Ouvrir le capot'], r: 'Caler les roues qui restent au sol et serrer le frein à main' }
    ],
    activitePratique: [
        etape('Préparation et contrôles préalables', '20 min', [
            'Consulter la documentation technique pour identifier les points de levage constructeur spécifiques au modèle.',
            'Positionner le véhicule sur une surface plane, stable et dégagée.',
            'Placer les cales sur les roues qui resteront au sol (roues opposées au levage).',
            'Serrer fermement le frein à main et mettre la boîte de vitesse au point mort.',
            'Vérifier l\'état et la capacité du cric rouleur et des chandelles.'
        ]),
        etape('Opération de levage et calage sécurisé', '40 min', [
            'Positionner le cric rouleur exactement sur le point de levage préconisé par le constructeur.',
            'Lever le véhicule progressivement jusqu\'à la hauteur de travail souhaitée.',
            'Placer les chandelles aux emplacements de sécurité spécifiés dans la documentation.',
            'Descendre très doucement le véhicule pour qu\'il repose entièrement sur les chandelles.',
            'Vérifier impérativement la stabilité du véhicule en le secouant légèrement.',
            'Le cric doit rester en place comme sécurité supplémentaire, sans supporter le poids.'
        ]),
        etape('Procédure de descente sécurisée', '20 min', [
            'Remonter légèrement le véhicule avec le cric pour libérer totalement les chandelles.',
            'Retirer les chandelles une à une en s\'assurant qu\'aucune personne n\'est sous le véhicule.',
            'Descendre le véhicule très progressivement en contrôlant constamment la vitesse.',
            'Retirer le cric uniquement lorsque le véhicule repose complètement sur ses roues.',
            'Retirer les cales de roues et ranger tout le matériel.'
        ]),
        etape('Finalisation et rangement', '10 min', [
            'Ranger le cric rouleur et les chandelles à leur emplacement dédié.',
            'Nettoyer la zone de travail de tout résidu ou éclaboussure.',
            'Consigner l\'intervention sur la fiche de suivi si nécessaire.',
            'Vérifier que le véhicule est correctement positionné pour la suite des opérations.'
        ])
    ],
    securiteRangement: [
        'Ne jamais, sous aucun prétexte, travailler sous un véhicule uniquement sur cric',
        'Vérifier impérativement la stabilité avant toute intervention sous le véhicule',
        'Respecter scrupuleusement les points de levage indiqués par le constructeur',
        'Utiliser exclusivement des chandelles à capacité suffisante et en bon état'
    ],
    pointsCles: [
        'Points de levage constructeur respectés à la lettre',
        'Stabilité du véhicule vérifiée avant intervention',
        'Usage obligatoire des chandelles comme sécurité principale',
        'Procédure de sécurité appliquée rigoureusement'
    ],
    validationRequise: false,
};

export default tp;
