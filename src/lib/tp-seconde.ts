
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
        objectif: 'Identifier les anomalies et réaliser les ajustements. (Compétences C1.2, C1.3)',
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
        objectif: 'Identifier et remplacer les ampoules défectueuses. (Compétences C1.2, C1.3)',
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
    }
};

    

    
