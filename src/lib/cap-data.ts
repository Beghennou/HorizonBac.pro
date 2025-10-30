

import type { CompetenceBloc, Niveau } from './data-manager';

export const competencesParNiveau: Record<Extract<Niveau, 'cap1' | 'cap2'>, Record<string, CompetenceBloc>> = {
  cap1: {
    'BLOC_1': { 
        title: 'BLOC 1 : Réaliser l’entretien périodique des véhicules', 
        colorClass: 'bg-bloc1-color', 
        items: { 
            'C1.1': 'Organiser un entretien périodique', 
            'C1.2': 'Identifier les anomalies dans le cadre d’un entretien périodique', 
            'C1.3': 'Réaliser les opérations de remplacement, d’ajustement dans le cadre de l’entretien périodique', 
            'C1.4': 'Apporter des conseils techniques à la clientèle sur l’entretien du véhicule' 
        } 
    }
  },
  cap2: {
    'BLOC_2': { 
        title: 'BLOC 2 : Réaliser la maintenance corrective des véhicules', 
        colorClass: 'bg-bloc2-color', 
        items: { 
            'C2.1': 'Préparer une intervention corrective', 
            'C2.2': 'Réaliser le remplacement ou la réparation des composants', 
            'C2.3': 'Réaliser le réglage des systèmes', 
            'C2.4': 'Réaliser le contrôle qualité d’une intervention corrective',
            'C2.5': 'Réaliser le diagnostic de premier niveau'
        } 
    }
  }
};
