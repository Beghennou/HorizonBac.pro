
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 312,
    duree: '2h00',
    titre: 'Utilisation d\'un oscilloscope',
    niveau: 'terminale',
    situation: 'Pour diagnostiquer des pannes électroniques complexes, la maîtrise de l\'oscilloscope est indispensable. Cet atelier vise à vous former à la capture et à l\'analyse de signaux électriques automobiles.',
    objectif: 'Paramétrer, capter et interpréter des signaux capteurs/actionneurs. (Compétence C3.3)',
    materiel: ['Oscilloscope', 'Sondes diff', 'Pince ampèremétrique', 'Schémas'],
    etudePrelim: [
      { q: 'Quelle est la différence fondamentale d\'information entre un multimètre affichant "5V" et un oscilloscope affichant un signal ?', r: 'Le multimètre donne une valeur moyenne ou efficace à un instant T. L\'oscilloscope montre l\'évolution de cette tension dans le temps, révélant sa forme, sa fréquence et d\'éventuelles anomalies (parasites).', type: 'text' },
      { q: 'À quoi servent les réglages "base de temps" et "Volts/division" ?', r: 'La base de temps (axe X) ajuste la "fenêtre" de temps visualisée. Les Volts/division (axe Y) adjustent l\'échelle de tension pour que le signal soit visible à l\'écran.', type: 'text' },
      { q: 'Quel est le rôle du "trigger" (déclenchement) ?', r: 'Il stabilise l\'affichage en démarrant la capture du signal toujours au même niveau de tension, évitant que le signal ne "défile" de manière illisible sur l\'écran.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Réglages',
        duree: '25 min',
        etapes: [
          'Signal carré interne.',
          'Ajuster temps/tension.',
          'Stabiliser trigger.'
        ]
      },
      {
        titre: 'Capteurs',
        duree: '45 min',
        etapes: [
          'PMH (inductif/Hall).',
          'Lambda amont oscillante.',
          'AAC (forme, amplitude).'
        ]
      },
      {
        titre: 'Actionneurs',
        duree: '30 min',
        etapes: [
          'Commande injecteur (temps ouverture).',
          'PWM ventilateur/EGR.',
          'Repérer anomalies.'
        ]
      },
      {
        titre: 'Interprétation',
        duree: '20 min',
        etapes: [
          'Comparer références.',
          'Identifier défauts.',
          'Sauvegarder captures.'
        ]
      }
    ],
    securiteRangement: ['Protéger sondes', 'Ne pas dépasser Vmax', 'Sauvegarder et ranger'],
    pointsCles: ['Réglages nets', 'Trigger stable', 'Lecture formes'],
    validationRequise: false,
  };

export default tp;
