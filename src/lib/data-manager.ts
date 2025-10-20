import { tpSeconde, TP as TPSeconde } from './tp-seconde';
import { tpPremiere, TP as TPPremiere } from './tp-premiere';
import { tpTerminale, TP as TPTerminale } from './tp-terminale';

export type TP = TPSeconde | TPPremiere | TPTerminale; // Union des types de TP

export type Niveau = 'seconde' | 'premiere' | 'terminale';

export type CompetenceBloc = {
  title: string;
  colorClass: string;
  items: Record<string, string>;
};

export const competencesParNiveau: Record<Niveau, Record<string, CompetenceBloc>> = {
  seconde: {
    'BLOC_1': { title: 'Bloc 1 : Réaliser l’entretien périodique', colorClass: 'bg-bloc1-color', items: { 'C1.1': 'Organiser un entretien périodique', 'C1.2': 'Identifier les anomalies', 'C1.3': 'Réaliser les opérations', 'C1.4': 'Apporter des conseils' } }
  },
  premiere: {
    'BLOC_2': { title: 'Bloc 2 : Réaliser la maintenance corrective', colorClass: 'bg-bloc2-color', items: { 'C2.1': 'Préparer une intervention', 'C2.2': 'Remplacer ou réparer', 'C2.3': 'Réaliser le réglage', 'C2.4': 'Contrôle qualité' } }
  },
  terminale: {
    'BLOC_3': { title: 'Bloc 3 : Réaliser le diagnostic', colorClass: 'bg-bloc3-color', items: { 'C3.1': 'Constater un dysfonctionnement', 'C3.2': 'Hiérarchiser les hypothèses', 'C3.3': 'Mettre en œuvre un protocole', 'C3.4': 'Identifier les solutions' } }
  }
};


const allTPs: Record<number, TP> = {
  ...tpSeconde,
  ...tpPremiere,
  ...tpTerminale,
};

const tpsByNiveau: Record<Niveau, TP[]> = {
  seconde: Object.values(tpSeconde),
  premiere: Object.values(tpPremiere),
  terminale: Object.values(tpTerminale),
};

export const getTpsByNiveau = (niveau: Niveau): TP[] => {
  return tpsByNiveau[niveau] || [];
};

export const getTpById = (id: number): TP | undefined => {
  return allTPs[id];
};

export const classes = {
    "2MV1": ["BAKHTAR Adam", "BELKAID Rayan", "BIGO Rayan", "BLONDIAUX Mathéo"],
    "2MV2": [
        "ALGOET-VERHAEGHE Tom",
        "AMOUSSOU Enzo",
        "ANSART-ROBIC Romain",
        "ARRAB Yassin",
        "BENATALLAH Ryan",
        "BENSAAD Issa",
        "CLARISSE Noah",
        "DECOTTIGNIES Louis",
        "DENDANE Ilyes",
        "DESPLANCKE Mathis",
        "DEVAUX Nicolas",
        "EL AMMARI Naïm",
        "FERRIER Nolan",
        "KONIECZNY Léo",
        "KWASIBA Charlie",
        "LABZAE Yassin",
        "LEGROS Jules",
        "MAHIEUX Kais",
        "RACOVITA Alexandre",
        "SERROUX Théo",
        "THOLAS Ugo",
        "UCHAN Yanis",
        "VANWONTERGHEM Théo"
    ],
    "2MV3": [
      "BEATSE Téo",
      "BELHARIR Elias",
      "BENHISSEN Adam",
      "BETROUNI Lyes",
      "BIPATH Naor",
      "DAIBOUN-SAID Sami",
      "DIZLIK Léo",
      "DJALO Mohamed",
      "DUJARDIN Titouan",
      "DURTESTE Oscar",
      "FROIDURE-HENNEBERT Hugo",
      "GRESS Jaden",
      "HAMDANE Remy",
      "MAZINGUE Mathis",
      "MEKRANFAR Karim",
      "MENDES Ilan",
      "POUILLY Méline",
      "PRESSE-HIMBERT Paul",
      "ROMAN Hugo",
      "SEHIMI Asha",
      "TABARY Julie",
      "TONFACK NGUEFACK Chris",
      "VALENTIN Samuel"
    ],
    "2MV4": ["DELATTRE Clément", "DESCAMPS Baptiste", "DUBOIS Océane", "DUPONT Léo"],
    "2MV5": ["DURAND Clara", "EL FAKIR Ayoub", "FERNANDEZ Hugo", "FOURNIER Tom"],
    "1VP1": ["Alice Lemoine", "Bob Marley", "Charlie Chaplin", "Diana Ross"],
    "1VP2": ["David Bowie", "Elon Musk", "Frank Zappa", "Gloria Gaynor"],
    "1VP3": ["Henri Matisse", "Ingrid Bergman", "John Lennon", "Kate Bush"],
    "TVP1": ["Grace Hopper", "Heidi Lamar", "Isaac Newton", "Jacque Fresco"],
    "TVP2": ["Karl Benz", "Leonardo da Vinci", "Marie Curie", "Nikola Tesla"],
    "TVP3": ["Oprah Winfrey", "Pablo Picasso", "Queen Latifah", "Rosalind Franklin"],
};
