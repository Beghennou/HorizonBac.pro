
export type Etape = {
  titre: string;
  duree: string;
  etapes: string[];
};

export type EtudePrelimText = {
  type: 'text';
  q: string;
  r: string; // Correct answer
};

export type EtudePrelimQCM = {
  type: 'qcm';
  q: string;
  options: string[];
  r: string; // Correct answer
};

export type EtudePrelim = EtudePrelimText | EtudePrelimQCM;


export type TP = {
  id: number;
  duree: string;
  titre: string;
  situation: string;
  objectif: string;
  materiel: string[];
  etudePrelim: EtudePrelim[];
  activitePratique: Etape[];
  securiteRangement: string[];
  pointsCles: string[];
};

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

export const tpSeconde: Record<number, TP> = {
    101: {
        id: 101,
        duree: '2h00',
        titre: 'Sécurité et Organisation du Poste de Travail',
        situation: 'Un nouveau mécanicien intègre l\'équipe. Avant sa première intervention, le chef d\'atelier lui demande de préparer son poste et de réviser les règles de sécurité fondamentales.',
        objectif: 'Organiser son espace de travail de manière sûre et efficace, en identifiant les risques et en utilisant les Équipements de Protection Individuelle (EPI). (Compétences C1.1, C1.4)',
        materiel: ['Bleu de travail', 'Chaussures de sécurité', 'Lunettes de protection', 'Gants', 'Chariot à outils', 'Extincteur (localisation)', 'Zone de tri des déchets'],
        etudePrelim: [
            { type: 'text', q: 'Quels sont les 3 EPI (Équipements de Protection Individuelle) obligatoires en permanence dans l\'atelier ?', r: 'Chaussures de sécurité, bleu de travail, lunettes de protection.' },
            { type: 'text', q: 'Décrivez la procédure à suivre en cas de déversement d\'huile sur le sol.', r: 'Signaler la zone, utiliser de l\'absorbant pour contenir et nettoyer, puis jeter l\'absorbant souillé dans le bac dédié.' }
        ],
        activitePratique: [
            etape('Préparation et organisation de la zone', '30 min', [
                'Vérifier la propreté et l\'éclairage du poste de travail.',
                'Localiser les issues de secours et les équipements de première urgence (douche, lavage oculaire).',
                'S\'équiper avec les EPI obligatoires (bleu de travail, chaussures de sécurité, lunettes).',
                'Organiser le chariot à outils de façon méthodique.',
                'Identifier et repérer les différents bacs de tri sélectif.'
            ]),
            etape('Simulation d\'intervention type', '45 min', [
                'Préparer et organiser les outils nécessaires selon l\'intervention simulée.',
                'Mettre en place les protections pour le véhicule (housse de siège, tapis de protection).',
                'Adopter les bonnes postures de travail pour éviter les TMS.',
                'Identifier les bacs de tri pour les futurs déchets (huiles usagées, filtres, chiffons souillés).',
                'Vérifier l\'état et la disponibilité des équipements de protection.'
            ]),
            etape('Simulation d\'incident et procédures d\'urgence', '30 min', [
                'Simuler un départ de feu et expliquer la procédure PASS (Pointer, Appuyer, Secouer, Suivre).',
                'Simuler un déversement d\'huile et utiliser correctement l\'absorbant à disposition.',
                'Exercice d\'évacuation de l\'atelier en cas d\'urgence.',
                'Localiser et tester les équipements de lavage d\'urgence (douche, rince-œil).',
                'Simuler la procédure d\'alerte des secours.'
            ]),
            etape('Évaluation et finalisation', '15 min', [
                'Vérifier le bon rangement du poste de travail.',
                'Contrôler le tri des déchets effectué durant l\'exercice.',
                'Valider la conformité de la zone avec les standards de sécurité.',
                'Compléter la fiche de contrôle sécurité du poste.'
            ])
        ],
        securiteRangement: [
            'Port des EPI obligatoire en permanence',
            'Tri sélectif des déchets respecté selon la réglementation',
            'Zone de travail maintenue dégagée et propre',
            'Connaissance parfaite de l\'emplacement des équipements de sécurité'
        ],
        pointsCles: [
            'Organisation méthodique du poste de travail',
            'Respect strict des consignes de sécurité',
            'Utilisation correcte et systématique des EPI',
            'Gestion écologique et réglementaire des déchets'
        ]
    },
    102: {
        id: 102,
        duree: '1h30',
        titre: 'Levage d\'un Véhicule en Sécurité',
        situation: 'Un client dépose sa berline pour une inspection du soubassement. Vous devez lever le véhicule en utilisant un cric rouleur et des chandelles pour permettre une intervention en toute sécurité.',
        objectif: 'Maîtriser la procédure de levage sécurisé pour permettre une intervention sous le véhicule en respectant les points de levage constructeur. (Compétence C1.1)',
        materiel: ['Cric rouleur hydraulique', 'Paire de chandelles (capacité adaptée)', 'Cales de roues', 'Documentation technique (points de levage)', 'Clé de roue'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi est-il interdit de travailler sous un véhicule qui n\'est supporté que par un cric ?', r: 'Un cric est un appareil de levage, pas de support. Son système hydraulique peut céder, provoquant la chute du véhicule.' },
            { type: 'qcm', q: 'Quelle est la première action à effectuer avant même de positionner le cric ?', options: ['Desserrer les écrous de roue', 'Caler les roues qui restent au sol et serrer le frein à main', 'Ouvrir le capot'], r: 'Caler les roues qui restent au sol et serrer le frein à main' }
        ],
        activitePratique: [
            etape('Préparation et contrôles préalables', '20 min', [
                'Consulter la documentation technique pour identifier les points de levage constructeur spécifiques au modèle.',
                'Positionner le véhicule sur une surface plane, stable et dégagée.',
                'Placer les cales sur les roues qui resteront au sol (roues opposées au levage).',
                'Serrer fermement le frein à main et mettre la boîte de vitesse au point mort.',
                'Vérifier l\'état et la capacité du cric rouleur et des chandelles.'
            ]),
            etape('Opération de levage et calage sécurisé', '40 min', [
                'Positionner le cric rouleur exactement sur le point de levage préconisé par le constructeur.',
                'Lever le véhicule progressivement jusqu\'à la hauteur de travail souhaitée.',
                'Placer les chandelles aux emplacements de sécurité spécifiés dans la documentation.',
                'Descendre très doucement le véhicule pour qu\'il repose entièrement sur les chandelles.',
                'Vérifier impérativement la stabilité du véhicule en le secouant légèrement.',
                'Le cric doit rester en place comme sécurité supplémentaire, sans supporter le poids.'
            ]),
            etape('Procédure de descente sécurisée', '20 min', [
                'Remonter légèrement le véhicule avec le cric pour libérer totalement les chandelles.',
                'Retirer les chandelles une à une en s\'assurant qu\'aucune personne n\'est sous le véhicule.',
                'Descendre le véhicule très progressivement en contrôlant constamment la vitesse.',
                'Retirer le cric uniquement lorsque le véhicule repose complètement sur ses roues.',
                'Retirer les cales de roues et ranger tout le matériel.'
            ]),
            etape('Finalisation et rangement', '10 min', [
                'Ranger le cric rouleur et les chandelles à leur emplacement dédié.',
                'Nettoyer la zone de travail de tout résidu ou éclaboussure.',
                'Consigner l\'intervention sur la fiche de suivi si nécessaire.',
                'Vérifier que le véhicule est correctement positionné pour la suite des opérations.'
            ])
        ],
        securiteRangement: [
            'Ne jamais, sous aucun prétexte, travailler sous un véhicule uniquement sur cric',
            'Vérifier impérativement la stabilité avant toute intervention sous le véhicule',
            'Respecter scrupuleusement les points de levage indiqués par le constructeur',
            'Utiliser exclusivement des chandelles à capacité suffisante et en bon état'
        ],
        pointsCles: [
            'Points de levage constructeur respectés à la lettre',
            'Stabilité du véhicule vérifiée avant intervention',
            'Usage obligatoire des chandelles comme sécurité principale',
            'Procédure de sécurité appliquée rigoureusement'
        ]
    },
    103: {
        id: 103,
        duree: '2h00',
        titre: 'Utilisation d\'un Pont Élévateur 2 Colonnes',
        situation: 'Un SUV est confié à l\'atelier pour le remplacement des plaquettes de frein. L\'intervention nécessite l\'utilisation du pont élévateur à deux colonnes pour un accès optimal.',
        objectif: 'Positionner et lever un véhicule avec un pont 2 colonnes en respectant les règles de centrage et de sécurité. (Compétence C1.1)',
        materiel: ['Pont élévateur 2 colonnes', 'Patins de levage adaptés au véhicule', 'Documentation technique constructeur', 'Télécommande pont'],
        etudePrelim: [
            { type: 'text', q: 'Où se trouve généralement l\'information concernant les points de levage spécifiques d\'un véhicule ?', r: 'Dans la documentation technique du constructeur (RTA) ou parfois indiqué par un symbole sous la caisse.' },
            { type: 'text', q: 'Quelle est l\'étape la plus critique juste après avoir levé le véhicule de quelques centimètres ?', r: 'Arrêter la montée, et vérifier la stabilité et le bon positionnement des 4 patins avant de continuer à lever.' }
        ],
        activitePratique: [
            etape('Positionnement précis du véhicule', '30 min', [
                'Avancer le véhicule entre les colonnes en respectant parfaitement le centrage longitudinal.',
                'Vérifier l\'alignement avec les repères visuels du pont (lignes de guidage au sol).',
                'S\'assurer que le véhicule est en position neutre, frein à main serré fermement.',
                'Identifier les points de prise sous caisse selon la documentation technique constructeur.',
                'Vérifier la répartition des masses et l\'équilibrage du véhicule sur le pont.'
            ]),
            etape('Mise en place des bras et préparation du levage', '45 min', [
                'Consulter impérativement la RTA pour localiser les points de prise sous coque autorisés.',
                'Positionner avec précision les bras télescopiques du pont sous les points adéquats.',
                'Ajuster et orienter les patins pour obtenir une surface de contact optimale et stable.',
                'Vérifier que les bras sont symétriquement positionnés et bien verrouillés.',
                'S\'assurer que rien ne gêne la montée du véhicule (câbles, tuyaux, échappement).',
                'Effectuer un dernier contrôle visuel général avant levage.'
            ]),
            etape('Levage progressif et sécurisation', '30 min', [
                'Lever le véhicule de quelques centimètres seulement et arrêter immédiatement.',
                'Vérifier scrupuleusement la stabilité, l\'équilibre et le bon positionnement.',
                'Contrôler que les patins épousent parfaitement les surfaces de contact.',
                'Continuer le levage très progressivement jusqu\'à la hauteur de travail optimale.',
                'Enclencher impérativement la sécurité mécanique (crans de verrouillage automatique).',
                'Effectuer un test de stabilité en secouant légèrement le véhicule.'
            ]),
            etape('Vérifications finales et descente', '15 min', [
                'Vérifier une dernière fois que le véhicule ne présente aucun déséquilibre dangereux.',
                'S\'assurer que la zone sous le pont est parfaitement dégagée pour la descente.',
                'Désengager la sécurité mécanique uniquement au moment de la descente.',
                'Descendre le pont très progressivement en s\'assurant que personne ne se trouve dessous.',
                'Une fois au sol, replier soigneusement les bras du pont.',
                'Nettoyer les patins et ranger tous les accessoires à leur place.'
            ])
        ],
        securiteRangement: [
            'Vérification obligatoire de l\'état du pont avant chaque utilisation',
            'Respecter impérativement la charge maximale autorisée indiquée',
            'Toujours enclencher la sécurité mécanique pendant le travail',
            'Maintenir la zone sous le pont parfaitement dégagée pendant la descente'
        ],
        pointsCles: [
            'Centrage parfait du véhicule selon les repères',
            'Points de prise constructeur respectés scrupuleusement',
            'Sécurité mécanique obligatoirement enclenchée',
            'Stabilité vérifiée systématiquement avant intervention'
        ]
    },
    104: {
        id: 104,
        duree: '1h00',
        titre: 'Découverte du Poste de Conduite et des Témoins',
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
        ]
    },
    105: {
        id: 105,
        duree: '1h00',
        titre: 'Contrôle des Niveaux et Appoint des Fluides',
        situation: 'Lors d\'une réception véhicule pour un entretien courant, vous devez effectuer les contrôles systématiques des niveaux des différents fluides du compartiment moteur selon la check-list atelier.',
        objectif: 'Identifier les anomalies et réaliser les ajustements. (Compétences C1.1, C1.2, C1.3, C1.4)',
        materiel: ['Liquide de refroidissement spécifié', 'Produit lave-glace concentré', 'Liquide de frein DOT4 ou 5.1', 'Entonnoirs de différentes tailles', 'Chiffons propres non pelucheux'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi est-il crucial de contrôler les niveaux sur une surface plane ?', r: 'Pour garantir une lecture exacte des niveaux et éviter une fausse interprétation (trop bas ou trop haut).' },
            { type: 'text', q: 'Un niveau de liquide de frein bas peut indiquer quel problème autre qu\'une fuite ?', r: 'Une usure avancée des plaquettes de frein, car les pistons d\'étrier sortent davantage, ce qui fait baisser le niveau dans le bocal.' }
        ],
        activitePratique: [
            etape('Contrôle du système de refroidissement', '20 min', [
                'S\'assurer que le moteur est parfaitement froid avant toute manipulation.',
                'Contrôler le niveau du liquide de refroidissement dans le vase d\'expansion transparent.',
                'Vérifier que le niveau se situe correctement entre les repères MINI et MAXI gravés.',
                'Identifier le type de liquide utilisé par sa couleur et vérifier sa spécification.',
                'Effectuer l\'appoint nécessaire avec le liquide de refroidissement préconisé par le constructeur.',
                'Vérifier visuellement l\'absence de fuite sur les durites, colliers et radiateur.'
            ]),
            etape('Contrôle des circuits de freinage et lave-glace', '25 min', [
                'Contrôler minutieusement le niveau du liquide de frein dans le réservoir maître-cylindre.',
                'ATTENTION: Un niveau bas peut indiquer une usure avancée des plaquettes (anomalie à signaler impérativement).',
                'Examiner attentivement la couleur du liquide de frein (doit être clair, non brunâtre).',
                'Remplir complètement le réservoir de lave-glace avec un produit adapté à la saison.',
                'Tester le bon fonctionnement des gicleurs avant et arrière (si équipé).',
                'Vérifier l\'absence de fuite sur les circuits et la propreté des zones de remplissage.'
            ]),
            etape('Finalisation et restitution au client', '15 min', [
                'Signaler immédiatement au client toute anomalie constatée lors des contrôles.',
                'Expliquer l\'importance vitale de chaque fluide pour la sécurité et la fiabilité.',
                'Conseiller au client une surveillance régulière des niveaux entre les entretiens.',
                'Documenter précisément tous les appoints effectués sur la fiche d\'intervention.',
                'Nettoyer soigneusement le compartment moteur et fermer tous les bouchons.'
            ])
        ],
        securiteRangement: [
            'Effectuer tous les contrôles exclusivement moteur froid',
            'Ne jamais mélanger différents types ou marques de fluides',
            'Porter des gants de protection pour manipuler le liquide de frein (corrosif)',
            'Nettoyer immédiatement toute éclaboussure de liquide de frein sur la peinture'
        ],
        pointsCles: [
            'Tous les niveaux maintenus entre les repères MINI et MAXI',
            'Anomalies détectées et immédiatement signalées',
            'Fluides utilisés conformes aux spécifications constructeur',
            'Traçabilité complète de tous les appoints effectués'
        ]
    },
    106: {
        id: 106,
        duree: '1h45',
        titre: 'Contrôle et Remplacement des Ampoules',
        situation: 'Un client a été alerté par les forces de l\'ordre d\'un feu stop défectueux. Il demande un contrôle complet de l\'éclairage et le remplacement de toutes les ampoules nécessaires.',
        objectif: 'Identifier et remplacer les ampoules défectueuses. (Compétences C1.1, C1.2, C1.3)',
        materiel: ['Jeu d\'ampoules de rechange variées', 'Tournevis adaptés', 'Chiffon microfibre propre', 'Gants de protection', 'Assistant pour les tests'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi ne faut-il jamais toucher le verre d\'une ampoule halogène (H4, H7...) avec les doigts ?', r: 'La graisse des doigts crée un point chaud sur le verre, qui peut faire éclater l\'ampoule lorsqu\'elle chauffe.' },
            { type: 'text', q: 'Comment identifier le type exact d\'une ampoule défectueuse ?', r: 'En lisant les inscriptions gravées sur son culot (ex: P21W, H7 55W).' }
        ],
        activitePratique: [
            etape('Contrôle systématique complet de l\'éclairage', '30 min', [
                'Avec l\'aide d\'une deuxième personne ou d\'un miroir, tester méthodiquement toutes les fonctions d\'éclairage.',
                'Vérifier le bon fonctionnement des veilleuses avant et arrière.',
                'Contrôler les feux de croisement et les feux de route (commutation correcte).',
                'Tester les clignotants avant, arrière et répétiteurs latéraux des deux côtés.',
                'Vérifier tous les feux stop (y compris le 3ème feu stop central).',
                'Contrôler le feu de recul et les feux antibrouillard avant/arrière.',
                'Noter précisément toutes les ampoules défectueuses sur une fiche de contrôle.'
            ]),
            etape('Remplacement d\'une ampoule de signalisation arrière', '40 min', [
                'Accéder au bloc optique arrière (généralement par l\'intérieur du coffre).',
                'Identifier et déconnecter le porte-ampoules en le tournant ou en le déclipsant selon le système.',
                'Identifier précisément le type d\'ampoule défectueuse (exemple: P21/5W pour feu stop/veilleuse).',
                'Remplacer l\'ampoule en vérifiant le bon positionnement des ergots de guidage.',
                'Vérifier que la nouvelle ampoule fonctionne correctement avant le remontage complet.',
                'Remonter le porte-ampoules et re-tester l\'ensemble des fonctions.'
            ]),
            etape('Remplacement d\'une ampoule de phare avant (type H7)', '35 min', [
                'Accéder à l\'arrière du projecteur en retirant le cache étanche en caoutchouc.',
                'Débrancher délicatement le connecteur électrique de l\'ampoule défectueuse.',
                'Dégrafer l\'ampoule en actionnant le ressort de maintien métallique.',
                'Installer la nouvelle ampoule H7 en utilisant un chiffon propre, SANS jamais toucher le verre.',
                'Vérifier le bon positionnement de l\'ampoule dans son logement.',
                'Remettre l\'agrafe de maintien, reconnecter le connecteur électrique et remonter le cache étanche.',
                'Tester immédiatement le fonctionnement de l\'éclairage avant finalisation.'
            ])
        ],
        securiteRangement: [
            'Ne jamais toucher le verre des ampoules halogènes avec les doigts (risque de surchauffe)',
            'Utiliser systématiquement des gants propres ou un chiffon non pelucheux',
            'Vérifier impérativement la conformité de la nouvelle ampoule (type, puissance)',
            'Éliminer les anciennes ampoules selon la réglementation (recyclage spécialisé)'
        ],
        pointsCles: [
            'Contrôle exhaustif de toutes les fonctions d\'éclairage',
            'Remplacement correct sans contamination du verre',
            'Test systématique de chaque fonction après intervention',
            'Documentation complète des ampoules remplacées'
        ]
    },
     107: {
        id: 107,
        duree: '1h00',
        titre: 'Contrôle et Remplacement des Balais d\'Essuie-Glace',
        situation: 'Un client se plaint d\'une mauvaise visibilité sous la pluie, avec des traces laissées par les essuie-glaces. Un remplacement est nécessaire avant un long trajet.',
        objectif: 'Réaliser le remplacement des balais d\'essuie-glace et conseiller le client. (Compétences C1.1, C1.3)',
        materiel: ['Jeu de balais neufs', 'Chiffon', 'Produit de nettoyage vitre'],
        etudePrelim: [
            { type: 'text', q: 'Quelle précaution simple mais essentielle faut-il prendre pour protéger le pare-brise lors du remplacement des balais ?', r: 'Placer un carton ou un chiffon épais sur le pare-brise pour éviter qu\'il ne soit frappé par le bras métallique si celui-ci se rabat.' },
            { type: 'text', q: 'Citez deux signes qui indiquent qu\'un balai d\'essuie-glace est usé.', r: 'Il laisse des traces sur le pare-brise, il fait du bruit (saccades), la lame en caoutchouc est craquelée ou déchirée.' }
        ],
        activitePratique: [
            etape('Contrôle et Diagnostic', '15 min', [
                'Inspecter visuellement les balais existants (fissures, déformations).',
                'Tester le fonctionnement et observer les traces sur le pare-brise.',
                'Nettoyer le pare-brise pour éliminer les impuretés.'
            ]),
            etape('Remplacement des Balais', '30 min', [
                'Positionner les bras d\'essuie-glace en mode "service" si nécessaire.',
                'Protéger le pare-brise avec un carton pour éviter les impacts.',
                'Déposer les anciens balais en identifiant le type de fixation (clip, crochet).',
                'Installer les nouveaux balais en s\'assurant du verrouillage correct.'
            ]),
            etape('Validation et Conseil', '15 min', [
                'Tester le balayage avec du liquide lave-glace.',
                'Vérifier l\'absence de bruit et de trace.',
                'Conseiller le client sur l\'entretien (nettoyage régulier des lames).'
            ])
        ],
        securiteRangement: [
            'Protéger le pare-brise pendant l\'intervention',
            'S\'assurer du bon clipsage des nouveaux balais',
            'Jeter les anciens balais dans le bac approprié'
        ],
        pointsCles: [
            'Bonne identification du type de fixation',
            'Protection du pare-brise',
            'Test fonctionnel après remplacement'
        ]
    },
    108: {
        id: 108,
        duree: '1h30',
        titre: 'Contrôle de l\'État et de la Pression des Pneus',
        situation: 'Dans le cadre d\'une révision systématique, vous devez contrôler l\'ensemble des pneumatiques du véhicule, y compris la roue de secours.',
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
            etape('Contrôle de l\'Usure', '40 min', [
                'Mesurer la profondeur des sculptures en 3 points de la bande de roulement.',
                'Vérifier l\'atteinte du témoin d\'usure légal (1.6 mm).',
                'Inspecter les flancs pour détecter toute hernie, coupure ou craquelure.',
                'Analyser le type d\'usure (centre, bords, asymétrique) pour pré-diagnostiquer un problème de géométrie ou de pression.'
            ]),
            etape('Rapport et Conseil', '30 min', [
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
        ]
    },
    109: {
        id: 109,
        duree: '1h30',
        titre: 'Vidange Huile Moteur et Remplacement du Filtre',
        situation: 'Un véhicule se présente pour sa vidange annuelle. Vous devez effectuer l\'opération en respectant les procédures, le type d\'huile et le recyclage des déchets.',
        objectif: 'Réaliser une vidange moteur dans les règles de l\'art. (Compétences C1.2, C1.4)',
        materiel: ['Huile moteur préconisée', 'Filtre à huile neuf', 'Joint de vidange neuf', 'Clé à filtre', 'Récupérateur d\'huile usagée', 'Clé dynamométrique'],
        etudePrelim: [
            { type: 'text', q: 'Où se trouvent les informations sur le type d\'huile et la quantité préconisées pour un véhicule ?', r: 'Dans le carnet d\'entretien du véhicule ou dans la documentation technique (RTA).' },
            { type: 'text', q: 'Pourquoi est-il indispensable de remplacer le joint du bouchon de vidange à chaque fois ?', r: 'Pour garantir une étanchéité parfaite et éviter les fuites. Le joint s\'écrase au serrage et n\'est plus réutilisable.' }
        ],
        activitePratique: [
            etape('Préparation et Vidange', '30 min', [
                'Faire tourner le moteur quelques minutes pour fluidifier l\'huile.',
                'Placer le récupérateur d\'huile sous le carter.',
                'Desserrer et retirer le bouchon de vidange.',
                'Laisser l\'huile s\'écouler complètement.'
            ]),
            etape('Remplacement du Filtre et Remplissage', '40 min', [
                'Pendant que l\'huile s\'écoule, déposer l\'ancien filtre à huile.',
                'Huiler légèrement le joint du nouveau filtre.',
                'Visser le nouveau filtre à la main jusqu\'au contact, puis serrer d\'un quart de tour supplémentaire (ou au couple si spécifié).',
                'Nettoyer la portée du bouchon de vidange, mettre un joint neuf et serrer au couple.',
                'Remplir avec la quantité d\'huile préconisée.'
            ]),
            etape('Contrôle Final', '20 min', [
                'Démarrer le moteur, laisser tourner 1 minute pour remplir le filtre.',
                'Couper le moteur, attendre 5 minutes.',
                'Faire le niveau d\'huile à la jauge et ajuster si nécessaire, sans dépasser le maximum.',
                'Vérifier l\'absence de fuite au bouchon et au filtre.'
            ])
        ],
        securiteRangement: [
            'Utiliser un récupérateur d\'huile étanche',
            'Manipuler l\'huile chaude avec précaution (gants)',
            'Stocker l\'huile et le filtre usagés dans les bacs de recyclage dédiés'
        ],
        pointsCles: [
            'Utilisation de l\'huile préconisée',
            'Remplacement systématique du joint de vidange et du filtre',
            'Serrage au couple du bouchon de vidange'
        ]
    },
    110: {
        id: 110,
        duree: '1h00',
        titre: 'Contrôle et Remplacement du Filtre à Air',
        situation: 'Lors d\'un entretien, vous devez vérifier l\'état du filtre à air et le remplacer si nécessaire pour garantir une bonne respiration du moteur.',
        objectif: 'Évaluer l\'état du filtre à air et le remplacer si besoin. (Compétences C1.2, C1.3, C1.4)',
        materiel: ['Filtre à air neuf', 'Soufflette (optionnel, pour nettoyage boîtier)', 'Tournevis ou clés adaptés'],
        etudePrelim: [
            { type: 'qcm', q: 'Un filtre à air très encrassé peut provoquer :', options: ['Une surconsommation de carburant', 'Une augmentation de la puissance', 'Un meilleur refroidissement'], r: 'Une surconsommation de carburant' },
            { type: 'text', q: 'Peut-on nettoyer un filtre à air en papier avec une soufflette ? Pourquoi ?', r: 'Non, car l\'air comprimé endommage la structure du papier, créant des micro-déchirures qui laissent passer les poussières et annulent son pouvoir de filtration.' }
        ],
        activitePratique: [
            etape('Diagnostic', '20 min', [
                'Localiser le boîtier du filtre à air.',
                'Ouvrir le boîtier et extraire le filtre.',
                'Inspecter le filtre à la lumière : vérifier son encrassement et l\'absence de déchirure.'
            ]),
            etape('Intervention', '25 min', [
                'Nettoyer l\'intérieur du boîtier avec un chiffon ou une soufflette (vers l\'extérieur).',
                'Insérer le nouveau filtre en respectant son sens de montage.',
                'Refermer et visser correctement le couvercle du boîtier.'
            ]),
            etape('Conseil Client', '15 min', [
                'Montrer l\'ancien filtre au client pour justifier le remplacement.',
                'Expliquer l\'impact d\'un filtre encrassé sur la consommation et la performance.',
                'Noter l\'intervention sur la fiche de suivi du véhicule.'
            ])
        ],
        securiteRangement: [
            'S\'assurer de la parfaite étanchéité du boîtier après intervention',
            'Ne pas souffler d\'air comprimé à travers le filtre pour le "nettoyer"',
            'Jeter l\'ancien filtre dans le bac des déchets non recyclables'
        ],
        pointsCles: [
            'Diagnostic visuel fiable de l\'encrassement',
            'Bon positionnement du filtre neuf',
            'Justification du remplacement auprès du client'
        ]
    },
    111: {
        id: 111,
        duree: '1h00',
        titre: 'Remplacement d\'une Roue',
        situation: 'Un client a crevé et a utilisé sa roue de secours. Il vient à l\'atelier pour faire réparer son pneu et remonter la roue d\'origine. Vous devez effectuer le changement de roue en toute sécurité en utilisant le cric de bord du véhicule.',
        objectif: 'Maîtriser la procédure sécurisée de remplacement d\'une roue en utilisant les outils fournis avec le véhicule. (Compétence C1.1)',
        materiel: ['Cric de bord', 'Clé de roue', 'Cales de roues', 'Roue de secours/réparée', 'Gants de protection', 'Clé dynamométrique'],
        etudePrelim: [
            { type: 'qcm', q: 'Avant de soulever le véhicule avec le cric, quelle est l\'action prioritaire à effectuer ?', options: ['Ouvrir le coffre', 'Allumer les feux de détresse', 'Serrer le frein à main et caler les roues'], r: 'Serrer le frein à main et caler les roues' },
            { type: 'text', q: 'Dans quel ordre faut-il serrer les écrous de roue et pourquoi ?', r: 'En étoile (ou en croix). Pour assurer un placage uniforme de la roue contre le moyeu et éviter de la voiler.' }
        ],
        activitePratique: [
            etape('Préparation du Véhicule', '20 min', [
                'Stationner le véhicule sur une surface plane et stable.',
                'Serrer le frein à main et engager une vitesse (ou la position P).',
                'Placer les cales sur la roue diagonalement opposée à celle à changer.',
                'Desserrer les écrous de la roue à déposer d\'un quart de tour (roue encore au sol).'
            ]),
            etape('Levage et Remplacement', '25 min', [
                'Positionner le cric de bord sur le point de levage constructeur.',
                'Lever le véhicule jusqu\'à ce que la roue ne touche plus le sol.',
                'Déposer complètement les écrous et retirer la roue.',
                'Positionner la nouvelle roue et visser les écrous à la main sans forcer.'
            ]),
            etape('Descente et Serrage Final', '15 min', [
                'Descendre le véhicule jusqu\'à ce que la roue touche légèrement le sol.',
                'Effectuer un pré-serrage des écrous en étoile avec la clé de roue.',
                'Descendre complètement le véhicule et retirer le cric.',
                'Effectuer le serrage final au couple préconisé avec une clé dynamométrique.'
            ])
        ],
        securiteRangement: [
            'Ne jamais se positionner sous un véhicule soutenu par un cric de bord.',
            'Toujours travailler sur une surface stable.',
            'Respecter l\'ordre de serrage en étoile.',
            'Vérifier le couple de serrage final avec une clé dynamométrique.'
        ],
        pointsCles: [
            'Serrage au couple en étoile',
            'Utilisation correcte des points de levage',
            'Procédure de sécurité (cales, frein à main)',
            'Contrôle final du serrage'
        ]
    },
    112: {
        id: 112,
        duree: '1h15',
        titre: 'Contrôle et Remplacement d\'une Batterie',
        situation: 'Un client se plaint de difficultés de démarrage le matin. Vous devez contrôler la batterie et la remplacer si le diagnostic le confirme.',
        objectif: 'Diagnostiquer l\'état d\'une batterie, la remplacer en toute sécurité et initialiser le nouveau composant si nécessaire. (Compétence C1.2, C1.3)',
        materiel: ['Multimètre', 'Testeur de batterie', 'Jeu de clés', 'Graisse pour cosses', 'Sauvegarde mémoire (si nécessaire)', 'Batterie neuve'],
        etudePrelim: [
            { type: 'qcm', q: 'Dans quel ordre faut-il débrancher les cosses de la batterie pour éviter un court-circuit ?', options: ['D\'abord la cosse Positive (+)', 'D\'abord la cosse Négative (-)', 'Peu importe l\'ordre'], r: 'D\'abord la cosse Négative (-)' },
            { type: 'text', q: 'Qu\'est-ce que le test "CCA" (Cold Cranking Amps) effectué par un testeur de batterie ?', r: 'C\'est une mesure de la capacité de la batterie à fournir un courant élevé au démarrage, à froid. C\'est un indicateur clé de son état de santé.' },
            { type: 'text', q: 'Pourquoi peut-il être nécessaire d\'utiliser un appareil de sauvegarde mémoire avant de débrancher la batterie sur un véhicule moderne ?', r: 'Pour éviter de perdre les données des calculateurs (autoradio, horloge, adaptations moteur, initialisation de vitres électriques, etc.).' }
        ],
        activitePratique: [
            etape('Diagnostic de la Batterie', '25 min', [
                'Inspecter visuellement la batterie (propreté, absence de fuite, date).',
                'Mesurer la tension à vide avec un multimètre (doit être > 12.4V).',
                'Effectuer un test complet avec le testeur de batterie (état de santé et état de charge).',
                'Contrôler la bonne fixation de la batterie et des cosses.'
            ]),
            etape('Remplacement de la Batterie', '30 min', [
                'Brancher une sauvegarde mémoire si nécessaire.',
                'Débrancher la cosse négative (-), puis la cosse positive (+).',
                'Déposer le système de fixation et retirer l\'ancienne batterie.',
                'Nettoyer les cosses et le support de batterie.',
                'Installer la nouvelle batterie, la fixer correctement.',
                'Brancher la cosse positive (+), puis la cosse négative (-).',
                'Graisser les cosses pour les protéger de la corrosion.'
            ]),
            etape('Initialisation et Validation', '20 min', [
                'Débrancher la sauvegarde mémoire.',
                'Effectuer les réinitialisations nécessaires (horloge, vitres électriques...) selon la procédure constructeur.',
                'Démarrer le véhicule et contrôler la tension de charge de l\'alternateur (entre 13.5V et 14.8V).'
            ])
        ],
        securiteRangement: [
            'Porter des gants et des lunettes de protection.',
            'Respecter l\'ordre de débranchement/rebranchement des cosses.',
            'Manipuler la batterie avec précaution (lourde et contient de l\'acide).',
            'Stocker l\'ancienne batterie dans la zone de recyclage dédiée.'
        ],
        pointsCles: [
            'Test de santé avec un testeur dédié',
            'Ordre de déconnexion : Négatif en premier',
            'Ordre de connexion : Positif en premier',
            'Serrage ferme des cosses et de la fixation'
        ]
    }
};

    


    

