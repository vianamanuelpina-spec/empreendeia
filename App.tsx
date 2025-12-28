import React, { useState } from 'react';
import { UserInput, BusinessPlan, AppStep } from './types';
import { generateBusinessIdea } from './services/geminiService';
import { StepWizard } from './components/StepWizard';
import { ResultView } from './components/ResultView';
import { Button } from './components/Button';
import { Sparkles, Loader2, Play } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [userInput, setUserInput] = useState<UserInput>({
    skills: '',
    resources: '',
    interests: '',
    timeCommitment: ''
  });
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (step === AppStep.INPUT_SKILLS) setStep(AppStep.INPUT_RESOURCES);
    else if (step === AppStep.INPUT_RESOURCES) setStep(AppStep.INPUT_INTERESTS);
    else if (step === AppStep.INPUT_INTERESTS) setStep(AppStep.INPUT_TIME);
  };

  const handleBack = () => {
    if (step === AppStep.INPUT_RESOURCES) setStep(AppStep.INPUT_SKILLS);
    else if (step === AppStep.INPUT_INTERESTS) setStep(AppStep.INPUT_RESOURCES);
    else if (step === AppStep.INPUT_TIME) setStep(AppStep.INPUT_INTERESTS);
    else setStep(AppStep.WELCOME);
  };

  const handleSubmit = async () => {
    setStep(AppStep.LOADING);
    setError(null);
    try {
      const plan = await generateBusinessIdea(userInput);
      setBusinessPlan(plan);
      setStep(AppStep.RESULT);
    } catch (err) {
      setError("Ocorreu um erro ao gerar seu plano de negócios. Tente novamente.");
      setStep(AppStep.ERROR);
    }
  };

  const handleReset = () => {
    setBusinessPlan(null);
    setUserInput({ skills: '', resources: '', interests: '', timeCommitment: '' });
    setStep(AppStep.WELCOME);
  };

  // Welcome Screen
  if (step === AppStep.WELCOME) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1519681393798-3828fb4090bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-2xl text-center space-y-8 animate-fadeIn px-4">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 transform rotate-12 hover:rotate-0 transition-all duration-500">
               <Sparkles className="text-white w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            EmpreendaAI
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            Transforme o que você <span className="text-indigo-400 font-semibold">sabe</span> e o que você <span className="text-indigo-400 font-semibold">tem</span> em um negócio real.
          </p>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setStep(AppStep.INPUT_SKILLS)} className="text-xl px-12 py-4 shadow-indigo-500/50">
               Começar Agora <Play size={24} fill="currentColor" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (step === AppStep.LOADING) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2">Analisando seus dados...</h2>
        <p className="text-slate-400 text-center max-w-md animate-pulse">
          Nossa IA está conectando suas habilidades com oportunidades de mercado.
        </p>
      </div>
    );
  }

  // Error Screen
  if (step === AppStep.ERROR) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-center">
        <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/30 max-w-md">
           <h2 className="text-2xl font-bold text-red-400 mb-4">Ops! Algo deu errado.</h2>
           <p className="text-slate-300 mb-6">{error}</p>
           <Button onClick={() => setStep(AppStep.INPUT_TIME)}>Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  // Calculate progress for the header
  // 1=Skills, 2=Resources, 3=Interests, 4=Time
  const progressStep = step > AppStep.INPUT_TIME ? 4 : step;

  // Main Layout for Wizard and Results
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { if(step === AppStep.RESULT) handleReset() }}>
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
               <Sparkles size={16} className="text-white" />
             </div>
             <span className="font-bold text-white text-lg tracking-tight">EmpreendaAI</span>
          </div>
          {step !== AppStep.RESULT && step !== AppStep.LOADING && step !== AppStep.ERROR && (
             <div className="text-sm text-slate-500 font-medium">
                Passo {progressStep} de 4
             </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        {step === AppStep.RESULT && businessPlan ? (
          <ResultView plan={businessPlan} onReset={handleReset} />
        ) : (
          <StepWizard 
            step={step} 
            input={userInput} 
            setInput={setUserInput} 
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
};

export default App;