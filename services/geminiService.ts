
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProject = async (description: string): Promise<AIResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise o seguinte projeto de metalurgia e forneça uma sugestão técnica: "${description}". 
      Determine se o melhor processo é Torno, Solda MIG ou Solda TIG. 
      Responda em formato JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: 'Breve explicação técnica em português.' },
            suggestedProcess: { type: Type.STRING, description: 'O processo recomendado.' },
            complexity: { 
              type: Type.STRING, 
              enum: ['Baixa', 'Média', 'Alta'],
              description: 'Nível de complexidade do projeto.' 
            },
          },
          required: ['analysis', 'suggestedProcess', 'complexity'],
        },
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as AIResponse;
  } catch (error) {
    console.error("Erro na análise da IA:", error);
    return {
      analysis: "Não foi possível analisar detalhadamente no momento, mas nossa equipe revisará sua mensagem em breve.",
      suggestedProcess: "Análise Manual Pendente",
      complexity: "Média"
    };
  }
};
