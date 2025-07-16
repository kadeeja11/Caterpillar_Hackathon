import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
from sklearn.linear_model import LinearRegression

# --- Initialize Firebase Admin SDK ---
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# --- Dummy Dataset ---
data = {
    "feature1": [1, 2, 3, 4, 5],
    "feature2": [5, 4, 3, 2, 1],
    "target": [10, 9, 7, 5, 3]
}
df = pd.DataFrame(data)

# --- Train a Simple Model ---
X = df[["feature1", "feature2"]]
y = df["target"]
model = LinearRegression()
model.fit(X, y)

# --- Make Predictions on New Data ---
new_data = pd.DataFrame({
    "feature1": [6, 7],
    "feature2": [0, -1]
})
predictions = model.predict(new_data)

# --- Upload Predictions to Firestore ---
doc_ref = db.collection("predictions").document("dummy_model")
doc_ref.set({
    "predictions": predictions.tolist(),
    "input_data": new_data.to_dict(orient="records")
})

print("✅ Predictions uploaded to Firestore!")
