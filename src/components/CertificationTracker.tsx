import React, { useState } from 'react';
import { Award, CheckCircle, Clock, Star, Trophy, Target, TrendingUp } from 'lucide-react';

export const CertificationTracker: React.FC = () => {
  const [completedRequirements, setCompletedRequirements] = useState([
    'complete-modules',
    'first-demo'
  ]);

  const certificationLevels = [
    {
      id: 'associate',
      name: 'AI SaaS Associate',
      description: 'Foundation level certification',
      color: 'from-blue-500 to-blue-600',
      requirements: [
        { id: 'complete-modules', label: 'Complete all training modules', completed: true },
        { id: 'first-demo', label: 'Deliver first AI demo', completed: true },
        { id: 'pass-quiz', label: 'Pass certification quiz (80%+)', completed: false },
        { id: 'shadow-calls', label: 'Shadow 5 experienced sales calls', completed: false }
      ]
    },
    {
      id: 'professional',
      name: 'AI SaaS Professional',
      description: 'Advanced sales mastery',
      color: 'from-green-500 to-emerald-600',
      requirements: [
        { id: 'monthly-quota', label: 'Hit monthly quota 3 consecutive months', completed: false },
        { id: 'advanced-training', label: 'Complete advanced objection handling', completed: false },
        { id: 'mentor-junior', label: 'Mentor a junior sales rep', completed: false },
        { id: 'client-success', label: 'Achieve 90%+ client satisfaction', completed: false }
      ]
    },
    {
      id: 'expert',
      name: 'AI SaaS Expert',
      description: 'Elite status recognition',
      color: 'from-purple-500 to-indigo-600',
      requirements: [
        { id: 'top-performer', label: 'Top 10% performer for 6 months', completed: false },
        { id: 'thought-leader', label: 'Create training content', completed: false },
        { id: 'innovation', label: 'Contribute to sales process improvement', completed: false },
        { id: 'enterprise-deals', label: 'Close 3+ enterprise deals', completed: false }
      ]
    }
  ];

  const achievements = [
    { id: 'first-sale', name: 'First Sale', description: 'Closed your first AI SaaS deal', earned: true, points: 100 },
    { id: 'fast-learner', name: 'Fast Learner', description: 'Completed training in under 2 weeks', earned: true, points: 50 },
    { id: 'demo-master', name: 'Demo Master', description: 'Delivered 10 successful demos', earned: false, points: 150 },
    { id: 'upsell-expert', name: 'Upsell Expert', description: 'Successfully upsold 5 clients', earned: false, points: 200 },
    { id: 'quota-crusher', name: 'Quota Crusher', description: 'Exceeded quota by 150%', earned: false, points: 300 },
    { id: 'ai-evangelist', name: 'AI Evangelist', description: 'Converted 20+ businesses to AI solutions', earned: false, points: 500 }
  ];

  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
  const overallProgress = (completedRequirements.length / 12) * 100; // Total requirements across all levels

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Certification Path</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Your journey to becoming a certified AI SaaS sales expert. Progress through levels, earn achievements, and join the elite ranks of AI sales professionals.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-2">{totalPoints}</div>
          <div className="text-sm text-gray-400">Total Points Earned</div>
        </div>
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2">{Math.round(overallProgress)}%</div>
          <div className="text-sm text-gray-400">Overall Progress</div>
        </div>
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">{achievements.filter(a => a.earned).length}</div>
          <div className="text-sm text-gray-400">Achievements Unlocked</div>
        </div>
      </div>

      {/* Certification Levels */}
      <div className="space-y-8 mb-12">
        {certificationLevels.map((level, index) => {
          const completed = level.requirements.filter(req => 
            completedRequirements.includes(req.id)
          ).length;
          const progress = (completed / level.requirements.length) * 100;
          const isUnlocked = index === 0 || certificationLevels[index - 1].requirements.every(req => 
            completedRequirements.includes(req.id)
          );

          return (
            <div
              key={level.id}
              className={`bg-gradient-to-r ${level.color} p-[1px] rounded-2xl ${
                isUnlocked ? '' : 'opacity-60'
              }`}
            >
              <div className="bg-[#1a1a1a] rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center`}>
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{level.name}</h3>
                      <p className="text-gray-400">{level.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round(progress)}%</div>
                    <div className="text-sm text-gray-400">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                  <div
                    className={`h-3 bg-gradient-to-r ${level.color} rounded-full transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Requirements */}
                <div className="space-y-3">
                  {level.requirements.map((requirement) => (
                    <div
                      key={requirement.id}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                        requirement.completed
                          ? 'bg-green-600/20 border border-green-600/30'
                          : 'bg-gray-800/50 border border-gray-700'
                      }`}
                    >
                      {requirement.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <span className={`font-medium ${
                        requirement.completed ? 'text-green-400' : 'text-gray-300'
                      }`}>
                        {requirement.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements Section */}
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="w-6 h-6 mr-3 text-yellow-400" />
          Achievements & Badges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border-yellow-600/30'
                  : 'bg-gray-700/50 border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-bold ${achievement.earned ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {achievement.name}
                </h4>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  achievement.earned
                    ? 'bg-yellow-600/20 text-yellow-400'
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  {achievement.points} pts
                </span>
              </div>
              <p className="text-sm text-gray-400">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};