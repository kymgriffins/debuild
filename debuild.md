import React from 'react';
import { ProjectData } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

interface FinancialsProps {
  project: ProjectData;
}

export const Financials: React.FC<FinancialsProps> = ({ project }) => {
  // Compute totals
  const totalBudget = project.financials.reduce((acc, item) => acc + item.allocated, 0);
  const totalSpent = project.financials.reduce((acc, item) => acc + item.spent, 0);
  const percentSpent = Math.round((totalSpent / totalBudget) * 100);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-stone-100 pb-8">
            <div className="space-y-4 max-w-lg">
                <h2 className="text-4xl font-serif text-stone-900">Financial Transparency</h2>
                <p className="text-stone-500 leading-relaxed">
                    Real-time allocation tracking across all project sectors.
                    Cost variances are monitored daily against the master budget.
                </p>
            </div>
            <div className="mt-8 md:mt-0 text-right">
                <p className="text-sm text-stone-400 uppercase tracking-widest mb-1">Total Deployment</p>
                <p className="text-3xl font-light text-stone-800">
                    ${totalSpent.toLocaleString()} <span className="text-stone-300">/ ${totalBudget.toLocaleString()}</span>
                </p>
                <div className="w-full bg-stone-100 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="bg-stone-800 h-full" style={{ width: `${percentSpent}%` }}></div>
                </div>
            </div>
        </div>

        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={project.financials}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis
                        dataKey="category"
                        stroke="#a8a29e"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#a8a29e"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fafaf9', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{fill: '#f5f5f4'}}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Bar dataKey="allocated" stackId="a" fill="#e7e5e4" name="Allocated" barSize={40} />
                    <Bar dataKey="spent" stackId="b" fill="#44403c" name="Spent" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ProjectData } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface TimelineProps {
  project: ProjectData;
}

export const Timeline: React.FC<TimelineProps> = ({ project }) => {
  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        <h2 className="text-4xl font-serif text-stone-900 mb-16 text-center">Development Journey</h2>

        {/* Vertical Line */}
        <div className="absolute left-[27px] md:left-1/2 top-32 bottom-0 w-[1px] bg-stone-300 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-[27px] top-32 bottom-0 w-[1px] bg-stone-300 -translate-x-1/2 block md:hidden" />

        <div className="space-y-16">
          {project.milestones.map((milestone, index) => (
            <div key={milestone.id} className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 relative group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

              {/* Content Box */}
              <div className="w-full md:w-1/2 md:px-12">
                <div className={`p-6 bg-white border border-stone-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${milestone.completed ? 'opacity-100' : 'opacity-60'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                            {milestone.date}
                        </span>
                        <span className={`text-[10px] uppercase px-2 py-1 rounded-full ${milestone.completed ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500'}`}>
                            {milestone.type}
                        </span>
                    </div>
                    <h3 className="text-xl font-serif text-stone-800 mb-2">{milestone.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{milestone.description}</p>
                </div>
              </div>

              {/* Center Node */}
              <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 flex items-center justify-center bg-stone-50 py-2 z-10">
                {milestone.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-stone-800 bg-stone-50" />
                ) : (
                  <Circle className="w-6 h-6 text-stone-300 bg-stone-50" />
                )}
              </div>

              {/* Empty Space for Grid Balance */}
              <div className="w-full md:w-1/2 md:px-12 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { ProjectData } from '../types';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  project: ProjectData;
}

export const Hero: React.FC<HeroProps> = ({ project }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax feel */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear hover:scale-105"
        style={{ backgroundImage: `url('https://picsum.photos/1920/1080?grayscale')` }}
      >
        <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
        <p className="text-stone-300 tracking-[0.3em] uppercase text-sm mb-4 font-sans">
          Project No. {project.id.toUpperCase()}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
          {project.name}
        </h1>
        <div className="flex flex-col items-center gap-2">
           <span className="h-12 w-[1px] bg-stone-400/50 mb-4"></span>
           <p className="text-stone-200 font-light text-lg tracking-wide">
            {project.location} &mdash; Phase II
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <ArrowDown className="w-6 h-6" />
      </div>
    </div>
  );
};