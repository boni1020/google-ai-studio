
import React from 'react';
import { EnhancementStyle } from '../types';

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  onEnhance: () => void;
  isGenerating: boolean;
  selectedStyle: EnhancementStyle;
  onStyleChange: (style: EnhancementStyle) => void;
}

const Editor: React.FC<EditorProps> = ({ 
  value, 
  onChange, 
  onEnhance, 
  isGenerating, 
  selectedStyle, 
  onStyleChange 
}) => {
  return (
    <div className="glass p-6 rounded-3xl shadow-2xl space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-400 ml-1 uppercase tracking-wider">輸入您的文字</label>
        <textarea
          className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
          placeholder="在這裡輸入一段文字..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-400 ml-1 uppercase tracking-wider">選擇轉化風格</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(EnhancementStyle).map((style) => (
            <button
              key={style}
              onClick={() => onStyleChange(style)}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                selectedStyle === style 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {style === EnhancementStyle.POETIC && '優美詩意'}
              {style === EnhancementStyle.MOTIVATIONAL && '勵志格言'}
              {style === EnhancementStyle.PROFESSIONAL && '專業文案'}
              {style === EnhancementStyle.FUTURISTIC && '科幻未來'}
              {style === EnhancementStyle.STORY && '極短故事'}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onEnhance}
        disabled={isGenerating || !value.trim()}
        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          isGenerating 
          ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/20 active:scale-[0.98]'
        }`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            AI 生成中...
          </>
        ) : (
          <>
            <span>開始 AI 轉化</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default Editor;
