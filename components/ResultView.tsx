import React from 'react';
import { BusinessPlan } from '../types';
import { Button } from './Button';
import { RefreshCcw, DollarSign, Target, Megaphone, CheckCircle, Layers, Rocket, Globe, TrendingUp } from 'lucide-react';

interface ResultViewProps {
  plan: BusinessPlan;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ plan, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto w-full animate-fadeIn pb-12 px-4 md:px-0">
      
      {/* Header Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 mb-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Rocket size={150} />
        </div>
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold tracking-wider mb-4 border border-indigo-500/20">
            SEU NOVO NEGÓCIO
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{plan.businessName}</h1>
          <p className="text-xl text-indigo-200 font-light italic mb-6">"{plan.tagline}"</p>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">{plan.conceptDescription}</p>
        </div>
      </div>

      {/* Market Analysis - New Section */}
      <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-2xl mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-2 opacity-5">
            <TrendingUp size={100} />
         </div>
         <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Análise de Mercado & Tendências</h3>
          </div>
          <p className="text-slate-200 leading-relaxed relative z-10">
            {plan.marketAnalysis}
          </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Value Prop */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Proposta de Valor</h3>
          </div>
          <p className="text-slate-300">{plan.valueProposition}</p>
          <div className="mt-4 pt-4 border-t border-slate-700">
             <span className="text-sm text-slate-400 font-semibold block mb-1">Público Alvo:</span>
             <span className="text-slate-200">{plan.targetAudience}</span>
          </div>
        </div>

        {/* Monetization */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
              <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Como Ganhar Dinheiro</h3>
          </div>
          <p className="text-slate-300 mb-4">{plan.monetizationStrategy}</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-lg text-sm text-green-300 border border-green-500/20">
             <span className="font-semibold">Custo Inicial:</span> {plan.estimatedInitialCost}
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-700 bg-slate-800/80">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Plano de Lançamento</h3>
          </div>
        </div>
        <div className="divide-y divide-slate-700">
          {plan.launchSteps.map((step, idx) => (
            <div key={idx} className="p-6 hover:bg-slate-700/30 transition-colors flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg mb-1">{step.step}</h4>
                <p className="text-slate-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Marketing */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
              <Megaphone size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Canais de Marketing</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.marketingChannels.map((channel, i) => (
              <span key={i} className="px-3 py-1 bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-600">
                {channel}
              </span>
            ))}
          </div>
        </div>

        {/* Required Resources */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
           <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Recursos Necessários</h3>
          </div>
          <ul className="space-y-2">
            {plan.requiredResources.map((res, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-indigo-400 mt-1">•</span> {res}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sources - Search Grounding */}
      {plan.searchSources && plan.searchSources.length > 0 && (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
              <Globe size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Fontes e Referências (Google Search)</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plan.searchSources.map((source, i) => (
              <li key={i}>
                <a 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-indigo-500 hover:bg-slate-800 transition-all group"
                >
                  <div className="text-indigo-400 font-medium text-sm mb-1 truncate group-hover:text-indigo-300">
                    {source.title}
                  </div>
                  <div className="text-slate-500 text-xs truncate">
                    {source.uri}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center">
        <Button onClick={onReset} variant="outline" className="w-full md:w-auto">
          <RefreshCcw size={20} /> Criar Outro Negócio
        </Button>
      </div>

    </div>
  );
};