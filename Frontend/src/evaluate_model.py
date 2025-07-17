import pandas as pd
import joblib
import json

# Load JSON data
with open("final_json_fine_for_python_code.json", "r") as f:
    data = json.load(f)

df = pd.DataFrame(data["machineData"])

# Match features used in training
features = [
    "engineHours", "fuelUsed(L)", "loadCycles", "idlingTime(min)",
    "weightLoad(kg)", "vehicleRunningTime(h)", "speed",
    "tilt", "gpsLandTilt(°)", "ambientTemperature(°C)",
    "altitude(m)", "terrain", "weather", "machine_type"
]

X = df[features]
y = df["actualTaskDurationHrs"]

# Load trained model
model = joblib.load("models/task_duration_model.pkl")

# Predict
y_pred = model.predict(X)

# Show results
results = X.copy()
results["Actual"] = y
results["Predicted"] = y_pred

print("✅ Predictions complete.")
print(results.head(10))

# Add predicted durations back to original JSON structure
for i, entry in enumerate(data["machineData"]):
    entry["predictedTaskDurationHrs"] = round(float(y_pred[i]), 2)

# Save updated JSON with predictions
with open("predicted_task_duration_output.json", "w") as f_out:
    json.dump(data, f_out, indent=2)

print("📁 JSON file with predicted durations saved as 'predicted_task_duration_output.json'")