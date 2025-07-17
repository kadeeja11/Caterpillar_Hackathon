import os
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# Load JSON data
print("📥 Loading data...")
with open("final_json_fine_for_python_code.json", "r") as f:
    data = json.load(f)

df = pd.DataFrame(data["machineData"])

# Confirm data is loaded
print("✅ Data loaded. Number of records:", len(df))

# Check taskDurationHrs existence
if "actualTaskDurationHrs" not in df.columns:
    raise ValueError("❌ 'actualTaskDurationHrs' column missing in the data!")

# Check for missing values
if df["actualTaskDurationHrs"].isna().sum() > 0:
    raise ValueError("❌ Missing values found in 'actualTaskDurationHrs' column!")

# Define features and target (must match actual dataset keys)
features = [
    "engineHours", "fuelUsed(L)", "loadCycles", "idlingTime(min)",
    "weightLoad(kg)", "vehicleRunningTime(h)", "speed",
    "tilt", "gpsLandTilt(°)", "ambientTemperature(°C)",
    "altitude(m)", "terrain", "weather", "machine_type"
]
target = "actualTaskDurationHrs"

# Prepare features and target
X = df[features]
y = df[target]

# Split
print("🔀 Splitting dataset...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Preprocessing
categorical_cols = ["terrain", "weather", "machine_type"]
numeric_cols = [col for col in features if col not in categorical_cols]

preprocessor = ColumnTransformer([
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
], remainder="passthrough")

# Pipeline
model = Pipeline([
    ("preprocess", preprocessor),
    ("regressor", RandomForestRegressor(n_estimators=100, random_state=42))
])

# Train the model
print("🚀 Training model...")
try:
    model.fit(X_train, y_train)
    print("✅ Model trained successfully.")

    # Ensure models/ directory exists
    os.makedirs("models", exist_ok=True)

    # Save model
    joblib.dump(model, "models/task_duration_model.pkl")
    print("✅ Model saved to models/task_duration_model.pkl")

    # Evaluate
    y_pred = model.predict(X_test)
    print("📈 Evaluation Results:")
    print("MAE:", mean_absolute_error(y_test, y_pred))
    print("R² Score:", r2_score(y_test, y_pred))

except Exception as e:
    print("❌ Error during training or saving:", str(e))