
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 309,
    duree: '2h00',
    titre: 'BAC PRO Terminale • Diagnostic géométrie',
    situation: 'Le client se plaint que son véhicule tire à droite et que ses pneus avant s\'usent de manière irrégulière. Un diagnostic complet de la géométrie des trains roulants est nécessaire.',
    objectif: 'Mesurer et interpréter angles, régler parallélisme. (Compétence C3.4)',
    materiel: ['Banc géométrie 3D', 'Clés réglage', 'Fiche constructeur'],
    etudePrelim: [
      { q: 'Définissez brièvement : Parallélisme, Carrossage, Chasse.', r: 'Parallélisme: angle des roues dans le plan horizontal. Carrossage: inclinaison de la roue par rapport à la verticale. Chasse: inclinaison de l\'axe de pivot de la roue.', type: 'text' },
      { q: 'Un défaut de parallélisme (trop de pincement ou d\'ouverture) provoque quel type d\'usure sur les pneus ?', r: 'Une usure rapide et asymétrique sur les bords intérieurs ou extérieurs de la bande de roulement.', type: 'text' },
      { q: 'Pourquoi est-il crucial de vérifier les pressions des pneus et de les ajuster avant de commencer un contrôle de géométrie ?', r: 'Parce que des pressions incorrectes modifient la hauteur de caisse et l\'assiette du véhicule, ce qui fausse complètement toutes les mesures d\'angles.', type: 'text' }
    ],
    activitePratique: [
      etape('Préparation', '20 min', [
        'Pressions et jeux OK.',
        'Capteurs montés.',
        'Volant centré.'
      ]),
      etape('Mesures', '50 min', [
        'Compensation jantes.',
        'Lecture valeurs AV/AR.',
        'Comparer aux tolérances.'
      ]),
      etape('Réglages', '40 min', [
        'Ajuster biellettes AV (et AR si possible).',
        'Itérer jusqu’en vert.',
        'Centrer volant.'
      ]),
      etape('Validation', '10 min', [
        'Re-mesure complète.',
        'Imprimer avant/après.',
        'Essai court.'
      ])
    ],
    securiteRangement: ['Descendre du banc', 'Ranger capteurs', 'Archiver fiches'],
    pointsCles: ['Pressions base', 'Symétrie G/D', 'Réglage fin'],
    validationRequise: false,
  };

export default tp;
