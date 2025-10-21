
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
        objectif: 'Organiser son espace de travail de manière sûre et efficace, en identifiant les risques et en utilisant les Équipements de Protection Individuelle (EPI). (Compétence C1.1)',
        materiel: ['Bleu de travail', 'Chaussures de sécurité', 'Lunettes de protection', 'Gants', 'Chariot à outils', 'Extincteur (localisation)', 'Zone de tri des déchets'],
        etudePrelim: [
            { type: 'text', q: 'Citez au moins 3 des 5 types de risques majeurs présents dans un atelier automobile.', r: 'Risques mécaniques (pièces en mouvement), chimiques (fluides, vapeurs), électriques (haute tension), thermiques (pièces chaudes), et risques d\'incendie.' },
            { type: 'qcm', q: 'Un panneau de sécurité de forme ronde avec un pictogramme barré de rouge indique :', options: ['Une obligation', 'Un danger', 'Une interdiction', 'Une information de sauvetage'], r: 'Une interdiction' },
            { type: 'text', q: 'Que signifie l\'acronyme TMS et comment peut-on les prévenir dans un atelier ?', r: 'Troubles Musculo-Squelettiques. On les prévient en adoptant de bonnes postures, en utilisant des aides à la manutention et en faisant des pauses.' },
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
            { type: 'qcm', q: 'Pourquoi est-il absolument interdit de travailler sous un véhicule reposant uniquement sur un cric ?', options: ['Le cric pourrait se dégonfler lentement', 'Un cric n\'est pas un organe de maintien mais de levage', 'Le cric n\'est pas stable latéralement'], r: 'Un cric n\'est pas un organe de maintien mais de levage' },
            { type: 'text', q: 'Où trouve-t-on l\'information fiable pour localiser les points de levage d\'un véhicule ?', r: 'Dans la documentation technique du constructeur (RTA ou logiciel de données techniques).' },
            { type: 'qcm', q: 'Une fois le véhicule posé sur les chandelles, quelle est l\'action de sécurité impérative à réaliser avant toute intervention ?', options: ['Retirer le cric pour avoir plus de place', 'Secouer légèrement le véhicule pour tester sa stabilité', 'Lever une autre roue'], r: 'Secouer légèrement le véhicule pour tester sa stabilité' }
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
            { type: 'text', q: 'Pourquoi le centrage longitudinal (avant/arrière) d\'un véhicule sur un pont 2 colonnes est-il si critique ?', r: 'Pour répartir correctement le poids par rapport au centre de gravité du véhicule et éviter un basculement vers l\'avant ou l\'arrière.' },
            { type: 'qcm', q: 'Quelle est la première chose à faire juste après avoir levé le véhicule de quelques centimètres ?', options: ['Commencer à travailler', 'Monter le véhicule à hauteur d\'homme', 'Arrêter et vérifier la stabilité et le positionnement des patins'], r: 'Arrêter et vérifier la stabilité et le positionnement des patins' },
            { type: 'text', q: 'Quel est le rôle des crans de sécurité mécaniques du pont élévateur ?', r: 'Ils servent de sécurité redondante en cas de défaillance hydraulique, en bloquant mécaniquement la descente du pont.' }
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
        objectif: 'Identifier toutes les commandes usuelles et interpréter correctement les témoins d\'alerte pour informer et rassurer le client. (Compétence C1.4)',
        materiel: ['Véhicule en état de fonctionnement', 'Manuel utilisateur du constructeur', 'Fiche de relevé des témoins', 'Stylo'],
        etudePrelim: [
            { type: 'qcm', q: 'Un témoin de couleur ORANGE qui reste allumé après démarrage indique :', options: ['Une panne grave nécessitant un arrêt immédiat', 'Une information de fonctionnement (ex: feux allumés)', 'Une anomalie à vérifier prochainement, sans urgence immédiate'], r: 'Une anomalie à vérifier prochainement, sans urgence immédiate' },
            { type: 'qcm', q: 'Quel témoin impose un arrêt IMMÉDIAT du véhicule ?', options: ['Pression des pneus', 'Niveau de lave-glace', 'Pression d\'huile moteur'], r: 'Pression d\'huile moteur' },
            { type: 'text', q: 'À quoi sert la phase d\'autotest des témoins lorsque l\'on met le contact ?', r: 'Elle permet de vérifier que toutes les ampoules des témoins fonctionnent correctement avant le démarrage du moteur.' }
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
        objectif: 'Identifier précisément tous les niveaux et réaliser les ajustements nécessaires pour maintenir le bon fonctionnement des systèmes. (Compétences C1.2, C1.3)',
        materiel: ['Liquide de refroidissement spécifié', 'Produit lave-glace concentré', 'Liquide de frein DOT4 ou 5.1', 'Entonnoirs de différentes tailles', 'Chiffons propres non pelucheux'],
        etudePrelim: [
            { type: 'qcm', q: 'Pourquoi le niveau de liquide de refroidissement doit-il se contrôler moteur FROID ?', options: ['Le liquide chaud est moins visible', 'Pour éviter le risque de brûlure et parce que le niveau est faussé par la dilatation', 'C\'est une préférence de mécanicien'], r: 'Pour éviter le risque de brûlure et parce que le niveau est faussé par la dilatation' },
            { type: 'text', q: 'Un niveau de liquide de frein qui a beaucoup baissé (mais est encore au-dessus du mini) indique le plus souvent...', r: 'Une usure normale mais avancée des plaquettes de frein (les pistons sont plus sortis).' },
            { type: 'text', q: 'Peut-on mélanger un liquide de refroidissement de type "organique" (rose/jaune) avec un type "minéral" (bleu/vert) ? Pourquoi ?', r: 'Non, car leurs additifs sont incompatibles et le mélange peut créer des boues qui bouchent le circuit et annulent la protection anti-corrosion.' }
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
        objectif: 'Identifier méthodiquement toutes les ampoules défectueuses et réaliser leur remplacement en respectant les bonnes pratiques. (Compétences C1.2, C1.3)',
        materiel: ['Jeu d\'ampoules de rechange variées', 'Tournevis adaptés', 'Chiffon microfibre propre', 'Gants de protection', 'Assistant pour les tests'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi ne faut-il jamais toucher le verre d\'une ampoule halogène (H4, H7) avec les doigts ?', r: 'Le gras des doigts crée un point chaud sur le verre qui réduit considérablement la durée de vie de l\'ampoule et peut la faire éclater.' },
            { type: 'qcm', q: 'Vous remplacez une ampoule de phare avant. Quelle est la meilleure pratique ?', options: ['Remplacer uniquement celle qui est grillée', 'Remplacer les deux ampoules (gauche et droite) en même temps', 'Attendre que l\'autre grille'], r: 'Remplacer les deux ampoules (gauche et droite) en même temps' },
            { type: 'text', q: 'Comment différenciez-vous une ampoule P21W (un filament) d\'une P21/5W (deux filaments) ?', r: 'L\'ampoule P21/5W a deux filaments visibles à l\'intérieur et deux plots de contact au lieu d\'un seul sur son culot.' }
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
        duree: '1h15',
        titre: 'Contrôle de la Batterie et du Circuit de Charge',
        situation: 'Un client se plaint de démarrages difficiles et laborieux le matin, surtout par temps froid. Vous devez réaliser un diagnostic de base de la batterie et du système de charge.',
        objectif: 'Identifier une anomalie potentielle sur le circuit de démarrage et de charge à l\'aide d\'un multimètre. (Compétence C1.2)',
        materiel: ['Multimètre numérique de qualité', 'Nettoyant contact spécialisé', 'Clés plates de 10 et 13 mm', 'Gants isolants et lunettes de protection'],
        etudePrelim: [
            { type: 'qcm', q: 'Une batterie 12V en bonne santé, moteur arrêté depuis plusieurs heures, doit avoir une tension :', options: ['Inférieure à 12V', 'Entre 12V et 12,3V', 'Supérieure à 12,4V'], r: 'Supérieure à 12,4V' },
            { type: 'qcm', q: 'Moteur tournant, vous mesurez 13,2V aux bornes de la batterie. Que concluez-vous ?', options: ['Le circuit de charge est parfait', 'L\'alternateur ne charge pas assez', 'L\'alternateur charge trop'], r: 'L\'alternateur ne charge pas assez' },
            { type: 'text', q: 'Quel est le risque si vous mesurez plus de 15V aux bornes de la batterie moteur tournant ?', r: 'Une surcharge, qui peut "cuire" la batterie et endommager les calculateurs électroniques du véhicule.' }
        ],
        activitePratique: [
            etape('Contrôle approfondi de la batterie à l\'arrêt', '30 min', [
                'Effectuer une inspection visuelle complète de l\'état des cosses (oxydation, corrosion, serrage).',
                'Nettoyer soigneusement les cosses et bornes avec le produit nettoyant spécialisé si nécessaire.',
                'Mesurer précisément la tension aux bornes de la batterie (doit être supérieure à 12,4 V).',
                'Interpréter correctement une tension faible comme indicateur d\'une batterie déchargée ou défaillante.',
                'Noter la capacité nominale de la batterie (Ah) et tenter de déterminer son âge.',
                'Vérifier l\'état physique de la batterie (gonflements, fuites, fissures).'
            ]),
            etape('Contrôle du circuit de charge en fonctionnement', '30 min', [
                'Démarrer le moteur et le maintenir au ralenti stabilisé.',
                'Mesurer la tension aux bornes de la batterie moteur tournant.',
                'La tension doit impérativement être comprise entre 13,8 V et 14,8 V.',
                'Activer plusieurs consommateurs électriques (phares, ventilation, dégivrage arrière).',
                'Vérifier que la tension reste stable malgré l\'activation des consommateurs.',
                'Accélérer modérément le moteur et vérifier que la tension ne dépasse jamais 15V (surcharge).'
            ]),
            etape('Analyse des résultats et conseil client', '15 min', [
                'Synthétiser clairement tous les résultats de mesure obtenus.',
                'Établir un pré-diagnostic précis (batterie HS, alternateur défaillant, consommation parasite, etc.).',
                'Conseiller le client sur les actions correctives à mener (recharge, test approfondi, remplacement).',
                'Documenter rigoureusement toutes les mesures effectuées sur la fiche d\'intervention.',
                'Expliquer au client l\'importance de l\'entretien préventif du circuit électrique.'
            ])
        ],
        securiteRangement: [
            'Porter impérativement des gants et lunettes (risque de projection d\'acide)',
            'Ne jamais court-circuiter volontairement les bornes de la batterie',
            'Respecter scrupuleusement la polarité lors de toutes les mesures',
            'Nettoyer immédiatement toute projection d\'acide avec de l\'eau abondante'
        ],
        pointsCles: [
            'Tension batterie au repos supérieure à 12,4V obligatoire',
            'Tension de charge maintenue entre 13,8V et 14,8V',
            'Cosses parfaitement propres et correctement serrées',
            'Diagnostic précis et clairement communiqué au client'
        ]
    },
    108: {
        id: 108,
        duree: '1h30',
        titre: 'Contrôle et Mise à Pression des Pneumatiques',
        situation: 'Dans le cadre d\'un \"check-up vacances\", un client demande de vérifier l\'état général et la pression de ses pneumatiques avant un long trajet en famille.',
        objectif: 'Identifier toute anomalie d\'usure et ajuster précisément les pressions pour garantir la sécurité et la performance optimale du véhicule. (Compétences C1.2, C1.3)',
        materiel: ['Contrôleur de pression numérique précis', 'Gonfleur d\'atelier', 'Jauge de profondeur de sculptures', 'Documentation constructeur (étiquette de porte)', 'Craie pour marquage'],
        etudePrelim: [
            { type: 'text', q: 'Où se trouve l\'étiquette indiquant les pressions de pneus préconisées par le constructeur ?', r: 'Généralement dans l\'ouverture de la porte conducteur, la trappe à carburant ou le manuel du véhicule.' },
            { type: 'qcm', q: 'La profondeur minimale légale des sculptures d\'un pneu en France est de :', options: ['1 mm', '1,6 mm', '2 mm'], r: '1,6 mm' },
            { type: 'qcm', q: 'Une usure plus prononcée sur les deux bords (épaules) de la bande de roulement est typique d\'un roulage en :', options: ['Sous-gonflage', 'Surgonflage', 'Défaut de parallélisme'], r: 'Sous-gonflage' }
        ],
        activitePratique: [
            etape('Inspection visuelle complète et méthodique', '30 min', [
                'Contrôler minutieusement les flancs de chaque pneu (recherche de coupures, hernies, déformations, corps étrangers).',
                'Mesurer la profondeur des sculptures en 3 points de chaque pneu (bord intérieur, centre, bord extérieur).',
                'Vérifier que la profondeur est partout supérieure à 1,6 mm (limite légale française).',
                'Contrôler la présence et l\'état des bouchons de valve (étanchéité, propreté).',
                'Identifier et noter l\'indice de charge et de vitesse inscrit sur le flanc de chaque pneu.',
                'Rechercher les signes d\'usure anormale révélateurs de défauts géométriques.'
            ]),
            etape('Relevé précis des pressions existantes', '30 min', [
                'Identifier les pressions préconisées sur l\'étiquette constructeur du véhicule (montant de porte).',
                'Noter distinctement les pressions recommandées à vide et en charge (si différentes).',
                'Mesurer la pression de chaque pneu à froid avec le contrôleur numérique étalonné.',
                'Comparer systématiquement les valeurs relevées aux préconisations officielles.',
                'Noter tous les écarts significatifs et identifier les causes possibles.',
                'Vérifier l\'homogénéité des pressions entre pneus de même essieu.'
            ]),
            etape('Ajustement des pressions et conseils', '30 min', [
                'Ajuster la pression de chaque pneu selon l\'usage prévu (voyage chargé, conditions spéciales).',
                'Gonfler ou dégonfler progressivement pour atteindre exactement la pression cible.',
                'Remettre soigneusement tous les bouchons de valve après ajustement.',
                'Informer le client sur l\'état d\'usure général et l\'importance d\'une pression correcte.',
                'Conseiller un contrôle de géométrie si une usure anormale a été détectée.',
                'Expliquer la fréquence de contrôle recommandée (mensuelle minimum).'
            ])
        ],
        securiteRangement: [
            'Effectuer les contrôles exclusivement à froid (attendre 3h après roulage)',
            'Respecter scrupuleusement les pressions constructeur selon le chargement',
            'Signaler immédiatement au client tout pneu endommagé ou dangereux',
            'Ne jamais surgonfler au-delà des limites (risque d\'éclatement)'
        ],
        pointsCles: [
            'Profondeur des sculptures supérieure à 1,6mm partout',
            'Pressions ajustées conformément aux préconisations constructeur',
            'Absence totale de dommages visibles compromettant la sécurité',
            'Conseil client documenté et fiche de contrôle complétée'
        ]
    },
    109: {
        id: 109,
        duree: '1h30',
        titre: 'Remplacement des Plaquettes de Frein Avant',
        situation: 'Le témoin d\'usure des freins s\'est allumé sur le tableau de bord d\'un client. Une inspection confirme que les plaquettes avant sont à remplacer selon les critères d\'usure.',
        objectif: 'Réaliser le remplacement d\'un élément d\'usure du système de freinage en respectant scrupuleusement la méthode constructeur. (Compétence C1.3)',
        materiel: ['Jeu de plaquettes neuves certifiées', 'Repousse-piston d\'étrier', 'Nettoyant frein sans solvant chloré', 'Graisse au cuivre haute température', 'Clé dynamométrique', 'Outillage de base complet'],
        etudePrelim: [
            { type: 'text', q: 'Quelle est l\'étape la plus importante à réaliser immédiatement après avoir remonté les roues, avant même de faire rouler le véhicule ?', r: 'Pomper plusieurs fois sur la pédale de frein jusqu\'à ce qu\'elle devienne dure, pour mettre les nouvelles plaquettes en contact avec le disque.' },
            { type: 'qcm', q: 'Où doit-on appliquer la graisse au cuivre ?', options: ['Sur la surface de friction de la plaquette', 'Sur le disque de frein', 'Uniquement sur les points de contact métalliques entre la plaquette et le support d\'étrier'], r: 'Uniquement sur les points de contact métalliques entre la plaquette et le support d\'étrier' },
            { type: 'text', q: 'Pendant que vous repoussez le piston de l\'étrier, quelle précaution devez-vous prendre concernant le réservoir de liquide de frein ?', r: 'Surveiller le niveau du liquide de frein pour qu\'il ne déborde pas. Si besoin, en aspirer une petite quantité.' }
        ],
        activitePratique: [
            etape('Préparation et démontage sécurisé', '30 min', [
                'Lever le véhicule et le sécuriser impérativement avec des chandelles.',
                'Déposer la roue avant et nettoyer la zone de travail.',
                'Nettoyer soigneusement tout l\'étrier de frein avec le nettoyant spécialisé.',
                'Dévisser les vis de colonnette de l\'étrier et basculer celui-ci vers le haut.',
                'Retirer délicatement les anciennes plaquettes et déconnecter le témoin d\'usure électrique.',
                'Marquer l\'emplacement de chaque plaquette pour éviter les erreurs de remontage.'
            ]),
            etape('Contrôle approfondi et nettoyage', '30 min', [
                'Inspecter minutieusement l\'état du disque (rayures profondes, voile, respect de la cote minimale).',
                'Nettoyer parfaitement les portées des plaquettes sur le support d\'étrier.',
                'Contrôler l\'état des pistons et l\'intégrité des soufflets de protection.',
                'Repousser progressivement le piston de l\'étrier avec l\'outil adapté (surveiller le niveau de liquide de frein).',
                'Vérifier la liberté de coulissement de l\'étrier sur ses glissières et les nettoyer.',
                'Contrôler l\'absence de fuite de liquide de frein sur tout le circuit.'
            ]),
            etape('Remontage méthodique et finalisation', '30 min', [
                'Installer les nouvelles plaquettes dans le support en respectant leur emplacement spécifique.',
                'Connecter soigneusement le nouveau témoin d\'usure électrique selon le schéma.',
                'Appliquer une fine couche de graisse cuivre haute température sur les portées uniquement.',
                'Remonter l\'étrier de frein et serrer les vis au couple préconisé par le constructeur.',
                'Remonter la roue et serrer les écrous au couple spécifié.',
                'Pomper énergiquement plusieurs fois sur la pédale pour mettre les plaquettes en contact.',
                'Contrôler et compléter le niveau de liquide de frein dans le réservoir maître-cylindre.'
            ])
        ],
        securiteRangement: [
            'Porter impérativement un masque anti-poussière (risque amiante sur anciens véhicules)',
            'Utiliser exclusivement un nettoyant frein sans solvant chloré',
            'Respecter scrupuleusement tous les couples de serrage spécifiés',
            'Effectuer obligatoirement un test de fermeté de pédale avant essai routier'
        ],
        pointsCles: [
            'État des disques contrôlé et validé systématiquement',
            'Pistons repoussés correctement avec surveillance du niveau',
            'Tous les couples de serrage respectés selon documentation',
            'Pédale ferme et progressive obtenue après intervention'
        ]
    },
    110: {
        id: 110,
        duree: '1h45',
        titre: 'Vidange et Remplacement du Filtre à Huile',
        situation: 'Un client se présente pour l\'entretien périodique de son véhicule selon le planning constructeur. La première étape cruciale est la vidange de l\'huile moteur et le remplacement du filtre.',
        objectif: 'Réaliser le remplacement des fluides et des éléments d\'usure conformément à la procédure constructeur et aux normes environnementales. (Compétence C1.3)',
        materiel: ['Huile moteur préconisée par constructeur', 'Filtre à huile neuf d\'origine', 'Joint de bouchon de vidange neuf', 'Clé de vidange adaptée', 'Clé à sangle pour filtre', 'Bac de récupération agréé', 'Entonnoir propre', 'Chiffons absorbants'],
        etudePrelim: [
            { type: 'text', q: 'Quelle est la viscosité d\'huile recommandée pour ce véhicule ? Où trouvez-vous cette information ?', r: 'L\'information se trouve dans la documentation technique (RTA) ou le carnet d\'entretien du véhicule.' },
            { type: 'qcm', q: 'Quelle est la bonne méthode pour serrer un filtre à huile neuf ?', options: ['Le plus fort possible avec la clé à sangle', 'Serrer à la main jusqu\'au contact, puis ajouter 1/4 à 1/2 tour', 'Serrer au couple avec une clé dynamométrique spéciale'], r: 'Serrer à la main jusqu\'au contact, puis ajouter 1/4 à 1/2 tour' },
            { type: 'qcm', q: 'Après avoir rempli l\'huile et démarré le moteur, le témoin de pression d\'huile s\'éteint. Vous coupez le moteur. Que faites-vous ensuite ?', options: ['Le niveau est bon, l\'intervention est finie', 'J\'attends 5 minutes, puis je contrôle le niveau à la jauge et je fais l\'appoint si nécessaire', 'Je complète avec 0.5L d\'huile supplémentaire par sécurité'], r: 'J\'attends 5 minutes, puis je contrôle le niveau à la jauge et je fais l\'appoint si nécessaire' }
        ],
        activitePratique: [
            etape('Préparation rigoureuse de l\'intervention', '20 min', [
                'Vérifier impérativement les préconisations constructeur (type d\'huile, viscosité, quantité exacte).',
                'Contrôler et valider la référence exacte du filtre à huile pour ce modèle.',
                'Faire tourner le moteur 2-3 minutes pour fluidifier l\'huile et optimiser la vidange.',
                'Lever le véhicule et le sécuriser selon les règles de sécurité.',
                'Positionner correctement le bac de récupération agréé sous le carter moteur.'
            ]),
            etape('Vidange complète et remplacement du filtre', '50 min', [
                'Dévisser progressivement le bouchon de vidange et laisser l\'huile s\'écouler totalement.',
                'Pendant l\'écoulement, localiser et accéder au filtre à huile.',
                'Desserrer et retirer l\'ancien filtre avec précaution (attention aux coulures d\'huile).',
                'Nettoyer parfaitement la portée du filtre sur le bloc moteur.',
                'Huiler le joint du nouveau filtre avec quelques gouttes d\'huile neuve.',
                'Visser le nouveau filtre à la main jusqu\'au contact du joint puis ajouter 1/4 de tour.',
                'Nettoyer minutieusement le bouchon et sa portée, installer le joint neuf.',
                'Revisser le bouchon de vidange au couple préconisé (généralement 25-30 Nm).'
            ]),
            etape('Remplissage et contrôles de validation', '35 min', [
                'Descendre le véhicule et accéder au remplissage d\'huile.',
                'Remplir avec la quantité exacte d\'huile préconisée via l\'entonnoir propre.',
                'Démarrer le moteur et le laisser tourner 1 minute (témoin pression doit s\'éteindre).',
                'Couper le moteur et attendre 5 minutes pour décantation complète.',
                'Contrôler le niveau à la jauge (doit se situer entre MIN et MAX).',
                'Ajuster précisément le niveau si nécessaire par petites quantités.',
                'Vérifier scrupuleusement l\'absence de fuites sous le véhicule.',
                'Apposer l\'étiquette de vidange sur le moteur avec date et kilométrage.'
            ])
        ],
        securiteRangement: [
            'Attention à l\'huile chaude : risque grave de brûlure',
            'Récupération obligatoire de toute l\'huile usagée via filière agréée',
            'Filtre usagé éliminé exclusivement via circuit de recyclage spécialisé',
            'Nettoyer immédiatement toute coulure d\'huile pour éviter la pollution'
        ],
        pointsCles: [
            'Huile utilisée rigoureusement conforme aux spécifications constructeur',
            'Joints de bouchon et filtre systématiquement remplacés par du neuf',
            'Niveau d\'huile parfaitement ajusté entre repères MIN et MAX',
            'Absence totale de fuite vérifiée après intervention'
        ]
    },
    111: {
        id: 111,
        duree: '0h45',
        titre: 'Remplacement du Filtre à Air Moteur',
        situation: 'Lors d\'un entretien courant, le filtre à air moteur présente un encrassement important. Il doit être remplacé pour maintenir les performances et protéger le moteur.',
        objectif: 'Remplacer l\'élément filtrant en respectant la procédure pour optimiser l\'alimentation en air du moteur. (Compétence C1.3)',
        materiel: ['Filtre à air neuf d\'origine constructeur', 'Tournevis ou clés selon fixation', 'Chiffon propre non pelucheux', 'Aspirateur d\'atelier'],
        etudePrelim: [
            { type: 'qcm', q: 'Un filtre à air très encrassé va principalement provoquer :', options: ['Une surconsommation de carburant et une perte de puissance', 'Une usure prématurée des pneus', 'Un meilleur refroidissement moteur'], r: 'Une surconsommation de carburant et une perte de puissance' },
            { type: 'text', q: 'Quelle est l\'étape la plus critique lors du remplacement d\'un filtre à air pour protéger le moteur ?', r: 'Nettoyer parfaitement l\'intérieur du boîtier de filtre pour s\'assurer qu\'aucune poussière ou débris ne puisse entrer dans le circuit d\'admission.' },
            { type: 'text', q: 'Comment s\'assurer que le nouveau filtre est bien positionné et que le boîtier est étanche ?', r: 'Le filtre doit s\'insérer sans forcer dans ses guides et le couvercle du boîtier doit se fermer et se verrouiller parfaitement, sans jour.' }
        ],
        activitePratique: [
            etape('Localisation et accès au filtre à air', '15 min', [
                'Localiser le boîtier de filtre à air dans le compartiment moteur.',
                'Identifier le type de fixation du couvercle (clips, vis, sangles).',
                'Déconnecter éventuellement le tuyau d\'admission ou les sondes si nécessaire.',
                'Ouvrir délicatement le boîtier en évitant les chocs.',
                'Photographier la position du filtre pour faciliter le remontage.'
            ]),
            etape('Retrait et inspection de l\'ancien filtre', '15 min', [
                'Retirer avec précaution l\'ancien filtre à air du boîtier.',
                'Inspecter visuellement son état (coloration, encrassement, déchirures).',
                'Nettoyer soigneusement l\'intérieur du boîtier avec un chiffon propre.',
                'Aspirer les impuretés et débris éventuels dans le fond du boîtier.',
                'Contrôler l\'état des joints d\'étanchéité du couvercle.'
            ]),
            etape('Installation du filtre neuf et remontage', '15 min', [
                'Vérifier que le nouveau filtre correspond exactement au modèle (dimensions, forme).',
                'Installer le filtre neuf dans le bon sens (attention au sens du plissage).',
                'S\'assurer qu\'il est correctement positionné dans ses guides.',
                'Refermer le boîtier en vérifiant l\'étanchéité du joint.',
                'Remettre en place tous les éléments déconnectés (tuyaux, sondes).',
                'Vérifier que tous les clips et fixations sont bien engagés.'
            ])
        ],
        securiteRangement: [
            'Éviter impérativement l\'entrée de poussière dans le circuit d\'admission',
            'Manipuler le filtre neuf avec des mains propres',
            'Éliminer l\'ancien filtre selon la réglementation environnementale',
            'Vérifier l\'étanchéité parfaite du boîtier après remontage'
        ],
        pointsCles: [
            'Filtre installé dans le bon sens de montage',
            'Boîtier parfaitement nettoyé avant remontage',
            'Étanchéité du système vérifiée',
            'Tous les éléments remontés et fixés correctement'
        ]
    },
    112: {
        id: 112,
        duree: '1h30',
        titre: 'Diagnostic Simple - Panne d\'Éclairage',
        situation: 'Un client signale qu\'un de ses feux ne fonctionne plus. Vous devez identifier la panne (ampoule, fusible, faisceau) et réparer le dysfonctionnement.',
        objectif: 'Appliquer une méthode de diagnostic logique pour identifier et réparer une panne d\'éclairage. (Compétence C1.2)',
        materiel: ['Multimètre numérique', 'Jeu d\'ampoules de rechange', 'Schémas électriques véhicule', 'Lampe témoin 12V', 'Tournevis isolés'],
        etudePrelim: [
            { type: 'qcm', q: 'Face à un feu qui ne s\'allume pas, quel est le PREMIER composant à vérifier ?', options: ['L\'ampoule', 'Le fusible', 'Le commodo'], r: 'Le fusible' },
            { type: 'text', q: 'Vous testez le fusible : il est bon. Vous testez l\'ampoule : elle est bonne. Quelle est la prochaine étape de votre diagnostic ?', r: 'Vérifier avec un multimètre s\'il y a bien une tension de 12V qui arrive au connecteur de l\'ampoule.' },
            { type: 'text', q: 'Pourquoi ne faut-il jamais remplacer un fusible grillé par un fusible de calibre supérieur ?', r: 'Car le fusible ne protégerait plus le circuit. En cas de surintensité, c\'est le faisceau ou le composant qui brûlera, provoquant un risque d\'incendie.' }
        ],
        activitePratique: [
            etape('Analyse initiale et identification de la panne', '20 min', [
                'Identifier précisément quel feu ne fonctionne plus (position, type, côté).',
                'Tester tous les autres feux pour cerner l\'étendue de la panne.',
                'Consulter le schéma électrique correspondant au circuit défaillant.',
                'Localiser sur le schéma : fusible, relais, commande et ampoule concernés.',
                'Établir un plan de diagnostic méthodique du général (fusible) au particulier (ampoule).'
            ]),
            etape('Diagnostic systématique étape par étape', '40 min', [
                'Contrôler en premier lieu l\'état et la continuité du fusible correspondant.',
                'Si fusible OK, tester la tension d\'alimentation au niveau de l\'ampoule.',
                'Mesurer la tension avec multimètre (doit être proche de 12V contact mis).',
                'Si tension présente, remplacer l\'ampoule défectueuse.',
                'Si pas de tension, remonter le circuit pour localiser la coupure.',
                'Contrôler les connexions, cosses et continuité du faisceau.',
                'Tester le fonctionnement de la commande (interrupteur, commodo).'
            ]),
            etape('Réparation et validation de l\'intervention', '30 min', [
                'Effectuer la réparation identifiée (remplacement ampoule, fusible, réparation faisceau).',
                'Vérifier le bon fonctionnement du feu réparé.',
                'Tester l\'ensemble des fonctions d\'éclairage pour s\'assurer de l\'absence d\'effets de bord.',
                'Contrôler que la réparation n\'a pas créé d\'autres dysfonctionnements.',
                'Documenter précisément la panne trouvée et la réparation effectuée.',
                'Expliquer au client la cause de la panne et les actions préventives.'
            ])
        ],
        securiteRangement: [
            'Toujours couper le contact avant intervention sur circuit électrique',
            'Utiliser des outils isolés pour éviter les courts-circuits',
            'Respecter les calibres de fusibles (ne jamais surdimensionner)',
            'Rechercher la cause en cas de fusion répétée'
        ],
        pointsCles: [
            'Méthode de diagnostic appliquée rigoureusement',
            'Cause exacte de la panne identifiée',
            'Réparation durable et conforme effectuée',
            'Fonctionnement global validé après intervention'
        ]
    },
    113: {
        id: 113,
        duree: '1h15',
        titre: 'Contrôle et Nettoyage du Boîtier Papillon',
        situation: 'Un véhicule essence présente un ralenti instable et des à-coups à bas régime. Le diagnostic oriente vers un encrassement du boîtier papillon nécessitant un nettoyage.',
        objectif: 'Nettoyer le boîtier papillon pour restaurer un fonctionnement optimal du moteur et corriger les défauts de ralenti. (Compétence C1.3)',
        materiel: ['Nettoyant boîtier papillon spécialisé', 'Chiffons non pelucheux', 'Tournevis adaptés', 'Gants de protection', 'Lunettes de sécurité'],
        etudePrelim: [
            { type: 'text', q: 'Quelle est la principale cause d\'encrassement d\'un boîtier papillon ?', r: 'Les vapeurs d\'huile recyclées par le système de réaspiration (reniflard) qui se déposent et se mélangent à la poussière.' },
            { type: 'qcm', q: 'Après avoir débranché la batterie et nettoyé le boîtier, une procédure est parfois nécessaire. Laquelle ?', options: ['Une vidange', 'Un réapprentissage des butées du papillon', 'Un changement de filtre à air'], r: 'Un réapprentissage des butées du papillon' },
            { type: 'qcm', q: 'Quel est le risque si on force ou gratte l\'intérieur d\'un boîtier papillon motorisé ?', options: ['Aucun risque', 'D\'améliorer le passage de l\'air', 'D\'endommager le revêtement spécial et de dérégler le capteur de position'], r: 'D\'endommager le revêtement spécial et de dérégler le capteur de position' }
        ],
        activitePratique: [
            etape('Préparation et accès au boîtier papillon', '20 min', [
                'Localiser le boîtier papillon sur le circuit d\'admission.',
                'Couper le contact et débrancher la batterie par sécurité.',
                'Déconnecter le faisceau électrique du boîtier papillon.',
                'Retirer délicatement le tuyau d\'admission en amont du boîtier.',
                'Accéder au papillon en évitant d\'endommager les joints.',
                'Photographier la position initiale pour faciliter le remontage.'
            ]),
            etape('Nettoyage minutieux du boîtier papillon', '35 min', [
                'Pulvériser le produit nettoyant sur toute la surface du papillon.',
                'Laisser agir le produit selon les recommandations du fabricant.',
                'Nettoyer délicatement avec un chiffon non pelucheux.',
                'Insister sur les zones les plus encrassées sans forcer sur le papillon.',
                'Nettoyer également le conduit d\'admission en amont et en aval.',
                'Éliminer tous les résidus de produit avec un chiffon propre.',
                'Contrôler la liberté de mouvement du papillon après nettoyage.'
            ]),
            etape('Remontage et validation du fonctionnement', '20 min', [
                'Remonter tous les éléments dans l\'ordre inverse du démontage.',
                'Reconnecter le faisceau électrique et le tuyau d\'admission.',
                'Rebrancher la batterie et mettre le contact.',
                'Démarrer le moteur et observer la stabilité du ralenti.',
                'Effectuer quelques accélérations pour valider le bon fonctionnement.',
                'Si nécessaire, effectuer la procédure de réapprentissage papillon selon constructeur.',
                'Contrôler l\'absence de prise d\'air parasite après remontage.'
            ])
        ],
        securiteRangement: [
            'Porter impérativement gants et lunettes (produits chimiques)',
            'Travailler dans un local ventilé (vapeurs nocives)',
            'Ne jamais forcer sur le mécanisme du papillon',
            'Éliminer les chiffons souillés selon la réglementation'
        ],
        pointsCles: [
            'Boîtier papillon perfectly nettoyé et dégraissé',
            'Liberté de mouvement du papillon vérifiée',
            'Ralenti stabilisé après intervention',
            'Absence de prise d\'air après remontage'
        ]
    },
    114: {
        id: 114,
        duree: '1h45',
        titre: 'Vidange et Purge du Liquide de Refroidissement',
        situation: 'Le liquide de refroidissement d\'un véhicule est coloré et présente des impuretés. Il doit être renouvelé intégralement avec purge du circuit pour éviter la corrosion et la surchauffe.',
        objectif: 'Remplacer complètement le liquide de refroidissement et purger le circuit pour garantir un refroidissement optimal. (Compétence C1.3)',
        materiel: ['Liquide de refroidissement préconisé', 'Bac de récupération agréé', 'Entonnoir de remplissage', 'Clés pour durites et bouchons', 'Kit de purge sous pression'],
        etudePrelim: [
            { type: 'qcm', q: 'Quel est le risque principal si on ouvre le bouchon du radiateur quand le moteur est chaud ?', options: ['De renverser du liquide', 'Une dépressurisation brutale avec projection de liquide bouillant (brûlure grave)', 'D\'abîmer le bouchon'], r: 'Une dépressurisation brutale avec projection de liquide bouillant (brûlure grave)' },
            { type: 'text', q: 'Qu\'est-ce que le "calorstat" (ou thermostat) et quel est son rôle dans le circuit de refroidissement ?', r: 'C\'est une vanne thermostatique qui reste fermée à froid pour que le moteur chauffe vite, et s\'ouvre à chaud pour laisser passer le liquide vers le radiateur.' },
            { type: 'text', q: 'Pourquoi est-il important de mettre le chauffage de l\'habitacle sur "chaud" au maximum pendant la purge du circuit ?', r: 'Pour s\'assurer que le liquide de refroidissement circule aussi dans le radiateur de chauffage et que l\'air qui s\'y trouve soit également purgé.' }
        ],
        activitePratique: [
            etape('Vidange complète de l\'ancien liquide', '30 min', [
                'S\'assurer que le moteur est parfaitement froid avant intervention.',
                'Positionner le bac de récupération sous le point de vidange du radiateur.',
                'Ouvrir le bouchon de radiateur pour faciliter l\'écoulement.',
                'Ouvrir la purge de vidange et laisser s\'écouler complètement.',
                'Déconnecter la durite inférieure de radiateur si nécessaire pour vidange totale.',
                'Évacuer l\'ancien liquide vers la filière de récupération agréée.'
            ]),
            etape('Remplissage et première purge', '40 min', [
                'Refermer toutes les purges et reconnecter les durites.',
                'Remplir progressivement par le radiateur avec le liquide neuf préconisé.',
                'Respecter le mélange eau/antigel selon les spécifications (généralement 50/50).',
                'Faire tourner le moteur au ralenti pour faire circuler le liquide.',
                'Maintenir le niveau pendant la circulation et compléter régulièrement.',
                'Observer la sortie d\'air par le radiateur pendant le remplissage.'
            ]),
            etape('Purge définitive et contrôle d\'étanchéité', '35 min', [
                'Utiliser le kit de purge sous pression pour éliminer toutes les bulles d\'air.',
                'Faire monter le moteur en température avec chauffage au maximum.',
                'Contrôler l\'ouverture du thermostat et la circulation dans tout le circuit.',
                'Vérifier le fonctionnement du ventilateur de refroidissement.',
                'Laisser refroidir et compléter le niveau dans le vase d\'expansion.',
                'Contrôler l\'étanchéité de tous les raccords et durites.',
                'Effectuer un essai routier et recontrôler le niveau à froid.'
            ])
        ],
        securiteRangement: [
            'DANGER : Ne jamais ouvrir un circuit de refroidissement chaud',
            'Liquide de refroidissement toxique : éviter le contact cutané',
            'Récupération obligatoire via filière de traitement spécialisée',
            'Contrôler impérativement l\'étanchéité avant restitution'
        ],
        pointsCles: [
            'Circuit entièrement vidangé et nettoyé',
            'Liquide conforme aux spécifications constructeur',
            'Purge complète sans bulles d\'air résiduel',
            'Étanchéité parfaite de tout le circuit'
        ]
    },
    115: {
        id: 115,
        duree: '0h45',
        titre: 'Contrôle et Remplacement des Balais d\'Essuie-glaces',
        situation: 'Les balais d\'essuie-glaces laissent des traces et ne nettoient plus efficacement le pare-brise. Ils doivent être remplacés pour maintenir une visibilité parfaite.',
        objectif: 'Remplacer les balais d\'essuie-glaces pour garantir une visibilité optimale et la sécurité de conduite. (Compétence C1.3)',
        materiel: ['Balais d\'essuie-glaces neufs adaptés', 'Chiffon microfibre', 'Produit nettoyant vitre', 'Mètre ruban pour mesures'],
        etudePrelim: [
            { type: 'qcm', q: 'Quel est le principal symptôme d\'un balai d\'essuie-glace usé ?', options: ['Il fait du bruit', 'Il laisse des zones non essuyées ou des traînées d\'eau', 'Il est décoloré par le soleil'], r: 'Il laisse des zones non essuyées ou des traînées d\'eau' },
            { type: 'text', q: 'Quelle précaution simple mais cruciale faut-il prendre avec le bras d\'essuie-glace lors du remplacement du balai ?', r: 'Ne jamais le laisser retomber violemment sur le pare-brise, au risque de le fissurer. On peut placer un chiffon épais en protection.' },
            { type: 'text', q: 'Pourquoi est-il important de bien nettoyer le pare-brise avant d\'utiliser les nouveaux balais ?', r: 'Pour enlever le film gras et les impuretés qui pourraient endommager prématurément le caoutchouc neuf et nuire à la qualité de l\'essuyage.' }
        ],
        activitePratique: [
            etape('Évaluation et préparation', '10 min', [
                'Examiner l\'usure des anciens balais (caoutchouc fendu, déformé).',
                'Mesurer la longueur exacte des balais existants.',
                'Identifier le type de fixation (crochet, pince, bayonnette).',
                'Vérifier que les nouveaux balais correspondent exactement.',
                'Relever les bras d\'essuie-glaces en position de service.'
            ]),
            etape('Remplacement des balais', '20 min', [
                'Démonter délicatement l\'ancien balai selon son type de fixation.',
                'Nettoyer le bras d\'essuie-glaces avec un chiffon humide.',
                'Installer le nouveau balai en s\'assurant du bon verrouillage.',
                'Vérifier que le balai est bien fixé et ne peut se détacher.',
                'Répéter l\'opération pour le second balai.',
                'Repositionner les bras contre le pare-brise.'
            ]),
            etape('Nettoyage et test de fonctionnement', '15 min', [
                'Nettoyer soigneusement tout le pare-brise avec le produit adapté.',
                'Éliminer tous les résidus gras et traces d\'insectes.',
                'Tester le fonctionnement des essuie-glaces (vitesse lente et rapide).',
                'Vérifier l\'absence de traces et la qualité d\'essuyage.',
                'Contrôler le bon fonctionnement du lave-glace.',
                'Ajuster la position des bras si nécessaire.'
            ])
        ],
        securiteRangement: [
            'Manipuler les bras avec précaution (ressort sous tension)',
            'Ne pas laisser les bras claquer contre le pare-brise',
            'Vérifier que les balais sont compatibles avec les bras',
            'Éliminer les anciens balais selon la réglementation'
        ],
        pointsCles: [
            'Balais de taille exactement adaptée au véhicule',
            'Fixation parfaitement sécurisée et vérifiée',
            'Qualité d\'essuyage optimale sans traces',
            'Fonctionnement testé sur toutes les vitesses'
        ]
    },
    116: {
        id: 116,
        duree: '1h15',
        titre: 'Contrôle Visuel du Système de Freinage',
        situation: 'Dans le cadre d\'un contrôle sécuritaire, vous devez effectuer une inspection complète du système de freinage pour détecter toute anomalie potentielle.',
        objectif: 'Réaliser un contrôle visuel méthodique de tout le système de freinage pour garantir la sécurité. (Compétence C1.2)',
        materiel: ['Lampe d\'inspection puissante', 'Miroir d\'inspection télescopique', 'Règle graduée', 'Fiche de contrôle système freinage', 'Gants de protection'],
        etudePrelim: [
            { type: 'text', q: 'Quels sont les deux signes visuels d\'un disque de frein qui doit être remplacé ?', r: 'Une lèvre d\'usure prononcée sur le bord extérieur et/ou des rayures profondes sur la surface de friction.' },
            { type: 'qcm', q: 'Vous inspectez un flexible de frein. Lequel de ces défauts impose un remplacement immédiat ?', options: ['Il est sale', 'Il présente des craquelures ou une hernie (gonflement)', 'Il est légèrement rigide'], r: 'Il présente des craquelures ou une hernie (gonflement)' },
            { type: 'text', q: 'Quelle est l\'épaisseur minimale approximative d\'une plaquette de frein (garniture seule) avant de recommander son remplacement ?', r: 'Environ 2 à 3 millimètres.' }
        ],
        activitePratique: [
            etape('Contrôle du système de freinage avant', '25 min', [
                'Inspecter visuellement les disques de frein (rayures, fissures, voile).',
                'Mesurer l\'épaisseur des plaquettes par les ouïes des étriers.',
                'Contrôler l\'état des flexibles de frein (craquelures, gonflements).',
                'Vérifier l\'absence de fuite au niveau des étriers et raccords.',
                'Examiner l\'état des durites rigides et de leur protection.',
                'Contrôler la liberté de mouvement des étriers sur leurs glissières.'
            ]),
            etape('Contrôle du système de freinage arrière', '25 min', [
                'Examiner l\'état des disques arrière ou des tambours selon équipement.',
                'Contrôler l\'usure des plaquettes arrière ou l\'état des garnitures.',
                'Vérifier l\'absence de fuite au niveau des cylindres de roue.',
                'Inspecter les flexibles et raccords arrière.',
                'Contrôler le bon fonctionnement du frein de stationnement.',
                'Vérifier l\'état et la tension des câbles de frein à main.'
            ]),
            etape('Contrôle du circuit hydraulique et synthèse', '25 min', [
                'Contrôler le niveau et la couleur du liquide de frein.',
                'Inspecter le maître-cylindre et ses joints d\'étanchéité.',
                'Vérifier l\'état du servo-frein et de ses durites d\'assistance.',
                'Contrôler la course et la fermeté de la pédale de frein.',
                'Tester l\'efficacité du témoin d\'usure (s\'il est présent).',
                'Compléter la fiche de contrôle et noter toutes les anomalies détectées.',
                'Établir les priorités d\'intervention selon la criticité des défauts.'
            ])
        ],
        securiteRangement: [
            'Porter des gants pour éviter le contact avec la poussière de freinage',
            'Utiliser un éclairage suffisant pour un examen précis',
            'Noter scrupuleusement toutes les anomalies observées',
            'Classer les défauts par ordre de priorité sécuritaire'
        ],
        pointsCles: [
            'Examen méthodique de tous les composants',
            'Mesures d\'usure précises et documentées',
            'Détection de toute fuite ou détérioration',
            'Fiche de contrôle complète et exploitable'
        ]
    },
    117: {
        id: 117,
        duree: '1h00',
        titre: 'Préparation et Nettoyage du Véhicule pour Restitution',
        situation: 'Avant la restitution du véhicule au client, vous devez effectuer la préparation finale comprenant le nettoyage et la vérification de tous les équipements.',
        objectif: 'Préparer le véhicule selon les standards qualité de l\'atelier pour une restitution professionnelle. (Compétence C1.4)',
        materiel: ['Produits de nettoyage automobile', 'Aspirateur puissant', 'Chiffons microfibres', 'Protections jetables', 'Fiche de contrôle final'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi est-il si important de restituer un véhicule propre à un client ?', r: 'Cela donne une image professionnelle de l\'atelier, montre le respect pour le bien du client et le rassure sur la qualité du travail effectué.' },
            { type: 'qcm', q: 'Quelle est la première chose à faire avant de nettoyer l\'intérieur du véhicule ?', options: ['Passer l\'aspirateur', 'Retirer toutes les protections (housses, tapis) mises en place', 'Nettoyer les vitres'], r: 'Retirer toutes les protections (housses, tapis) mises en place' },
            { type: 'text', q: 'Citez 3 points de contrôle finaux à effectuer juste avant de garer le véhicule pour le client.', r: '1. Vérifier qu\'aucun voyant anormal n\'est allumé. 2. S\'assurer que les réglages (siège, radio) n\'ont pas été trop modifiés. 3. Contrôler que tous les documents sont prêts.' }
        ],
        activitePratique: [
            etape('Nettoyage extérieur du véhicule', '20 min', [
                'Rincer abondamment le véhicule pour éliminer la poussière et les projections.',
                'Nettoyer particulièrement les zones souillées par les interventions.',
                'Laver les jantes et pneus avec un produit adapté.',
                'Sécher soigneusement avec des chiffons non rayants.',
                'Vérifier l\'absence de traces d\'huile ou de liquides divers.',
                'Nettoyer les vitres pour une visibilité parfaite.'
            ]),
            etape('Nettoyage et contrôle de l\'habitacle', '25 min', [
                'Retirer toutes les protections mises en place pendant l\'intervention.',
                'Aspirer soigneusement tapis, sièges et habitacle.',
                'Nettoyer le volant, tableau de bord et surfaces touchées.',
                'Vérifier le fonctionnement de tous les équipements (radio, climatisation, éclairage).',
                'S\'assurer qu\'aucun outil ou pièce n\'a été oublié dans le véhicule.',
                'Ajuster les rétroviseurs et le siège conducteur en position standard.'
            ]),
            etape('Contrôles finaux et documentation', '15 min', [
                'Vérifier le bon fonctionnement de tous les systèmes réparés.',
                'Contrôler les niveaux (huile, liquide de refroidissement, lave-glace).',
                'Tester l\'éclairage complet et les témoins du tableau de bord.',
                'Compléter la fiche de contrôle qualité.',
                'Préparer les documents et factures pour la restitution.',
                'Positionner le véhicule à l\'emplacement de livraison.'
            ])
        ],
        securiteRangement: [
            'Utiliser des produits de nettoyage adaptés aux matériaux automobiles',
            'Éviter l\'eau sur les composants électriques sensibles',
            'Vérifier l\'absence d\'outils oubliés dans le véhicule',
            'S\'assurer du parfait fonctionnement avant restitution'
        ],
        pointsCles: [
            'Véhicule impeccablement propre intérieur et extérieur',
            'Tous les systèmes testés et fonctionnels',
            'Documentation complète et professionnelle',
            'Respect des standards qualité atelier'
        ]
    },
    118: {
        id: 118,
        duree: '1h30',
        titre: 'Remplacement de la Courroie d\'Accessoires',
        situation: 'La courroie d\'accessoires présente des signes d\'usure (craquelures, effilochage). Elle doit être remplacée pour éviter une rupture et la panne de plusieurs équipements.',
        objectif: 'Remplacer la courroie d\'entraînement des accessoires en respectant la tension et l\'alignement corrects. (Compétence C1.3)',
        materiel: ['Courroie neuve de référence exacte', 'Clé de tension de courroie', 'Documentation technique constructeur', 'Schéma de montage', 'Clés et douilles diverses'],
        etudePrelim: [
            { type: 'text', q: 'Citez au moins 3 accessoires vitaux entraînés par cette courroie.', r: 'Alternateur, pompe de direction assistée, compresseur de climatisation, pompe à eau.' },
            { type: 'qcm', q: 'Une courroie qui couine au démarrage est souvent le signe...', options: ['Qu\'elle est trop tendue', 'Qu\'elle n\'est pas assez tendue et patine', 'Qu\'elle est neuve'], r: 'Qu\'elle n\'est pas assez tendue et patine' },
            { type: 'text', q: 'Quelle est la première chose à faire avant de commencer l\'intervention ?', r: 'Consulter le schéma de montage de la courroie pour bien comprendre son trajet complexe autour des différentes poulies.' }
        ],
        activitePratique: [
            etape('Analyse et préparation du remplacement', '20 min', [
                'Examiner l\'état de l\'ancienne courroie et identifier les signes d\'usure.',
                'Consulter le schéma de montage pour identifier le trajet exact de la courroie.',
                'Repérer le tendeur automatique ou le système de réglage de tension.',
                'Vérifier l\'état des poulies (usure, alignement, jeu).',
                'Noter le sens de rotation de la courroie et sa position sur chaque poulie.',
                'Préparer tous les outils nécessaires selon la documentation technique.'
            ]),
            etape('Dépose de l\'ancienne courroie', '30 min', [
                'Détendre la courroie en agissant sur le tendeur selon la procédure constructeur.',
                'Retirer délicatement l\'ancienne courroie en respectant l\'ordre de démontage.',
                'Inspecter minutieusement toutes les poulies (alternateur, climatisation, direction assistée).',
                'Nettoyer les gorges des poulies de toute trace d\'usure ou de débris.',
                'Contrôler l\'alignement correct de toutes les poulies.',
                'Vérifier le bon fonctionnement du tendeur automatique.'
            ]),
            etape('Montage de la courroie neuve et réglage', '40 min', [
                'Vérifier que la nouvelle courroie correspond exactement à l\'ancienne (longueur, profil).',
                'Installer la courroie neuve en suivant scrupuleusement le schéma de montage.',
                'Respecter le sens de rotation indiqué sur la courroie.',
                'Positionner correctement la courroie dans toutes les gorges de poulies.',
                'Ajuster la tension selon les spécifications constructeur (méthode de la flèche ou dynamomètre).',
                'Faire tourner le moteur manuellement pour vérifier l\'absence de contact anormal.',
                'Démarrer le moteur et contrôler le bon fonctionnement de tous les accessoires.'
            ])
        ],
        securiteRangement: [
            'Moteur arrêté et froid pour toute manipulation',
            'Attention aux parties en mouvement lors des tests',
            'Respecter impérativement les tensions spécifiées',
            'Vérifier le fonctionnement de tous les accessoires'
        ],
        pointsCles: [
            'Courroie correctement positionnée sur toutes les poulies',
            'Tension ajustée selon les spécifications constructeur',
            'Alignement des poulies vérifié et correct',
            'Tous les accessoires fonctionnels après remplacement'
        ]
    },
    119: {
        id: 119,
        duree: '1h30',
        titre: 'Diagnostic Simple - Panne d\'Allumage',
        situation: 'Un véhicule essence présente des difficultés de démarrage et des ratés moteur. Vous devez diagnostiquer une panne d\'allumage (bougies, bobines, faisceau).',
        objectif: 'Identifier et localiser une défaillance du système d\'allumage en appliquant une méthode de diagnostic structurée. (Compétence C1.2)',
        materiel: ['Multimètre de précision', 'Clé à bougie', 'Testeur d\'étincelle', 'Bougies neuves de rechange', 'Schémas électriques', 'Lampe stroboscopique'],
        etudePrelim: [
            { type: 'qcm', q: 'Un moteur 4 cylindres a un raté d\'allumage sur le cylindre n°2. Pour savoir si cela vient de la bougie ou de la bobine (si individuelle), quelle est la méthode la plus rapide ?', options: ['Changer les 4 bougies', 'Mesurer la compression', 'Inverser la bobine 2 avec la bobine 3 et voir si le défaut se déplace'], r: 'Inverser la bobine 2 avec la bobine 3 et voir si le défaut se déplace' },
            { type: 'text', q: 'Vous démontez une bougie et son électrode est recouverte de suie noire et sèche. Qu\'est-ce que cela indique sur le mélange air/carburant ?', r: 'Un mélange trop riche en carburant.' },
            { type: 'text', q: 'À quoi sert la partie en céramique blanche d\'une bougie d\'allumage ?', r: 'C\'est un isolant électrique qui empêche la haute tension de s\'échapper vers la masse (la culasse) avant d\'atteindre l\'électrode.' }
        ],
        activitePratique: [
            etape('Analyse des symptômes et diagnostic initial', '25 min', [
                'Analyser précisément les symptômes rapportés (difficultés démarrage, ratés, manque puissance).',
                'Identifier si la panne affecte tous les cylindres ou seulement certains.',
                'Écouter le bruit moteur pour localiser les ratés éventuels.',
                'Contrôler les témoins du tableau de bord (témoin moteur, codes défaut).',
                'Établir un plan de diagnostic méthodique du système d\'allumage.',
                'Consulter les schémas électriques correspondant au véhicule.'
            ]),
            etape('Test du système d\'allumage cylindre par cylindre', '40 min', [
                'Déconnecter et examiner chaque bougie d\'allumage.',
                'Contrôler l\'état des électrodes (usure, encrassement, écartement).',
                'Tester l\'étincelle de chaque bougie avec le testeur spécialisé.',
                'Mesurer la résistance des bobines d\'allumage au multimètre.',
                'Contrôler l\'alimentation électrique des bobines (12V contact mis).',
                'Vérifier la continuité des circuits haute tension.',
                'Identifier le ou les cylindres présentant des anomalies.'
            ]),
            etape('Réparation et validation du fonctionnement', '25 min', [
                'Remplacer les bougies défectueuses par des neuves conformes aux spécifications.',
                'Ajuster l\'écartement des électrodes selon les données constructeur.',
                'Remplacer les bobines défaillantes si nécessaire.',
                'Remonter tous les éléments en respectant les couples de serrage.',
                'Démarrer le moteur et contrôler la régularité du fonctionnement.',
                'Effectuer un essai routier pour valider les performances.',
                'Vérifier l\'absence de codes défaut après réparation.'
            ])
        ],
        securiteRangement: [
            'Couper le contact avant toute manipulation du système d\'allumage',
            'Attention à la haute tension (risque d\'électrocution)',
            'Manipuler les bougies avec précaution (électrodes fragiles)',
            'Respecter les couples de serrage des bougies'
        ],
        pointsCles: [
            'Diagnostic méthodique et structuré appliqué',
            'Cause exacte de la panne identifiée précisément',
            'Réparation conforme aux spécifications constructeur',
            'Fonctionnement moteur régulier après intervention'
        ]
    },
    120: {
        id: 120,
        duree: '1h30',
        titre: 'Bilan Intermédiaire - Check-up Complet',
        situation: 'À mi-parcours de la formation, vous devez réaliser un bilan complet des compétences acquises à travers un contrôle global d\'un véhicule.',
        objectif: 'Démontrer l\'acquisition des compétences de base par un check-up complet et méthodique. (Compétences C1.1, C1.2, C1.3, C1.4)',
        materiel: ['Fiche de contrôle complète', 'Tous les outils d\'atelier', 'Multimètre', 'Contrôleur de pression', 'Documentation technique'],
        etudePrelim: [
            { type: 'text', q: 'Listez les 5 points de contrôle les plus importants pour la sécurité d\'un véhicule.', r: 'Freinage, pneumatiques, direction, éclairage, liaison au sol (suspension).' },
            { type: 'qcm', q: 'Quelle est la première source d\'information à consulter avant de commencer un entretien ?', options: ['Un forum sur internet', 'La documentation technique et le carnet d\'entretien du constructeur', 'L\'avis d\'un collègue'], r: 'La documentation technique et le carnet d\'entretien du constructeur' },
            { type: 'text', q: 'Comment présentez-vous à un client une anomalie "non urgente mais à surveiller" ?', r: 'De manière factuelle, sans alarmer, en expliquant le rôle de la pièce, le symptôme d\'usure et en proposant un contrôle lors du prochain entretien.' }
        ],
        activitePratique: [
            etape('Réception véhicule et planification', '20 min', [
                'Accueillir le client et identifier ses demandes spécifiques.',
                'Consulter le carnet d\'entretien et déterminer les opérations à effectuer.',
                'Planifier l\'intervention en optimisant l\'organisation du travail.',
                'Préparer tous les outils, équipements et consommables nécessaires.',
                'Organiser le poste de travail selon les règles de sécurité.',
                'Établir un planning réaliste et respectueux des délais.'
            ]),
            etape('Réalisation de l\'entretien périodique', '80 min', [
                'Effectuer la vidange moteur et le remplacement du filtre à huile avec traçabilité complète.',
                'Remplacer le filtre à air et contrôler l\'état du boîtier d\'admission.',
                'Contrôler et ajuster tous les niveaux de fluides selon les spécifications.',
                'Vérifier l\'état et la pression des pneumatiques, effectuer les corrections.',
                'Contrôler le système de freinage complet (plaquettes, disques, liquide).',
                'Tester tous les systèmes d\'éclairage et remplacer les ampoules défectueuses.',
                'Contrôler la batterie et le circuit de charge avec mesures précises.',
                'Effectuer les contrôles visuels de sécurité (suspension, échappement, direction).'
            ]),
            etape('Contrôles finaux et restitution client', '30 min', [
                'Analyser les points forts et les axes d\'amélioration identifiés.',
                'Compléter la fiche d\'intervention avec toutes les opérations réalisées.',
                'Nettoyer et préparer le véhicule selon les standards de restitution.',
                'Rédiger un rapport de synthèse sur les compétences démontrées.',
                'Valider l\'atteinte des objectifs pédagogiques du référentiel.',
                'Présenter le travail réalisé avec argumentation technique.'
            ])
        ],
        securiteRangement: [
            'Application rigoureuse de toutes les règles de sécurité apprises',
            'Respect de toutes les procédures et méthodologies enseignées',
            'Autonomie démontrée avec demande d\'aide si nécessaire',
            'Qualité professionnelle attendue sur tous les aspects'
        ],
        pointsCles: [
            'Toutes les compétences C1.1 à C1.4 validées',
            'Entretien complet réalisé en autonomie',
            'Qualité technique et relationnelle démontrée',
            'Aptitude confirmée pour la poursuite en Première'
        ]
    },
    121: {
        id: 121,
        duree: '0h45',
        titre: 'Remplacement du Filtre d\'Habitacle',
        situation: 'Le filtre d\'habitacle du véhicule est encrassé et doit être remplacé pour maintenir la qualité de l\'air intérieur et l\'efficacité de la climatisation.',
        objectif: 'Remplacer le filtre d\'habitacle selon la procédure pour garantir une filtration optimale de l\'air. (Compétence C1.3)',
        materiel: ['Filtre d\'habitacle neuf de référence exacte', 'Tournevis adaptés', 'Aspirateur d\'atelier', 'Chiffon propre', 'Gants de protection'],
        etudePrelim: [
            { type: 'qcm', q: 'Un filtre d\'habitacle bouché peut causer :', options: ['Une mauvaise odeur, de la buée et une ventilation faible', 'Une surconsommation de carburant', 'Une usure des pneus'], r: 'Une mauvaise odeur, de la buée et une ventilation faible' },
            { type: 'text', q: 'Quelle est la différence entre un filtre à pollen simple et un filtre à charbon actif ?', r: 'Le filtre à charbon actif filtre en plus les mauvaises odeurs et certains gaz polluants, en plus des pollens et poussières.' },
            { type: 'text', q: 'Sur beaucoup de véhicules, où se trouve le filtre d\'habitacle ?', r: 'Derrière ou en dessous de la boîte à gants.' }
        ],
        activitePratique: [
            etape('Localisation et accès au filtre', '15 min', [
                'Localiser l\'emplacement du filtre d\'habitacle (boîte à gants, pied de pare-brise, compartiment moteur).',
                'Consulter la documentation technique pour la procédure d\'accès spécifique.',
                'Retirer les éléments nécessaires pour accéder au filtre (boîte à gants, cache, etc.).',
                'Identifier le sens de montage et la position du filtre avant dépose.',
                'Photographier la position initiale pour faciliter le remontage.'
            ]),
            etape('Remplacement du filtre', '20 min', [
                'Retirer délicatement l\'ancien filtre en évitant de faire tomber les impuretés.',
                'Examiner l\'état d\'encrassement de l\'ancien filtre.',
                'Nettoyer soigneusement le logement du filtre avec l\'aspirateur.',
                'Essuyer les parois avec un chiffon propre.',
                'Installer le nouveau filtre dans le bon sens (attention aux flèches de direction d\'air).',
                'Vérifier que le filtre est correctement positionné dans ses guides.'
            ]),
            etape('Remontage et test de fonctionnement', '10 min', [
                'Remettre en place tous les éléments démontés dans l\'ordre inverse.',
                'Vérifier que tous les clips et fixations sont correctement engagés.',
                'Tester le fonctionnement de la ventilation sur toutes les vitesses.',
                'Contrôler l\'absence de bruit anormal ou de vibration.',
                'Vérifier l\'efficacité du débit d\'air aux aérateurs.',
                'Conseiller au client la périodicité de remplacement.'
            ])
        ],
        securiteRangement: [
            'Porter des gants lors de la manipulation du filtre usagé',
            'Éviter de faire tomber les impuretés du filtre dans l\'habitacle',
            'Respecter le sens de montage du filtre neuf',
            'Éliminer l\'ancien filtre selon la réglementation'
        ],
        pointsCles: [
            'Filtre installé dans le bon sens de circulation d\'air',
            'Logement parfaitement nettoyé avant installation',
            'Débit d\'air optimal après remplacement',
            'Conseil client sur la maintenance préventive'
        ]
    },
    122: {
        id: 122,
        duree: '1h15',
        titre: 'Purge du Circuit de Freinage',
        situation: 'Après un remplacement de plaquettes ou de liquide de frein, le circuit doit être purgé pour éliminer l\'air et garantir l\'efficacité du freinage.',
        objectif: 'Réaliser la purge complète du circuit de freinage pour obtenir une pédale ferme et un freinage optimal. (Compétence C1.3)',
        materiel: ['Liquide de frein DOT 4 ou 5.1 neuf', 'Kit de purge (bocal, tuyaux)', 'Clé de purge', 'Pompe de purge manuelle', 'Entonnoir', 'Chiffons absorbants'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi l\'air est-il l\'ennemi d\'un circuit de freinage hydraulique ?', r: 'Parce que l\'air est compressible. Quand on appuie sur la pédale, on comprime l\'air au lieu de pousser le liquide, ce qui rend la pédale "spongieuse" et le freinage inefficace.' },
            { type: 'qcm', q: 'Quel est l\'ordre de purge standard sur la plupart des véhicules ?', options: ['De la roue la plus proche à la plus éloignée du maître-cylindre', 'De la roue la plus éloignée à la plus proche du maître-cylindre', 'N\'importe quel ordre'], r: 'De la roue la plus éloignée à la plus proche du maître-cylindre' },
            { type: 'text', q: 'Quelle est la précaution la plus importante concernant le réservoir de liquide de frein pendant la purge ?', r: 'Ne jamais le laisser se vider complètement, sinon on réintroduit de l\'air dans le circuit et il faut tout recommencer.' }
        ],
        activitePratique: [
            etape('Préparation du circuit et du matériel', '20 min', [
                'Contrôler et compléter le niveau de liquide de frein dans le réservoir maître-cylindre.',
                'Préparer le kit de purge avec bocal et tuyaux propres.',
                'Identifier l\'ordre de purge : généralement ARD → ARG → AVD → AVG.',
                'Localiser les vis de purge sur chaque étrier ou cylindre de roue.',
                'Vérifier que les vis de purge ne sont pas grippées avant de commencer.'
            ]),
            etape('Purge méthodique roue par roue', '40 min', [
                'Commencer par la roue la plus éloignée du maître-cylindre (généralement arrière droite).',
                'Connecter le tuyau de purge à la vis de purge et l\'autre extrémité dans le bocal.',
                'Desserrer la vis de purge d\'un demi-tour maximum.',
                'Actionner la pédale de frein lentement et régulièrement.',
                'Observer l\'écoulement du liquide et les bulles d\'air dans le bocal.',
                'Maintenir constamment le niveau dans le réservoir maître-cylindre.',
                'Serrer la vis de purge avant de relâcher la pédale (éviter le retour d\'air).',
                'Répéter l\'opération pour chaque roue dans l\'ordre établi.'
            ]),
            etape('Contrôle final et validation', '15 min', [
                'Vérifier que la pédale de frein est ferme et ne s\'enfonce pas anormalement.',
                'Contrôler l\'absence de bulles d\'air dans le liquide évacué.',
                'Ajuster le niveau de liquide de frein dans le réservoir (entre MIN et MAX).',
                'Tester l\'efficacité du freinage par plusieurs pressions sur la pédale.',
                'Nettoyer toutes les projections de liquide de frein sur la peinture.',
                'Effectuer un essai de freinage prudent pour validation finale.'
            ])
        ],
        securiteRangement: [
            'Liquide de frein corrosif : nettoyer immédiatement les projections',
            'Maintenir le niveau du réservoir pendant toute la purge',
            'Ne jamais laisser entrer d\'air en relâchant la pédale vis ouverte',
            'Éliminer le liquide usagé via filière de traitement agréée'
        ],
        pointsCles: [
            'Ordre de purge respecté scrupuleusement',
            'Pédale ferme et progressive obtenue',
            'Absence totale de bulles d\'air dans le circuit',
            'Efficacité de freinage validée par essai'
        ]
    },
    123: {
        id: 123,
        duree: '1h00',
        titre: 'Contrôle Détaillé des Disques de Frein',
        situation: 'Dans le cadre d\'un contrôle approfondi, vous devez examiner en détail l\'état des disques de frein pour détecter toute anomalie nécessitant un remplacement.',
        objectif: 'Évaluer précisément l\'état des disques de frein selon les critères techniques pour déterminer leur conformité. (Compétence C1.2)',
        materiel: ['Pied à coulisse de précision', 'Comparateur de voile', 'Règle rigide', 'Lampe d\'inspection puissante', 'Fiche de mesures'],
        etudePrelim: [
            { type: 'text', q: 'Où trouve-t-on la cote d\'épaisseur minimale (MIN TH) d\'un disque de frein ?', r: 'Elle est généralement gravée sur le bord du disque.' },
            { type: 'qcm', q: 'Vous constatez que les disques avant sont usés mais le disque droit est 1mm plus fin que le gauche. Que suspectez-vous ?', options: ['Une usure normale', 'Un problème de qualité de disque', 'Un problème sur l\'étrier de frein droit (grippage)'], r: 'Un problème sur l\'étrier de frein droit (grippage)' },
            { type: 'text', q: 'Qu\'est-ce que le "voile" d\'un disque de frein et quel symptôme provoque-t-il ?', r: 'Le voile est une déformation latérale du disque. Il provoque des vibrations dans le volant et la pédale de frein lors du freinage.' }
        ],
        activitePratique: [
            etape('Inspection visuelle détaillée', '20 min', [
                'Nettoyer soigneusement les disques pour un examen précis.',
                'Examiner les surfaces de friction (rayures profondes, fissures, points chauds).',
                'Contrôler la périphérie du disque (éclats, déformation du bord).',
                'Vérifier l\'état des zones de fixation (corrosion, usure des portées).',
                'Identifier les traces d\'usure anormale (usure en biseau, rainurage excessif).',
                'Photographier les défauts importants pour documentation.'
            ]),
            etape('Mesures dimensionnelles précises', '25 min', [
                'Mesurer l\'épaisseur du disque en plusieurs points avec le pied à coulisse.',
                'Comparer les mesures à l\'épaisseur minimale gravée sur le disque.',
                'Mesurer le diamètre extérieur et vérifier la conformité.',
                'Contrôler le voile du disque avec un comparateur (tolérance généralement 0,05mm).',
                'Noter toutes les mesures sur la fiche de contrôle.',
                'Identifier les disques dépassant les tolérances d\'usure.'
            ]),
            etape('Évaluation et diagnostic final', '15 min', [
                'Compiler tous les résultats de contrôle (visuel + mesures).',
                'Classer chaque disque : conforme, à surveiller, à remplacer immédiatement.',
                'Déterminer si un remplacement par paire est nécessaire.',
                'Estimer la durée de vie résiduelle des disques conformes.',
                'Préparer les recommandations pour le client.',
                'Compléter la fiche technique avec photos et mesures.'
            ])
        ],
        securiteRangement: [
            'Utiliser des instruments de mesure étalonnés et précis',
            'Noter scrupuleusement toutes les mesures relevées',
            'Documenter les défauts par des photos si nécessaire',
            'Respecter les tolérances constructeur sans approximation'
        ],
        pointsCles: [
            'Mesures précises et conformes aux spécifications',
            'Défauts visuels correctement identifiés et évalués',
            'Recommandations techniques justifiées et documentées',
            'Sécurité du freinage garantie par le diagnostic'
        ]
    },
    124: {
        id: 124,
        duree: '1h45',
        titre: 'Dépose et Pose d\'une Roue - Équilibrage',
        situation: 'Une roue présente un déséquilibrage provoquant des vibrations. Elle doit être démontée, contrôlée et équilibrée selon les standards professionnels.',
        objectif: 'Réaliser la dépose, le contrôle et l\'équilibrage d\'une roue pour éliminer les vibrations. (Compétence C1.3)',
        materiel: ['Démonte-pneu professionnel', 'Équilibreuse électronique', 'Masses d\'équilibrage', 'Clé dynamométrique', 'Contrôleur de pression', 'Produit d\'étanchéité'],
        etudePrelim: [
            { type: 'qcm', q: 'Des vibrations ressenties dans le volant vers 110-130 km/h sont le symptôme typique d\'un problème...', options: ['De parallélisme', 'D\'équilibrage des roues avant', 'D\'équilibrage des roues arrière'], r: 'D\'équilibrage des roues avant' },
            { type: 'text', q: 'Pourquoi doit-on nettoyer parfaitement la jante avant de la monter sur l\'équilibreuse ?', r: 'Parce que la boue ou les saletés collées à l\'intérieur de la jante agissent comme une masse et faussent complètement la mesure du déséquilibre.' },
            { type: 'text', q: 'Après avoir serré les écrous de roue avec une clé à choc, quelle est l\'étape finale OBLIGATOIRE ?', r: 'Effectuer un serrage final au couple préconisé à l\'aide d\'une clé dynamométrique.' }
        ],
        activitePratique: [
            etape('Dépose et inspection de la roue', '30 min', [
                'Démonter la roue du véhicule selon les règles de sécurité.',
                'Examiner visuellement l\'état de la jante (voile, fêlures, déformation).',
                'Contrôler l\'état du pneumatique (usure, blessures, pression).',
                'Vérifier l\'état de la valve et son étanchéité.',
                'Nettoyer la jante de toute trace de corrosion ou de saleté.',
                'Retirer les anciennes masses d\'équilibrage si nécessaire.'
            ]),
            etape('Démontage et contrôle du pneumatique', '35 min', [
                'Dégonfler complètement le pneumatique.',
                'Démonter le pneumatique de la jante avec le démonte-pneu.',
                'Inspecter l\'intérieur du pneumatique (corps étrangers, usure interne).',
                'Contrôler l\'état des flancs et de la bande de roulement.',
                'Examiner la jante : état des portées, corrosion, défauts géométriques.',
                'Nettoyer soigneusement la jante avant remontage.',
                'Remonter le pneumatique en respectant le sens de rotation.'
            ]),
            etape('Équilibrage et contrôle final', '40 min', [
                'Gonfler le pneumatique à la pression de travail spécifiée.',
                'Monter la roue sur l\'équilibreuse et la centrer correctement.',
                'Lancer le cycle de mesure pour déterminer les déséquilibres.',
                'Poser les masses d\'équilibrage aux positions indiquées par la machine.',
                'Effectuer un contrôle de vérification après pose des masses.',
                'Affiner l\'équilibrage si nécessaire en ajoutant ou déplaçant des masses.',
                'Remonter la roue sur le véhicule et serrer au couple préconisé.',
                'Effectuer un essai routier pour valider l\'absence de vibrations.'
            ])
        ],
        securiteRangement: [
            'Respecter les pressions de gonflage spécifiées',
            'Utiliser l\'équilibreuse selon les instructions du fabricant',
            'Couples de serrage des roues impérativement respectés',
            'Contrôler l\'équilibrage final avant restitution'
        ],
        pointsCles: [
            'Jante et pneumatique en parfait état avant équilibrage',
            'Équilibrage statique et dynamique optimal',
            'Masses correctement positionnées et fixées',
            'Absence de vibrations validée par essai routier'
        ]
    },
    125: {
        id: 125,
        duree: '1h45',
        titre: 'Remplacement d\'un Amortisseur Avant',
        situation: 'L\'amortisseur avant droit présente des fuites d\'huile et n\'assure plus correctement son rôle. Il doit être remplacé selon la procédure constructeur.',
        objectif: 'Remplacer un amortisseur avant en respectant les couples de serrage et les règles de sécurité. (Compétence C1.3)',
        materiel: ['Amortisseur neuf de référence exacte', 'Clé dynamométrique', 'Repousse-ressort', 'Clés et douilles diverses', 'Chandelles de sécurité'],
        etudePrelim: [
            { type: 'qcm', q: 'Quel est le signe visuel le plus évident d\'un amortisseur HS ?', options: ['De la rouille', 'Des traces de fuite d\'huile sur le corps de l\'amortisseur', 'Il est sale'], r: 'Des traces de fuite d\'huile sur le corps de l\'amortisseur' },
            { type: 'text', q: 'Pourquoi faut-il toujours remplacer les amortisseurs par paire sur un même essieu ?', r: 'Pour garantir un comportement symétrique et équilibré du véhicule en freinage et en virage. Un amortisseur neuf et un usé créeraient un déséquilibre dangereux.' },
            { type: 'qcm', q: 'L\'utilisation d\'un compresseur de ressort est une opération très dangereuse. Quelle est la règle de sécurité la plus importante ?', options: ['Le faire rapidement', 'Bien positionner les griffes de manière opposée et symétrique sur le ressort', 'Mettre de l\'huile sur les vis'], r: 'Bien positionner les griffes de manière opposée et symétrique sur le ressort' }
        ],
        activitePratique: [
            etape('Préparation et accès à l\'amortisseur', '25 min', [
                'Lever le véhicule et le sécuriser avec des chandelles adaptées.',
                'Déposer la roue pour accéder à l\'amortisseur.',
                'Localiser les points de fixation haute et basse de l\'amortisseur.',
                'Soutenir le bras de suspension pour éviter la chute du ressort.',
                'Consulter la documentation technique pour la procédure spécifique.',
                'Préparer tous les outils nécessaires selon les fixations.'
            ]),
            etape('Dépose de l\'amortisseur défectueux', '40 min', [
                'Déconnecter la barre stabilisatrice si elle gêne l\'intervention.',
                'Dévisser la fixation basse de l\'amortisseur sur le bras de suspension.',
                'Accéder à la fixation haute par le compartiment moteur ou le passage de roue.',
                'Maintenir l\'amortisseur pendant le dévissage de la fixation haute.',
                'Extraire délicatement l\'amortisseur usagé.',
                'Inspecter l\'état des silent-blocs et bagues de fixation.',
                'Nettoyer les portées de fixation.'
            ]),
            etape('Installation de l\'amortisseur neuf', '40 min', [
                'Vérifier que l\'amortisseur neuf correspond exactement à l\'ancien.',
                'Installer l\'amortisseur neuf en respectant le sens de montage.',
                'Serrer la fixation haute au couple préconisé par le constructeur.',
                'Positionner et serrer la fixation basse au couple spécifié.',
                'Reconnecter tous les éléments démontés (barre stabilisatrice, etc.).',
                'Remonter la roue et serrer les écrous au couple.',
                'Effectuer un essai de compression/détente pour valider le fonctionnement.',
                'Contrôler l\'absence de bruit anormal après installation.'
            ])
        ],
        securiteRangement: [
            'Attention au ressort sous compression (risque de blessure grave)',
            'Soutenir impérativement le bras de suspension pendant l\'intervention',
            'Respecter scrupuleusement tous les couples de serrage',
            'Effectuer un contrôle géométrie après remplacement'
        ],
        pointsCles: [
            'Amortisseur de référence exactement conforme',
            'Tous les couples de serrage constructeur respectés',
            'Fonctionnement validé par test de compression',
            'Géométrie du train avant à contrôler'
        ]
    },
    126: {
        id: 126,
        duree: '1h00',
        titre: 'Remplacement du Filtre à Carburant (Diesel)',
        situation: 'Le filtre à carburant d\'un véhicule diesel est colmaté et provoque des problèmes d\'alimentation. Il doit être remplacé selon la procédure spécifique au diesel.',
        objectif: 'Remplacer le filtre à carburant diesel en respectant les règles de propreté et de purge. (Compétence C1.3)',
        materiel: ['Filtre à carburant diesel neuf', 'Clés spécifiques', 'Bac de récupération', 'Pompe d\'amorçage', 'Chiffons propres', 'Gants de protection'],
        etudePrelim: [
            { type: 'text', q: 'Quelle est la conséquence la plus grave de l\'entrée d\'impuretés dans un système d\'injection haute pression diesel ?', r: 'La destruction de la pompe haute pression et des injecteurs, dont les jeux de fonctionnement sont de l\'ordre du micron.' },
            { type: 'qcm', q: 'Après avoir remplacé le filtre, quelle est l\'étape OBLIGATOIRE avant de tenter de démarrer le moteur ?', options: ['Accélérer à fond', 'Réamorcer et purger le circuit basse pression pour chasser l\'air', 'Faire la vidange'], r: 'Réamorcer et purger le circuit basse pression pour chasser l\'air' },
            { type: 'text', q: 'De nombreux filtres à gazole ont une vis de purge en dessous. À quoi sert-elle ?', r: 'À purger l\'eau qui s\'est accumulée par décantation au fond du filtre, car l\'eau est plus dense que le gazole.' }
        ],
        activitePratique: [
            etape('Préparation et localisation du filtre', '15 min', [
                'Localiser le filtre à carburant (généralement près du réservoir ou dans le compartiment moteur).',
                'Préparer le bac de récupération pour le gazole qui va s\'écouler.',
                'Nettoyer la zone autour du filtre pour éviter toute contamination.',
                'Identifier les raccords d\'entrée et sortie du carburant.',
                'Couper le contact et débrancher la batterie par sécurité.'
            ]),
            etape('Remplacement du filtre', '30 min', [
                'Déconnecter délicatement les durites en récupérant le carburant.',
                'Dévisser le filtre usagé de son support.',
                'Vider le carburant du filtre usagé dans le bac de récupération.',
                'Nettoyer les raccords et vérifier leur état.',
                'Installer le filtre neuf avec des joints neufs.',
                'Reconnecter les durites en respectant l\'entrée et la sortie.',
                'Serrer tous les raccords au couple spécifié sans excès.'
            ]),
            etape('Amorçage et contrôle de fonctionnement', '15 min', [
                'Rebrancher la batterie et actionner la pompe d\'amorçage manuelle.',
                'Purger l\'air du circuit en actionnant plusieurs fois la pompe.',
                'Contrôler l\'absence de fuite au niveau de tous les raccords.',
                'Démarrer le moteur et laisser tourner au ralenti.',
                'Vérifier la stabilité du ralenti et l\'absence d\'à-coups.',
                'Effectuer quelques accélérations pour valider l\'alimentation.',
                'Nettoyer la zone de travail et éliminer le carburant récupéré.'
            ])
        ],
        securiteRangement: [
            'Propreté absolue requise pour éviter la contamination',
            'Récupérer tout le carburant dans un bac agréé',
            'Éviter les sources d\'ignition (interdiction de fumer)',
            'Éliminer le filtre usagé via filière de recyclage'
        ],
        pointsCles: [
            'Circuit parfaitement purgé sans air résiduel',
            'Étanchéité de tous les raccords vérifiée',
            'Fonctionnement moteur stable après remplacement',
            'Propreté maintenue pendant toute l\'intervention'
        ]
    },
    127: {
        id: 127,
        duree: '1h00',
        titre: 'Réparation du Circuit de Lave-Glace',
        situation: 'Le système de lave-glace ne fonctionne plus. Vous devez diagnostiquer la panne (pompe, gicleurs, circuit) et effectuer la réparation nécessaire.',
        objectif: 'Réparer le circuit de lave-glace pour restaurer une visibilité parfaite du pare-brise. (Compétence C1.3)',
        materiel: ['Multimètre', 'Pompe de lave-glace neuve', 'Gicleurs de remplacement', 'Durite souple', 'Produit lave-glace', 'Aiguille de débouchage'],
        etudePrelim: [
            { type: 'qcm', q: 'Vous actionnez la commande de lave-glace et entendez le bruit de la pompe, mais rien ne sort. Quelle est la cause la plus probable ?', options: ['Un fusible grillé', 'Une pompe HS', 'Un gicleur ou une durite bouché(e)'], r: 'Un gicleur ou une durite bouché(e)' },
            { type: 'text', q: 'Vous n\'entendez aucun bruit de pompe. Quel test simple faites-vous en premier ?', r: 'Vérifier le fusible correspondant et l\'alimentation 12V à la pompe avec un multimètre.' },
            { type: 'text', q: 'Quelle est la méthode la plus simple pour déboucher un gicleur ?', r: 'Utiliser une aiguille fine ou un trombone pour retirer délicatement le bouchon de calcaire ou de saleté.' }
        ],
        activitePratique: [
            etape('Diagnostic de la panne', '20 min', [
                'Tester le fonctionnement de la commande de lave-glace.',
                'Écouter si la pompe fonctionne lors de l\'activation.',
                'Contrôler le niveau de produit lave-glace dans le réservoir.',
                'Vérifier l\'alimentation électrique de la pompe (12V contact mis).',
                'Identifier si la panne vient de la pompe, des gicleurs ou du circuit.',
                'Localiser précisément le composant défaillant.'
            ]),
            etape('Réparation du composant défectueux', '25 min', [
                'Si pompe HS : la remplacer après avoir vidangé le réservoir.',
                'Si gicleurs bouchés : les déboucher avec une aiguille fine ou les remplacer.',
                'Si durite percée : remplacer la section endommagée.',
                'Nettoyer tout le circuit avec de l\'eau claire.',
                'Remplir le réservoir avec du produit lave-glace de qualité.',
                'Purger l\'air du circuit en actionnant plusieurs fois la pompe.'
            ]),
            etape('Test et réglage final', '15 min', [
                'Tester le fonctionnement du lave-glace sur toutes les vitesses.',
                'Ajuster l\'orientation des gicleurs si nécessaire.',
                'Vérifier que le jet atteint bien toute la surface du pare-brise.',
                'Contrôler l\'absence de fuite dans tout le circuit.',
                'Valider l\'efficacité du nettoyage du pare-brise.',
                'Compléter le niveau de produit lave-glace.'
            ])
        ],
        securiteRangement: [
            'Produit lave-glace peut être toxique (éviter l\'ingestion)',
            'Nettoyer immédiatement les projections sur la peinture',
            'Vérifier l\'étanchéité de tous les raccords',
            'Utiliser un produit lave-glace de qualité adapté à la saison'
        ],
        pointsCles: [
            'Cause exacte de la panne identifiée et réparée',
            'Circuit complètement purgé et étanche',
            'Orientation des gicleurs optimisée',
            'Efficacité de nettoyage validée'
        ]
    },
    128: {
        id: 128,
        duree: '1h00',
        titre: 'Contrôle et Étanchéité de la Ligne d\'Échappement',
        situation: 'Le véhicule présente un bruit anormal à l\'échappement. Vous devez contrôler l\'étanchéité et l\'état de la ligne d\'échappement complète.',
        objectif: 'Contrôler et réparer si nécessaire la ligne d\'échappement pour maintenir les performances et réduire la pollution. (Compétence C1.2, C1.3)',
        materiel: ['Pont élévateur', 'Lampe d\'inspection', 'Pâte d\'étanchéité haute température', 'Colliers d\'échappement', 'Clés adaptées', 'Gants thermiques'],
        etudePrelim: [
            { type: 'text', q: 'Quels sont les risques d\'une fuite sur la ligne d\'échappement, notamment si elle se situe avant le catalyseur ?', r: 'Bruit, pollution accrue, mais surtout risque d\'intoxication au monoxyde de carbone (CO) si les gaz entrent dans l\'habitacle.' },
            { type: 'qcm', q: 'Comment repérer facilement une petite fuite sur une ligne d\'échappement froide ?', options: ['En regardant de loin', 'En passant la main pour sentir le souffle', 'En recherchant des traces de suie noire autour des jonctions'], r: 'En recherchant des traces de suie noire autour des jonctions' },
            { type: 'text', q: 'À quoi servent les silentblocs en caoutchouc qui soutiennent la ligne d\'échappement ?', r: 'Ils absorbent les vibrations du moteur et les mouvements de la ligne pour éviter qu\'elle ne casse ou ne heurte la carrosserie.' }
        ],
        activitePratique: [
            etape('Inspection complète de la ligne', '25 min', [
                'Lever le véhicule sur pont pour accéder à toute la ligne d\'échappement.',
                'Examiner visuellement chaque élément : collecteur, catalyseur, silencieux.',
                'Rechercher les traces de suie indicatrices de fuites.',
                'Contrôler l\'état des fixations, supports et silentblocs.',
                'Vérifier l\'absence de contact avec la carrosserie.',
                'Identifier toutes les anomalies (corrosion, fissures, déformation).'
            ]),
            etape('Test d\'étanchéité', '20 min', [
                'Démarrer le moteur et écouter les bruits anormaux.',
                'Localiser précisément les fuites par le bruit et la suie.',
                'Boucher temporairement le pot d\'échappement avec un chiffon.',
                'Observer les échappements de gaz aux points de fuite.',
                'Mesurer l\'importance des fuites détectées.',
                'Hiérarchiser les réparations selon la criticité.'
            ]),
            etape('Réparation des défauts', '15 min', [
                'Réparer les petites fuites avec de la pâte haute température.',
                'Resserrer ou remplacer les colliers de fixation desserrés.',
                'Remplacer les éléments trop endommagés si nécessaire.',
                'Ajuster les supports et silentblocs d\'échappement.',
                'Vérifier l\'absence de contact avec la carrosserie.',
                'Contrôler la bonne fixation de tous les éléments.'
            ])
        ],
        securiteRangement: [
            'Attention à la température élevée de l\'échappement',
            'Porter des gants thermiques pour manipuler les pièces chaudes',
            'Bien ventiler l\'atelier (gaz d\'échappement toxiques)',
            'Laisser refroidir avant manipulation si moteur chaud'
        ],
        pointsCles: [
            'Toutes les fuites identifiées et réparées',
            'Fixations correctes et sans contact carrosserie',
            'Étanchéité parfaite de la ligne complète',
            'Bruit d\'échappement normal après réparation'
        ]
    },
    129: {
        id: 129,
        duree: '1h00',
        titre: 'Utilisation de la Clé Dynamométrique',
        situation: 'Pour garantir la sécurité et la fiabilité des assemblages, vous devez apprendre à utiliser correctement une clé dynamométrique sur différents composants.',
        objectif: 'Maîtriser l\'utilisation de la clé dynamométrique pour respecter les couples de serrage constructeur. (Compétence C1.1)',
        materiel: ['Clé dynamométrique étalonné', 'Douilles diverses', 'Documentation couples de serrage', 'Boulons d\'exercice', 'Huile de graissage'],
        etudePrelim: [
            { type: 'text', q: 'Quel est le risque si on serre trop fort les écrous d\'une roue ? Et si on ne serre pas assez ?', r: 'Trop fort : on risque de déformer la jante ou de casser un goujon. Pas assez : la roue risque de se desserrer et de se détacher en roulant.' },
            { type: 'qcm', q: 'Après avoir utilisé une clé dynamométrique à déclenchement, que doit-on faire avant de la ranger ?', options: ['La laisser réglée sur le dernier couple utilisé', 'La mettre au couple maximum', 'La remettre à sa valeur la plus basse pour détendre le ressort interne'], r: 'La remettre à sa valeur la plus basse pour détendre le ressort interne' },
            { type: 'text', q: 'Peut-on utiliser une clé dynamométrique pour desserrer un écrou très bloqué ? Pourquoi ?', r: 'Non, jamais. C\'est un instrument de mesure de précision qui serait endommagé. On utilise une clé à choc ou un bras de levier pour desserrer.' }
        ],
        activitePratique: [
            etape('Prise en main de la clé dynamométrique', '20 min', [
                'Examiner la clé et identifier les éléments de réglage.',
                'Apprendre à régler la valeur de couple désirée.',
                'Comprendre le mécanisme de déclenchement (clic).',
                'Tester le fonctionnement à vide pour s\'habituer.',
                'Vérifier l\'étalonnage et la date de dernière vérification.',
                'Sélectionner les douilles appropriées aux boulons.'
            ]),
            etape('Exercices pratiques de serrage', '25 min', [
                'Serrer des écrous de roue au couple préconisé (généralement 110 Nm).',
                'Appliquer le couple sur des boulons de culasse (séquence et valeurs).',
                'Serrer des vis de plaquettes de frein (couple faible, précision importante).',
                'Exercer le serrage sur différents matériaux (acier, aluminium).',
                'Respecter les séquences de serrage (croix, spirale, linéaire).',
                'Contrôler le serrage en appliquant une seconde fois le couple.'
            ]),
            etape('Applications concrètes et bonnes pratiques', '15 min', [
                'Consulter la documentation pour trouver les couples spécifiés.',
                'Appliquer la méthode de serrage en deux passes si nécessaire.',
                'Comprendre l\'influence de la lubrification sur le couple.',
                'Apprendre à détecter un filetage endommagé.',
                'Rangement correct de la clé (remise à zéro).',
                'Documentation des couples appliqués sur la fiche d\'intervention.'
            ])
        ],
        securiteRangement: [
            'Toujours remettre la clé dynamométrique à sa valeur minimale après usage',
            'Ne jamais utiliser une clé dynamométrique pour desserrer',
            'Vérifier l\'étalonnage régulièrement',
            'Manipuler avec précaution (instrument de mesure délicat)'
        ],
        pointsCles: [
            'Réglage correct de la valeur de couple',
            'Déclenchement au couple exact (sensation du clic)',
            'Séquences de serrage respectées',
            'Documentation systématique des couples appliqués'
        ]
    },
    130: {
        id: 130,
        duree: '0h45',
        titre: 'Sélection des Lubrifiants et Traçabilité',
        situation: 'Lors des vidanges et entretiens, vous devez savoir sélectionner les lubrifiants appropriés et assurer la traçabilité réglementaire des produits utilisés.',
        objectif: 'Choisir les lubrifiants conformes aux spécifications et maintenir la traçabilité obligatoire. (Compétence C1.1)',
        materiel: ['Échantillons d\'huiles diverses', 'Fiches techniques constructeur', 'Registre de traçabilité', 'Étiquettes d\'identification'],
        etudePrelim: [
            { type: 'qcm', q: 'L\'indice "5W" dans une huile 5W30 représente...', options: ['La viscosité à chaud', 'La viscosité à froid', 'La qualité de l\'huile'], r: 'La viscosité à froid' },
            { type: 'text', q: 'Qu\'est-ce qu\'une norme constructeur (ex: VW 507.00) et pourquoi est-elle plus importante que l\'indice de viscosité ?', r: 'C\'est un cahier des charges très strict imposé par le constructeur. Elle garantit que l\'huile possède tous les additifs nécessaires pour protéger ce moteur spécifique (FAP, etc.).' },
            { type: 'text', q: 'Pourquoi la traçabilité (noter quelle huile a été mise, quand et à quel kilométrage) est-elle si importante ?', r: 'Pour des raisons de garantie constructeur, de responsabilité légale de l\'atelier, et pour assurer un suivi correct de l\'entretien du véhicule.' }
        ],
        activitePratique: [
            etape('Identification des spécifications requises', '15 min', [
                'Consulter le carnet d\'entretien du véhicule.',
                'Identifier les spécifications huile moteur, boîte, pont.',
                'Noter les indices de viscosité recommandés.',
                'Vérifier les normes constructeur (VW 504.00, BMW LL-01, etc.).',
                'Comprendre l\'influence de l\'utilisation (urbain, autoroutier, sportif).'
            ]),
            etape('Sélection des lubrifiants appropriés', '20 min', [
                'Comparer les fiches techniques des huiles disponibles.',
                'Vérifier la conformité aux spécifications constructeur.',
                'Choisir la viscosité adaptée au climat et à l\'utilisation.',
                'Sélectionner le conditionnement approprié (volume nécessaire).',
                'Contrôler les dates de péremption des produits.',
                'Valider la compatibilité avec l\'huile précédemment utilisée.'
            ]),
            etape('Traçabilité et documentation', '10 min', [
                'Enregistrer la référence exacte du lubrifiant utilisé.',
                'Noter la quantité utilisée et la date d\'intervention.',
                'Compléter le carnet d\'entretien du véhicule.',
                'Mettre à jour le registre de traçabilité de l\'atelier.',
                'Apposer l\'étiquette de vidange sur le moteur.',
                'Archiver la fiche d\'intervention avec les références produits.'
            ])
        ],
        securiteRangement: [
            'Stockage des lubrifiants à l\'abri de l\'humidité et des variations thermiques',
            'Étiquetage permanent des contenants entamés',
            'Traçabilité obligatoire pour garantie et réglementation',
            'Élimination des huiles usagées via filière agréée'
        ],
        pointsCles: [
            'Lubrifiants conformes aux spécifications constructeur',
            'Viscosité adaptée aux conditions d\'utilisation',
            'Traçabilité complète et réglementaire',
            'Documentation client et atelier mise à jour'
        ]
    },
    131: {
        id: 131,
        duree: '1h15',
        titre: 'Lecture d\'une Fiche Technique RTA',
        situation: 'Pour effectuer correctement une réparation, vous devez apprendre à consulter et interpréter une fiche technique de la Revue Technique Automobile.',
        objectif: 'Utiliser efficacement la documentation technique pour obtenir les informations nécessaires aux interventions. (Compétence C1.1)',
        materiel: ['Revue Technique Automobile', 'Manuel constructeur', 'Documentation électronique', 'Ordinateur ou tablette'],
        etudePrelim: [
            { type: 'text', q: 'Vous devez remplacer une courroie de distribution. Quelles sont les 3 informations capitales que vous devez trouver dans la RTA avant de commencer ?', r: '1. La procédure de calage du moteur. 2. Les couples de serrage des galets et supports. 3. La méthode de tension de la courroie neuve.' },
            { type: 'qcm', q: 'Un schéma électrique représente les composants...', options: ['À leur emplacement réel dans la voiture', 'De manière symbolique pour montrer leurs connexions logiques', 'En 3D'], r: 'De manière symbolique pour montrer leurs connexions logiques' },
            { type: 'text', q: 'Comment identifier précisément le modèle et la motorisation d\'un véhicule pour trouver la bonne documentation ?', r: 'En utilisant le numéro de série du véhicule (VIN) ou le type mine inscrit sur la carte grise.' }
        ],
        activitePratique: [
            etape('Navigation dans la documentation RTA', '25 min', [
                'Identifier la structure générale d\'une RTA (index, chapitres, annexes).',
                'Localiser les informations générales du véhicule (motorisations, versions).',
                'Trouver les schémas de démontage et remontage.',
                'Repérer les tableaux de couples de serrage.',
                'Accéder aux procédures de réglage et d\'entretien.',
                'Comprendre la symbolique utilisée dans les schémas.'
            ]),
            etape('Recherche d\'informations spécifiques', '30 min', [
                'Rechercher la procédure de vidange d\'un véhicule donné.',
                'Trouver les spécifications des lubrifiants recommandés.',
                'Localiser les points de contrôle pour un entretien périodique.',
                'Identifier les outils spéciaux nécessaires pour une intervention.',
                'Rechercher les capacités (huile, liquide de refroidissement).',
                'Trouver les tolérances dimensionnelles des pièces à contrôler.'
            ]),
            etape('Application pratique', '20 min', [
                'Utiliser la RTA pour préparer une intervention complète.',
                'Lister tous les éléments nécessaires (outils, pièces, temps).',
                'Vérifier les précautions particulières mentionnées.',
                'Noter les points de contrôle obligatoires.',
                'Comprendre les schémas électriques de base.',
                'Préparer une fiche d\'intervention basée sur la documentation.'
            ])
        ],
        securiteRangement: [
            'Maintenir la documentation à jour (suppléments, corrections)',
            'Vérifier toujours la correspondance modèle/année',
            'Croiser les informations RTA avec la documentation constructeur',
            'Conserver les sources documentaires pour traçabilité'
        ],
        pointsCles: [
            'Navigation efficace dans la documentation technique',
            'Informations pertinentes rapidement localisées',
            'Procédures comprises et applicables',
            'Sécurité et qualité garanties par le respect de la documentation'
        ]
    },
    132: {
        id: 132,
        duree: '1h00',
        titre: 'Contrôle et Remplacement de Fusibles',
        situation: 'Un équipement électrique ne fonctionne plus. Vous devez contrôler et remplacer les fusibles défaillants en respectant les calibres et procédures.',
        objectif: 'Identifier, tester et remplacer les fusibles défectueux pour restaurer le fonctionnement des circuits électriques. (Compétence C1.2, C1.3)',
        materiel: ['Multimètre', 'Jeu de fusibles de rechange', 'Pince extracteur de fusibles', 'Lampe témoin 12V', 'Schéma des fusibles'],
        etudePrelim: [
            { type: 'text', q: 'Un fusible de 15A grille instantanément dès que vous le remplacez. Quelle est la conclusion la plus probable ?', r: 'Il y a un court-circuit à la masse sur ce circuit.' },
            { type: 'qcm', q: 'Quelle est la méthode la plus fiable pour tester un fusible ?', options: ['Le regarder à la lumière', 'Le secouer', 'Tester sa continuité avec un multimètre en mode ohmmètre'], r: 'Tester sa continuité avec un multimètre en mode ohmmètre' },
            { type: 'text', q: 'Pourquoi est-il important de consulter le schéma des fusibles avant toute intervention ?', r: 'Pour identifier rapidement le fusible correspondant au circuit en panne et connaître son calibre exact sans avoir à tous les tester un par un.' }
        ],
        activitePratique: [
            etape('Localisation et identification des fusibles', '20 min', [
                'Localiser les différents boîtiers de fusibles (habitacle, compartiment moteur).',
                'Consulter le schéma de répartition des fusibles.',
                'Identifier le fusible correspondant à l\'équipement en panne.',
                'Noter le calibre du fusible (5A, 10A, 15A, 20A, 30A).',
                'Repérer le type de fusible (lame mini, standard, maxi).'
            ]),
            etape('Test et diagnostic des fusibles', '25 min', [
                'Extraire délicatement le fusible suspect avec la pince spécialisée.',
                'Examiner visuellement l\'état du filament métallique.',
                'Tester la continuité du fusible avec le multimètre.',
                'Si fusible OK, rechercher la panne ailleurs dans le circuit.',
                'Si fusible HS, vérifier l\'absence de court-circuit avant remplacement.',
                'Contrôler l\'état des connecteurs du porte-fusible.'
            ]),
            etape('Remplacement et validation', '15 min', [
                'Remplacer le fusible défectueux par un neuf de même calibre.',
                'Ne jamais utiliser un fusible de calibre supérieur.',
                'Remettre en place et vérifier le bon enclenchement.',
                'Tester le fonctionnement de l\'équipement concerné.',
                'Si le nouveau fusible grille immédiatement, diagnostic approfondi nécessaire.',
                'Noter l\'intervention sur la fiche de réparation.'
            ])
        ],
        securiteRangement: [
            'Couper le contact avant manipulation des fusibles',
            'Ne jamais dépasser le calibre du fusible d\'origine',
            'Utiliser l\'extracteur pour éviter de casser les fusibles',
            'Rechercher la cause en cas de fusion répétée'
        ],
        pointsCles: [
            'Fusible correct identifié selon le schéma',
            'Calibre respecté impérativement',
            'Cause de la panne recherchée si fusion répétée',
            'Fonctionnement de l\'équipement restauré'
        ]
    },
    133: {
        id: 133,
        duree: '1h15',
        titre: 'Test d\'un Relais Automobile',
        situation: 'Un équipement électrique commandé par relais ne fonctionne plus. Vous devez tester le relais et le remplacer si nécessaire.',
        objectif: 'Diagnostiquer et remplacer un relais défectueux pour rétablir le fonctionnement d\'un circuit électrique. (Compétence C1.2, C1.3)',
        materiel: ['Multimètre de précision', 'Relais de test', 'Schéma électrique', 'Lampe témoin 12V', 'Pinces crocodiles'],
        etudePrelim: [
            { type: 'text', q: 'À l\'aide des numéros de bornes standards (30, 85, 86, 87), décrivez comment fonctionne un relais 4 broches.', r: 'On applique une tension de commande aux bornes 85 et 86 (la bobine), ce qui crée un champ magnétique qui ferme un interrupteur interne, reliant alors la borne de puissance 30 à la borne de sortie 87.' },
            { type: 'qcm', q: 'Vous entendez un "clic" lorsque vous activez la commande, mais l\'équipement ne fonctionne pas. Que suspectez-vous ?', options: ['La bobine du relais est coupée', 'Le contact de puissance du relais est charbonné/oxydé', 'Le fusible de commande est grillé'], r: 'Le contact de puissance du relais est charbonné/oxydé' },
            { type: 'text', q: 'Comment tester rapidement un relais si vous disposez d\'un relais identique et fonctionnel ?', r: 'En les échangeant simplement. Si le défaut se résout, le relais d\'origine est bien la cause de la panne.' }
        ],
        activitePratique: [
            etape('Identification et localisation du relais', '20 min', [
                'Identifier le relais correspondant au circuit en panne.',
                'Localiser le relais dans le boîtier (habitacle ou compartment moteur).',
                'Noter la référence et le type du relais (4 ou 5 broches).',
                'Consulter le schéma de brochage du relais.',
                'Examiner visuellement l\'état du relais et de son connecteur.'
            ]),
            etape('Test du relais hors circuit', '30 min', [
                'Extraire délicatement le relais de son logement.',
                'Mesurer la résistance de la bobine de commande (broches 85-86).',
                'Mesurer la continuité des contacts de puissance au repos.',
                'Alimenter la bobine en 12V et vérifier la commutation des contacts.',
                'Contrôler que les contacts se ferment/ouvrent correctement.',
                'Tester la tenue de la commutation sous tension.'
            ]),
            etape('Test en circuit et remplacement', '25 min', [
                'Contrôler l\'alimentation 12V sur la broche 30 du connecteur.',
                'Vérifier la commande de masse sur les broches 85 ou 86.',
                'Tester la continuité vers l\'équipement alimenté (broche 87).',
                'Si le relais est défectueux, le remplacer par un modèle identique.',
                'Valider le bon fonctionnement après remplacement.',
                'Effectuer plusieurs cycles de test pour confirmer la réparation.'
            ])
        ],
        securiteRangement: [
            'Couper le contact avant extraction du relais',
            'Respecter le brochage lors des mesures',
            'Ne pas confondre les relais de différents calibres',
            'Vérifier la cause de défaillance pour éviter la récidive'
        ],
        pointsCles: [
            'Relais correctement testé selon procédure',
            'Brochage et référence respectés pour le remplacement',
            'Circuit complet validé après intervention',
            'Fonctionnement durable de l\'équipement restauré'
        ]
    },
    134: {
        id: 134,
        duree: '0h45',
        titre: 'Remise à Zéro de l\'Indicateur d\'Entretien',
        situation: 'Après un entretien, l\'indicateur d\'entretien du tableau de bord doit être remis à zéro pour programmer le prochain entretien.',
        objectif: 'Effectuer la remise à zéro de l\'indicateur d\'entretien selon la procédure constructeur. (Compétence C1.4)',
        materiel: ['Documentation constructeur', 'Valise de diagnostic (si nécessaire)', 'Montre ou chronomètre'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi est-il crucial de faire cette remise à zéro après chaque vidange ?', r: 'Pour que le client soit alerté au bon moment pour le prochain entretien et pour maintenir la validité de la garantie constructeur.' },
            { type: 'qcm', q: 'Sur de nombreux véhicules, la procédure manuelle implique souvent une combinaison d\'actions. Laquelle est la plus courante ?', options: ['Appuyer sur le klaxon 3 fois', 'Maintenir un bouton du tableau de bord enfoncé tout en mettant le contact', 'Faire un appel de phare'], r: 'Maintenir un bouton du tableau de bord enfoncé tout en mettant le contact' },
            { type: 'text', q: 'Comment s\'assurer que la remise à zéro a bien fonctionné ?', r: 'En coupant puis en remettant le contact. Le message d\'entretien ne doit plus apparaître et l\'ordinateur de bord doit afficher le kilométrage/temps jusqu\'à la prochaine échéance.' }
        ],
        activitePratique: [
            etape('Identification de la procédure', '10 min', [
                'Consulter la documentation constructeur pour la procédure exacte.',
                'Identifier le type d\'indicateur d\'entretien (affichage, voyant).',
                'Noter la séquence de manipulation nécessaire.',
                'Vérifier si une valise de diagnostic est nécessaire.',
                'Préparer les outils requis selon la méthode.'
            ]),
            etape('Application de la procédure de remise à zéro', '25 min', [
                'Méthode manuelle : effectuer la séquence de touches/boutons selon documentation.',
                'Respecter précisément les temps d\'appui et les séquences.',
                'Méthode électronique : utiliser la valise de diagnostic si nécessaire.',
                'Suivre scrupuleusement la procédure étape par étape.',
                'Observer les confirmations visuelles (clignotements, affichages).',
                'Répéter si nécessaire jusqu\'à obtention de la confirmation.'
            ]),
            etape('Validation et vérification', '10 min', [
                'Vérifier que l\'indicateur affiche bien le kilométrage du prochain entretien.',
                'Contrôler l\'extinction du voyant d\'entretien.',
                'Effectuer un cycle contact coupé/contact mis pour confirmer.',
                'Noter l\'intervention sur la fiche d\'entretien.',
                'Informer le client de la remise à zéro effectuée.',
                'Expliquer au client le fonctionnement de l\'indicateur.'
            ])
        ],
        securiteRangement: [
            'Suivre exactement la procédure constructeur',
            'Ne pas improviser de séquence de manipulation',
            'Vérifier impérativement le résultat',
            'Documenter l\'opération effectuée'
        ],
        pointsCles: [
            'Procédure constructeur appliquée rigoureusement',
            'Remise à zéro confirmée et vérifiée',
            'Prochain entretien correctement programmé',
            'Client informé du fonctionnement'
        ]
    },
    135: {
        id: 135,
        duree: '1h00',
        titre: 'Réparation d\'un Faisceau Électrique',
        situation: 'Un faisceau électrique présente une coupure ou un court-circuit. Vous devez localiser le défaut et effectuer une réparation durable.',
        objectif: 'Réparer un faisceau électrique endommagé en respectant les normes de qualité et de sécurité. (Compétence C1.3)',
        materiel: ['Multimètre', 'Fil électrique de section appropriée', 'Cosses et connecteurs', 'Sertisseur de cosses', 'Gaine thermorétractable', 'Ruban isolant'],
        etudePrelim: [
            { type: 'text', q: 'Quelle est la méthode la plus sûre et la plus durable pour réparer un fil coupé ?', r: 'Utiliser une cosse à sertir (ou une soudure à l\'étain) puis isoler la réparation avec une gaine thermorétractable.' },
            { type: 'qcm', q: 'Pourquoi ne doit-on jamais simplement torsader les fils et mettre du ruban adhésif ?', options: ['C\'est trop long à faire', 'Le contact n\'est pas fiable et la réparation n\'est pas étanche', 'Ce n\'est pas esthétique'], r: 'Le contact n\'est pas fiable et la réparation n\'est pas étanche' },
            { type: 'text', q: 'Comment s\'assurer de choisir un fil de remplacement de la bonne section ?', r: 'En se référant à la documentation technique ou en comparant visuellement avec la section du fil d\'origine. Utiliser un fil trop fin est dangereux (risque de surchauffe).' }
        ],
        activitePratique: [
            etape('Localisation du défaut', '20 min', [
                'Identifier les symptômes du dysfonctionnement électrique.',
                'Consulter le schéma électrique du circuit concerné.',
                'Localiser visuellement les zones d\'usure ou de détérioration.',
                'Utiliser le multimètre pour mesurer la continuité.',
                'Isoler précisément la section de faisceau défectueuse.',
                'Évaluer l\'étendue de la réparation nécessaire.'
            ]),
            etape('Préparation et réparation', '25 min', [
                'Couper l\'alimentation du circuit concerné.',
                'Dénuder délicatement les fils endommagés.',
                'Couper la section défectueuse en conservant le maximum de longueur.',
                'Préparer un fil de remplacement de section identique.',
                'Effectuer les épissures avec des cosses serties professionnellement.',
                'Isoler chaque connexion avec de la gaine thermorétractable.',
                'Regrouper et protéger les fils réparés.'
            ]),
            etape('Test et validation', '15 min', [
                'Vérifier la continuité de chaque fil réparé.',
                'Contrôler l\'isolement entre les différents conducteurs.',
                'Rétablir l\'alimentation et tester le fonctionnement.',
                'Vérifier l\'absence d\'échauffement anormal.',
                'Fixer correctement le faisceau réparé pour éviter les frottements.',
                'Documenter la réparation effectuée.'
            ])
        ],
        securiteRangement: [
            'Couper impérativement l\'alimentation avant réparation',
            'Respecter les sections et couleurs des fils',
            'Utiliser des outils de sertissage adaptés',
            'Protéger la réparation contre l\'humidité et l\'abrasion'
        ],
        pointsCles: [
            'Défaut localisé avec précision',
            'Réparation durable et aux normes',
            'Isolement électrique parfait',
            'Fonctionnement validé après intervention'
        ]
    },
    136: {
        id: 136,
        duree: '1h00',
        titre: 'Équilibrage d\'une Roue',
        situation: 'Une roue présente un déséquilibre provoquant des vibrations au volant. Elle doit être équilibrée sur machine pour éliminer ce défaut.',
        objectif: 'Équilibrer une roue pour éliminer les vibrations et assurer un roulage confortable. (Compétence C1.3)',
        materiel: ['Équilibreuse électronique', 'Masses d\'équilibrage adhésives et à clip', 'Nettoyant dégraissant', 'Pince à masses'],
        etudePrelim: [
            { type: 'text', q: 'Quelle est la différence entre l\'équilibrage statique et l\'équilibrage dynamique ?', r: 'Statique corrige le "sautillement" vertical. Dynamique corrige le "flottement" latéral. Une équilibreuse moderne calcule les deux.' },
            { type: 'qcm', q: 'Où doit-on coller les masses adhésives sur une jante en aluminium ?', options: ['N\'importe où sur la jante', 'Sur le bord extérieur visible', 'À l\'intérieur de la jante, sur des surfaces planes et propres'], r: 'À l\'intérieur de la jante, sur des surfaces planes et propres' },
            { type: 'text', q: 'L\'équilibreuse affiche "0 - 0" après correction. Qu\'est-ce que cela signifie ?', r: 'Que la roue est parfaitement équilibrée et qu\'il n\'y a plus de balourd à corriger.' }
        ],
        activitePratique: [
            etape('Préparation de la roue', '15 min', [
                'Nettoyer soigneusement la jante et retirer les anciennes masses.',
                'Vérifier l\'état de la jante (déformation, fissures).',
                'Contrôler la pression du pneumatique.',
                'Examiner l\'usure du pneumatique et sa régularité.',
                'Vérifier que la roue est adaptée à l\'équilibreuse.'
            ]),
            etape('Mesure du déséquilibre', '20 min', [
                'Monter la roue sur l\'équilibreuse et la centrer correctement.',
                'Saisir les paramètres de la jante (diamètre, largeur, déport).',
                'Lancer le cycle de mesure et attendre la stabilisation.',
                'Noter les valeurs de déséquilibre statique et dynamique.',
                'Identifier les positions où placer les masses correctives.',
                'Calculer les masses nécessaires selon les indications machine.'
            ]),
            etape('Correction et validation', '25 min', [
                'Dégraisser les zones de pose des masses.',
                'Poser les masses d\'équilibrage aux positions calculées.',
                'Utiliser des masses adhésives à l\'intérieur et à clip à l\'extérieur.',
                'Relancer un cycle de contrôle pour vérifier la correction.',
                'Affiner si nécessaire en ajoutant ou déplaçant des masses.',
                'Valider que les valeurs finales sont dans les tolérances.',
                'Nettoyer la roue et vérifier la fixation des masses.'
            ])
        ],
        securiteRangement: [
            'Vérifier la fixation correcte de la roue sur l\'équilibreuse',
            'Respecter les consignes de sécurité de la machine',
            'Utiliser des masses de qualité appropriée',
            'Contrôler la validation finale avant remontage'
        ],
        pointsCles: [
            'Déséquilibre mesuré avec précision',
            'Masses correctement positionnées et fixées',
            'Valeurs finales dans les tolérances acceptables',
            'Roue prête pour un roulage sans vibration'
        ]
    },
    137: {
        id: 137,
        duree: '1h30',
        titre: 'Bilan de Compétences - Entretien Périodique',
        situation: 'En fin de formation Seconde, vous devez démontrer la maîtrise de toutes les compétences acquises à travers un bilan complet et la réalisation d\'un entretien périodique autonome.',
        objectif: 'Valider l\'acquisition de toutes les compétences du référentiel Seconde par un entretien complet en autonomie. (Toutes compétences C1.1 à C1.4)',
        materiel: ['Tous les outils et équipements d\'atelier', 'Fiche d\'évaluation complète', 'Documentation technique', 'Produits d\'entretien'],
        etudePrelim: [
            { type: 'text', q: 'Avant de commencer un entretien, quelle est votre première action pour connaître les opérations à réaliser ?', r: 'Consulter le carnet d\'entretien du véhicule et la documentation technique du constructeur pour connaître le plan de maintenance spécifique.' },
            { type: 'qcm', q: 'Lors d\'un contrôle, vous détectez un défaut de sécurité majeur (ex: fuite de liquide de frein). Que faites-vous ?', options: ['Vous ignorez le problème et continuez l\'entretien', 'Vous réparez sans en parler au client', 'Vous arrêtez l\'entretien, informez immédiatement le client et le chef d\'atelier, et préconisez une réparation urgente'], r: 'Vous arrêtez l\'entretien, informez immédiatement le client et le chef d\'atelier, et préconisez une réparation urgente' },
            { type: 'text', q: 'Citez 3 éléments clés qui doivent figurer sur la fiche d\'intervention que vous remettez au client.', r: '1. Le détail des opérations réalisées. 2. Les références des pièces et fluides utilisés (traçabilité). 3. Les anomalies constatées et les recommandations.' }
        ],
        activitePratique: [
            etape('Réception véhicule et planification', '20 min', [
                'Accueillir le client et identifier ses demandes spécifiques.',
                'Consulter le carnet d\'entretien et déterminer les opérations à effectuer.',
                'Planifier l\'intervention en optimisant l\'organisation du travail.',
                'Préparer tous les outils, équipements et consommables nécessaires.',
                'Organiser le poste de travail selon les règles de sécurité.',
                'Établir un planning réaliste et respectueux des délais.'
            ]),
            etape('Réalisation de l\'entretien périodique', '80 min', [
                'Effectuer la vidange moteur et le remplacement du filtre à huile avec traçabilité complète.',
                'Remplacer le filtre à air et contrôler l\'état du boîtier d\'admission.',
                'Contrôler et ajuster tous les niveaux de fluides selon les spécifications.',
                'Vérifier l\'état et la pression des pneumatiques, effectuer les corrections.',
                'Contrôler le système de freinage complet (plaquettes, disques, liquide).',
                'Tester tous les systèmes d\'éclairage et remplacer les ampoules défectueuses.',
                'Contrôler la batterie et le circuit de charge avec mesures précises.',
                'Effectuer les contrôles visuels de sécurité (suspension, échappement, direction).'
            ]),
            etape('Contrôles finaux et restitution client', '30 min', [
                'Analyser les points forts et les axes d\'amélioration identifiés.',
                'Compléter la fiche d\'intervention avec toutes les opérations réalisées.',
                'Nettoyer et préparer le véhicule selon les standards de restitution.',
                'Rédiger un rapport de synthèse sur les compétences démontrées.',
                'Valider l\'atteinte des objectifs pédagogiques du référentiel.',
                'Présenter le travail réalisé avec argumentation technique.'
            ])
        ],
        securiteRangement: [
            'Application rigoureuse de toutes les règles de sécurité apprises',
            'Respect de toutes les procédures et méthodologies enseignées',
            'Autonomie démontrée avec demande d\'aide si nécessaire',
            'Qualité professionnelle attendue sur tous les aspects'
        ],
        pointsCles: [
            'Toutes les compétences C1.1 à C1.4 validées',
            'Entretien complet réalisé en autonomie',
            'Qualité technique et relationnelle démontrée',
            'Aptitude confirmée pour la poursuite en Première'
        ]
    }
};
