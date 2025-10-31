
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 601,
    duree: '2h00',
    titre: 'CAP 2ème Année • Remplacement des Plaquettes de Frein Avant',
    situation: 'Un véhicule présente un témoin d\'usure des freins allumé. Le diagnostic confirme que les plaquettes de frein avant doivent être remplacées.',
    objectif: 'Remplacer les plaquettes de frein avant en respectant les règles de sécurité. (Compétence C2.2)',
    materiel: ['Jeu de plaquettes neuves', 'Repousse-piston', 'Nettoyant frein', 'Clé dynamométrique', 'Cric et chandelles'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi faut-il ouvrir le bocal de liquide de frein avant de repousser le piston de l\'étrier ?', r: 'Pour permettre au liquide de remonter sans mettre le circuit sous pression et sans faire déborder le bocal.' },
        { type: 'text', q: 'Quelle est la dernière action à faire impérativement avant de rendre le véhicule au client après un changement de plaquettes ?', r: 'Pomper plusieurs fois sur la pédale de frein pour rapprocher les plaquettes du disque.' },
    ],
    activitePratique: [
        etape('Dépose', '30 min', ['Lever le véhicule et déposer la roue.', 'Déposer l\'étrier de frein et le suspendre.', 'Retirer les anciennes plaquettes.']),
        etape('Nettoyage et Repose', '45 min', ['Nettoyer l\'étrier et repousser le piston.', 'Installer les nouvelles plaquettes.', 'Remonter l\'étrier et serrer au couple.']),
        etape('Finalisation', '15 min', ['Remonter la roue et serrer au couple.', 'Pomper sur la pédale de frein.', 'Vérifier le niveau de liquide de frein.'])
    ],
    securiteRangement: ['Suspendre l\'étrier, ne pas le laisser pendre par le flexible.', 'Respecter les couples de serrage.', 'Informer le client de la période de rodage.'],
    pointsCles: ['Nettoyage de l\'étrier', 'Pomper sur la pédale avant de rouler'],
    validationRequise: false,
};

export default tp;
