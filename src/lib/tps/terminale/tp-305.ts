
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 305,
    duree: '2h00',
    titre: 'CA 311 • Phares au xénon',
    situation: 'Un client se plaint d\'un éclairage faible sur son véhicule équipé de phares au xénon. De plus, le faisceau semble trop bas. Vous devez diagnostiquer le système haute tension et le correcteur d\'assiette automatique.',
    objectif: 'Contrôler ballasts, ampoules, correcteur auto et réglage faisceau. (Compétences C3.2, C3.3)',
    materiel: ['Valise diag', 'Régloscope', 'EPIs diélectriques'],
    etudePrelim: [
      { q: 'Quelle est la tension d\'amorçage d\'une ampoule au xénon et pourquoi est-elle si dangereuse ?', r: 'Environ 20 000 Volts. C\'est une tension mortelle qui nécessite des gants et des précautions d\'isolation.', type: 'text' },
      { q: 'Quel est le rôle du ballast ?', r: 'Il transforme le 12V du véhicule en haute tension pour l\'amorçage, puis régule le courant pour maintenir l\'arc lumineux.', type: 'text' },
      { q: 'Pourquoi le correcteur d\'assiette automatique est-il obligatoire avec les phares au xénon ?', r: 'Pour ajuster en temps réel la hauteur du faisceau en fonction de la charge du véhicule et éviter d\'éblouir les autres usagers.', type: 'text' }
    ],
    activitePratique: [
      etape('Sécurité/diag', '30 min', [
        'Batterie coupée avant ballast.',
        'Lire défauts xénon.',
        'Inspecter ampoules et câbles HT.'
      ]),
      etape('Contrôles', '40 min', [
        'Alim 12 V ballast OK.',
        'Test correcteur auto.',
        'Absence arc parasite.'
      ]),
      etape('Réglage', '20 min', [
        'Régloscope à 10 m.',
        'Ajuster hauteur/orientation.',
        'Valider coupure nette.'
      ])
    ],
    securiteRangement: ['Jamais manipuler sous tension', 'Élimination spécifique ampoules', 'Tracer réglage'],
    pointsCles: ['HT danger', 'Correcteur OK', 'Réglage anti-éblouissement'],
    validationRequise: false,
  };

export default tp;
