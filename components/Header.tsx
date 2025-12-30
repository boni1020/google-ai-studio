
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-2">
      <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
        Creative Text Studio
      </h1>
      <p className="text-slate-400 text-lg font-light">
        利用 Gemini AI 賦予文字生命力
      </p>
    </header>
  );
};

export default Header;
