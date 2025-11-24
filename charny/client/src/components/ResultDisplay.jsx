import React from 'react';

const ResultDisplay = ({ prediction, error, loading }) => {
    if (loading) {
        return (
            <div className="glass-panel p-8 rounded-3xl w-full h-96 flex flex-col items-center justify-center space-y-6 animate-pulse border-blue-500/30">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-blue-400 rounded-full animate-spin"></div>
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xl text-white font-medium">Analyzing Customer Profile</p>
                    <p className="text-sm text-blue-200/60">Crunching numbers through our AI model...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-panel p-8 rounded-3xl w-full border-red-500/50 bg-red-500/10 flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 text-red-400 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-red-200 mb-2">Analysis Failed</h3>
                    <p className="text-red-300/80">{error}</p>
                </div>
            </div>
        );
    }

    if (!prediction) {
        return null; // Handled by parent placeholder
    }

    const isHighRisk = prediction.churn_prediction === 1;
    const percentage = (prediction.churn_probability * 100).toFixed(1);
    const colorClass = isHighRisk ? 'text-red-400' : 'text-emerald-400';
    const bgClass = isHighRisk ? 'bg-red-500' : 'bg-emerald-500';
    const borderClass = isHighRisk ? 'border-red-500' : 'border-emerald-500';

    return (
        <div className="glass-panel p-8 rounded-3xl w-full transform transition-all duration-500 hover:scale-[1.02] border-t-4 border-t-white/20 relative overflow-hidden group">
            {/* Background Glow */}
            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${bgClass} group-hover:opacity-30 transition-opacity`}></div>

            <h2 className="text-3xl font-bold mb-8 text-center text-white relative z-10">Analysis Result</h2>

            <div className="flex flex-col items-center justify-center space-y-8 relative z-10">

                {/* Circular Progress */}
                <div className="relative w-56 h-56">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Outer Ring */}
                        <circle
                            cx="112"
                            cy="112"
                            r="100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="12"
                            className="text-white/5"
                        />
                        {/* Inner Ring */}
                        <circle
                            cx="112"
                            cy="112"
                            r="100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="12"
                            strokeDasharray={2 * Math.PI * 100}
                            strokeDashoffset={2 * Math.PI * 100 * (1 - percentage / 100)}
                            strokeLinecap="round"
                            className={`${isHighRisk ? 'text-red-500' : 'text-emerald-500'} transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-6xl font-extrabold ${colorClass} drop-shadow-lg`}>{percentage}%</span>
                        <span className="text-sm text-gray-400 uppercase tracking-widest mt-2 font-semibold">Churn Risk</span>
                    </div>
                </div>

                <div className={`w-full p-6 rounded-2xl ${isHighRisk ? 'bg-red-500/10 border border-red-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'} backdrop-blur-md`}>
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${bgClass} animate-pulse`}></div>
                        <h3 className={`text-2xl font-bold ${colorClass}`}>
                            {isHighRisk ? 'High Risk Detected' : 'Customer Safe'}
                        </h3>
                    </div>
                    <p className="text-center text-gray-300 leading-relaxed">
                        {isHighRisk
                            ? 'This customer exhibits strong signals of potential churn. Recommended actions: Offer loyalty discount or schedule a service review call.'
                            : 'This customer shows strong loyalty indicators. No immediate action required, but maintain service quality.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;
