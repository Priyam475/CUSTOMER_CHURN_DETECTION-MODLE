import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# Generate synthetic data
np.random.seed(42)
n_samples = 1000

data = {
    'gender': np.random.choice(['Male', 'Female'], n_samples),
    'SeniorCitizen': np.random.choice([0, 1], n_samples),
    'Partner': np.random.choice(['Yes', 'No'], n_samples),
    'Dependents': np.random.choice(['Yes', 'No'], n_samples),
    'tenure': np.random.randint(1, 73, n_samples),
    'PhoneService': np.random.choice(['Yes', 'No'], n_samples),
    'MultipleLines': np.random.choice(['No phone service', 'No', 'Yes'], n_samples),
    'InternetService': np.random.choice(['DSL', 'Fiber optic', 'No'], n_samples),
    'OnlineSecurity': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
    'OnlineBackup': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
    'DeviceProtection': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
    'TechSupport': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
    'StreamingTV': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
    'StreamingMovies': np.random.choice(['No', 'Yes', 'No internet service'], n_samples),
    'Contract': np.random.choice(['Month-to-month', 'One year', 'Two year'], n_samples),
    'PaperlessBilling': np.random.choice(['Yes', 'No'], n_samples),
    'PaymentMethod': np.random.choice(['Electronic check', 'Mailed check', 'Bank transfer (automatic)', 'Credit card (automatic)'], n_samples),
    'MonthlyCharges': np.random.uniform(20, 120, n_samples),
    'TotalCharges': np.random.uniform(20, 8000, n_samples)
}

df = pd.DataFrame(data)

# Simulate churn (complex logic for synthetic data)
churn_score = (
    (df['MonthlyCharges'] > 70).astype(int) * 2 +
    (df['tenure'] < 12).astype(int) * 3 +
    (df['Contract'] == 'Month-to-month').astype(int) * 4 +
    (df['InternetService'] == 'Fiber optic').astype(int) * 2 +
    (df['PaymentMethod'] == 'Electronic check').astype(int) +
    np.random.normal(0, 2, n_samples)
)
df['Churn'] = (churn_score > 5).astype(int)

# Prepare features and target
X = df.drop('Churn', axis=1)
y = df['Churn']

# Define preprocessing for numeric and categorical features
numeric_features = ['tenure', 'MonthlyCharges', 'TotalCharges']
categorical_features = [col for col in X.columns if col not in numeric_features]

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ])

# Create a pipeline
pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                           ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))])

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_train, y_train)

# Save the entire pipeline
joblib.dump(pipeline, 'model.pkl')

print("Model pipeline trained and saved.")
print(f"Accuracy: {pipeline.score(X_test, y_test)}")
