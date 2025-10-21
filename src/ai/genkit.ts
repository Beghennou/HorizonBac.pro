import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {geminiPro} from 'genkitx-googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: geminiPro,
});
