
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 319,
    duree: '2h00',
    titre: 'Contrôle des Compressions et Étanchéité Moteur',
    situation: 'Un moteur essence manque de puissance et présente un ralenti instable. Un relevé des compressions et un test d\'étanchéité sont nécessaires pour évaluer l\'état de santé du moteur.',
    objectif: 'Évaluer l\'étanchéité de la chambre de combustion pour poser un diagnostic moteur. (Compétences C1.1, C2.2, C2.3)',
    materiel: ['Véhicule essence', 'Compressiomètre', 'Contrôleur de fuite de cylindre', 'Clé à bougie', 'Documentation technique (RTA)', 'Fiche de relevé'],
    etudePrelim: [
        { type: 'text', q: 'Expliquer ce qu’est une compression moteur et comment elle est réalisée.', r: 'C\'est la pression maximale atteinte dans un cylindre lorsque le piston remonte et comprime le mélange air-carburant, avant l\'allumage. Elle est réalisée par le mouvement du piston et dépend de l\'étanchéité des segments, des soupapes et du joint de culasse.' },
        { type: 'text', q: 'Un test de compression révèle une pression faible sur le cylindre 2. Vous ajoutez un peu d\'huile et la compression remonte. Quelle est la cause la plus probable de la fuite ?', r: 'La segmentation du piston est usée. L\'huile améliore temporairement l\'étanchéité entre les segments et la paroi du cylindre.' },
        { type: 'qcm', q: 'Lors d\'un test de fuite, vous entendez un sifflement d\'air dans le collecteur d\'admission. Quel composant est en cause ?', options: ['La segmentation', 'Une soupape d\'échappement', 'Une soupape d\'admission'], r: 'Une soupape d\'admission' }
    ],
    activitePratique: [
        etape('Préparation et Identification', '25 min', [
            'Faire chauffer le moteur à sa température de fonctionnement.',
            'Identifier le type de moteur et collecter les données techniques (RTA).',
            'Désactiver l\'allumage et l\'injection pour effectuer les tests en sécurité.',
            'Déposer toutes les bougies d\'allumage.'
        ]),
        etape('Prise des Compressions', '40 min', [
            'Installer le compressiomètre sur le premier cylindre.',
            'Accélérateur ouvert à fond, actionner le démarreur pendant 5 à 7 secondes.',
            'Relever la pression maximale et la noter.',
            'Répéter l\'opération pour chaque cylindre.',
            'Comparer les valeurs entre elles (écart < 15% en général).'
        ]),
        etape('Test de Fuite des Cylindres', '40 min', [
            'Positionner le piston du cylindre à tester au Point Mort Haut (PMH), fin de compression.',
            'Raccorder le contrôleur de fuite et injecter de l\'air comprimé (environ 6-8 bars).',
            'Lire le pourcentage de fuite sur le manomètre.',
            'Écouter où l\'air s\'échappe : échappement (soupape éch.), admission (soupape adm.), carter d\'huile (segmentation), ou circuit de refroidissement (joint de culasse).'
        ]),
        etape('Conclusion et Rangement', '15 min', [
            'Synthétiser les résultats pour diagnostiquer l\'état du moteur.',
            'Remonter les bougies en respectant le couple de serrage.',
            'Ranger et nettoyer le poste de travail.'
        ])
    ],
    securiteRangement: [
        'Travailler sur un moteur chaud avec précaution.',
        'S\'assurer que les systèmes d\'allumage et d\'injection sont bien désactivés.',
        'Respecter le couple de serrage des bougies au remontage.',
        'Relâcher la pression des outils avant de les déconnecter.'
    ],
    pointsCles: [
        'L\'écart de pression entre les cylindres est plus important que la valeur absolue.',
        'Le test à l\'huile permet de discriminer une fuite par les soupapes ou par la segmentation.',
        'Le testeur de fuite permet de localiser précisément l\'origine de la perte de compression.',
        'La rigueur dans la méthode de test est essentielle pour un diagnostic fiable.'
    ],
    validationRequise: false,
  };

export default tp;
