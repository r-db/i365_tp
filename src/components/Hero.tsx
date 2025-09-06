import React from 'react';
import { Play, Target, Zap, Users, TrendingUp } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-sm font-medium mb-6">
          <Zap className="w-4 h-4 mr-2" />
          Transform Your Sales Game with AI
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Master the Art of
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent block mt-2">
            AI SaaS Sales
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Welcome to your comprehensive training platform. Here, you'll master the fundamentals of SaaS sales while diving deep into the revolutionary world of AI-powered solutions. Get ready to unlock your potential and drive unprecedented growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-[#1a5a1a] rounded-xl font-semibold hover:bg-[#0f3f0f] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center">
            <Play className="w-5 h-5 mr-2" />
            Start Training
          </button>
          <button className="px-8 py-4 border border-gray-600 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center">
            <Target className="w-5 h-5 mr-2" />
            View Certification Path
          </button>
        </div>
      </div>

      {/* Key Products Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Voice AI Answering Service</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Revolutionary AI-powered phone answering that never sleeps, never takes a break, and captures every lead. This isn't just automation—it's intelligent conversation that converts prospects into customers 24/7.
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              24/7 intelligent call handling
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Natural conversation flow
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Lead qualification & booking
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Growth Partner AI Agent</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Your data scientist in the CRM. This AI agent doesn't just store data—it thinks, analyzes, and provides insights that turn information into actionable growth strategies. Built for the AI age, designed for human success.
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Intelligent data analysis
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Predictive insights
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Seamless human-AI collaboration
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
          <div className="text-sm text-gray-400">Lead Capture Rate</div>
        </div>
        <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
          <div className="text-sm text-gray-400">AI Availability</div>
        </div>
        <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="text-3xl font-bold text-purple-400 mb-2">3x</div>
          <div className="text-sm text-gray-400">Faster Response</div>
        </div>
        <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="text-3xl font-bold text-yellow-400 mb-2">80%</div>
          <div className="text-sm text-gray-400">Cost Reduction</div>
        </div>
      </div>
    </div>
  );
};