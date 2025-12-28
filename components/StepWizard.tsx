import React from 'react';
import { UserInput, AppStep } from '../types';
import { Button } from './Button';
import { ArrowRight, ArrowLeft, BrainCircuit, Box, Clock, Heart } from 'lucide-react';

interface StepWizardProps {
  step: AppStep;
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const StepWizard: React.FC<StepWizardProps> = ({ step, input, setInput, onNext, onBack, onSubmit }) => {
  
  const handleChange = (field: keyof UserInput, value: string) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const renderInputScreen = (
    title: string, 
    subtitle: string, 
    field: keyof UserInput, 
    icon: React.ReactNode, 
    placeholder: string,
    isLast = false
  ) => (
    <div className="flex flex-col h-full justify-center max-w-2xl mx-auto w-full animate-fadeIn p-6">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-6 text-indigo-400 border border-slate-700 shadow-xl">
          {icon}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">{title}</h2>
        <p className="text-slate-400 text-lg">{subtitle}</p>
      </div>

      <div className="space-y-6">
        <textarea
          autoFocus
          value={input[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full h-40 bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-4 text-white text-lg placeholder-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none resize-none"
        />
        
        <div className="flex gap-4">
          <Button variant="secondary" onClick={onBack} className="flex-1">
            <ArrowLeft size={20} /> Voltar
          </Button>
          <Button 
            onClick={isLast ? onSubmit : onNext} 
            disabled={!input[field].trim()} 
            className="flex-[2]"
          >
            {isLast ? 'Gerar Ideia' : 'Próximo'} {isLast ? <BrainCircuit size={20} /> : <ArrowRight size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Examples Helper */}
      <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <p className="text-sm text-slate-400 font-medium mb-2">Exemplos para te inspirar:</p>
        <p className="text-sm text-slate-500 italic">
          {field === 'skills' && "Design gráfico, organização pessoal, cozinhar, programar em Python, ensinar inglês, consertar eletrônicos..."}
          {field === 'resources' && "Notebook velho, garagem vazia, R$ 500,00, furadeira, conta no Instagram com 2k seguidores, bicicleta..."}
          {field === 'interests' && "Sustentabilidade, games, moda, educação infantil, pets, tecnologia..."}
          {field === 'timeCommitment' && "2 horas por dia à noite, Finais de semana, Tempo integral (estou desempregado)..."}
        </p>
      </div>
    </div>
  );

  switch (step) {
    case AppStep.INPUT_SKILLS:
      return renderInputScreen(
        "Suas Habilidades",
        "No que você é bom? O que as pessoas costumam te pedir ajuda?",
        "skills",
        <BrainCircuit size={32} />,
        "Ex: Sei escrever bem, sou bom em planilhas, sei tocar violão..."
      );
    case AppStep.INPUT_RESOURCES:
      return renderInputScreen(
        "Seus Recursos",
        "O que você tem disponível agora? Ferramentas, espaço, dinheiro ou contatos.",
        "resources",
        <Box size={32} />,
        "Ex: Tenho um carro, uma câmera semi-profissional, R$ 200 para investir..."
      );
    case AppStep.INPUT_INTERESTS:
      return renderInputScreen(
        "Seus Interesses",
        "O que você gosta de fazer? Negócios baseados em paixão duram mais.",
        "interests",
        <Heart size={32} />,
        "Ex: Gosto de esportes ao ar livre, ler livros de ficção, cuidar de plantas..."
      );
    case AppStep.INPUT_TIME:
      return renderInputScreen(
        "Tempo Disponível",
        "Quanto tempo você pode dedicar a este novo projeto?",
        "timeCommitment",
        <Clock size={32} />,
        "Ex: Apenas 1 hora por dia, Sábados inteiros...",
        true
      );
    default:
        return null;
  }
};