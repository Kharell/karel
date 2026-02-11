
import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionTitle: React.FC<Props> = ({ title, subtitle, align = 'left' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-gradient">
        {title}
      </h2>
      {subtitle && <p className="text-slate-400 max-w-2xl text-lg">{subtitle}</p>}
      <div className={`h-1 w-20 bg-gradient-to-right from-blue-500 to-purple-500 rounded-full mt-4 ${align === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;
