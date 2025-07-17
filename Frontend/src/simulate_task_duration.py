import json
import pandas as pd

# Step 1: Load your JSON file
with open("final_json_fine_for_python_code.json", "r") as f:
    data = json.load(f)

# Step 2: Convert to DataFrame
df = pd.DataFrame(data["machineData"])

# Step 3: Task Duration Calculation
terrain_multiplier = {
    "flat": 1.0,
    "plain": 1.0,
    "rocky": 1.4,
    "muddy": 1.6,
    "sandy": 1.3,
    "hilly": 1.5,
    "mountainous": 1.7
}

# Make sure fields exist and are safe to convert
df["predictedTaskDurationHrs"] = (
    df["engineHours"].astype(float) * 0.8 +
    df["loadCycles"].astype(float) * 0.03 +
    df["terrain"].map(terrain_multiplier).fillna(1.0)
).round(2)

# Step 4: Convert back to JSON
data["machineData"] = df.to_dict(orient="records")

with open("random_machine_dataset_with_taskDuration.json", "w") as f:
    json.dump(data, f, indent=2)

print("✅ taskDurationHrs added successfully.")