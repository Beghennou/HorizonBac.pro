
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 502,
    duree: '1h00',
    titre: 'CAP 1ère Année • Remplacement du Filtre à Air',
    situation: 'Dans le cadre de l\'entretien périodique d\'un véhicule, le remplacement du filtre à air est préconisé.',
    objectif: 'Remplacer le filtre à air pour garantir une bonne qualité de l\'air admis par le moteur. (Compétence C1.3)',
    materiel: ['Filtre à air neuf', 'Tournevis', 'Chiffon'],
    etudePrelim: [
        { type: 'text', q: 'Quel est l\'impact d\'un filtre à air encrassé sur la consommation de carburant ?', r: 'Il augmente la consommation car le moteur doit forcer pour aspirer l\'air, ce qui enrichit le mélange.' },
    ],
    activitePratique: [
        etape('Dépose', '15 min', ['Localiser et ouvrir le boîtier du filtre à air.', 'Retirer l\'ancien filtre.']),
        etape('Nettoyage et Repose', '20 min', ['Nettoyer l\'intérieur du boîtier.', 'Installer le filtre neuf en respectant le sens de montage.', 'Refermer et visser le boîtier.']),
    ],
    securiteRangement: ['S\'assurer de la bonne étanchéité du boîtier.', 'Jeter l\'ancien filtre à la poubelle.'],
    pointsCles: ['Nettoyage du boîtier', 'Sens de montage du filtre'],
    validationRequise: false,
};

export default tp;
