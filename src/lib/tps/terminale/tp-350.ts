
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 350,
    duree: '2h00',
    titre: 'Diagnostic d\'un réseau multiplexé (CAN BUS)',
    niveau: 'terminale',
    situation: 'Un véhicule présente de multiples défauts incohérents (vitres électriques, ABS, injection). Le chef d\'atelier suspecte un problème sur le réseau CAN BUS et vous demande de le diagnostiquer.',
    objectif: 'Analyser la trame CAN, identifier les défauts physiques (court-circuit, circuit ouvert) et valider la communication entre calculateurs. (Compétence C3.3)',
    materiel: ['Oscilloscope', 'Multimètre', 'Sondes adaptées', 'Schéma du réseau multiplexé'],
    etudePrelim: [
        { type: 'text', q: 'Quelles sont les deux tensions nominales que l\'on doit mesurer sur les lignes CAN H et CAN L au repos (contact mis) ?', r: 'Environ 2.5V sur chaque ligne (CAN H légèrement au-dessus, CAN L légèrement en-dessous).' },
        { type: 'text', q: 'Qu\'est-ce qu\'une résistance de terminaison et quelle est sa valeur typique sur un réseau CAN ? Pourquoi est-elle cruciale ?', r: 'C\'est une résistance de 120 Ω placée à chaque extrémité du réseau pour éviter la réflexion des signaux. La résistance totale mesurée sur le bus doit être de 60 Ω. Sans elle, la communication est impossible.' },
        { type: 'qcm', q: 'À l\'oscilloscope, les signaux de CAN H et CAN L doivent être :', options: ['Identiques et superposés', 'En parfaite opposition de phase (miroir)', 'Décalés dans le temps'], r: 'En parfaite opposition de phase (miroir)' }
    ],
    activitePratique: [
        {
            titre: 'Contrôles Électriques Statiques',
            duree: '45 min',
            etapes: [
                'Contact coupé, mesurer la résistance entre CAN H et CAN L sur la prise OBD (doit être ~60 Ω).',
                'Mesurer la résistance entre chaque ligne CAN et la masse (doit être infinie).',
                'Contact mis, mesurer les tensions de repos sur CAN H et CAN L (~2.5V).'
            ]
        },
        {
            titre: 'Analyse Dynamique à l\'Oscilloscope',
            duree: '45 min',
            etapes: [
                'Brancher l\'oscilloscope sur CAN H et CAN L.',
                'Démarrer le moteur ou activer des systèmes pour générer du trafic sur le bus.',
                'Observer la forme des trames : signaux carrés, en miroir, sans parasites.',
                'Vérifier les niveaux de tension en mode dominant (CAN H ~3.5V, CAN L ~1.5V).'
            ]
        },
        {
            titre: 'Diagnostic et Conclusion',
            duree: '20 min',
            etapes: [
                'À partir des mesures, déterminer si le défaut est un court-circuit, un circuit ouvert ou un problème sur un calculateur.',
                'Rédiger une conclusion claire sur l\'état du réseau CAN BUS.'
            ]
        }
    ],
    securiteRangement: [
        'Utiliser des sondes adaptées pour ne pas endommager les connecteurs.',
        'Sauvegarder les captures d\'écran de l\'oscilloscope pour le rapport.',
        'Ranger l\'oscilloscope et ses sondes avec soin.'
    ],
    pointsCles: [
        'La résistance de terminaison de 60 Ω est le premier test clé.',
        'Les tensions de repos à 2.5V indiquent que le bus est sain.',
        'L\'oscilloscope est l\'outil indispensable pour voir la qualité réelle de la communication.'
    ],
    validationRequise: false,
};

export default tp;
