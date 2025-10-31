import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 36,
    duree:'1h45',
    titre:'Contrôle du circuit de pré-post chauffage',
    niveau: 'premiere',
    situation:'Un moteur diesel démarre mal à froid et fume blanc. Vous devez contrôler le circuit de préchauffage pour trouver la cause.',
    objectif:'Tester les bougies, relais et temporisation puis effectuer le réglage. (Compétences C2.2, C2.3)',
    materiel:['Multimètre','Pince ampèremétrique','Chronomètre','Schéma électrique'],
    etudePrelim:[
        {type: 'qcm', q:"Le moteur démarre mal mais le témoin de préchauffage s'allume correctement. Quelle est votre première hypothèse de diagnostic ?", options: ["Le calculateur est HS", "Une ou plusieurs bougies de préchauffage sont grillées", "La batterie est neuve"], r:"Une ou plusieurs bougies de préchauffage sont grillées"},
        {type: 'text', q:"Scénario : Vous mesurez une intensité totale de 30A sur un moteur 4 cylindres. Est-ce cohérent ? Combien de bougies sont probablement défectueuses ?",r:'Non, ce n\'est pas cohérent. Une bougie consomme environ 10-15A. Pour 4 cylindres, on attend 40-60A. Avec 30A, il y a probablement une bougie de défectueuse (voire deux).'},
        {type: 'text', q:"Réflexion : Quel est le rôle du 'post-chauffage' (maintien des bougies allumées après le démarrage) sur la pollution et le bruit du moteur à froid ?",r:'Il aide à stabiliser la combustion lorsque le moteur est froid, ce qui réduit les émissions de polluants (imbrûlés) et les claquements caractéristiques du diesel à froid.'}
    ],
    activitePratique:[
        { titre: 'Contrôle du Circuit Global', duree: '35 min', etapes: ['Vérifier l\'allumage du voyant au tableau de bord et son temps.','Mesurer la tension sur la barre d\'alimentation des bougies.','Mesurer l\'intensité totale consommée par le circuit.']},
        { titre: 'Contrôle des Bougies', duree: '45 min', etapes: ['Mesurer la résistance de chaque bougie.','Mesurer l\'intensité individuelle de chaque bougie.','Inspecter visuellement l\'extrémité des bougies.']},
        { titre: 'Contrôle du Boîtier de Préchauffage', duree: '20 min', etapes: ['Vérifier l\'activation et la commande du relais.','Contrôler le maintien de la tension en post-chauffage.']}
    ],
    securiteRangement:['Débrancher la batterie avant dépose','Respecter les couples de serrage','Tracer les mesures'],
    pointsCles:['Homogénéité des bougies','Commande fonctionnelle','Temporisation conforme'],
    validationRequise: false,
};

export default tp;
