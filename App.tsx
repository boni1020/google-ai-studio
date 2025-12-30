
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

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <div className="max-w-4xl w-full space-y-8">
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
              <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm">
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

        <footer className="pt-12 pb-6 text-center text-slate-500 text-sm">
          <p>© 2024 Gemini Creative Text Studio. Powered by Gemini 3.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
