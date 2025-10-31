
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 11,
    duree: '2h00',
    titre: 'BAC PRO Première • Contrôle circuit moto-ventilation refroidissement',
    situation: 'Le propriétaire d\'une Citroën C3 est inquiet car le voyant de température de son moteur s\'allume et l\'indicateur dépasse fréquemment les 110°C en ville. Vous devez mener un diagnostic électrique pour trouver l\'origine de cette surchauffe.',
    objectif: 'Mener un diagnostic électrique précis sur le circuit de refroidissement pour identifier l\'origine d\'une surchauffe anormale. (Compétences C3.1, C3.3, C3.4, C2.1)',
    materiel: ['Valise de diagnostic', 'Multimètre', 'Thermomètre infrarouge', 'Documentation Technique (RTA)'],
    etudePrelim: [
        { type: 'text', q: 'Quel est le rôle principal du motoventilateur dans le circuit de refroidissement ?', r: 'Il force le passage de l\'air à travers le radiateur pour dissiper la chaleur du liquide de refroidissement lorsque le véhicule roule lentement ou est à l\'arrêt.' },
        { type: 'text', q: 'Qu\'est-ce qu\'une sonde de type "CTN" (Coefficient de Température Négatif) ? Comment sa résistance évolue-t-elle quand la température augmente ?', r: 'C\'est un capteur dont la résistance diminue lorsque la température augmente. Le calculateur interprète cette variation de résistance pour connaître la température du moteur.' },
        { type: 'qcm', q: "Le motoventilateur tourne en permanence, même moteur froid. Quelle est l'hypothèse la plus probable ?", options: ["La batterie est faible", "Le thermocontact est bloqué en position fermée ou un relais est collé", "Le moteur du ventilateur est usé"], r: "Le thermocontact est bloqué en position fermée ou un relais est collé" },
        { type: 'text', q: "Pourquoi est-il plus fiable de forcer l'activation du ventilateur via la valise de diagnostic que de simplement shunter le relais ?", r: 'La valise de diag teste toute la chaîne de commande (calculateur, faisceau, relais, moteur), alors que shunter le relais ne teste que le circuit de puissance à partir du relais.' }
    ],
    activitePratique: [
        etape('Contrôle de la source d\'énergie', '20 min', [
            'Mesurer la tension de la batterie moteur coupé (doit être > 12V).',
            'Démarrer le moteur et mesurer la tension de charge (doit être ~14V).'
        ]),
        etape('Contrôle de la sonde de température (Thermistance)', '30 min', [
            'Mettre le moteur en marche.',
            'Relever la résistance de la sonde à différentes températures (froid, 60°C, 90°C) et comparer aux valeurs de la RTA.'
        ]),
        etape('Contrôle du déclenchement des motoventilateurs', '40 min', [
            'Laisser le moteur chauffer au ralenti en surveillant la température sur l\'outil de diagnostic.',
            'Noter la température exacte de déclenchement de la 1ère vitesse du ventilateur.',
            'Noter la température d\'arrêt.',
            'Si possible (ex: en activant la climatisation), vérifier le déclenchement de la 2ème vitesse.'
        ]),
        etape('Analyse et Diagnostic', '30 min', [
            'Comparer toutes les valeurs mesurées aux données constructeur.',
            'Conclure sur l\'élément défaillant (sonde, relais, motoventilateur, calculateur).',
            'Proposer une solution corrective chiffrée.'
        ])
    ],
    securiteRangement: [
        'Attention aux organes en mouvement (ventilateur, courroies).',
        'Ne pas ouvrir le circuit de refroidissement à chaud.',
        'Couper le contact avant de débrancher des composants électriques.',
        'Ranger et nettoyer le poste de travail.'
    ],
    pointsCles: [
        'La cohérence entre la résistance de la sonde et la température réelle est cruciale.',
        'Les températures de déclenchement doivent correspondre aux spécifications constructeur.',
        'Une bonne tension de batterie et de charge est essentielle pour le bon fonctionnement des commandes électriques.'
    ],
    validationRequise: true,
  };

export default tp;
