
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 315,
    duree: '2h30',
    titre: 'Diagnostic du système ABS (contrôle des éléments)',
    niveau: 'terminale',
    situation: 'Le témoin ABS est allumé. Le client signale une sensation étrange à la pédale. Vous devez mener un diagnostic complet pour assurer la sécurité du système de freinage antiblocage.',
    objectif: 'Identifier défauts par codes, mesures et tests actionneurs. (Compétences C3.2, C3.4)',
    materiel: ['Valise ABS', 'Multimètre', 'Oscillo', 'Banc freinage'],
    etudePrelim: [
      { q: 'Quel est le rôle des capteurs de roue dans le système ABS ?', r: 'Ils mesurent la vitesse de rotation de chaque roue en temps réel et transmettent cette information au calculateur ABS pour qu\'il détecte tout début de blocage.', type: 'text' },
      { q: 'Quelle est la différence de signal entre un capteur ABS passif (inductif) et actif (magnéto-résistif ou à effet Hall) ?', r: 'Passif: génère un signal sinusoïdal dont la fréquence et l\'amplitude varient avec la vitesse. Actif: génère un signal carré de tension constante, dont seule la fréquence varie.', type: 'text' },
      { q: 'Que se passe-t-il lors de l\'auto-test du système ABS au démarrage (vers 15-20 km/h) ?', r: 'Le calculateur active brièvement la pompe hydraulique et les électrovannes pour vérifier leur fonctionnement, ce qui peut causer un bruit et une vibration perceptibles.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Codes/figées',
        duree: '25 min',
        etapes: [
          'Lire codes ABS/ESP.',
          'Analyser données figées.',
          'Effacement et re-test.'
        ]
      },
      {
        titre: 'Capteurs',
        duree: '50 min',
        etapes: [
          'Résistances et jeux capteur/couronne.',
          'Signal en rotation (oscillo).',
          'Continuité faisceaux.'
        ]
      },
      {
        titre: 'Hydraulique',
        duree: '40 min',
        etapes: [
          'Activer électrovannes.',
          'Tester moteur pompe.',
          'Mesurer alim relais.'
        ]
      },
      {
        titre: 'Validation',
        duree: '35 min',
        etapes: [
          'Essai ou banc.',
          'Vérifier voyant.',
          'Tracer résultats.'
        ]
      }
    ],
    securiteRangement: ['Roues calées', 'Électricité sécurisée', 'Tracer'],
    pointsCles: ['Capteurs cohérents', 'Actionneurs OK', 'Voyant OFF'],
    validationRequise: false,
  };

export default tp;
