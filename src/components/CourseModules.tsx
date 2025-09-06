import React, { useState } from 'react';
import { Play, Clock, CheckCircle, Lock, ChevronRight, Lightbulb, Target, TrendingUp, Volume2, Pause } from 'lucide-react';

// Import audio files
import whatIsSaasAudio from '/src/assets/audio/what_is_saas.m4a';
import saasTraditionalAudio from '/src/assets/audio/saas_traditional.m4a';
import saasBusinessModelAudio from '/src/assets/audio/saas_businessmodel.m4a';
import sellingSaasAudio from '/src/assets/audio/selling_saas.m4a';
import understandingSaasCycleAudio from '/src/assets/audio/understanding_saas_cycle.m4a';
import valueBasedSellingAudio from '/src/assets/audio/value_based_selling.m4a';
import objectionsConcernsAudio from '/src/assets/audio/objections_concerns.m4a';

export const CourseModules: React.FC = () => {
  const [completedModules, setCompletedModules] = useState<string[]>(['module-1']);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{[key: string]: HTMLAudioElement}>({});

  const modules = [
    {
      id: 'module-1',
      title: 'SaaS Fundamentals',
      description: 'Understanding the foundation of Software as a Service',
      duration: '60 min',
      icon: Lightbulb,
      color: 'from-blue-500 to-blue-600',
      lessons: [
        { id: 'what-is-saas', title: 'What is SaaS?', duration: '12 min', audioFile: whatIsSaasAudio },
        { id: 'saas-traditional', title: 'SaaS vs Traditional Software', duration: '15 min', audioFile: saasTraditionalAudio },
        { id: 'saas-business', title: 'The SaaS Business Model', duration: '18 min', audioFile: saasBusinessModelAudio },
        { id: 'saas-selling', title: 'SaaS Selling', duration: '15 min', audioFile: sellingSaasAudio },
      ],
      keyTakeaways: [
        'SaaS delivers software over the internet, eliminating installation hassles',
        'Subscription models create predictable revenue streams',
        'Scalability and accessibility are SaaS superpowers',
        'SaaS selling requires a consultative approach focused on business outcomes'
      ]
    },
    {
      id: 'module-2',
      title: 'Selling SaaS Effectively',
      description: 'Master the art of SaaS sales conversations',
      duration: '60 min',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      lessons: [
        { id: 'saas-cycles', title: 'Understanding SaaS Sales Cycles', duration: '20 min', audioFile: understandingSaasCycleAudio },
        { id: 'value-selling', title: 'Value-Based Selling Approach', duration: '25 min', audioFile: valueBasedSellingAudio },
        { id: 'objections', title: 'Handling Objections & Concerns', duration: '15 min', audioFile: objectionsConcernsAudio },
      ],
      keyTakeaways: [
        'Focus on ROI and business outcomes, not features',
        'Subscription value compounds over time',
        'Address security and reliability concerns proactively'
      ]
    },
    {
      id: 'module-3',
      title: 'AI SaaS Market Opportunity',
      description: 'The trillion-dollar AI revolution and your role in it',
      duration: '50 min',
      icon: TrendingUp,
      color: 'from-purple-500 to-indigo-600',
      lessons: [
        { id: 'ai-market', title: 'The AI Market Explosion', duration: '15 min', videoId: 'dQw4w9WgXcQ' },
        { id: 'ai-need', title: 'Why Businesses Need AI Now', duration: '20 min', videoId: 'dQw4w9WgXcQ' },
        { id: 'ai-positioning', title: 'Positioning AI as Essential', duration: '15 min', videoId: 'dQw4w9WgXcQ' },
      ],
      keyTakeaways: [
        'AI SaaS market projected to reach $118B by 2025',
        'Early adopters gain 2-3 years competitive advantage',
        'AI isn\'t the future—it\'s the present competitive necessity'
      ]
    }
  ];

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const markComplete = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const isModuleUnlocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    return completedModules.includes(modules[moduleIndex - 1].id);
  };

  const playAudio = (lessonId: string, audioFile: string) => {
    // Stop any currently playing audio
    if (currentlyPlaying && audioElements[currentlyPlaying]) {
      audioElements[currentlyPlaying].pause();
      audioElements[currentlyPlaying].currentTime = 0;
    }

    // If clicking the same lesson, just stop
    if (currentlyPlaying === lessonId) {
      setCurrentlyPlaying(null);
      return;
    }

    // Create or get audio element
    let audio = audioElements[lessonId];
    if (!audio) {
      audio = new Audio(audioFile);
      audio.addEventListener('ended', () => setCurrentlyPlaying(null));
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        alert('Unable to play audio file. Please check if the file exists.');
      });
      setAudioElements(prev => ({ ...prev, [lessonId]: audio }));
    }

    // Play the audio
    audio.play().then(() => {
      setCurrentlyPlaying(lessonId);
    }).catch((error) => {
      console.error('Playback error:', error);
      alert('Unable to play audio. This might be due to browser autoplay policies or missing audio files.');
    });
  };

  const stopAudio = () => {
    if (currentlyPlaying && audioElements[currentlyPlaying]) {
      audioElements[currentlyPlaying].pause();
      audioElements[currentlyPlaying].currentTime = 0;
      setCurrentlyPlaying(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Training Modules</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Your journey from SaaS novice to AI sales expert. Each module builds on the last, creating a complete foundation for sales success.
        </p>
      </div>

      <div className="space-y-6">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const isCompleted = completedModules.includes(module.id);
          const isUnlocked = isModuleUnlocked(index);
          const isExpanded = expandedModule === module.id;

          return (
            <div
              key={module.id}
              className={`bg-gradient-to-r ${module.color} p-[1px] rounded-2xl transition-all duration-300 ${
                isUnlocked ? 'hover:shadow-xl' : 'opacity-60'
              }`}
            >
              <div className="bg-[#1a1a1a] rounded-2xl p-6">
                <div
                  className={`flex items-center justify-between ${
                    isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={() => isUnlocked && toggleModule(module.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : isUnlocked ? (
                        <Icon className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{module.title}</h3>
                      <p className="text-gray-400">{module.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {module.duration}
                        </span>
                        <span className="text-sm text-gray-500">
                          {module.lessons.length} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                  {isUnlocked && (
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </div>

                {isExpanded && isUnlocked && (
                  <div className="mt-6 space-y-6 border-t border-gray-700 pt-6">
                    {/* Lessons */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Lessons</h4>
                      <div className="space-y-3">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                {lesson.audioFile ? (
                                  <Volume2 className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{lesson.title}</p>
                                <p className="text-sm text-gray-400">{lesson.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {lesson.audioFile && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (currentlyPlaying === lesson.id) {
                                      stopAudio();
                                    } else {
                                      playAudio(lesson.id!, lesson.audioFile);
                                    }
                                  }}
                                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    currentlyPlaying === lesson.id
                                      ? 'bg-red-600 hover:bg-red-700'
                                      : 'bg-blue-600 hover:bg-blue-700'
                                  }`}
                                >
                                  {currentlyPlaying === lesson.id ? (
                                    <>
                                      <Pause className="w-4 h-4" />
                                      <span className="text-sm">Stop</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4" />
                                      <span className="text-sm">Play</span>
                                    </>
                                  )}
                                </button>
                              )}
                              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Takeaways */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Key Takeaways</h4>
                      <div className="space-y-2">
                        {module.keyTakeaways.map((takeaway, index) => (
                          <div key={index} className="flex items-start space-x-3 text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm leading-relaxed">{takeaway}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!isCompleted && (
                      <button
                        onClick={() => markComplete(module.id)}
                        className="w-full py-3 bg-[#1a5a1a] rounded-xl font-semibold hover:bg-[#0f3f0f] transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Currently Playing Indicator */}
      {currentlyPlaying && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span className="text-sm">Playing audio...</span>
            <button
              onClick={stopAudio}
              className="ml-2 hover:bg-blue-700 rounded p-1"
            >
              <Pause className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <h3 className="text-2xl font-bold mb-6">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {completedModules.length}/{modules.length}
            </div>
            <div className="text-sm text-gray-400">Modules Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {Math.round((completedModules.length / modules.length) * 100)}%
            </div>
            <div className="text-sm text-gray-400">Progress to Certification</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {completedModules.length * 50}
            </div>
            <div className="text-sm text-gray-400">Points Earned</div>
          </div>
        </div>
      </div>
    </div>
  );
};