import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image, ImageOps
import os
import sys

# Suppress TensorFlow warnings & logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
tf.get_logger().setLevel('ERROR')

base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "src", "ModelsTrained", "converted_keras", "keras_model.h5")
labels_path = os.path.join(base_dir, "src", "ModelsTrained", "converted_keras", "labels.txt")

# Load model and labels
try:
    model = load_model(model_path, compile=False)
    class_names = open(labels_path, "r").readlines()
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    sys.exit(1)

def predict_image(image_path):
    try:
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        image = Image.open(image_path).convert("RGB")
        image = ImageOps.fit(image, (224, 224), Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image = (image_array.astype(np.float32) / 127.5) - 1
        data[0] = normalized_image

        # Suppress TF progress bars during inference
        tf.get_logger().setLevel('ERROR')

        prediction = model.predict(data, verbose=0)  # Suppress verbose output
        index = np.argmax(prediction)
        class_name = class_names[index].strip()
        confidence = float(prediction[0][index])

        return {"class_name": class_name, "confidence": confidence}
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

if __name__ == "__main__":
    try:
        image_path = sys.argv[1]
        result = predict_image(image_path)
        print(json.dumps(result))  # Ensure ONLY JSON is printed
    except Exception as e:
        print(json.dumps({"error": f"Script execution failed: {str(e)}"}))
