import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 18,
    duree:'2h00',
    titre:'Contrôle pression et débit essence',
    niveau: 'premiere',
    situation:'Un véhicule essence présente des pertes de puissance. Vous devez contrôler le circuit d\'alimentation basse pression pour vérifier la pompe à essence.',
    objectif:'Vérifier la régulation et le débit de la pompe avant une intervention. (Compétence C2.1)',
    materiel:['Manomètre de pression essence (0–6 bar)','Éprouvette graduée','Documentation technique (RTA)'],
    etudePrelim:[
        {type: 'qcm', q:"La pression est correcte au ralenti, mais elle chute fortement lors d'une accélération franche. Le problème est-il plutôt la pompe, le régulateur ou le filtre à essence ?", options: ["Le régulateur", "La pompe est faible ou le filtre est colmaté, empêchant un débit suffisant", "Le réservoir est vide"], r:"La pompe est faible ou le filtre est colmaté, empêchant un débit suffisant"},
        {type: 'text', q:"Analyse de panne : Vous coupez le contact, la pression chute immédiatement à zéro. Quel composant du circuit est certainement défectueux ?",r:'Le clapet anti-retour de la pompe à essence.'},
        {type: 'text', q:"Analyse de risque : Pourquoi est-il particulièrement dangereux d'intervenir sur le circuit d'alimentation en essence d'un moteur à injection directe (GDI) ?",r:'Parce que la pression dans la rampe haute pression peut atteindre plus de 200 bars, même moteur coupé. Une déconnexion peut provoquer un jet de carburant extrêmement fin, inflammable et dangereux.'}
    ],
    activitePratique:[
        { titre: 'Mesure de Pression', duree: '40 min', etapes: ['Brancher le manomètre, mettre le contact : observer la montée en pression.','Mesurer au ralenti et en phase d\'accélération.','Couper le moteur et vérifier le maintien de la pression.']},
        { titre: 'Mesure de Débit', duree: '40 min', etapes: ['Dériver le circuit et mesurer le volume de carburant sur 30 secondes.','Extrapoler le débit en litres par minute.','Comparer la valeur à la préconisation constructeur.']}
    ],
    securiteRangement:['Assurer une bonne ventilation (vapeurs d\'essence)','Avoir un extincteur à proximité','Éliminer l\'essence récupérée dans les contenants adaptés'],
    pointsCles:['Pression correcte','Débit suffisant','Maintien de la pression'],
    validationRequise: false,
};

export default tp;
