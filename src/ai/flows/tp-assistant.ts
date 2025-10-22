'use server';

/**
 * @fileOverview Un assistant IA pour guider les élèves dans les Travaux Pratiques (TP).
 *
 * - guideStudent - Fournit des conseils pédagogiques sans donner la réponse.
 * - GuideStudentInput - L'input pour la fonction guideStudent.
 *- GuideStudentOutput - L'output pour la fonction guideStudent.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GuideStudentInputSchema = z.object({
  tpTitle: z.string().describe("Le titre du TP sur lequel l'élève travaille."),
  tpObjective: z.string().describe("L'objectif principal du TP."),
  studentQuestion: z.string().describe("La question que l'élève pose."),
});
export type GuideStudentInput = z.infer<typeof GuideStudentInputSchema>;

const GuideStudentOutputSchema = z.object({
  guidanceText: z
    .string()
    .describe("Une réponse pédagogique qui guide l'élève vers la solution sans la donner directement."),
});
export type GuideStudentOutput = z.infer<typeof GuideStudentOutputSchema>;

export async function guideStudent(
  input: GuideStudentInput
): Promise<GuideStudentOutput> {
  return tpAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tpAssistantPrompt',
  input: {schema: GuideStudentInputSchema},
  output: {schema: GuideStudentOutputSchema},
  prompt: `Tu es un assistant pédagogique expert en maintenance automobile, destiné à des élèves de lycée professionnel en France. Ton rôle est de les guider, pas de leur donner la réponse.

Contexte du TP:
- Titre: {{{tpTitle}}}
- Objectif: {{{tpObjective}}}

Question de l'élève:
"{{{studentQuestion}}}"

Ta mission:
1.  **Ne JAMAIS donner la réponse directe.**
2.  Analyse la question de l'élève dans le contexte du TP.
3.  Réponds en posant une contre-question qui le met sur la voie.
4.  Suggère-lui de relire une partie spécifique du TP ou de consulter une ressource (schéma, documentation).
5.  Rappelle-lui un concept clé ou une règle de sécurité importante liée à sa question.
6.  Ton ton doit être encourageant, patient et professionnel. Utilise "tu".

Exemple de bonne réponse:
"C'est une excellente question. Pour trouver le bon fusible, quelle est la première ressource que tu devrais consulter ? Pense à la documentation technique du véhicule. Cela t'aidera à identifier non seulement son emplacement mais aussi son calibre, ce qui est crucial pour la sécurité."

Réponds uniquement avec le texte de guidage.`,
});

const tpAssistantFlow = ai.defineFlow(
  {
    name: 'tpAssistantFlow',
    inputSchema: GuideStudentInputSchema,
    outputSchema: GuideStudentOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || 'An unexpected error occurred.';
      if (errorMessage.includes('403 Forbidden')) {
        return {
          guidanceText: "L'accès à l'API d'IA est actuellement bloqué. Veuillez vérifier que l'API Generative Language est activée dans votre projet Google Cloud et qu'aucune restriction n'empêche son utilisation.",
        }
      }
      return {
        guidanceText: "Une erreur inattendue est survenue avec l'assistant IA. Veuillez réessayer plus tard.",
      };
    }
  }
);
