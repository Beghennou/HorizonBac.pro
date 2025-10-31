
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 504,
    duree: '1h00',
    titre: 'CAP 1ère Année • Contrôle et Pression des Pneus',
    situation: "Dans le cadre d'une révision, vous devez contrôler l'ensemble des pneumatiques du véhicule, y compris la roue de secours.",
    objectif: 'Identifier les anomalies d\'usure et de pression et y remédier. (Compétences C1.2, C1.3)',
    materiel: ['Manomètre de pression', 'Jauge de profondeur', 'Documentation technique (pressions préconisées)'],
    etudePrelim: [
        { type: 'qcm', q: 'Une usure prononcée au centre de la bande de roulement indique :', options: ['Un sous-gonflage chronique', 'Un sur-gonflage chronique', 'Un défaut de parallélisme'], r: 'Un sur-gonflage chronique' },
        { type: 'text', q: 'Quelle est la profondeur minimale légale des sculptures d\'un pneu en France ?', r: '1.6 mm' }
    ],
    activitePratique: [
        etape('Contrôle de la Pression', '20 min', [
            'Consulter l\'étiquette de pression dans la portière ou la trappe à carburant.',
            'Mesurer la pression de chaque pneu à froid.',
            'Ajuster la pression si nécessaire (gonflage ou dégonflage).',
            'Contrôler la pression de la roue de secours.'
        ]),
        etape('Contrôle de l\'Usure', '25 min', [
            'Mesurer la profondeur des sculptures en 3 points de la bande de roulement.',
            'Vérifier l\'atteinte du témoin d\'usure légal (1.6 mm).',
            'Inspecter les flancs pour détecter toute hernie, coupure ou craquelure.',
            'Analyser le type d\'usure (centre, bords, asymétrique).'
        ]),
        etape('Rapport et Conseil', '15 min', [
            'Noter toutes les valeurs relevées sur la fiche d\'intervention.',
            'Informer le client de toute anomalie (usure irrégulière, pneu à remplacer).',
            'Expliquer au client l\'importance de maintenir une pression correcte.'
        ])
    ],
    securiteRangement: [
        'Toujours contrôler la pression à froid',
        'Respecter les préconisations de pression du constructeur',
        'Signaler impérativement tout pneu présentant un risque pour la sécurité'
    ],
    pointsCles: [
        'Pression correcte et homogène',
        'Usure régulière de la bande de roulement',
        'Absence de dommage sur les flancs'
    ],
    validationRequise: false,
};

export default tp;
