
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 301,
    duree: '2h30',
    titre: 'BAC PRO Terminale • Contrôle des pressions. Recharge d\'une climatisation',
    situation: 'Un client se plaint que sa climatisation ne produit plus d\'air froid. Il demande un diagnostic complet et une intervention avant son départ en vacances. Vous devez prendre en charge le diagnostic du circuit de climatisation en respectant les normes environnementales.',
    objectif: 'Mesurer pressions HP/BP, diagnostiquer fuites, effectuer recharge et traçabilité fluide frigorigène. (Compétence C3.1)',
    materiel: ['Station clim agréée', 'Manomètres', 'Détecteur de fuites', 'Fluide R134a/R1234yf', 'EPIs', 'Fiches traçabilité'],
    etudePrelim: [
      { type: 'qcm', q: 'Quelle est la principale différence environnementale entre les fluides R134a et R1234yf ?', options: ['Le R1234yf est plus performant', 'Le R1234yf a un potentiel de réchauffement global (PRG) beaucoup plus faible', 'Le R134a est inflammable', 'Ils sont identiques'], r: 'Le R1234yf a un potentiel de réchauffement global (PRG) beaucoup plus faible' },
      { type: 'qcm', q: 'A 20°C, moteur à l\'arrêt, que doivent indiquer les manomètres HP et BP sur un circuit en bon état ?', options: ['HP=10 bar, BP=1 bar', 'Les deux pressions sont égales et correspondent à la pression de saturation du gaz (environ 5-6 bars)', 'HP=0 bar, BP=0 bar'], r: 'Les deux pressions sont égales et correspondent à la pression de saturation du gaz (environ 5-6 bars)' },
      { type: 'text', q: 'Pourquoi le tirage au vide du circuit avant la recharge est-il une étape absolument cruciale ? Citez deux raisons.', r: '1. Éliminer toute trace d\'humidité qui, mélangée au fluide, crée de l\'acidité et détruit le circuit. 2. Permettre un test d\'étanchéité : si le vide ne tient pas, il y a une fuite.' }
    ],
    activitePratique: [
      etape('Contrôles préalables', '30 min', [
        'Inspection visuelle: tuyaux, compresseur, condenseur.',
        'Branchement manomètres et relevé à l’arrêt.',
        'Test fuites (UV/électronique) sur jonctions.'
      ]),
      etape('Mesures en fonctionnement', '40 min', [
        'Démarrer moteur + clim MAX.',
        'Relever HP/BP à divers régimes.',
        'Observer embrayage compresseur et ventilateurs.'
      ]),
      etape('Recharge si nécessaire', '50 min', [
        'Raccorder station, tirage au vide, test étanchéité.',
        'Charger quantité constructeur avec traçabilité.',
        'Contrôle performances et températures.'
      ])
    ],
    securiteRangement: ['Gants et lunettes', 'Ventiler atelier', 'Traçabilité fluide obligatoire'],
    pointsCles: ['Pressions nominales', 'Étanchéité', 'Dossier réglementaire'],
    validationRequise: false,
  };

export default tp;
