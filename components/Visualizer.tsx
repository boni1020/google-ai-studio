
import React from 'react';

interface VisualizerProps {
  text: string;
  isLoading: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ text, isLoading }) => {
  return (
    <div className="glass rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-blue-500/20 transition-all duration-700"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2 group-hover:bg-pink-500/20 transition-all duration-700"></div>

      {isLoading ? (
        <div className="space-y-4 text-center">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
          <p className="text-slate-400 font-light italic">正在思考文字的可能性...</p>
        </div>
      ) : (
        <div className="relative z-10 text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <svg className="w-12 h-12 text-slate-700 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16C10.9124 16 10.017 16.8954 10.017 18L10.017 21H4.017C2.91243 21 2.017 20.1046 2.017 19V5C2.017 3.89543 2.91243 3 4.017 3H20.017C21.1216 3 22.017 3.89543 22.017 5V19C22.017 20.1046 21.1216 21 20.017 21H14.017Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 8L7 11L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 8L17 11L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-100 max-w-sm mx-auto">
            {text}
          </p>

          <div className="pt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigator.clipboard.writeText(text)}
              className="text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors border-b border-slate-800 hover:border-slate-500 pb-1"
            >
              複製文字
            </button>
            <span className="text-slate-800">|</span>
            <button className="text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors border-b border-slate-800 hover:border-slate-500 pb-1">
              分享靈感
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualizer;
