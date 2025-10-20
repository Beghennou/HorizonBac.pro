'use server';

/**
 * @fileOverview AI-powered skill gap analysis for students.
 *
 * - analyzeSkillGaps - Analyzes student performance data to identify skill gaps and suggest personalized learning paths.
 * - SkillGapAnalysisInput - The input type for the analyzeSkillGaps function.
 * - SkillGapAnalysisOutput - The return type for the analyzeSkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillGapAnalysisInputSchema = z.object({
  studentPerformanceData: z
    .string()
    .describe(
      'Student performance data, including TP completion and racing simulation performance.'
    ),
});

export type SkillGapAnalysisInput = z.infer<typeof SkillGapAnalysisInputSchema>;

const SkillGapAnalysisOutputSchema = z.object({
  identifiedSkillGaps: z
    .string()
    .describe('Identified skill gaps based on student performance data.'),
  suggestedLearningPaths: z
    .string()
    .describe('Personalized learning paths based on identified skill gaps.'),
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
  prompt: `You are an AI-powered educational tool designed to analyze student performance data and identify skill gaps.

  Based on the student's performance data, identify any skill gaps and suggest personalized learning paths to address those gaps.

  Student Performance Data: {{{studentPerformanceData}}}
  Skill Gaps:
  Personalized Learning Paths: `,
});

const analyzeSkillGapsFlow = ai.defineFlow(
  {
    name: 'analyzeSkillGapsFlow',
    inputSchema: SkillGapAnalysisInputSchema,
    outputSchema: SkillGapAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
