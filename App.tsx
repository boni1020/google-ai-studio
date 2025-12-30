
import React, { useState, useCallback } from 'react';
import { enhanceText } from './services/geminiService';
import { EnhancementStyle } from './types';
import Header from './components/Header';
import Editor from './components/Editor';
import Visualizer from './components/Visualizer';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('探索 AI 的無限可能');
  const [outputText, setOutputText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<EnhancementStyle>(EnhancementStyle.POETIC);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      const result = await enhanceText(inputText, selectedStyle);
      setOutputText(result);
    } catch (err) {
      setError('處理您的請求時發生錯誤，請稍後再試。');
    } finally {
      setIsGenerating(false);
    }
  }, [inputText, selectedStyle]);

  const handleReset = () => {
    setOutputText('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="max-w-4xl w-full space-y-8 flex flex-col">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Editor 
              value={inputText} 
              onChange={setInputText} 
              onEnhance={handleEnhance}
              isGenerating={isGenerating}
              selectedStyle={selectedStyle}
              onStyleChange={setSelectedStyle}
            />
            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-100 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="relative">
            <Visualizer 
              text={outputText || inputText} 
              isLoading={isGenerating} 
            />
          </div>
        </div>

        {/* Updated Back/Reset Button with Purple styling */}
        {outputText && (
          <div className="flex justify-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-900/30 border border-purple-700/50 text-purple-200 hover:text-white hover:bg-purple-800/50 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>返回重新編輯</span>
            </button>
          </div>
        )}

        <footer className="mt-auto pt-12 pb-6 text-center text-purple-400/60 text-sm">
          <p>© 2024 Gemini Creative Text Studio. Powered by Gemini 3.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
