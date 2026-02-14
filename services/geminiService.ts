
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

export const analyzeProject = async (description: string): Promise<AIResponse> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("ERRO: Variável de ambiente API_KEY não configurada.");
    return {
      analysis: "O assistente de IA está temporariamente indisponível. Por favor, entre em contato diretamente via WhatsApp para seu orçamento.",
      suggestedProcess: "Configuração Necessária",
      complexity: "Média"
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um consultor técnico sênior da Itajaí Metal Precision. 
      Analise o seguinte projeto: "${description}". 
      Nossa empresa é especialista em: 
      1. Torno e Usinagem Mecânica: Fabricação e reparo de peças diversas.
      2. Solda MIG/TIG: Inox, Alumínio, Aço e recuperação de componentes metálicos.
      3. Móveis Industriais e Estruturas Metálicas.
      4. Carretinhas/Reboques: Reforma estrutural e fabricação sob medida.
      5. Protótipos 3D: Validação técnica em materiais diversos (ABS/PETG/PLA).

      Determine qual categoria se encaixa melhor e sugira o processo técnico ideal para o cliente.
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
      analysis: "Não foi possível analisar detalhadamente no momento. Nossa equipe técnica revisará seu projeto via WhatsApp.",
      suggestedProcess: "Análise Técnica Pendente",
      complexity: "Média"
    };
  }
};
