
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 503,
    duree: '45 min',
    titre: "Remplacement des Balais d'Essuie-Glace",
    niveau: 'cap1',
    situation: "Un client se plaint d'une mauvaise visibilité sous la pluie, avec des traces laissées par les essuie-glaces. Un remplacement est nécessaire.",
    objectif: 'Réaliser le remplacement des balais d’essuie-glace et conseiller le client. (Compétences C1.1, C1.3)',
    materiel: ['Jeu de balais neufs', 'Chiffon', 'Produit de nettoyage vitre'],
    etudePrelim: [
        { type: 'text', q: 'Quelle précaution simple mais essentielle faut-il prendre pour protéger le pare-brise lors du remplacement des balais ?', r: 'Placer un carton ou un chiffon épais sur le pare-brise pour éviter qu\'il ne soit frappé par le bras métallique si celui-ci se rabat.' },
        { type: 'text', q: 'Citez deux signes qui indiquent qu\'un balai d\'essuie-glace est usé.', r: 'Il laisse des traces sur le pare-brise, il fait du bruit (saccades), la lame en caoutchouc est craquelée ou déchirée.' }
    ],
    activitePratique: [
        { titre: 'Contrôle et Diagnostic', duree: '15 min', etapes: ['Inspecter visuellement les balais existants (fissures, déformations).', 'Tester le fonctionnement et observer les traces sur le pare-brise.', 'Nettoyer le pare-brise pour éliminer les impuretés.']},
        { titre: 'Remplacement des Balais', duree: '20 min', etapes: ['Protéger le pare-brise avec un carton pour éviter les impacts.', 'Déposer les anciens balais en identifiant le type de fixation (clip, crochet).', 'Installer les nouveaux balais en s\'assurant du verrouillage correct.']},
        { titre: 'Validation et Conseil', duree: '10 min', etapes: ['Tester le balayage avec du liquide lave-glace.', 'Vérifier l\'absence de bruit et de trace.', 'Conseiller le client sur l\'entretien (nettoyage régulier des lames).']}
    ],
    securiteRangement: [
        'Protéger le pare-brise pendant l\'intervention',
        'S\'assurer du bon clipsage des nouveaux balais',
        'Jeter les anciens balais dans le bac approprié'
    ],
    pointsCles: [
        'Bonne identification du type de fixation',
        'Protection du pare-brise',
        'Test fonctionnel après remplacement'
    ],
    validationRequise: false,
};

export default tp;
