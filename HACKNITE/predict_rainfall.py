import sys
import json
import pandas as pd
from joblib import load

# Load the trained model
model = load('HACKNITE/avg_monthly_rainfall_model.joblib')

# Predefined historical rainfall data for all states
historical_rainfall_data = {
    "ANDHRA PRADESH": {"JAN": 30, "FEB": 35, "MAR": 40, "APR": 50, "MAY": 100, "JUN": 150, "JUL": 200, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "ARUNACHAL PRADESH": {"JAN": 40, "FEB": 45, "MAR": 50, "APR": 60, "MAY": 120, "JUN": 180, "JUL": 250, "AUG": 300, "SEP": 280, "OCT": 150, "NOV": 80, "DEC": 50},
    "ASSAM": {"JAN": 50, "FEB": 55, "MAR": 60, "APR": 80, "MAY": 150, "JUN": 220, "JUL": 280, "AUG": 320, "SEP": 300, "OCT": 180, "NOV": 90, "DEC": 60},
    "BIHAR": {"JAN": 20, "FEB": 25, "MAR": 30, "APR": 40, "MAY": 80, "JUN": 120, "JUL": 180, "AUG": 220, "SEP": 200, "OCT": 100, "NOV": 60, "DEC": 30},
    "CHHATTISGARH": {"JAN": 30, "FEB": 35, "MAR": 40, "APR": 50, "MAY": 100, "JUN": 150, "JUL": 200, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "GOA": {"JAN": 60, "FEB": 65, "MAR": 70, "APR": 80, "MAY": 150, "JUN": 220, "JUL": 280, "AUG": 320, "SEP": 300, "OCT": 180, "NOV": 90, "DEC": 60},
    "GUJARAT": {"JAN": 20, "FEB": 25, "MAR": 30, "APR": 40, "MAY": 80, "JUN": 120, "JUL": 180, "AUG": 220, "SEP": 200, "OCT": 100, "NOV": 60, "DEC": 30},
    "HARYANA": {"JAN": 10, "FEB": 15, "MAR": 20, "APR": 30, "MAY": 50, "JUN": 80, "JUL": 120, "AUG": 150, "SEP": 120, "OCT": 80, "NOV": 40, "DEC": 20},
    "HIMACHAL PRADESH": {"JAN": 50, "FEB": 55, "MAR": 60, "APR": 80, "MAY": 120, "JUN": 180, "JUL": 220, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "JHARKHAND": {"JAN": 30, "FEB": 35, "MAR": 40, "APR": 50, "MAY": 100, "JUN": 150, "JUL": 200, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "KARNATAKA": {"JAN": 40, "FEB": 45, "MAR": 50, "APR": 60, "MAY": 120, "JUN": 180, "JUL": 220, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "KERALA": {"JAN": 50, "FEB": 40, "MAR": 60, "APR": 80, "MAY": 120, "JUN": 200, "JUL": 250, "AUG": 300, "SEP": 280, "OCT": 150, "NOV": 80, "DEC": 60},
    "MADHYA PRADESH": {"JAN": 20, "FEB": 25, "MAR": 30, "APR": 40, "MAY": 80, "JUN": 120, "JUL": 180, "AUG": 220, "SEP": 200, "OCT": 100, "NOV": 60, "DEC": 30},
    "MAHARASHTRA": {"JAN": 30, "FEB": 25, "MAR": 40, "APR": 60, "MAY": 90, "JUN": 150, "JUL": 200, "AUG": 230, "SEP": 180, "OCT": 100, "NOV": 60, "DEC": 40},
    "MANIPUR": {"JAN": 60, "FEB": 65, "MAR": 70, "APR": 80, "MAY": 150, "JUN": 220, "JUL": 280, "AUG": 320, "SEP": 300, "OCT": 180, "NOV": 90, "DEC": 60},
    "MEGHALAYA": {"JAN": 80, "FEB": 85, "MAR": 90, "APR": 100, "MAY": 200, "JUN": 250, "JUL": 300, "AUG": 350, "SEP": 320, "OCT": 200, "NOV": 100, "DEC": 80},
    "ODISHA": {"JAN": 40, "FEB": 45, "MAR": 50, "APR": 60, "MAY": 120, "JUN": 180, "JUL": 220, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "PUNJAB": {"JAN": 20, "FEB": 25, "MAR": 30, "APR": 40, "MAY": 80, "JUN": 120, "JUL": 180, "AUG": 220, "SEP": 200, "OCT": 100, "NOV": 60, "DEC": 30},
    "RAJASTHAN": {"JAN": 10, "FEB": 15, "MAR": 20, "APR": 30, "MAY": 50, "JUN": 80, "JUL": 120, "AUG": 150, "SEP": 120, "OCT": 80, "NOV": 40, "DEC": 20},
    "SIKKIM": {"JAN": 50, "FEB": 55, "MAR": 60, "APR": 80, "MAY": 120, "JUN": 180, "JUL": 220, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "TAMIL NADU": {"JAN": 40, "FEB": 35, "MAR": 50, "APR": 70, "MAY": 100, "JUN": 180, "JUL": 220, "AUG": 250, "SEP": 200, "OCT": 120, "NOV": 70, "DEC": 50},
    "TELANGANA": {"JAN": 30, "FEB": 35, "MAR": 40, "APR": 50, "MAY": 100, "JUN": 150, "JUL": 200, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "TRIPURA": {"JAN": 60, "FEB": 65, "MAR": 70, "APR": 80, "MAY": 150, "JUN": 220, "JUL": 280, "AUG": 320, "SEP": 300, "OCT": 180, "NOV": 90, "DEC": 60},
    "UTTAR PRADESH": {"JAN": 20, "FEB": 25, "MAR": 30, "APR": 40, "MAY": 80, "JUN": 120, "JUL": 180, "AUG": 220, "SEP": 200, "OCT": 100, "NOV": 60, "DEC": 30},
    "UTTARAKHAND": {"JAN": 50, "FEB": 55, "MAR": 60, "APR": 80, "MAY": 120, "JUN": 180, "JUL": 220, "AUG": 250, "SEP": 220, "OCT": 120, "NOV": 70, "DEC": 40},
    "WEST BENGAL": {"JAN": 50, "FEB": 55, "MAR": 60, "APR": 80, "MAY": 150, "JUN": 220, "JUL": 280, "AUG": 320, "SEP": 300, "OCT": 180, "NOV": 90, "DEC": 60}
}

# Encode SUBDIVISION
def encode_subdivision(subdivision):
    subdivision_map = {
        "ANDHRA PRADESH": 0,
        "ARUNACHAL PRADESH": 1,
        "ASSAM": 2,
        "BIHAR": 3,
        "CHHATTISGARH": 4,
        "GOA": 5,
        "GUJARAT": 6,
        "HARYANA": 7,
        "HIMACHAL PRADESH": 8,
        "JHARKHAND": 9,
        "KARNATAKA": 10,
        "KERALA": 11,
        "MADHYA PRADESH": 12,
        "MAHARASHTRA": 13,
        "MANIPUR": 14,
        "MEGHALAYA": 15,
        "ODISHA": 16,
        "PUNJAB": 17,
        "RAJASTHAN": 18,
        "SIKKIM": 19,
        "TAMIL NADU": 20,
        "TELANGANA": 21,
        "TRIPURA": 22,
        "UTTAR PRADESH": 23,
        "UTTARAKHAND": 24,
        "WEST BENGAL": 25
    }
    return subdivision_map.get(subdivision.upper(), -1)

# Main function to handle prediction
def predict_rainfall(input_data):
    try:
        # Parse input data
        state = input_data["state"].upper()
        year = int(input_data["year"])
        month = input_data["month"].upper()

        # Fetch historical rainfall data
        historical_rainfall = historical_rainfall_data[state]

        # Encode SUBDIVISION
        subdivision_encoded = encode_subdivision(state)
        if subdivision_encoded == -1:
            return {"error": f"Invalid STATE: {state}"}

        # Prepare feature vector
        months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        features = [subdivision_encoded, year] + [
            historical_rainfall[month] for month in months
        ]

        # Convert to DataFrame
        input_df = pd.DataFrame([features], columns=["SUBDIVISION_ENCODED", "YEAR"] + months)

        # Predict rainfall
        predicted_rainfall = model.predict(input_df)

        # Return the result
        return {
            "state": state,
            "year": year,
            "month": month,
            "predicted_rainfall_mm": round(predicted_rainfall[0], 2)
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    try:
        # Read input data from command-line arguments
        if len(sys.argv) < 2:
            print("Error: No input data provided.")
            sys.exit(1)

        input_data = json.loads(sys.argv[1])
        result = predict_rainfall(input_data)

        # Print the result as JSON (to be captured by Node.js)
        print(json.dumps(result))
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)