
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 351,
    duree: '2h30',
    titre: 'Diagnostic et Calibration ADAS - Caméra Frontale',
    niveau: 'terminale',
    situation: 'Suite au remplacement du pare-brise, le système de maintien de voie (Lane Assist) est inopérant et un témoin ADAS est allumé. Vous devez recalibrer la caméra frontale.',
    objectif: 'Effectuer la procédure de calibration statique et dynamique de la caméra frontale à l\'aide de la cible et de l\'outil de diagnostic. (Compétence C3.3)',
    materiel: ['Valise de diagnostic ADAS', 'Cible de calibration constructeur', 'Lasers et niveaux pour alignement', 'Documentation technique (distances, hauteurs)'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi une calibration est-elle obligatoire après un remplacement de pare-brise ou une intervention sur les suspensions ?', r: 'Parce que ces opérations modifient la position et l\'angle de la caméra par rapport à la route. Une calibration est nécessaire pour que le système puisse à nouveau interpréter correctement son environnement.' },
        { type: 'text', q: 'Quelle est la différence entre une calibration statique et une calibration dynamique ?', r: 'Statique : se fait en atelier avec une cible physique placée à une distance précise. Dynamique : se fait en roulant sur une route bien marquée, en suivant une procédure guidée par l\'outil de diagnostic.' },
        { type: 'qcm', q: 'Quelles sont les conditions environnementales idéales pour une calibration ADAS ?', options: ['En plein soleil ou sous la pluie pour tester les limites', 'Dans un atelier bien éclairé, sans reflets, sur un sol parfaitement plat', 'Peu importe, le système s\'adapte'], r: 'Dans un atelier bien éclairé, sans reflets, sur un sol parfaitement plat' }
    ],
    activitePratique: [
        {
            titre: 'Préparation du Véhicule et de la Zone',
            duree: '45 min',
            etapes: [
                'Vérifier et ajuster la pression des pneus.',
                'S\'assurer que le véhicule est sur une surface parfaitement plane.',
                'Positionner la cible de calibration à la distance et à la hauteur exactes préconisées par le constructeur.',
                'Aligner parfaitement la cible avec l\'axe du véhicule à l\'aide des lasers.'
            ]
        },
        {
            titre: 'Procédure de Calibration Statique',
            duree: '45 min',
            etapes: [
                'Brancher la valise de diagnostic et lancer la procédure de calibration de la caméra.',
                'Suivre les instructions à l\'écran, le système va analyser l\'image de la cible.',
                'Attendre la confirmation de la réussite de la calibration statique.',
                'Enregistrer le rapport de calibration.'
            ]
        },
        {
            titre: 'Validation par Calibration Dynamique (si requise)',
            duree: '40 min',
            etapes: [
                'Lancer la procédure de calibration dynamique avec la valise de diagnostic.',
                'Effectuer un essai routier sur une route bien marquée, en respectant les conditions de vitesse demandées.',
                'Valider que le système détecte correctement les lignes et que les alertes sont fonctionnelles.',
                'Vérifier l\'extinction du témoin ADAS et l\'absence de codes défauts.'
            ]
        }
    ],
    securiteRangement: [
        'La précision de la position de la cible est la clé de la réussite.',
        'Respecter scrupuleusement les distances et hauteurs indiquées dans la documentation technique.',
        'Protéger la cible de calibration de tout dommage.',
        'Stocker le matériel de calibration dans son emplacement dédié.'
    ],
    pointsCles: [
        'La préparation (pression, planéité) est 80% du travail.',
        'Alignement parfait de la cible avec l\'axe du véhicule.',
        'La calibration dynamique valide le réglage statique en conditions réelles.'
    ],
    validationRequise: false,
};

export default tp;
