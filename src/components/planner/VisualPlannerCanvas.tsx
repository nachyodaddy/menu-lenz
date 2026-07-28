'use client';
import React, { useState } from 'react';
import { WeeklyMenuPackage, DailyMealSlot, MealItem } from '@/lib/types/schema';
import { MOCK_MEAL_LIBRARY } from '@/lib/store/mock-db';
import { CookingGuideModal } from './CookingGuideModal';
import { Calendar, ChevronLeft, ChevronRight, BookOpen, AlertCircle, Plus, CheckCircle2, Sparkles, Filter } from 'lucide-react';

interface Props {
  weeklyPackage: WeeklyMenuPackage;
  onPackageUpdate: (updated: WeeklyMenuPackage) => void;
}

export const VisualPlannerCanvas: React.FC<Props> = ({ weeklyPackage, onPackageUpdate }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(1);
  const [activeGuideMeal, setActiveGuideMeal] = useState<MealItem | null>(null);
  const [draggedMeal, setDraggedMeal] = useState<MealItem | null>(null);
  const [filterTexture, setFilterTexture] = useState<string>('ALL');

  const currentDaySlot = weeklyPackage.meal_plan.find(d => d.day_index === selectedDayIndex) || weeklyPackage.meal_plan[0];

  const handleMealDrop = (slotType: 'breakfast' | 'lunch' | 'dinner' | 'snack', mealToAssign: MealItem) => {
    const updatedPlan = weeklyPackage.meal_plan.map(slot => {
      if (slot.day_index === selectedDayIndex) {
        return {
          ...slot,
          [slotType]: mealToAssign
        };
      }
      return slot;
    });

    onPackageUpdate({
      ...weeklyPackage,
      meal_plan: updatedPlan,
      updated_at: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="bg-dark-card border border-dark-border p-4 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-500">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              30-Day Drag & Drop Meal Canvas
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-500 border border-brand-500/30">
                Visual Planning Engine
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interactive meal layout with real-time compliance alerts & step-by-step cooking guides
            </p>
          </div>
        </div>

        {/* Texture Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Texture Filter:</span>
          {['ALL', 'PUREED', 'MECHANICAL_SOFT', 'REGULAR'].map((tex) => (
            <button
              key={tex}
              onClick={() => setFilterTexture(tex)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterTexture === tex
                  ? 'bg-brand-500 text-dark-base shadow-sm shadow-brand-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tex}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar Meal Palette + Day Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Meal Library Palette (Draggable Source) */}
        <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-xl p-4 shadow-xl flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-border">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              Meal Palette Library
            </h3>
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
              Drag or Click to Assign
            </span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {MOCK_MEAL_LIBRARY.filter(m => filterTexture === 'ALL' || m.texture_suitable.includes(filterTexture as any)).map(meal => (
              <div
                key={meal.id}
                draggable
                onDragStart={() => setDraggedMeal(meal)}
                className="bg-slate-900/80 border border-dark-border hover:border-brand-500/50 p-3 rounded-xl transition-all hover:scale-[1.01] cursor-grab active:cursor-grabbing group"
              >
                <div className="flex gap-3">
                  {meal.image_url && (
                    <img
                      src={meal.image_url}
                      alt={meal.title}
                      className="w-16 h-16 rounded-lg object-cover border border-dark-border shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-brand-500">
                        {meal.meal_type}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{meal.calories} kcal</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-brand-500 transition-colors line-clamp-2">
                      {meal.title}
                    </h4>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {meal.texture_suitable.map(t => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-dark-border/50 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => setActiveGuideMeal(meal)}
                    className="flex items-center gap-1.5 text-accent-amber hover:underline font-semibold"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Cooking Guide
                  </button>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Drag to canvas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 30-Day Interactive Day Canvas */}
        <div className="lg:col-span-8 bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-6">
          
          {/* 30-Day Calendar Strip */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">30-Day Schedule Selector</span>
              <span className="text-xs text-brand-500 font-mono font-semibold">Active: Day {selectedDayIndex} ({currentDaySlot.date_str})</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {weeklyPackage.meal_plan.map(slot => {
                const isSelected = slot.day_index === selectedDayIndex;
                const isConfigured = slot.breakfast || slot.lunch || slot.dinner;
                return (
                  <button
                    key={slot.day_index}
                    onClick={() => setSelectedDayIndex(slot.day_index)}
                    className={`shrink-0 w-12 h-14 rounded-xl flex flex-col items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-brand-500 border-brand-400 text-dark-base shadow-lg shadow-brand-500/20 font-bold scale-105'
                        : isConfigured
                        ? 'bg-slate-900 border-dark-border text-slate-300 hover:border-brand-500/50'
                        : 'bg-slate-950 border-dark-border/50 text-slate-500'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono">Day</span>
                    <span className="text-sm font-extrabold">{slot.day_index}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Meal Slots Drop Zone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(slotType => {
              const assignedMeal: MealItem | null = currentDaySlot[slotType];

              return (
                <div
                  key={slotType}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedMeal) {
                      handleMealDrop(slotType, draggedMeal);
                      setDraggedMeal(null);
                    }
                  }}
                  className={`bg-slate-900/60 border border-dashed p-4 rounded-xl transition-all space-y-3 min-h-[160px] flex flex-col justify-between ${
                    assignedMeal ? 'border-brand-500/40 bg-slate-900/80' : 'border-dark-border hover:border-brand-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-brand-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                      {slotType}
                    </span>
                    {assignedMeal && (
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        {assignedMeal.calories} kcal
                      </span>
                    )}
                  </div>

                  {assignedMeal ? (
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-100">{assignedMeal.title}</h4>
                        <button
                          onClick={() => handleMealDrop(slotType, null as any)}
                          className="text-slate-500 hover:text-accent-rose text-xs font-semibold"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {assignedMeal.texture_suitable.map(tex => (
                          <span key={tex} className="text-[9px] px-1.5 py-0.5 rounded bg-accent-cyan/20 text-accent-cyan font-mono">
                            {tex}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveGuideMeal(assignedMeal)}
                        className="w-full mt-2 py-1.5 px-3 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-500 border border-brand-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Launch Cooking Guide
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-6 text-slate-500 space-y-1">
                      <Plus className="w-6 h-6 stroke-1 text-slate-600" />
                      <p className="text-xs font-medium">Drop meal item here</p>
                      <p className="text-[10px] text-slate-600">or drag from palette library</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Cooking Guide Drawer Modal */}
      {activeGuideMeal && (
        <CookingGuideModal
          meal={activeGuideMeal}
          onClose={() => setActiveGuideMeal(null)}
        />
      )}

    </div>
  );
};
