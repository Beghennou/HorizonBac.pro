
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 313,
    duree: '2h00',
    titre: 'MA 306 • Contrôle des injecteurs moteur à rampe commune 1',
    situation: 'Un moteur Common Rail claque et fume. Le chef d\'atelier vous missionne pour la première phase du diagnostic injecteur : les contrôles électriques et l\'analyse des retours de fuite.',
    objectif: 'Mesurer résistances, contrôler retours et étanchéité. (Compétence C3.1)',
    materiel: ['Multimètre', 'Éprouvettes', 'Valise diag', 'Chiffons'],
    etudePrelim: [
      { q: 'Quelle est la plage de résistance typique pour une bobine d\'injecteur (piézoélectrique vs électromagnétique) ?', r: 'Électromagnétique : environ 0,2 à 0,5 Ω. Piézoélectrique : environ 150 à 200 kΩ. Une valeur hors tolérance indique un défaut interne.', type: 'text' },
      { q: 'Pourquoi un retour de fuite excessif sur un injecteur peut-il empêcher le moteur de démarrer ?', r: 'Parce que la fuite est si importante que la pompe HP ne parvient pas à faire monter la pression dans la rampe commune au niveau requis pour le démarrage.', type: 'text' },
      { q: 'Quel test simple permet de vérifier l\'isolation électrique d\'un injecteur ?', r: 'Mesurer la résistance entre chaque borne de l\'injecteur et sa masse (corps métallique). La valeur doit être infinie (OL), sinon l\'injecteur est en court-circuit.', type: 'text' }
    ],
    activitePratique: [
      etape('Tests électriques', '40 min', [
        'Résistance bobine.',
        'Isolation masse.',
        'Commande calculateur (oscillo).'
      ]),
      etape('Retours gasoil', '50 min', [
        'Éprouvettes sur retours.',
        'Ralenti 30 s, mesurer volumes.',
        'Écart >30% = injecteur en cause.'
      ]),
      etape('Fuites externes', '30 min', [
        'Joints, suintements.',
        'Serrages et tuyaux HP.',
        'Tracer.'
      ])
    ],
    securiteRangement: ['Protéger zone', 'Éliminer gasoil', 'Tracer injecteurs'],
    pointsCles: ['Retours homogènes', 'Isolation OK', 'Joints sains'],
    validationRequise: false,
  };

export default tp;
