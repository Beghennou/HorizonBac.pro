
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 122,
    duree: '4h00',
    titre: 'Découverte Moteur : Démonter et Remonter une Culasse',
    niveau: 'seconde',
    situation: 'Sur un moteur pédagogique déposé, vous devez réaliser le démontage de la culasse pour comprendre l\'organisation du haut moteur et apprendre les procédures de base.',
    objectif: 'Identifier les composants du haut moteur, comprendre le rôle du joint de culasse et apprendre la méthode de serrage angulaire. (Compétences C1.2, C1.3)',
    materiel: ['Moteur sur support', 'Clé dynamométrique et goniomètre (clé angulaire)', 'Documentation technique (ordre et couples de serrage)', 'Jeu de douilles et clés', 'Bac de rangement pour pièces'],
    etudePrelim: [
        { type: 'text', q: 'Quels sont les principaux éléments qui composent le "haut moteur" ?', r: 'La culasse, les soupapes, les arbres à cames, le couvre-culasse et le joint de culasse.' },
        { type: 'text', q: 'Pourquoi les vis de culasse doivent-elles être serrées dans un ordre spécifique (souvent en spirale, de l\'intérieur vers l\'extérieur) ?', r: 'Pour appliquer une pression uniforme et progressive sur la culasse et le joint, afin d\'assurer une parfaite planéité et une étanchéité optimale.' },
        { type: 'text', q: 'Qu\'est-ce que le serrage angulaire et pourquoi est-il utilisé pour les vis de culasse ?', r: 'C\'est une méthode de serrage qui consiste à appliquer un couple de pré-serrage, puis à tourner la vis d\'un angle précis (ex: 90° + 90°). Cela permet d\'atteindre la zone d\'élasticité de la vis, garantissant une force de serrage très précise et durable, indépendante des frottements.' }
    ],
    activitePratique: [
        {
            titre: 'Démontage des Éléments Périphériques',
            duree: '60 min',
            etapes: [
                'Déposer le couvre-culasse.',
                'Déposer les collecteurs d\'admission et d\'échappement.',
                'Déposer le système de distribution (courroie ou chaîne) en respectant les points de calage.',
                'Déposer les arbres à cames.'
            ]
        },
        {
            titre: 'Dépose de la Culasse',
            duree: '30 min',
            etapes: [
                'Identifier l\'ordre de desserrage des vis de culasse (inverse de l\'ordre de serrage).',
                'Desserrer les vis progressivement et dans l\'ordre.',
                'Déposer la culasse et la poser sur un support propre pour ne pas l\'endommager.',
                'Observer le joint de culasse et les passages d\'eau et d\'huile.'
            ]
        },
        {
            titre: 'Repose et Serrage de la Culasse',
            duree: '90 min',
            etapes: [
                'Nettoyer parfaitement les plans de joint du bloc moteur et de la culasse.',
                'Positionner un joint de culasse neuf et la culasse.',
                'Installer des vis de culasse neuves.',
                'Suivre scrupuleusement la procédure de serrage constructeur : couple de pré-serrage, puis serrages angulaires successifs dans l\'ordre spécifié.',
                'Remonter l\'ensemble des éléments en sens inverse de la dépose.'
            ]
        }
    ],
    securiteRangement: [
        'Utiliser des vis de culasse neuves à chaque intervention, car elles s\'allongent.',
        'Respecter scrupuleusement l\'ordre et les valeurs de serrage (couple + angle).',
        'Assurer une propreté méticuleuse des plans de joint.'
    ],
    pointsCles: [
        'L\'ordre de serrage/desserrage est crucial.',
        'La propreté des plans de joint garantit l\'étanchéité.',
        'Le serrage angulaire assure la fiabilité du montage.'
    ],
    validationRequise: false,
};

export default tp;
