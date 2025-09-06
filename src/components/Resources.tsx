import React, { useState } from 'react';
import { FileText, Calculator, Download, ExternalLink, X, BookOpen } from 'lucide-react';

export const Resources: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showLostRevenueCalculator, setShowLostRevenueCalculator] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  
  // ROI Calculator state
  const [humanLaborCost, setHumanLaborCost] = useState(5000);
  const [avgTransaction, setAvgTransaction] = useState(1000);
  const [inboundConversionRate, setInboundConversionRate] = useState(15);
  const [callsPerDay, setCallsPerDay] = useState(20);

  // Lost Revenue Calculator state
  const [avgDealValue, setAvgDealValue] = useState(1500);
  const [callsPerDayLost, setCallsPerDayLost] = useState(25);
  const [missedCallRate, setMissedCallRate] = useState(27);
  const [conversionRateLost, setConversionRateLost] = useState(12);

  const calculateLostRevenue = () => {
    const workingDaysPerMonth = 22;
    const totalCallsPerMonth = callsPerDayLost * workingDaysPerMonth;
    const missedCallsPerMonth = totalCallsPerMonth * (missedCallRate / 100);
    const lostConversions = missedCallsPerMonth * (conversionRateLost / 100);
    const monthlyLostRevenue = lostConversions * avgDealValue;
    const annualLostRevenue = monthlyLostRevenue * 12;
    
    return {
      totalCallsPerMonth,
      missedCallsPerMonth,
      lostConversions,
      monthlyLostRevenue,
      annualLostRevenue
    };
  };

  const lostRevenueData = calculateLostRevenue();

  const calculateROI = () => {
    // Convert percentage to decimal
    const conversionRate = inboundConversionRate / 100;
    
    // Calculate monthly metrics
    const workingDaysPerMonth = 22;
    const totalCallsPerMonth = callsPerDay * workingDaysPerMonth;
    const currentConversions = totalCallsPerMonth * conversionRate;
    const currentMonthlyRevenue = currentConversions * avgTransaction;

    // 40% increase in leads from 24/7 availability
    const leadIncrease = 0.40;
    const additionalConversions = currentConversions * leadIncrease;
    const additionalRevenue = additionalConversions * avgTransaction;

    // 60% reduction in manual tasks
    const taskReduction = 0.60;
    const laborSavings = humanLaborCost * taskReduction;

    // Investment cost (monthly)
    const monthlyInvestment = 599; // AI service cost

    // Total monthly benefit
    const totalMonthlyBenefit = additionalRevenue + laborSavings;
    const netMonthlyBenefit = totalMonthlyBenefit - monthlyInvestment;
    
    // ROI calculation
    const roi = ((netMonthlyBenefit * 12) / (monthlyInvestment * 12)) * 100;
    const paybackPeriod = monthlyInvestment / netMonthlyBenefit;

    return {
      additionalRevenue,
      laborSavings,
      monthlyInvestment,
      totalMonthlyBenefit,
      netMonthlyBenefit,
      roi,
      paybackPeriod: Math.max(0, paybackPeriod),
      currentConversions,
      additionalConversions
    };
  };

  const roiData = calculateROI();

  const resources = [
    {
      id: 'messaging-templates',
      title: 'Text Messaging Templates',
      description: 'Pre-written SMS templates for follow-ups and engagement',
      type: 'Document',
      size: '2 pages',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      content: `# Text Messaging Templates

## Follow-up Templates

**Template 1: Post-Demo Follow-up**
Hi [Name], thanks for taking the time to see our AI Voice Agent demo today. Based on our conversation, I believe this could save you [specific benefit discussed]. When would be a good time to discuss next steps?

**Template 2: Missed Call Follow-up**
Hi [Name], I tried calling but couldn't reach you. I have some insights about how businesses like yours are capturing 40% more leads with 24/7 AI answering. Worth a quick 10-minute call?

**Template 3: Proposal Follow-up**
Hi [Name], following up on the proposal I sent over. The 24/7 AI answering service could start capturing those missed leads immediately. Any questions I can answer?

## Engagement Templates

**Template 4: Value Reminder**
Hi [Name], quick reminder that every missed call could be a lost customer. Our AI ensures you never miss another opportunity. Ready to get started?

**Template 5: Urgency Creator**
Hi [Name], we're seeing businesses lose an average of $2,400/month in missed opportunities. Our AI can eliminate that starting next week. Interested in a quick demo?

**Template 6: Social Proof**
Hi [Name], just helped another [industry] business capture 60% more leads with our AI Voice Agent. Similar results possible for you. 15-minute call to discuss?`
    },
    {
      id: 'objection-handling',
      title: 'Objection Handling Guide',
      description: 'Comprehensive responses to common sales objections',
      type: 'Document',
      size: '4 pages',
      icon: FileText,
      color: 'from-red-500 to-red-600',
      content: `# Objection Handling Guide

## Price Objections

**"It's too expensive"**
Response: "I understand price is a consideration. Let me ask you this - what's the cost of missing just one qualified lead per week? At your average transaction value, that's [calculate amount] per month. Our service pays for itself by capturing just 1-2 additional leads monthly."

**"We need to think about it"**
Response: "I completely understand wanting to make the right decision. What specific concerns do you have that I can address right now? Is it the investment, the implementation, or something else?"

## Technical Objections

**"We already have voicemail"**
Response: "That's exactly the problem we solve. Voicemail is where leads go to die. 80% of callers won't leave a message, and of those who do, only 30% get called back within 24 hours. Our AI answers every call live and captures every opportunity."

**"What if the AI makes mistakes?"**
Response: "Great question. Our AI is trained specifically for business conversations and has a 95% accuracy rate. Plus, every interaction is logged and can be reviewed. The bigger risk is missing calls entirely when no one's available to answer."

## Timing Objections

**"Now isn't a good time"**
Response: "I appreciate your honesty. When would be a better time? Keep in mind, every day you wait is another day of potentially missed opportunities. We can have you up and running in 24 hours."

**"We're too busy right now"**
Response: "Being too busy is exactly why you need this. Our AI handles the calls so you can focus on running your business. It actually gives you more time, not less."

## Authority Objections

**"I need to discuss with my partner/team"**
Response: "Absolutely, this affects the whole team. What questions do you think they'll have? Let me give you the information you'll need to present this properly. Would it help if I joined that conversation?"

**"I'm not the decision maker"**
Response: "I understand. Who else is involved in this decision? What's the best way to get them the information they need? Would a brief demo for the whole team make sense?"`
    },
    {
      id: 'show-dont-tell',
      title: 'Show Don\'t Tell Method',
      description: 'The definitive live experience scripts for interactive demos',
      type: 'Document',
      size: '3 pages',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      content: `# The Definitive InboundAI365 Live Experience Scripts

## The Final Philosophy: Don't demo the product. Don't even demo the onboarding. Let the prospect experience the onboarding as the demo.

### Script 1: The "Live Experience" Cold Call
**Goal:** Get the prospect from a cold interruption to interacting with a self-onboarding AI in under two minutes.

*(Ring, Ring)*

**Prospect:** "Hello, this is [Prospect Name]."

**You:** "Hi [Prospect Name], my name is [Your Name] from InboundAI365. You weren't expecting my call, so would it be a terrible idea to take 60 seconds to tell you why I'm calling?"

*(Their "no" gives you permission.)*

**Prospect:** "No, go ahead. You've got a minute."

**You:** "Thanks. We help businesses solve the expensive problem of missed calls. Are you 100% confident you're not losing potential customers when they hit your voicemail after hours?"

*(Their "no" confirms the pain.)*

**Prospect:** "No, I'm sure we are. It's a problem."

**You:** "That's exactly why I called. Instead of me explaining our 24/7 AI Voice Agent, I'd rather you experience her live. This will only take a few minutes. Are you opposed to me patching in our AI agent, Maya, right now so you can see how easily she gets started?"

*(The ask is immediate and intriguing.)*

**Prospect:** "What do you mean? What do we have to do?"

**You:** "That's the best part. You don't have to do anything. When I bring Maya on the line, she'll just ask you a little about your business and how you want her to handle your calls. Then, we will see her in action live, right now.

I'm connecting her."

*(This is the new, powerful assumptive close. You're not asking for permission; you're stating the next step. It's confident and eliminates hesitation.)*

### Script 2: The "Live Experience" Inbound Lead
**Goal:** Immediately convert their passive interest into an active, mind-blowing product experience.

*(Ring, Ring)*

**Prospect:** "Hello?"

**You:** "Hi [Prospect Name], this is [Your Name] with InboundAI365. You downloaded our guide on business growth, and I wanted to follow up. Have you given up on finding a way to make sure you capture every single inbound call?"

*(Their "No!" confirms their commitment to solving the problem.)*

**Prospect:** "No, not at all. It's a priority for us."

**You:** "I was hoping you'd say that. The fastest way to grow is to never miss an opportunity. Rather than me telling you how our AI Voice Agent, Maya, solves this, would you be against spending a few minutes right now experiencing it firsthand?"

**Prospect:** "What do you mean by 'experiencing it'?"

**You:** "It's simple. I'm going to conference Maya into this call. She'll ask you a couple of questions to onboard herself for your business, and then you'll get to interact with her live, as if you were a customer. It's the best way to see the magic.

I'm patching her in now. Your line will just go quiet for a moment."

*(Again, a confident, assumptive statement. You are guiding them to the next logical step without asking for permission, showcasing your belief in the value they're about to receive.)*

### The Final Transition Script (The Bridge to the Magic)
This is the critical handoff. The rep says this right before conferencing Maya.

**You:** "Excellent. You're going to see how simple and powerful this is.

Here's what will happen next: I'm going to connect our AI agent, Maya. She'll introduce herself and then ask you for your company name and how she should handle a new customer call. Just talk to her like you would a new employee.

After she has that, she'll be ready, and you can immediately role-play as a customer. I'll be listening in silently.

I'm connecting her now."`
    },
    {
      id: 'roi-calculator',
      title: 'Growth Partner ROI Calculator',
      description: 'Interactive calculator showing potential ROI and savings',
      type: 'Calculator',
      size: 'Interactive',
      icon: Calculator,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'lost-revenue-calculator',
      title: 'Lost Revenue Calculator',
      description: 'Calculate how much missed calls are costing your business',
      type: 'Calculator',
      size: 'Interactive',
      icon: Calculator,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'objection-playbook',
      title: 'The InboundAI365 Objection Handling Playbook: Turning "But" into "Now"',
      description: 'The definitive guide to handling objections with the mindset of a consultant, not a salesperson',
      type: 'Document',
      size: '6 pages',
      icon: FileText,
      color: 'from-orange-500 to-red-600',
      content: `# The InboundAI365 Objection Handling Playbook: Turning "But" into "Now"

## The Guiding Philosophy:

An objection is not a "no." It is a cry for help. The prospect is telling you their fear and asking you to make them feel safe about moving forward. You are not a salesperson pushing a product; you are a consultant showing them the unavoidable future.

Your mindset is that of a Judo master. You do not meet their force with force. You accept their momentum (the objection) and use it to gently guide them to the logical conclusion (the sale).

## Your Three Core Principles:

**Reframe the Cost:** The price of our service is never the real cost. The real cost is the revenue they are losing every single day they do nothing.

**The Alternative is Pain:** The choice isn't between "InboundAI365" and "something else." It's between "capturing revenue with Maya" and "actively sending customers to your competitors via voicemail."

**The Demo is the Answer:** Your ultimate weapon is the live demo. When in doubt, don't tell them; show them. "That's a fair question. Let's patch in Maya right now and see how she handles it."

## Category 1: The Money Objection
*(This is never about money. It's about value and fear.)*

### Objection: "That's too expensive." / "It's not in the budget right now."

**Bad Response:** "Let me tell you about the ROI..."

**Your Response:**
"I get it. But what was the cost of that one emergency plumbing call you missed at 2 AM last week? It was probably more than our entire year's subscription. This isn't a line item in your budget; this is the machine that finds the money for everything else in your budget. The question isn't if you can afford Maya; it's how much longer you can afford to let your competitors take your highest-value calls."

### Objection: "I can get a simple answering service for much cheaper."

**Bad Response:** "But we have AI and a CRM!"

**Your Response:**
"You're right, you could. But an answering service is just a glorified voicemail that takes a message. It can't book an appointment, it can't process a payment, and it can't tell you which of your leads is most likely to close. You'd be paying for a band-aid when you have a broken leg. You're not just buying a voice; you're buying an engine that grows your business. Are you opposed to seeing what that engine can do, right now?"

## Category 2: The AI & Trust Objection
*(This is about the fear of losing the "human touch" and looking foolish with bad tech.)*

### Objection: "My customers want to talk to a real person." / "It sounds robotic."

**Bad Response:** "Our AI is very advanced and sounds human."

**Your Response:**
"That's the right concern. A bad robot is worse than nothing. But right now, your customers are talking to a voicemail, which is the most robotic, impersonal experience on the planet. Maya isn't a replacement for your people; she's the perfect assistant who works 24/7 to make sure your people are talking to hot, qualified leads instead of cold, angry voicemails. The choice isn't 'human vs. robot'; it's 'perfectly handled call vs. a missed opportunity.' Are you opposed to hearing what 'perfect' sounds like right now?"

### Objection: "I don't trust AI with my customers/payments."

**Bad Response:** "It's very secure, we are PCI compliant..."

**Your Response:**
"That's the smartest question to ask. The trust your customers have in you is everything. But let me ask you this: do you trust your voicemail to handle a frantic new patient or a high-value emergency call? Maya operates within the exact rules you set for her, and she processes payments on the same secure networks that every major bank uses. Let's do the 3-minute live demo. If you don't feel 100% confident after hearing her, we can end the call. Fair enough?"

## Category 3: The Inertia & Timing Objection
*(This is the killer of all deals. It's your job to create urgency by quantifying the cost of inaction.)*

### Objection: "We're doing okay for now. Call me next quarter."

**Bad Response:** "Okay, I'll put a note in my calendar."

**Your Response:**
"I understand. But 'okay' is costing you money every single night. While you're waiting for next quarter, your competitor is taking the calls you're missing this quarter. How many new patients, dinner reservations, or emergency jobs are you willing to let them have before this becomes a priority? This isn't a 'next quarter' problem; it's a 'last night' problem. Let's just do the 3-minute demo now. If it's not for you, I promise I won't call you next quarter."

### Objection: "I need to think about it." / "Let me talk to my partner."

**Bad Response:** "What is there to think about?"

**Your Response:**
"Of course. It's a big decision. What's the one thing you're most hesitant about that I can help clarify right now? Is it the price, or is it how Maya will sound to a real customer?"

*(They will tell you their REAL objection. Then, use the appropriate response above. If they still insist...)*

"That's fair. How about this: let's schedule a 5-minute call with you and your partner tomorrow. I won't talk at all. We'll just patch Maya in and you can both experience her live. That way, you're not trying to explain the value; you're showing it. Are you free at 10:30 AM?"

## Category 4: The Complexity & Implementation Objection
*(This is the easiest objection to handle because our product and process are the answer.)*

### Objection: "We don't have the time to set up a new system." / "My team will never learn this."

**Bad Response:** "Don't worry, it's really easy!"

**Your Response:**
"That's the best part. You already know how to onboard Maya because you're about to do it. It takes about 90 seconds. Let's do it right now."`
    },
    {
      id: 'competitive-analysis',
      title: 'Competitive Analysis Sheet',
      description: 'Compare InboundAI365 against major competitors',
      type: 'Document',
      size: '3 pages',
      icon: FileText,
      color: 'from-indigo-500 to-purple-600',
      content: `# Competitive Analysis Sheet

## InboundAI365 vs. Competitors

### vs. Traditional Answering Services

**InboundAI365 Advantages:**
- Available 24/7/365 without human limitations
- Consistent quality - never has a bad day
- Scales instantly without hiring/training
- Costs 70% less than human operators
- Never takes sick days or vacations
- Learns and improves over time

**Traditional Service Limitations:**
- Limited hours or expensive 24/7 coverage
- Human error and inconsistency
- High turnover and training costs
- Expensive scaling
- Sick days and coverage gaps

### vs. Basic Voicemail Systems

**InboundAI365 Advantages:**
- Live conversation vs. one-way message
- 95% of callers interact vs. 20% who leave voicemail
- Immediate lead qualification
- Appointment booking capability
- Real-time notifications
- Professional business image

**Voicemail Limitations:**
- 80% of callers hang up without leaving message
- Delayed response times
- No lead qualification
- Unprofessional impression
- No appointment booking

### vs. Chatbots

**InboundAI365 Advantages:**
- Voice is more personal than text
- Handles complex conversations better
- Works for all demographics
- No typing required from customers
- Emotional intelligence in voice
- Immediate human connection feel

**Chatbot Limitations:**
- Limited to text-based interaction
- Often frustrating user experience
- Difficult for older demographics
- Can't handle complex requests well
- Feels impersonal and robotic

### ROI Comparison

**InboundAI365:** $599/month
- Captures 40% more leads
- Reduces labor costs by 60%
- Typical ROI: 300-500%

**Traditional Answering Service:** $2,000-4,000/month
- Limited availability
- Human inconsistency
- Typical ROI: 50-100%

**Missed Calls (Status Quo):** $0/month upfront
- 27% of calls go unanswered
- Average business loses $2,400/month in opportunities
- Negative ROI: -$28,800/year`
    },
    {
      id: 'case-studies',
      title: 'Success Stories & Case Studies',
      description: 'Real customer results and testimonials',
      type: 'Document',
      size: '5 pages',
      icon: FileText,
      color: 'from-teal-500 to-cyan-600',
      content: `# Success Stories & Case Studies

## Case Study 1: Local HVAC Company

**Challenge:** Missing 40% of after-hours emergency calls, losing $15,000/month in potential revenue.

**Solution:** Implemented InboundAI365 Voice Agent to handle all calls 24/7.

**Results:**
- 95% call answer rate (up from 60%)
- $18,000 additional monthly revenue
- 300% ROI within first month
- Customer satisfaction increased 45%

**Customer Quote:** "Maya has become our best employee. She never sleeps, never calls in sick, and captures every opportunity. Best investment we've made." - Mike Johnson, Johnson HVAC

## Case Study 2: Medical Practice

**Challenge:** Patients calling after hours for appointments and urgent questions, going to competitors.

**Solution:** AI agent handles appointment booking and triages urgent calls.

**Results:**
- 60% increase in appointment bookings
- Reduced staff overtime by 40%
- Patient satisfaction score: 4.8/5
- $25,000 monthly revenue increase

**Customer Quote:** "Our patients love talking to Maya. She's always professional, never rushed, and gets them exactly what they need." - Dr. Sarah Chen, Chen Family Medicine

## Case Study 3: Legal Firm

**Challenge:** Potential clients calling outside business hours, going to competitors who answer.

**Solution:** AI agent qualifies leads and schedules consultations 24/7.

**Results:**
- 80% more qualified leads
- $50,000 additional monthly revenue
- Reduced marketing costs by 30%
- 450% ROI

**Customer Quote:** "Maya has transformed our practice. She captures leads we never would have gotten and qualifies them better than our previous receptionist." - Attorney Robert Martinez

## Case Study 4: E-commerce Business

**Challenge:** International customers calling at all hours, missing sales opportunities.

**Solution:** AI handles customer service and order support globally.

**Results:**
- 24/7 customer support coverage
- 35% increase in customer retention
- $30,000 monthly revenue increase
- Eliminated need for night shift staff

**Customer Quote:** "Maya handles our international customers perfectly. She's available when they need help, which has dramatically improved our customer experience." - Lisa Park, Park Electronics

## Common Success Metrics Across All Clients

- **Average Lead Increase:** 40-60%
- **Average ROI:** 300-500%
- **Customer Satisfaction:** 4.7/5 average
- **Payback Period:** 1-2 months
- **Staff Time Savings:** 50-70%`
    }
  ];

  const openResource = (resourceId: string) => {
    if (resourceId === 'roi-calculator') {
      setShowCalculator(true);
    } else if (resourceId === 'lost-revenue-calculator') {
      setShowLostRevenueCalculator(true);
    } else {
      setSelectedResource(resourceId);
    }
  };

  const closeResource = () => {
    setSelectedResource(null);
    setShowCalculator(false);
    setShowLostRevenueCalculator(false);
    setShowMethodology(false);
  };

  const selectedResourceData = resources.find(r => r.id === selectedResource);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Sales Resources</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Everything you need to succeed in AI SaaS sales. From templates and calculators to competitive analysis and proven methodologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div
              key={resource.id}
              onClick={() => openResource(resource.id)}
              className={`bg-gradient-to-br ${resource.color} p-[1px] rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="bg-[#1a1a1a] rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{resource.size}</span>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resource Modal */}
      {selectedResourceData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold">{selectedResourceData.title}</h3>
              <button
                onClick={closeResource}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {selectedResourceData.content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lost Revenue Calculator Modal */}
      {showLostRevenueCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold">Lost Revenue Calculator</h3>
              <button
                onClick={closeResource}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Average Deal Value ($)
                  </label>
                  <input
                    type="number"
                    value={avgDealValue}
                    onChange={(e) => setAvgDealValue(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Average value per customer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Calls Per Day
                  </label>
                  <input
                    type="number"
                    value={callsPerDayLost}
                    onChange={(e) => setCallsPerDayLost(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Total daily call volume"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Missed Call Rate (%)
                  </label>
                  <input
                    type="number"
                    value={missedCallRate}
                    onChange={(e) => setMissedCallRate(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Percentage of calls missed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Industry average: 27%</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    value={conversionRateLost}
                    onChange={(e) => setConversionRateLost(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Percentage of calls that convert"
                  />
                  <p className="text-xs text-gray-400 mt-1">Typical range: 10-20%</p>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                {/* Monthly Impact */}
                <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-red-400 mb-4">Monthly Impact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">
                        {lostRevenueData.totalCallsPerMonth.toLocaleString()}
                      </div>
                      <div className="text-sm text-red-300">Total Monthly Calls</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">
                        {Math.round(lostRevenueData.missedCallsPerMonth).toLocaleString()}
                      </div>
                      <div className="text-sm text-red-300">Missed Calls</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">
                        {Math.round(lostRevenueData.lostConversions).toLocaleString()}
                      </div>
                      <div className="text-sm text-red-300">Lost Conversions</div>
                    </div>
                  </div>
                </div>

                {/* Revenue Loss */}
                <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Revenue Loss Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        ${lostRevenueData.monthlyLostRevenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">Monthly Lost Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        ${lostRevenueData.annualLostRevenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">Annual Lost Revenue</div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white/10 rounded-lg">
                    <p className="text-center text-sm">
                      <strong>Cost of Inaction:</strong> Every month you wait costs you ${lostRevenueData.monthlyLostRevenue.toLocaleString()} in missed opportunities
                    </p>
                  </div>
                </div>

                {/* Solution Impact */}
                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-4">With InboundAI365 Solution</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        95%
                      </div>
                      <div className="text-sm text-green-300">Call Answer Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        ${Math.round(lostRevenueData.monthlyLostRevenue * 0.85).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-300">Monthly Revenue Recovered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        ${Math.round(lostRevenueData.annualLostRevenue * 0.85).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-300">Annual Revenue Recovered</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  * Calculations based on industry averages and typical business metrics
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROI Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold">Growth Partner ROI Calculator</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowMethodology(true)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  title="View ROI Methodology"
                >
                  <BookOpen className="w-5 h-5" />
                </button>
                <button
                  onClick={closeResource}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Human Labor Cost [Monthly] ($)
                  </label>
                  <input
                    type="number"
                    value={humanLaborCost}
                    onChange={(e) => setHumanLaborCost(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Monthly labor costs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Avg Profit Per Transaction ($)
                  </label>
                  <input
                    type="number"
                    value={avgTransaction}
                    onChange={(e) => setAvgTransaction(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Average transaction value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Inbound Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inboundConversionRate}
                    onChange={(e) => setInboundConversionRate(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Conversion rate percentage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Calls Per Day (Including Missed Calls)
                  </label>
                  <input
                    type="number"
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Total daily call volume"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                {/* Additional Revenue */}
                <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">Additional Revenue (40% Lead Increase)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {roiData.currentConversions.toFixed(1)}
                      </div>
                      <div className="text-sm text-blue-300">Current Monthly Conversions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        +{roiData.additionalConversions.toFixed(1)}
                      </div>
                      <div className="text-sm text-blue-300">Additional Conversions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        ${roiData.additionalRevenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-300">Additional Monthly Revenue</div>
                    </div>
                  </div>
                </div>

                {/* Labor Savings */}
                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-4">Labor Savings (60% Task Reduction)</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">
                      ${roiData.laborSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-300">Monthly Labor Cost Savings</div>
                  </div>
                </div>

                {/* Investment & ROI */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Investment & ROI Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        ${roiData.monthlyInvestment}
                      </div>
                      <div className="text-sm text-gray-300">Monthly Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        ${roiData.totalMonthlyBenefit.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">Total Monthly Benefit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {roiData.roi.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-300">Annual ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {roiData.paybackPeriod.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-300">Payback (Months)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowMethodology(true)}
                  className="text-blue-400 hover:text-blue-300 underline text-sm"
                >
                  View ROI Methodology & Assumptions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROI Methodology Modal */}
      {showMethodology && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold">ROI Methodology & Assumptions</h3>
              <button
                onClick={() => setShowMethodology(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-400 mb-4">40% Increase in Leads from 24/7 Availability</h4>
                  <div className="space-y-3 text-gray-300">
                    <p><strong>Reasoning:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Most businesses only answer phones during business hours (8-10 hours/day)</li>
                      <li>With 24/7 AI availability, you capture leads during:</li>
                      <ul className="list-disc list-inside ml-6 space-y-1">
                        <li>After-hours calls (evenings, weekends)</li>
                        <li>Different time zones</li>
                        <li>Emergency situations when customers need immediate help</li>
                      </ul>
                      <li>Studies show businesses miss 27% of calls during business hours</li>
                      <li>After-hours represents roughly 60-70% of total time</li>
                      <li>A 40% increase is conservative considering you're going from ~40% availability to 100% availability</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-4">60% Reduction in Manual Tasks</h4>
                  <div className="space-y-3 text-gray-300">
                    <p><strong>Specific tasks AI handles vs. human focus areas:</strong></p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-green-300">AI Handles:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Initial call answering</li>
                          <li>Basic information gathering</li>
                          <li>Appointment scheduling</li>
                          <li>FAQ responses</li>
                          <li>Lead qualification</li>
                          <li>Call routing</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-green-300">Humans Focus On:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Complex problem solving</li>
                          <li>Relationship building</li>
                          <li>Strategic planning</li>
                          <li>High-value activities</li>
                          <li>Creative work</li>
                          <li>Decision making</li>
                        </ul>
                      </div>
                    </div>
                    <p><strong>Conservative nature of the estimate:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>60% is a conservative estimate - many businesses see 70-80% task reduction</li>
                      <li>Accounts for learning curve and implementation time</li>
                      <li>Based on actual customer data from similar implementations</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">Overall Context</h4>
                  <div className="space-y-3 text-gray-300">
                    <p><strong>Why these numbers provide realistic, conservative estimates:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Based on data from 500+ implementations across various industries</li>
                      <li>Accounts for businesses that may not achieve optimal results immediately</li>
                      <li>Includes buffer for seasonal variations and market conditions</li>
                      <li>Conservative conversion rate assumptions</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-4">Transparency & Confidence</h4>
                  <p className="text-gray-300">
                    This gives prospects full transparency into the ROI calculation methodology and builds confidence in the projections. 
                    All estimates are designed to under-promise and over-deliver, ensuring customer satisfaction and long-term success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};