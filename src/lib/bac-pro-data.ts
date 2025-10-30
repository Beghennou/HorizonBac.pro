

import type { CompetenceBloc, Niveau } from './data-manager';

export const competencesParNiveau: Record<Exclude<Niveau, 'cap1' | 'cap2'>, Record<string, CompetenceBloc>> = {
  seconde: {
    'BLOC_1': { title: 'BLOC 1 : Entretenir un véhicule', colorClass: 'bg-bloc1-color', items: { 'C1.1': 'Organiser un entretien périodique', 'C1.2': 'Identifier les anomalies dans le cadre d\'un entretien périodique', 'C1.3': 'Réaliser les opérations de remplacement, d\'ajustement dans le cadre de l\'entretien périodique', 'C1.4': 'Apporter des conseils techniques à la clientèle sur l\'entretien du véhicule' } }
  },
  premiere: {
    'BLOC_2': { title: 'BLOC 2 : Diagnostiquer un véhicule', colorClass: 'bg-bloc2-color', items: { 'C2.1': 'Préparer une intervention corrective', 'C2.2': 'Réaliser le remplacement ou la réparation des composants', 'C2.3': 'Réaliser le réglage des systèmes', 'C2.4': 'Réaliser le contrôle qualité d\'une intervention corrective' } }
  },
  terminale: {
    'BLOC_3': { title: 'BLOC 3 : Réparer un véhicule', colorClass: 'bg-bloc3-color', items: { 'C3.1': 'Constater un dysfonctionnement', 'C3.2': 'Hiérarchiser les hypothèses', 'C3.3': 'Mettre en œuvre un protocole d\'intervention existant ou à définir', 'C3.4': 'Identifier les solutions correctives' } }
  }
};
