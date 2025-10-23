export type Student = {
  id: string;
  name: string;
  email: string;
  progress: number;
  xp?: number;
  teacherId?: string; // Ajout de l'ID de l'enseignant pour la cohérence
};
