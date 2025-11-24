import React, { useState } from 'react';
import ChurnForm from './components/ChurnForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center p-4 sm:p-8">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

        {/* Left Column: Header & Form */}
        <div className="space-y-8 animate-float">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 drop-shadow-lg">
              Charny
            </h1>
            <p className="text-lg text-blue-200/80 font-light tracking-wide">
              Predict Customer Loyalty with AI Precision
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-8 backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl ring-1 ring-white/10">
            <ChurnForm onSubmit={handlePredict} isLoading={loading} />
          </div>
        </div>

        {/* Right Column: Results & Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="hidden lg:block text-right mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-blue-200 font-mono">
              v1.0.0 • AI Powered
            </span>
          </div>
          <ResultDisplay prediction={prediction} error={error} loading={loading} />

          {!prediction && !loading && !error && (
            <div className="glass-panel rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 cursor-default">
              <h3 className="text-xl font-semibold text-white mb-2">How it works</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Our advanced Random Forest algorithm analyzes customer tenure, spending habits, and service details to calculate the exact probability of churn.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
