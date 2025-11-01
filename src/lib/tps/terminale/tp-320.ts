
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 320,
    duree: '1h30',
    titre: 'Mise en Sécurité Véhicule Hybride (NFC 18-550)',
    niveau: 'terminale',
    situation: 'Un véhicule hybride doit subir une intervention non électrique (ex: remplacement des plaquettes de frein). En tant que personne "Avertie" (non habilitée), vous devez appliquer la procédure de mise en sécurité réglementaire avant de commencer le travail.',
    objectif: 'Appliquer la procédure de mise en sécurité en 3 étapes (Couper, Condamner, Contrôler) sur un véhicule hybride conformément à la norme NFC 18-550. (Compétences C1.1, C2.1)',
    materiel: ['Véhicule Hybride', 'EPI spécifiques (Gants isolants classe 0, visière de protection)', 'Cadenas de consignation et pancarte de signalisation', 'Multimètre CAT III 1000V avec cordons et pointes de touche IP2X', 'Documentation technique du véhicule'],
    etudePrelim: [
        { type: 'text', q: 'Quelles sont les 3 étapes fondamentales de la mise en sécurité d\'un véhicule électrique ou hybride ?', r: '1. Couper (séparation des sources d\'énergie). 2. Condamner (verrouillage mécanique pour empêcher la remise sous tension). 3. Contrôler (Vérification d\'Absence de Tension - VAT).' },
        { type: 'qcm', q: 'Quelle est la principale différence de rôle entre une personne "Avertie" et une personne "Habilitée" ?', options: ['L\'habilité peut conduire le véhicule, pas l\'averti', 'L\'averti peut réaliser la mise en sécurité, mais l\'habilité est le seul à pouvoir intervenir sur les pièces nues sous tension >60V.', 'Il n\'y a aucune différence'], r: 'L\'averti peut réaliser la mise en sécurité, mais l\'habilité est le seul à pouvoir intervenir sur les pièces nues sous tension >60V.' },
        { type: 'text', q: 'Pourquoi est-il indispensable de réaliser une Vérification d\'Absence de Tension (VAT) même après avoir débranché la "Service Plug" ?', r: 'Pour s\'assurer de l\'absence de tension résiduelle due aux condensateurs du circuit haute tension, qui peuvent rester chargés plusieurs minutes après la coupure.' }
    ],
    activitePratique: [
        {
            titre: 'Étape 1 : Préparation et Coupure',
            duree: '30 min',
            etapes: [
                'S\'équiper des EPI : gants en coton, gants isolants et visière de protection.',
                'Identifier sur la documentation technique l\'emplacement de la batterie de servitude 12V et de la "Service Plug" (prise de maintenance).',
                'Couper le contact et retirer la clé du véhicule.',
                'Débrancher la cosse négative de la batterie 12V pour neutraliser les systèmes de bord.',
                'Retirer la "Service Plug" ou le sectionneur de la batterie haute tension pour couper le circuit de puissance.'
            ]
        },
        {
            titre: 'Étape 2 : Condamnation',
            duree: '15 min',
            etapes: [
                'Placer la "Service Plug" dans un boîtier de consignation personnel et le verrouiller avec votre cadenas.',
                'Placer la clé du véhicule dans le boîtier également.',
                'Accrocher une pancarte de signalisation claire sur le volant ("NE PAS METTRE SOUS TENSION - OPÉRATION EN COURS").'
            ]
        },
        {
            titre: 'Étape 3 : Contrôle (VAT)',
            duree: '30 min',
            etapes: [
                'Attendre le temps de décharge des condensateurs préconisé par le constructeur (généralement 5 à 10 minutes).',
                'Identifier les points de mesure pour la VAT (ex: bornes du compresseur de clim, onduleur).',
                'Tester le multimètre (en position Voltmètre DC >600V) sur une source de tension connue (batterie 12V).',
                'Mesurer la tension aux points de contrôle du circuit HT. La tension doit être inférieure à 60V DC.',
                'Retester le multimètre sur la source 12V pour s\'assurer qu\'il n\'est pas tombé en panne pendant la mesure.',
                'Le véhicule est maintenant sécurisé. Vous pouvez procéder à l\'intervention non électrique.'
            ]
        }
    ],
    securiteRangement: [
        'Le port des EPI (gants isolants, visière) est non négociable lors de la manipulation des éléments de coupure et de la VAT.',
        'Ne jamais supposer qu\'un circuit est hors tension sans l\'avoir vérifié par une VAT.',
        'La procédure de consignation (cadenas, pancarte) est une étape de sécurité personnelle et obligatoire.',
        'Pour la remise en service, suivre la procédure inverse : déconsignation, reconnexion, puis test final.'
    ],
    pointsCles: [
        'La procédure "Couper, Condamner, Contrôler" est la base de toute intervention.',
        'La VAT est la seule preuve que le circuit est bien hors tension.',
        'La consignation protège l\'opérateur contre une remise sous tension par un tiers.',
        'Un "Averti" sécurise le véhicule, mais n\'intervient JAMAIS sur les composants internes haute tension.'
    ],
    ressources: [
        '[LIEN] Article Innovauto sur la mise en sécurité - https://www.innovauto.org/vehicules-electrique-vehicules-hybrides/la-mise-en-securite-des-vehicules-electriques-et-hybrides',
        '[PDF] Extrait Norme NFC 18-550 (Synthèse) - /docs/nfc18550-resume.pdf'
    ],
    validationRequise: true,
};

export default tp;
