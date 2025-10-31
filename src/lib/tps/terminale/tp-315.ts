
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 315,
    duree: '2h30',
    titre: 'F 307 • Diagnostic du système ABS (contrôle des éléments)',
    situation: 'Le témoin ABS est allumé. Le client signale une sensation étrange à la pédale. Vous devez mener un diagnostic complet pour assurer la sécurité du système de freinage antiblocage.',
    objectif: 'Identifier défauts par codes, mesures et tests actionneurs. (Compétences C3.2, C3.4)',
    materiel: ['Valise ABS', 'Multimètre', 'Oscillo', 'Banc freinage'],
    etudePrelim: [
      { q: 'Quel est le rôle des capteurs de roue dans le système ABS ?', r: 'Ils mesurent la vitesse de rotation de chaque roue en temps réel et transmettent cette information au calculateur ABS pour qu\'il détecte tout début de blocage.', type: 'text' },
      { q: 'Quelle est la différence de signal entre un capteur ABS passif (inductif) et actif (magnéto-résistif ou à effet Hall) ?', r: 'Passif: génère un signal sinusoïdal dont la fréquence et l\'amplitude varient avec la vitesse. Actif: génère un signal carré de tension constante, dont seule la fréquence varie.', type: 'text' },
      { q: 'Que se passe-t-il lors de l\'auto-test du système ABS au démarrage (vers 15-20 km/h) ?', r: 'Le calculateur active brièvement la pompe hydraulique et les électrovannes pour vérifier leur fonctionnement, ce qui peut causer un bruit et une vibration perceptibles.', type: 'text' }
    ],
    activitePratique: [
      etape('Codes/figées', '25 min', [
        'Lire codes ABS/ESP.',
        'Analyser données figées.',
        'Effacement et re-test.'
      ]),
      etape('Capteurs', '50 min', [
        'Résistances et jeux capteur/couronne.',
        'Signal en rotation (oscillo).',
        'Continuité faisceaux.'
      ]),
      etape('Hydraulique', '40 min', [
        'Activer électrovannes.',
        'Tester moteur pompe.',
        'Mesurer alim relais.'
      ]),
      etape('Validation', '35 min', [
        'Essai ou banc.',
        'Vérifier voyant.',
        'Tracer résultats.'
      ])
    ],
    securiteRangement: ['Roues calées', 'Électricité sécurisée', 'Tracer'],
    pointsCles: ['Capteurs cohérents', 'Actionneurs OK', 'Voyant OFF'],
    validationRequise: false,
  };

export default tp;
