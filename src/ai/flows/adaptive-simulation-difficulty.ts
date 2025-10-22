'use server';

/**
 * @fileOverview Adapts the racing simulation difficulty based on student performance.
 *
 * - adaptSimulationDifficulty - A function that adjusts the simulation difficulty.
 * - AdaptSimulationDifficultyInput - The input type for the adaptSimulationDifficulty function.
 * - AdaptSimulationDifficultyOutput - The return type for the adaptSimulationDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptSimulationDifficultyInputSchema = z.object({
  studentId: z.string().describe('Unique identifier for the student.'),
  performanceData: z
    .object({
      averageLapTime: z.number().describe('Average lap time in seconds.'),
      numCompletedLaps: z.number().describe('Number of completed laps.'),
      numCollisions: z.number().describe('Number of collisions during the simulation.'),
      averageSpeed: z.number().describe('Average speed during the simulation.'),
    })
    .describe('Performance data from the racing simulation.'),
});
export type AdaptSimulationDifficultyInput = z.infer<typeof AdaptSimulationDifficultyInputSchema>;

const AdaptSimulationDifficultyOutputSchema = z.object({
  newDifficultyLevel: z
    .string()
    .describe(
      'The new difficulty level for the racing simulation (e.g., Beginner, Intermediate, Advanced).' ||
        'Beginner' ||
        'Intermediate' ||
        'Advanced'
    ),
  suggestedAdjustments: z
    .string()
    .describe(
      'Specific adjustments to the simulation parameters (e.g., increased AI difficulty, reduced traction control).' ||
        'Increased AI difficulty' ||
        'Reduced traction control'
    ),
});
export type AdaptSimulationDifficultyOutput = z.infer<typeof AdaptSimulationDifficultyOutputSchema>;

export async function adaptSimulationDifficulty(
  input: AdaptSimulationDifficultyInput
): Promise<AdaptSimulationDifficultyOutput> {
  return adaptSimulationDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptSimulationDifficultyPrompt',
  input: {schema: AdaptSimulationDifficultyInputSchema},
  output: {schema: AdaptSimulationDifficultyOutputSchema},
  prompt: `You are an AI simulation difficulty adjuster. You will take student performance data and output a new difficulty level, as well as suggested adjustments.

Student ID: {{{studentId}}}
Performance Data: 
Average Lap Time: {{{performanceData.averageLapTime}}} seconds
Number of Completed Laps: {{{performanceData.numCompletedLaps}}}
Number of Collisions: {{{performanceData.numCollisions}}}
Average Speed: {{{performanceData.averageSpeed}}}

Based on this data, determine the new difficulty level and suggest specific adjustments to the simulation parameters to provide a challenging but achievable learning experience for the student.
Difficulty Levels can be Beginner, Intermediate and Advanced.

Output the new difficulty level and suggested adjustments as a string.
`,
});

const adaptSimulationDifficultyFlow = ai.defineFlow(
  {
    name: 'adaptSimulationDifficultyFlow',
    inputSchema: AdaptSimulationDifficultyInputSchema,
    outputSchema: AdaptSimulationDifficultyOutputSchema,
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
          newDifficultyLevel: 'Erreur API',
          suggestedAdjustments: "L'accès à l'API d'IA est actuellement bloqué. Veuillez vérifier la configuration de votre projet Google Cloud.",
        };
      }
      return {
        newDifficultyLevel: 'Erreur',
        suggestedAdjustments: "Une erreur inattendue est survenue avec l'assistant IA.",
      };
    }
  }
);
