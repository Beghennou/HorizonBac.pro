
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 314,
    duree: '2h00',
    titre: 'BAC PRO Terminale • Contrôle des injecteurs moteur à rampe commune 2',
    situation: 'Suite au diagnostic précédent, un injecteur a été identifié comme défectueux. Vous devez le déposer, le tester sur banc, et coder le nouvel injecteur dans le calculateur moteur.',
    objectif: 'Mesurer débits/étanchéité sur banc et coder corrections (IMA/IQA). (Compétence C3.4)',
    materiel: ['Banc injecteurs', 'Éprouvettes', 'Valise diag', 'RTA'],
    etudePrelim: [
      { q: 'À quoi correspond le code IMA/IQA gravé sur un injecteur neuf ?', r: 'C\'est un code de correction qui décrit les caractéristiques précises de cet injecteur (débit, temps de réponse). Il permet au calculateur d\'ajuster sa commande pour un fonctionnement optimal.', type: 'text' },
      { q: 'Quels sont les différents débits mesurés lors d\'un test au banc ?', r: 'On mesure le débit principal, le débit de pré-injection, le débit de pleine charge et le retour de fuite à différentes pressions.', type: 'text' },
      { q: 'Que se passe-t-il si on monte un injecteur neuf sans le coder dans le calculateur ?', r: 'Le moteur peut mal tourner, claquer, fumer ou manquer de puissance car le calculateur utilise les corrections de l\'ancien injecteur, qui ne sont pas adaptées au nouveau.', type: 'text' }
    ],
    activitePratique: [
      etape('Dépose', '30 min', [
        'Dépressuriser rampe.',
        'Déposer injecteurs, nettoyer logements.',
        'Préparer joints neufs.'
      ]),
      etape('Tests banc', '60 min', [
        'Monter injecteur, lancer séquences.',
        'Mesurer débits et pulvérisation.',
        'Tester étanchéité.'
      ]),
      etape('Codage', '30 min', [
        'Relever codes IMA/IQA.',
        'Programmer dans ECU.',
        'Effacer défauts et valider.'
      ])
    ],
    securiteRangement: ['Joints neufs', 'Purge HP', 'Ranger banc'],
    pointsCles: ['Débit homogène', 'Codage fait', 'Étanchéité OK'],
    validationRequise: false,
  };

export default tp;
