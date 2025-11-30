
# 🚀 Indian Accent Detection using HuBERT

This project identifies *six Indian regional accents* — Gujarati, Hindi, Kannada, Malayalam, Tamil, and Telugu — from a speech audio file using *HuBERT (Hidden-Unit BERT)* embeddings and an *MLP classifier*.

A *Flask web application* is included, which takes an audio file as input (WAV/MP3), predicts the accent, and recommends *Breakfast, Lunch, and Dinner* dishes from the corresponding region.

---

# 📦 Features

* Accent detection using HuBERT Layer-6 embeddings
* Supports *WAV* and *MP3* audio
* Layer-wise experiments included
* Child vs adult generalization tested
* Word vs sentence-level speech testing
* Web app with regional food recommendations
* Clean UI with dark theme
* High accuracy (99.82%)

---

# 📥 1. Clone the Repository

bash
git clone https://github.com/Ashwith30/accent-detection.git
cd accent-detection


---

# 🛠 2. Create Virtual Environment (Optional but recommended)

bash
python -m venv venv
venv\Scripts\activate  # Windows


---

# 📚 3. Install Dependencies

bash
pip install -r requirements.txt


This installs:

* Flask
* HuggingFace Transformers
* Torch
* Librosa
* Scikit-Learn
* Soundfile
* Chart.js (via CDN)
* All necessary audio + ML libraries

---

# 🎤 4. Run the Application

bash
python app.py


Open your browser and visit:


http://127.0.0.1:5000/


---

# 🎧 5. Using the Web App

1. Click *Choose File*
2. Upload a *WAV/MP3* speech file (3–5 seconds recommended)
3. Click *Upload & Analyze*
4. View the outputs:

### ✔ Predicted Accent

Example:


Predicted Accent: Telugu


### ✔ Confidence Chart

You will see probabilities for all six accents.

### ✔ Recommended Foods

Breakfast, Lunch, and Dinner suggestions based on the detected region.

Example:


Breakfast: Pesarattu, Upma
Lunch: Pulihora, Biryani
Dinner: Ragi Sangati with Dal


---

# 📂 6. Project Structure


accent-detection/
│── app.py                  # Flask Web App
│── model/                  # Saved classifier & scaler
│── scripts/                # Training / testing scripts
│── static/                 # CSS files
│── templates/              # HTML templates
│── uploads/                # User audio uploads
│── requirements.txt        # Python dependencies
│── README.md               # Project documentation


---

# 🧪 7. Model Experiments (Already Performed)

### ✔ HuBERT Layer-wise Results

Layer 4 = Best accuracy (99.94%)
Layer 6 = Chosen for final model (99.82%)

### ✔ Word vs Sentence Testing

* Word-level → Less accurate
* Sentence-level → Highly accurate

### ✔ Adult vs Child Generalization

* Adult → Very high accuracy
* Child → Slight drop, still reasonable

---

# 🧠 8. Technologies Used

* *Python, Flask*
* *HuggingFace Transformers (HuBERT)*
* *Torch*
* *Librosa*
* *scikit-learn*
* *NumPy, Pandas*
* *HTML, CSS, JavaScript (Chart.js)*

---

# 🎯 9. Future Enhancements

* Support more Indian accents
* Noise-robust training
* Real-time microphone input
* Deploy on cloud (Render/Heroku)
* Improve UI and responsiveness

---

# ❤ Credits

Dataset: *IndicAccentDB*
Model: *facebook/hubert-base-ls960*

---
