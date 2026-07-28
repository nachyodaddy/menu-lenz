'use client';
import React, { useState } from 'react';
import { IngestionResult, WeeklyMenuPackage } from '@/lib/types/schema';
import { Upload, FileText, CheckCircle2, AlertTriangle, Sparkles, Download, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

interface Props {
  onIngestSuccess: (pkg: Partial<WeeklyMenuPackage>) => void;
}

export const NoteIngestionModule: React.FC<Props> = ({ onIngestSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [sampleText, setSampleText] = useState(
    `[Handwritten Note - Woodlane House A Kitchen Log]
Date: Aug 1st 2026
Breakfast: Soft Oatmeal with Stewed Apples (Texture: Mechanical Soft)
Lunch: Flaked Salmon Fillet with Pureed Pea Mousse
Dinner: Braised Beef & Pureed Carrots (Sodium target < 400mg)
Notes for Resident Arthur: Stage 4 pureed texture verified by Chef.`
  );
  const [ingestionResult, setIngestionResult] = useState<IngestionResult | null>(null);

  const handleIngest = async () => {
    setIsUploading(true);
    setIngestionResult(null);

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: 'Handwritten_Kitchen_Note_Aug2026.png',
          rawText: sampleText
        })
      });
      const data: IngestionResult = await res.json();
      setIngestionResult(data);
      if (data.extracted_package) {
        onIngestSuccess(data.extracted_package);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-dark-card via-slate-900 to-dark-card border border-brand-500/30 p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-500" />
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-500 border border-brand-500/30">
                Gemini Multimodal Vision Engine
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">AI Kitchen Note & PDF Ingestion Pipeline</h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Eliminates raw PDF upload errors and parser failures by automatically converting handwritten notes, scans, and recipe sheets into My25 validated package JSON/XML.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/api/my25-export?format=json"
              download
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-dark-border text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-brand-500" />
              My25 JSON Package
            </a>
            <a
              href="/api/my25-export?format=xml"
              download
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-dark-border text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-accent-cyan" />
              My25 XML Package
            </a>
          </div>
        </div>
      </div>

      {/* Grid: Document Input & Live My25 Package Validator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Panel */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-500" />
            Ingestion Input & OCR Target
          </h3>

          {/* Upload Drop Zone Simulation */}
          <div className="border-2 border-dashed border-dark-border hover:border-brand-500/50 rounded-xl p-6 text-center space-y-3 bg-slate-950/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-500 mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Drag & Drop Kitchen Note image or raw PDF here</p>
              <p className="text-[11px] text-slate-500 mt-1">Supports PNG, JPG, PDF scans up to 25MB</p>
            </div>
          </div>

          {/* Editable Sample Text */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Sample Handwritten Kitchen Log Text:</label>
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              rows={6}
              className="w-full bg-slate-900 border border-dark-border rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-brand-500"
            />
          </div>

          <button
            onClick={handleIngest}
            disabled={isUploading}
            className="w-full py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-dark-base font-bold text-sm shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                Processing Multimodal Vision OCR...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Ingest & Validate for My25 Portal
              </>
            )}
          </button>
        </div>

        {/* Live Validation & Structured My25 Package Result */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500" />
            My25 Portal Package Format & Validation
          </h3>

          {ingestionResult ? (
            <div className="space-y-4">
              
              {/* Validation Status Badge */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                ingestionResult.success
                  ? 'bg-brand-500/10 border-brand-500/40 text-brand-400'
                  : 'bg-accent-rose/10 border-accent-rose/40 text-accent-rose'
              }`}>
                <div className="flex items-center gap-3">
                  {ingestionResult.success ? (
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold">
                      {ingestionResult.success ? 'My25 Ingestion Package Ready' : 'Validation Errors Flagged'}
                    </h4>
                    <p className="text-xs opacity-80">
                      Gemini Vision Confidence Score: {(ingestionResult.confidence_score * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded bg-black/40 border border-white/10 font-bold">
                  {ingestionResult.extracted_package?.package_id || 'MY25-PASS'}
                </span>
              </div>

              {/* Warnings / Errors */}
              {ingestionResult.warnings.length > 0 && (
                <div className="bg-accent-amber/10 border border-accent-amber/30 p-3 rounded-lg text-xs text-accent-amber space-y-1">
                  <span className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    My25 Portal Warnings:
                  </span>
                  {ingestionResult.warnings.map((w, i) => (
                    <p key={i}>• {w}</p>
                  ))}
                </div>
              )}

              {/* Raw AI OCR Extracted JSON */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400">Structured WeeklyMenuPackage Payload:</span>
                <pre className="bg-slate-950 border border-dark-border p-3 rounded-lg text-[11px] font-mono text-brand-400 overflow-x-auto max-h-64">
                  {JSON.stringify(ingestionResult.extracted_package, null, 2)}
                </pre>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 text-slate-500 space-y-2 border border-dashed border-dark-border rounded-xl">
              <Cpu className="w-8 h-8 text-slate-600 stroke-1" />
              <p className="text-xs font-medium">Click "Ingest & Validate" to trigger Gemini AI processing</p>
              <p className="text-[10px] text-slate-600">Results will be parsed into My25 compliance structure in real-time</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
