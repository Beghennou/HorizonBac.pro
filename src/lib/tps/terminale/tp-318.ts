
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 318,
    duree: '2h30',
    titre: 'Diagnostic BV robotisée',
    niveau: 'terminale',
    situation: 'Les vitesses passent mal sur une boîte robotisée : passages lents, à-coups, ou blocage sur un rapport. Vous devez diagnostiquer le système de commande électro-hydraulique et effectuer les apprentissages nécessaires.',
    objectif: 'Lire paramètres, tester actionneurs, réaliser apprentissages et valider passages. (Compétence C3.4)',
    materiel: ['Valise constructeur', 'Multimètre', 'Schéma BV robotisée', 'EPIs'],
    etudePrelim: [
      { q: 'Quelle est la différence majeure entre une boîte robotisée et une boîte automatique classique à convertisseur ?', r: 'La boîte robotisée est une boîte manuelle sur laquelle des actionneurs électro-hydrauliques gèrent l\'embrayage et le passage des rapports. La boîte auto a un convertisseur de couple hydraulique et des trains épicycloïdaux.', type: 'text' },
      { q: 'À quoi sert la procédure d\'apprentissage du "point de léchage" (ou point de contact) de l\'embrayage ?', r: 'Elle permet au calculateur de connaître précisément le point où l\'embrayage commence à "mordre" pour assurer des démarrages et des passages de vitesse doux et sans à-coups.', type: 'text' },
      { q: 'Quels capteurs sont essentiels au bon fonctionnement d\'une boîte robotisée ?', r: 'Les capteurs de position des actionneurs de sélection et d\'engagement, le capteur de position de l\'embrayage, et les capteurs de vitesse d\'entrée/sortie de boîte.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Diagnostic initial',
        duree: '30 min',
        etapes: [
          'Connexion valise et lecture codes.',
          'Observer PIDs (position, couple).',
          'Analyser données figées.'
        ]
      },
      {
        titre: 'Tests actionneurs',
        duree: '60 min',
        etapes: [
          'Activer embrayage électro-hydraulique.',
          'Tester sélecteurs 1→6.',
          'Mesurer tensions/résistances capteurs.',
          'Tester électrovannes.'
        ]
      },
      {
        titre: 'Procédures spécifiques',
        duree: '40 min',
        etapes: [
          'Apprentissage point de touche.',
          'Purge circuit si besoin.',
          'Validation banc/route.'
        ]
      },
      {
        titre: 'Validation',
        duree: '20 min',
        etapes: [
          'Tester tous les rapports.',
          'Vérifier douceur passages.',
          'Contrôler retour codes.',
          'Tracer opérations.'
        ]
      }
    ],
    securiteRangement: ['Véhicule calé', 'Procédures constructeur', 'Limiter sollicitations', 'Ranger outils'],
    pointsCles: ['PIDs essentiels', 'Apprentissage obligatoire', 'Actionneurs OK'],
    validationRequise: false,
  };

export default tp;
