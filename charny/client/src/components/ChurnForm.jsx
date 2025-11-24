import React, { useState } from 'react';

const ChurnForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        gender: 'Female',
        SeniorCitizen: 0,
        Partner: 'No',
        Dependents: 'No',
        tenure: 1,
        PhoneService: 'No',
        MultipleLines: 'No phone service',
        InternetService: 'DSL',
        OnlineSecurity: 'No',
        OnlineBackup: 'No',
        DeviceProtection: 'No',
        TechSupport: 'No',
        StreamingTV: 'No',
        StreamingMovies: 'No',
        Contract: 'Month-to-month',
        PaperlessBilling: 'Yes',
        PaymentMethod: 'Electronic check',
        MonthlyCharges: 0,
        TotalCharges: 0
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const SectionTitle = ({ children }) => (
        <h3 className="text-lg font-semibold text-purple-200 border-b border-white/10 pb-2 mb-4 mt-6 first:mt-0">
            {children}
        </h3>
    );

    const SelectField = ({ label, name, options }) => (
        <div className="relative group">
            <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2 ml-1">
                {label}
            </label>
            <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full glass-input rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer"
            >
                {options.map(opt => (
                    <option key={opt} value={opt} className="bg-slate-800 text-white">
                        {opt}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-[38px] pointer-events-none text-white/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">

            <SectionTitle>Personal Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField label="Gender" name="gender" options={['Female', 'Male']} />
                <SelectField label="Senior Citizen" name="SeniorCitizen" options={[0, 1]} />
                <SelectField label="Partner" name="Partner" options={['Yes', 'No']} />
                <SelectField label="Dependents" name="Dependents" options={['Yes', 'No']} />
            </div>

            <SectionTitle>Service Information</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                    <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2 ml-1">Tenure (Months)</label>
                    <input
                        type="number"
                        name="tenure"
                        value={formData.tenure}
                        onChange={handleChange}
                        className="w-full glass-input rounded-xl px-4 py-3 outline-none"
                        min="0" max="72" required
                    />
                </div>
                <SelectField label="Phone Service" name="PhoneService" options={['Yes', 'No']} />
                <SelectField label="Multiple Lines" name="MultipleLines" options={['No phone service', 'No', 'Yes']} />
                <SelectField label="Internet Service" name="InternetService" options={['DSL', 'Fiber optic', 'No']} />

                <SelectField label="Online Security" name="OnlineSecurity" options={['No', 'Yes', 'No internet service']} />
                <SelectField label="Online Backup" name="OnlineBackup" options={['No', 'Yes', 'No internet service']} />
                <SelectField label="Device Protection" name="DeviceProtection" options={['No', 'Yes', 'No internet service']} />
                <SelectField label="Tech Support" name="TechSupport" options={['No', 'Yes', 'No internet service']} />
                <SelectField label="Streaming TV" name="StreamingTV" options={['No', 'Yes', 'No internet service']} />
                <SelectField label="Streaming Movies" name="StreamingMovies" options={['No', 'Yes', 'No internet service']} />
            </div>

            <SectionTitle>Billing & Contract</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField label="Contract" name="Contract" options={['Month-to-month', 'One year', 'Two year']} />
                <SelectField label="Paperless Billing" name="PaperlessBilling" options={['Yes', 'No']} />
                <SelectField label="Payment Method" name="PaymentMethod" options={['Electronic check', 'Mailed check', 'Bank transfer (automatic)', 'Credit card (automatic)']} />

                <div className="relative group">
                    <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2 ml-1">Monthly Charges ($)</label>
                    <input
                        type="number"
                        name="MonthlyCharges"
                        value={formData.MonthlyCharges}
                        onChange={handleChange}
                        className="w-full glass-input rounded-xl px-4 py-3 outline-none"
                        min="0" step="0.01" required
                    />
                </div>
                <div className="relative group">
                    <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2 ml-1">Total Charges ($)</label>
                    <input
                        type="number"
                        name="TotalCharges"
                        value={formData.TotalCharges}
                        onChange={handleChange}
                        className="w-full glass-input rounded-xl px-4 py-3 outline-none"
                        min="0" step="0.01" required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-purple-500/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-8 text-lg tracking-wide"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Profile...
                    </span>
                ) : 'Generate Prediction'}
            </button>
        </form>
    );
};

export default ChurnForm;
