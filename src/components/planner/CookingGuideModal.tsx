'use me';
import React, { useState } from 'react';
import { MealItem, CookingStep } from '@/lib/types/schema';
import { X, Flame, Clock, Zap, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, Scale, ShieldCheck } from 'lucide-react';

interface Props {
  meal: MealItem | null;
  onClose: () => void;
}

export const CookingGuideModal: React.FC<Props> = ({ meal, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [portionMultiplier, setPortionMultiplier] = useState(1);

  if (!meal) return null;

  const totalSteps = meal.cooking_steps.length;
  const activeStep: CookingStep | undefined = meal.cooking_steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-dark-border flex items-start justify-between bg-dark-base/50">
          <div className="flex items-center gap-4">
            {meal.image_url && (
              <img
                src={meal.image_url}
                alt={meal.title}
                className="w-16 h-16 rounded-xl object-cover border border-brand-500/30"
              />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-500 border border-brand-500/30">
                  Visual Cooking Guide
                </span>
                {meal.texture_suitable.map(tex => (
                  <span key={tex} className="text-xs px-2 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan font-mono">
                    {tex}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-slate-100">{meal.title}</h2>
              <p className="text-xs text-slate-400 mt-1">
                {meal.calories} kcal • {meal.protein_g}g Protein • {meal.sodium_mg}mg Sodium
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Portion Scaler */}
          <div className="bg-slate-900/60 border border-dark-border p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-brand-500" />
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Household Portion Scaler</h4>
                <p className="text-xs text-slate-400">Scale ingredient quantities for residential kitchen size</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 4, 8].map(mult => (
                <button
                  key={mult}
                  onClick={() => setPortionMultiplier(mult)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    portionMultiplier === mult
                      ? 'bg-brand-500 text-dark-base shadow-lg shadow-brand-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {mult}x ({mult * 4} residents)
                </button>
              ))}
            </div>
          </div>

          {/* Step Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Completed</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Cooking Step Card */}
          {activeStep && (
            <div className="bg-slate-900/80 border border-brand-500/30 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-500 font-bold text-xl shrink-0">
                  {activeStep.step_number}
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    {activeStep.instruction}
                  </h3>
                  
                  {/* Visual Cue Badge */}
                  <div className="bg-accent-amber/10 border border-accent-amber/30 p-3 rounded-lg flex items-center gap-3">
                    <Zap className="w-5 h-5 text-accent-amber shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-accent-amber uppercase tracking-wider block">Visual Cooking Cue</span>
                      <span className="text-xs text-slate-300">{activeStep.visual_cue}</span>
                    </div>
                  </div>

                  {activeStep.timer_minutes && (
                    <div className="flex items-center gap-2 text-xs text-brand-500 font-mono bg-brand-500/10 px-3 py-1.5 rounded-lg w-fit">
                      <Clock className="w-4 h-4" />
                      <span>Recommended Timer: {activeStep.timer_minutes} Minutes</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Scaled Ingredients & Substitutes */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              Scaled Ingredients & Safe Substitutions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {meal.ingredients.map((ing) => (
                <div key={ing.item_id} className="bg-slate-900/40 border border-dark-border p-3 rounded-lg flex items-start justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-200">{ing.name}</span>
                    <div className="text-xs text-brand-500 font-mono font-semibold">
                      {(ing.quantity * portionMultiplier).toFixed(1)} {ing.unit}
                    </div>
                    {ing.substitutes.length > 0 && (
                      <div className="mt-2 text-xs bg-slate-800/80 p-2 rounded text-slate-300 space-y-1">
                        <span className="text-accent-amber font-semibold block">Recommended Substitute:</span>
                        {ing.substitutes.map((sub, i) => (
                          <div key={i}>
                            • <strong className="text-white">{sub.name}</strong> ({sub.reason})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {ing.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ing.allergens.map(a => (
                        <span key={a} className="text-[10px] bg-accent-rose/20 text-accent-rose border border-accent-rose/30 px-1.5 py-0.5 rounded font-mono">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-dark-border bg-dark-base/60 flex items-center justify-between">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Step
          </button>

          <span className="text-xs text-slate-400 font-mono">Step {currentStep + 1} / {totalSteps}</span>

          <button
            disabled={currentStep === totalSteps - 1}
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-dark-base hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-semibold shadow-lg shadow-brand-500/20"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
