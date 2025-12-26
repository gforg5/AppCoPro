
import React, { useState } from 'react';
import { gemini } from '../services/geminiService';
import { Button } from './Button';

interface AIImageEditorProps {
  initialImage: string;
  onImageChange: (newImage: string) => void;
  label: string;
}

export const AIImageEditor: React.FC<AIImageEditorProps> = ({ initialImage, onImageChange, label }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = async () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setError('');
    
    try {
      const result = await gemini.editImage(initialImage, prompt);
      if (result) {
        onImageChange(result);
        setPrompt('');
      } else {
        setError('Failed to edit image. Try a different prompt.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative group">
          <img 
            src={initialImage} 
            alt={label} 
            className="w-32 h-32 rounded-2xl object-cover shadow-2xl border border-slate-700"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl pointer-events-none">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Preview</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">AI Magic Edit</h4>
            <p className="text-xs text-slate-500 mb-3 italic">"Add a neon glow", "Make it look vintage", "Change colors to blue"...</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your edit..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <Button 
                onClick={handleEdit} 
                isLoading={isProcessing}
                size="sm"
                variant="secondary"
              >
                Apply
              </Button>
            </div>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
};
