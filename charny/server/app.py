from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the pipeline
try:
    pipeline = joblib.load('model.pkl')
    print("Model pipeline loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    pipeline = None

@app.route('/predict', methods=['POST'])
def predict():
    if not pipeline:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.json
        
        # Create DataFrame from input (expecting single record)
        # We wrap the dict in a list to create a 1-row DataFrame
        input_df = pd.DataFrame([data])
        
        # Predict
        prediction = pipeline.predict(input_df)[0]
        probability = pipeline.predict_proba(input_df)[0][1]

        return jsonify({
            'churn_prediction': int(prediction),
            'churn_probability': float(probability)
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
