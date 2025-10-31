
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 302,
    duree: '2h00',
    titre: 'BAC PRO Terminale • Diagnostic et remplacement airbag',
    situation: 'Le témoin d\'airbag d\'un véhicule reste allumé en permanence. Le client s\'inquiète pour sa sécurité. Votre mission est de diagnostiquer le système de retenue programmée et de remplacer le composant défectueux en suivant un protocole de sécurité strict.',
    objectif: 'Appliquer procédures sécurité, déposer/reposer airbag, effacer défauts et valider. (Compétence C3.3)',
    materiel: ['Outil diag', 'Airbag neuf', 'Clé dynamométrique', 'EPIs'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi faut-il impérativement débrancher la batterie et attendre au moins 5 minutes avant toute intervention sur un système d\'airbag ?', r: 'Pour permettre aux condensateurs du calculateur d\'airbag de se décharger complètement, afin d\'éviter tout risque de déclenchement accidentel.'},
        { type: 'qcm', q: 'Comment doit-on manipuler et stocker un module d\'airbag non déployé ?', options: ['Face vers le bas pour le protéger', 'Coussin gonflable vers le haut, pour que le projectile parte vers le ciel en cas de déclenchement', 'Sur le côté pour plus de stabilité'], r: 'Coussin gonflable vers le haut, pour que le projectile parte vers le ciel en cas de déclenchement'},
        { type: 'text', q: 'Quelle est la procédure légale pour se débarrasser d\'un airbag déployé ou périmé ?', r: 'Il doit être neutralisé par un personnel habilité et éliminé via une filière de déchets pyrotechniques spécialisée et agréée.'}
    ],
    activitePratique: [
      etape('Préparation', '20 min', [
        'Débrancher batterie, attendre décharge.',
        'Lire codes défauts et sauvegarder.',
        'Accéder au module et déconnecter.'
      ]),
      etape('Dépose/repose', '50 min', [
        'Retirer airbag selon procédure.',
        'Contrôler connecteurs et câblage.',
        'Monter airbag neuf, couples respectés.'
      ]),
      etape('Validation', '30 min', [
        'Rebrancher, effacer défauts.',
        'Tester système via valise.',
        'Vérifier voyant TDB.'
      ])
    ],
    securiteRangement: ['Ne pas heurter airbag', 'Stocker face vers le haut', 'Filière agréée'],
    pointsCles: ['Attente 5 min', 'Couples serrage', 'Effacement défauts'],
    validationRequise: false,
  };

export default tp;
