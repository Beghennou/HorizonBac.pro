
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 126,
    duree: '1h00',
    titre: 'Lecture de Schémas Électriques',
    niveau: 'seconde',
    situation: 'Pour pouvoir diagnostiquer efficacement les pannes électriques, il est indispensable de savoir lire et interpréter un schéma électrique automobile.',
    objectif: 'Identifier les composants, suivre un circuit et comprendre la logique d\'alimentation sur un schéma électrique simple. (Compétence C2.1)',
    materiel: ['Recueil de schémas électriques (papier ou numérique)', 'Légende des symboles', 'Surligneurs de différentes couleurs'],
    etudePrelim: [
        { type: 'text', q: 'Que représente le symbole "30" sur un schéma électrique normalisé ?', r: 'Il représente le +12V permanent, directement issu de la batterie.' },
        { type: 'text', q: 'Que représente le symbole "15" ?', r: 'Il représente le +12V après contact (+APC), disponible uniquement lorsque la clé est en position contact.' },
        { type: 'text', q: 'À quoi sert un relais ?', r: 'C\'est un interrupteur commandé électriquement. Il permet à un petit courant (circuit de commande) de piloter un circuit de forte puissance (circuit de puissance).' }
    ],
    activitePratique: [
        {
            titre: 'Identification des Symboles',
            duree: '20 min',
            etapes: [
                'À l\'aide de la légende, identifier 10 symboles courants sur un schéma (moteur, ampoule, fusible, relais, interrupteur, masse...).',
                'Repérer les numéros de fils et les couleurs.',
                'Identifier les points de masse du circuit.'
            ]
        },
        {
            titre: 'Suivi d\'un Circuit Simple (ex: klaxon)',
            duree: '25 min',
            etapes: [
                'Avec un surligneur, suivre le chemin du courant depuis la batterie.',
                'Identifier le fusible qui protège le circuit.',
                'Identifier le composant de commande (le contacteur du volant).',
                'Suivre le circuit jusqu\'au récepteur (le klaxon).',
                'Repérer le retour à la masse.'
            ]
        },
        {
            titre: 'Analyse d\'un Circuit avec Relais (ex: feux de route)',
            duree: '15 min',
            etapes: [
                'Identifier le circuit de commande du relais (venant du commodo).',
                'Identifier le circuit de puissance qui alimente les ampoules.',
                'Expliquer pourquoi un relais est nécessaire dans ce cas.'
            ]
        }
    ],
    securiteRangement: [
        'Toujours commencer la lecture d\'un schéma par la source d\'alimentation.',
        'Utiliser des couleurs pour différencier les circuits (alimentation, commande, masse...).',
        'Le schéma est la carte du circuit, il est indispensable avant toute mesure électrique.'
    ],
    pointsCles: [
        'Connaissance des symboles normalisés.',
        'Capacité à suivre un fil d\'un point A à un point B.',
        'Compréhension du principe de fonctionnement d\'un relais.'
    ],
    validationRequise: false,
};

export default tp;
