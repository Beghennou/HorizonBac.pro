
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 316,
    duree: '2h00',
    titre: 'BAC PRO Terminale • Direction assistée électrique et hydraulique',
    situation: 'Un client se plaint d\'une direction dure par moments et de bruits au braquage. Vous devez identifier le type de direction assistée (hydraulique ou électrique) et mener le diagnostic approprié.',
    objectif: 'Identifier système, lire codes, mesurer pression/params et valider. (Compétences C3.1, C3.2)',
    materiel: ['Valise DAE', 'Mano 0–150 bar', 'Multimètre', 'Fluide DA'],
    etudePrelim: [
      { q: 'Listez deux avantages de la direction assistée électrique (DAE) par rapport à l\'hydraulique.', r: '1. Économie de carburant (pas de pompe entraînée en permanence). 2. Possibilité d\'assistances variables et de fonctions avancées (parking auto, maintien de voie).', type: 'text' },
      { q: 'Quel est le rôle du capteur d\'angle volant dans un système DAE ?', r: 'Il informe le calculateur de la position et de la vitesse de rotation du volant pour ajuster le niveau d\'assistance en temps réel.', type: 'text' },
      { q: 'Quelle est la pression maximale typique dans un circuit de direction assistée hydraulique, atteinte en butée de braquage ?', r: 'Environ 100 à 140 bars.', type: 'text' }
    ],
    activitePratique: [
      etape('Identification', '20 min', [
        'Type système et lecture codes.',
        'Voyant et comportement.',
        'Niveau fluide si hydraulique.'
      ]),
      etape('Hydraulique', '40 min', [
        'Fuites pompe/crémaillère.',
        'Pression au mano (100–140 bar braqué).',
        'Courroie et bruits.'
      ]),
      etape('DAE', '50 min', [
        'Paramètres: angle/couple/vitesse.',
        'Assistance variable.',
        'Alimentation moteur DAE.',
        'Étalonnage angle volant si besoin.'
      ]),
      etape('Validation', '10 min', [
        'Essai route et centrage.',
        'Effacement défauts.',
        'Tracer.'
      ])
    ],
    securiteRangement: ['Compléter fluide', 'Serrer raccords', 'Ranger mano'],
    pointsCles: ['Type identifié', 'Pression OK', 'Capteurs étalonnés'],
    validationRequise: false,
  };

export default tp;
