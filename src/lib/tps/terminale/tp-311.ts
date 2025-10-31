
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 311,
    duree: '2h00',
    titre: 'Diagnostic et mesures de paramètres antipollution',
    niveau: 'terminale',
    situation: 'Le véhicule a été refusé au contrôle technique pour pollution excessive. Vous devez diagnostiquer les systèmes antipollution (lambda, EGR, FAP) pour trouver la cause et valider la conformité après réparation.',
    objectif: 'Mesurer émissions et vérifier fonctionnement des organes. (Compétences C3.2, C3.3)',
    materiel: ['Analyseur 4/5 gaz', 'Opacimètre', 'Valise diag', 'Thermo IR'],
    etudePrelim: [
      { q: 'Quel est le rôle d\'un catalyseur 3 voies ? Et celui des sondes lambda amont et aval ?', r: 'Le catalyseur transforme les gaz nocifs (CO, HC, NOx) en gaz inoffensifs. La sonde amont mesure l\'oxygène pour réguler le mélange. La sonde aval vérifie l\'efficacité du catalyseur.', type: 'text' },
      { q: 'Qu\'est-ce que la régénération du FAP et pourquoi est-elle nécessaire ?', r: 'C\'est une procédure qui consiste à augmenter la température des gaz d\'échappement pour brûler les particules de suie accumulées dans le Filtre À Particules, afin d\'éviter son colmatage.', type: 'text' },
      { q: 'Quel est le risque de supprimer ou de "défapper" un véhicule ?', r: 'C\'est illégal, très polluant, et le véhicule sera systématiquement refusé au contrôle technique. Cela peut aussi entraîner des pannes moteur.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Analyse gaz',
        duree: '40 min',
        etapes: [
          'Moteur chaud.',
          'Mesures ralenti + 2500 tr/min.',
          'Comparer normes et interpréter.'
        ]
      },
      {
        titre: 'Sondes/EGR/FAP',
        duree: '45 min',
        etapes: [
          'Lambda amont oscille, aval stable.',
          'Test EGR (commande/position).',
          'Lecture taux suie FAP, ΔP, régénération forcée si besoin.'
        ]
      },
      {
        titre: 'Conclusion',
        duree: '15 min',
        etapes: [
          'Déterminer organe en cause.',
          'Préconiser réparation.',
          'Tracer.'
        ]
      }
    ],
    securiteRangement: ['Ventilation atelier', 'Précautions température', 'Archiver mesures'],
    pointsCles: ['Normes respectées', 'Lambda/EGR', 'FAP OK'],
    validationRequise: false,
  };

export default tp;
