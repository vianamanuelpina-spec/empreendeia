import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, BusinessPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBusinessIdea = async (input: UserInput): Promise<BusinessPlan> => {
  const modelId = "gemini-3-flash-preview";
  
  const prompt = `
    Atue como um consultor de negócios especialista em "Lean Startup" e empreendedorismo criativo.
    
    O usuário quer criar um negócio com base no que ele JÁ TEM. 
    Analise os seguintes dados do usuário:
    
    1. Habilidades: ${input.skills}
    2. Recursos Disponíveis (físicos, digitais, espaço, networking): ${input.resources}
    3. Interesses/Paixões: ${input.interests}
    4. Tempo Disponível: ${input.timeCommitment}

    PASSO OBRIGATÓRIO DE PESQUISA:
    Utilize a ferramenta Google Search para pesquisar tendências atuais de mercado, nichos em crescimento e demandas reais relacionadas às habilidades e interesses do usuário.

    Gere um plano de negócios estruturado.
    IMPORTANTE: O campo 'marketAnalysis' deve conter um parágrafo robusto explicando POR QUE este negócio é uma boa oportunidade AGORA, citando tendências ou dados encontrados na pesquisa.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é um gerador de ideias de negócios práticos e lucrativos. Use o Google Search para validar a ideia com tendências reais. Responda sempre em Português do Brasil.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            businessName: { type: Type.STRING, description: "Um nome criativo e moderno para o negócio" },
            tagline: { type: Type.STRING, description: "Um slogan curto e impactante" },
            conceptDescription: { type: Type.STRING, description: "Resumo de 2-3 frases do que é o negócio" },
            marketAnalysis: { 
              type: Type.STRING, 
              description: "Análise baseada na pesquisa Google sobre tendências atuais, demanda de mercado e por que este é um bom momento para iniciar este negócio." 
            },
            targetAudience: { type: Type.STRING, description: "Quem é o cliente ideal" },
            valueProposition: { type: Type.STRING, description: "Por que o cliente escolheria este negócio" },
            monetizationStrategy: { type: Type.STRING, description: "Como o negócio ganha dinheiro" },
            requiredResources: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de recursos cruciais (destaque os que o usuário já tem)" 
            },
            launchSteps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.STRING, description: "Título do passo (Ex: Semana 1)" },
                  description: { type: Type.STRING, description: "Ação prática a ser tomada" }
                }
              },
              description: "Um plano de 3 a 5 passos para lançar o MVP"
            },
            marketingChannels: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Onde divulgar" },
            estimatedInitialCost: { type: Type.STRING, description: "Estimativa de custo (Ex: Baixo, R$0 - R$100, etc)" }
          },
          required: [
            "businessName", "tagline", "conceptDescription", "marketAnalysis", "targetAudience", 
            "valueProposition", "monetizationStrategy", "requiredResources", 
            "launchSteps", "marketingChannels", "estimatedInitialCost"
          ]
        }
      }
    });

    if (response.text) {
      const plan = JSON.parse(response.text) as BusinessPlan;
      
      // Extract grounding metadata if available
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        plan.searchSources = groundingChunks
          .map(chunk => chunk.web)
          .filter((web): web is { uri: string; title: string } => !!web && !!web.uri && !!web.title);
      }
      
      return plan;
    } else {
      throw new Error("Não foi possível gerar o plano de negócios.");
    }
  } catch (error) {
    console.error("Erro ao gerar plano:", error);
    throw error;
  }
};