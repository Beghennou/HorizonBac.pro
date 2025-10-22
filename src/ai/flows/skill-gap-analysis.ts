'use server';

/**
 * @fileOverview AI-powered skill gap analysis for students.
 *
 * - analyzeSkillGaps - Analyzes student performance data to identify skill gaps and suggest personalized learning paths.
 * - SkillGapAnalysisInput - The input type for the analyzeSkillGaps function.
 * - SkillGapAnalysisOutput - The return type for the analyzeSkillGaps function.
 */
import { config } from 'dotenv';
config();
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillGapAnalysisInputSchema = z.object({
  studentName: z.string().describe("The student's name."),
  evaluationData: z
    .string()
    .describe(
      'JSON string of student performance data, including TP completion and evaluations. The keys are competence IDs and values are evaluation statuses (NA, EC, A, M).'
    ),
  competenceMap: z
    .string()
    .describe(
      'JSON string mapping competence IDs to their descriptions.'
    ),
});

export type SkillGapAnalysisInput = z.infer<typeof SkillGapAnalysisInputSchema>;

const SkillGapAnalysisOutputSchema = z.object({
  identifiedSkillGaps: z
    .array(z.string())
    .describe('A list of identified skill gaps based on student performance data. Focus on competences rated NA (Not Acquired) or EC (In Progress).'),
  suggestedLearningPaths: z
    .string()
    .describe('A concise, personalized learning path in French to address the identified skill gaps. Suggest specific practical actions or TPs to focus on. The tone should be encouraging.'),
});

export type SkillGapAnalysisOutput = z.infer<typeof SkillGapAnalysisOutputSchema>;

export async function analyzeSkillGaps(
  input: SkillGapAnalysisInput
): Promise<SkillGapAnalysisOutput> {
  return analyzeSkillGapsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillGapAnalysisPrompt',
  input: {schema: SkillGapAnalysisInputSchema},
  output: {schema: SkillGapAnalysisOutputSchema},
  prompt: `You are an AI expert in automotive maintenance pedagogy for French vocational students. Your role is to analyze a student's evaluation data to identify skill gaps and provide an encouraging, actionable learning path.

Context:
- The student is: {{{studentName}}}.
- The evaluation statuses mean: NA = Non Acquis (Not Acquired), EC = En Cours d'acquisition (In Progress), A = Acquis (Acquired), M = Maîtrisé (Mastered).
- The competences are provided in a map.

Student Evaluation Data:
\`\`\`json
{{{evaluationData}}}
\`\`\`

Competence Definitions:
\`\`\`json
{{{competenceMap}}}
\`\`\`

Your Task:
1.  **Identify Skill Gaps:** Analyze the evaluation data. Focus primarily on competences marked as "NA" or "EC". List the descriptions of these competences as the skill gaps.
2.  **Suggest Learning Paths:** Based on the gaps, create a short, encouraging, and personalized paragraph for the student. Suggest concrete actions, like which TPs to redo or what specific points to focus on during practical work. Be constructive.`,
});

const analyzeSkillGapsFlow = ai.defineFlow(
  {
    name: 'analyzeSkillGapsFlow',
    inputSchema: SkillGapAnalysisInputSchema,
    outputSchema: SkillGapAnalysisOutputSchema,
  },
  async input => {
    if (!input.evaluationData || Object.keys(JSON.parse(input.evaluationData)).length === 0) {
      return {
        identifiedSkillGaps: ["Aucune donnée d'évaluation disponible pour l'analyse."],
        suggestedLearningPaths: "Pour commencer l'analyse, veuillez d'abord réaliser et enregistrer des évaluations pour cet élève. Une fois les données disponibles, l'IA pourra identifier les points à travailler.",
      };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
