
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 352,
    duree: '2h00',
    titre: 'Diagnostic et Calibration ADAS - Radars d\'Angle Mort',
    niveau: 'terminale',
    situation: 'Suite à une légère collision arrière, le témoin de surveillance d\'angle mort est allumé. Vous devez diagnostiquer le système et effectuer une calibration des radars situés dans le pare-chocs arrière.',
    objectif: 'Identifier le radar défaillant ou déréglé, et réaliser la procédure de calibration à l\'aide de cibles spécifiques (réflecteurs Doppler). (Compétence C3.3)',
    materiel: ['Valise de diagnostic ADAS', 'Cibles d\'angle mort (réflecteurs Doppler)', 'Mètres laser et niveaux', 'Documentation technique'],
    etudePrelim: [
        { type: 'text', q: 'Où sont généralement situés les radars pour la surveillance des angles morts ?', r: 'Dans les coins du pare-chocs arrière, cachés derrière le plastique.' },
        { type: 'text', q: 'Pourquoi un simple choc sur le pare-chocs peut-il nécessiter une calibration des radars d\'angle mort ?', r: 'Même un petit choc peut très légèrement modifier l\'angle du radar. Un décalage d\'un seul degré peut entraîner une erreur de plusieurs mètres dans la zone de détection, rendant le système dangereux ou inopérant.' },
        { type: 'qcm', q: 'Peut-on peindre ou réparer un pare-chocs à l\'endroit où se situe un radar ?', options: ['Oui, sans problème', 'Non, l\'épaisseur et le type de peinture peuvent perturber les ondes du radar', 'Oui, mais uniquement avec une peinture spéciale'], r: 'Non, l\'épaisseur et le type de peinture peuvent perturber les ondes du radar' }
    ],
    activitePratique: [
        {
            titre: 'Diagnostic et Préparation',
            duree: '30 min',
            etapes: [
                'Lire les codes défauts du module ADAS pour identifier quel radar est en cause (gauche ou droit).',
                'Inspecter visuellement le pare-chocs à la recherche de fissures ou de réparations non conformes.',
                'Positionner le véhicule sur une aire plane et dégagée.'
            ]
        },
        {
            titre: 'Positionnement des Cibles de Calibration',
            duree: '45 min',
            etapes: [
                'Consulter la documentation pour connaître les distances et angles exacts de positionnement des cibles.',
                'Placer les réflecteurs Doppler (cônes métalliques) précisément par rapport à l\'axe des roues arrière.',
                'Utiliser les lasers et les mètres pour garantir un positionnement au millimètre près.'
            ]
        },
        {
            titre: 'Procédure de Calibration et Validation',
            duree: '35 min',
            etapes: [
                'Lancer la routine de calibration des radars d\'angle mort via la valise de diagnostic.',
                'Le système va émettre des ondes, analyser leur retour sur les cibles et s\'auto-ajuster.',
                'Attendre la confirmation de la réussite de la calibration.',
                'Effectuer un essai routier pour valider le bon fonctionnement du système (détection de véhicules dans l\'angle mort).'
            ]
        }
    ],
    securiteRangement: [
        'Aucun objet métallique ne doit se trouver dans la zone de calibration entre le véhicule et les cibles.',
        'La précision du positionnement des cibles est la condition sine qua non de la réussite.',
        'Archiver le rapport de calibration pour la traçabilité de l\'intervention.'
    ],
    pointsCles: [
        'Un choc, même mineur, sur le pare-chocs peut nécessiter une calibration.',
        'Le positionnement des cibles Doppler est un travail de haute précision.',
        'La validation finale se fait obligatoirement par un essai sur route.'
    ],
    validationRequise: false,
};

export default tp;
