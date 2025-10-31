
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 104,
    duree: '1h00',
    titre: 'BAC PRO Seconde • Découverte du Poste de Conduite et des Témoins',
    situation: 'Un client vient de récupérer son véhicule après une longue immobilisation et s\'interroge sur la signification des différents témoins lumineux qui apparaissent au tableau de bord.',
    objectif: 'Identifier toutes les commandes usuelles et interpréter correctement les témoins d\'alerte pour informer et rassurer le client. (Compétences C1.1, C1.4)',
    materiel: ['Véhicule en état de fonctionnement', 'Manuel utilisateur du constructeur', 'Fiche de relevé des témoins', 'Stylo'],
    etudePrelim: [
        { type: 'qcm', q: 'Un témoin de quelle couleur indique un danger immédiat nécessitant l\'arrêt du véhicule ?', options: ['Vert', 'Orange', 'Rouge'], r: 'Rouge' },
        { type: 'text', q: 'Citez 3 témoins qui s\'allument en rouge.', r: 'Pression d\'huile, température moteur, charge batterie, frein à main, niveau liquide de frein, etc.' }
    ],
    activitePratique: [
        etape('Identification systématique des commandes', '20 min', [
            'Repérer et tester toutes les commandes d\'éclairage (feux de position, croisement, route).',
            'Identifier et actionner les commandes d\'essuyage et de lave-glace (différentes vitesses).',
            'Localiser et tester les commandes de ventilation, chauffage et climatisation.',
            'Tester le fonctionnement des clignotants gauche/droite et des feux de détresse.',
            'Vérifier le fonctionnement du klaxon, des commandes au volant et autres accessoires.'
        ]),
        etape('Interprétation détaillée des témoins', '25 min', [
            'Mettre le contact et identifier précisément tous les témoins qui s\'allument (phase d\'autotest).',
            'Classifier les témoins par couleur et niveau d\'urgence (rouge = danger, orange = attention, vert/bleu = fonctionnement).',
            'Consulter le manuel constructeur pour comprendre la signification de 5 témoins clés du véhicule.',
            'Noter soigneusement les témoins qui restent allumés anormalement après le démarrage.',
            'Identifier les témoins liés à la sécurité (frein, direction, airbag) et leur priorité.'
        ]),
        etape('Simulation de conseil client professionnel', '15 min', [
            'Expliquer clairement au client la signification de 3 témoins courants et leur importance.',
            'Décrire précisément la conduite à tenir si le témoin d\'huile ou de température s\'allume.',
            'Informer le client sur l\'importance capitale de ne jamais ignorer les témoins rouges.',
            'Remplir consciencieusement une fiche de relevé avec tous les témoins actifs observés.',
            'Donner des conseils préventifs pour éviter l\'apparition de certains témoins.'
        ])
    ],
    securiteRangement: [
        'Ne jamais ignorer ou minimiser l\'importance d\'un témoin rouge',
        'Couper immédiatement le moteur en cas d\'allumage du témoin d\'huile ou de température',
        'Toujours consulter le manuel constructeur en cas de doute sur un témoin',
        'Informer systématiquement le client des risques liés aux témoins de sécurité'
    ],
    pointsCles: [
        'Connaissance parfaite des témoins de sécurité prioritaires',
        'Classification correcte des témoins par ordre d\'urgence',
        'Capacité à donner un conseil client approprié et rassurant',
        'Utilisation systématique du manuel constructeur comme référence'
    ],
    validationRequise: false,
};

export default tp;
