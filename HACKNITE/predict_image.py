import json
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image, ImageOps

# Suppress TensorFlow logs
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
tf.get_logger().setLevel('ERROR')

# Load model and labels
model = load_model("C:\\Users\\rushi\\Documents\\GitHub\\New folder\\ACM\\HACKNITE\\src\\ModelsTrained\\converted_keras\\keras_model.h5", compile=False)
class_names = open("C:\\Users\\rushi\\Documents\\GitHub\\New folder\\ACM\\HACKNITE\\src\\ModelsTrained\\converted_keras\\labels.txt", "r").readlines()

def predict_image(image_path):
    try:
        # Prepare image
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        image = Image.open(image_path).convert("RGB")
        image = ImageOps.fit(image, (224, 224), Image.Resampling.LANCZOS)
        image_array = np.asarray(image)
        normalized_image = (image_array.astype(np.float32) / 127.5) - 1
        data[0] = normalized_image

        # Predict
        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index].strip()
        confidence = float(prediction[0][index])

        return {"class_name": class_name, "confidence": confidence}
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

if __name__ == "__main__":
    # If running as a standalone script, read the image path from command line
    import sys
    try:
        image_path = json.loads(sys.argv[1])
        result = predict_image(image_path)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": f"Script execution failed: {str(e)}"}))