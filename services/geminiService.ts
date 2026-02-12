
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProject = async (description: string): Promise<AIResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um consultor técnico da Itajaí Metal Precision. 
      Analise o seguinte projeto: "${description}". 
      Nossa empresa faz: 
      1. Torno/Usinagem (eixos, buchas, roscas)
      2. Solda MIG/TIG (Inox, Alumínio, Aço)
      3. Móveis Industriais sob medida
      4. Carretinhas/Reboques (fabricação e reparo)

      Determine qual categoria se encaixa melhor e sugira o processo técnico ideal.
      Responda em formato JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: 'Breve explicação técnica em português.' },
            suggestedProcess: { type: Type.STRING, description: 'O processo ou categoria recomendada.' },
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
      analysis: "Não foi possível analisar detalhadamente no momento, mas nossa equipe de especialistas em carretinhas e móveis revisará sua mensagem em breve.",
      suggestedProcess: "Análise Manual Pendente",
      complexity: "Média"
    };
  }
};
