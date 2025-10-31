
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 311,
    duree: '2h00',
    titre: 'BAC PRO Terminale • Diagnostic et mesures de paramètres antipollution',
    situation: 'Le véhicule a été refusé au contrôle technique pour pollution excessive. Vous devez diagnostiquer les systèmes antipollution (lambda, EGR, FAP) pour trouver la cause et valider la conformité après réparation.',
    objectif: 'Mesurer émissions et vérifier fonctionnement des organes. (Compétences C3.2, C3.3)',
    materiel: ['Analyseur 4/5 gaz', 'Opacimètre', 'Valise diag', 'Thermo IR'],
    etudePrelim: [
      { q: 'Quel est le rôle d\'un catalyseur 3 voies ? Et celui des sondes lambda amont et aval ?', r: 'Le catalyseur transforme les gaz nocifs (CO, HC, NOx) en gaz inoffensifs. La sonde amont mesure l\'oxygène pour réguler le mélange. La sonde aval vérifie l\'efficacité du catalyseur.', type: 'text' },
      { q: 'Qu\'est-ce que la régénération du FAP et pourquoi est-elle nécessaire ?', r: 'C\'est une procédure qui consiste à augmenter la température des gaz d\'échappement pour brûler les particules de suie accumulées dans le Filtre À Particules, afin d\'éviter son colmatage.', type: 'text' },
      { q: 'Quel est le risque de supprimer ou de "défapper" un véhicule ?', r: 'C\'est illégal, très polluant, et le véhicule sera systématiquement refusé au contrôle technique. Cela peut aussi entraîner des pannes moteur.', type: 'text' }
    ],
    activitePratique: [
      etape('Analyse gaz', '40 min', [
        'Moteur chaud.',
        'Mesures ralenti + 2500 tr/min.',
        'Comparer normes et interpréter.'
      ]),
      etape('Sondes/EGR/FAP', '45 min', [
        'Lambda amont oscille, aval stable.',
        'Test EGR (commande/position).',
        'Lecture taux suie FAP, ΔP, régénération forcée si besoin.'
      ]),
      etape('Conclusion', '15 min', [
        'Déterminer organe en cause.',
        'Préconiser réparation.',
        'Tracer.'
      ])
    ],
    securiteRangement: ['Ventilation atelier', 'Précautions température', 'Archiver mesures'],
    pointsCles: ['Normes respectées', 'Lambda/EGR', 'FAP OK'],
    validationRequise: false,
  };

export default tp;
