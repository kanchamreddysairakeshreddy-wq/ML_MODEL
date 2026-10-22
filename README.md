# 23CSE301 Machine Learning Capstone - Smart Manufacturing

End-to-end ML pipeline on a smart-manufacturing sensor dataset, covering three tracks:
**Regression**, **Classification** and **Clustering** (B.Tech CSE, III year, AY 2026-27).

**Team members:**

1. Sai Rakesh Reddy — Roll No. `CB.SC.U4CSE24517`
2. Akhil Reddy — Roll No. `CB.SC.U4CSE24518`
3. Varanasi Rohit — Roll No. `CB.SC.U4CSE24561`

## Problem statement

Using machine sensor readings, operating conditions and maintenance history:

1. **Regression** - predict machine energy consumption (`machine_energy_kwh`).
2. **Classification** - predict the maintenance risk level (`maintenance_risk`: Low / Medium / High).
3. **Clustering** - discover groups of machines with similar operating profiles (unsupervised; risk labels used only for validation after fitting).

## Dataset

- File: `data/smart_manufacturing_ml_dataset.csv` (~22,000 machine records, 30 columns incl. two targets and an ID).
- Features: numerical sensor/operational variables (vibration, temperatures, pressure, current, RPM, load, downtime, ...) and categorical descriptors (plant, line, machine type, shift, material grade, lubricant, supplier tier, inspection status).
- Missing values and duplicates are handled in the notebooks (Section B).

## Repository structure

```
/
README.md              Project overview, results, setup instructions
requirements.txt       All Python dependencies with versions
data/                  Raw dataset CSV
notebooks/
  regression.ipynb     Regression track (10 algorithms, GridSearchCV, diagnostics)
  classification.ipynb Classification track (10 algorithms, Part A + B, tuning)
  clustering.ipynb     Clustering track (K-Means, Agglomerative, evaluation)
models/                Saved model files (.pkl via joblib)
  final_classifier.pkl
  final_regressor.pkl
  app_metadata.json
results/               CSV result tables (written by the notebooks)
app/                   GUI / deployment code (Vercel web app)
  main.py              FastAPI backend
  predictor.py         Prediction logic
  frontend/            React + Vite frontend
```

## Methods

| Track               | Algorithms                                                                                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Regression (10)     | Linear, Ridge, Lasso, ElasticNet, Polynomial, Decision Tree, Random Forest, Gradient Boosting, SVR, KNN                                                           |
| Classification (10) | Part A: Logistic Regression, KNN, Gaussian Naive Bayes, Decision Tree, SVC. Part B: Random Forest, AdaBoost, Gradient Boosting, Bagging (Decision Tree base), MLP |
| Clustering (2)      | K-Means (Elbow curve), Agglomerative Hierarchical (Dendrograms, 4 linkages compared)                                                                              |

Evaluation: R2/RMSE/MAE + 5-fold CV (regression); Accuracy/Precision/Recall/weighted F1/ROC-AUC (OvR)/confusion matrix + 5-fold CV for the top two models (classification); Silhouette, Davies-Bouldin and Calinski-Harabasz, PCA and t-SNE plots (clustering).

## Results summary

| Track          | Best model                           | Key metrics                                                          |
| -------------- | ------------------------------------ | -------------------------------------------------------------------- |
| Regression     | Gradient Boosting Regressor (tuned)  | R2 = 0.833, RMSE = 4.553, MAE = 3.646                               |
| Classification | Gradient Boosting Classifier (tuned) | Accuracy = 67.73%, weighted F1 = 0.675, ROC-AUC = 0.824             |
| Clustering     | K-Means (k=5)                        | Silhouette = 0.056, Davies-Bouldin = 3.015, Calinski-Harabasz = 203.4 |

## Web app (bonus: GUI + public deployment)

A React + Vite frontend (`app/frontend/`) with a FastAPI backend (`app/main.py`) lets a user enter machine readings and see the **predicted maintenance risk** (with class probabilities) and the **predicted energy consumption (kWh)**. It loads the models exported by the notebook; nothing is retrained.

**Live app:** https://casestudymachinelearning.vercel.app/

### Run the app locally

```bash
pip install -r requirements.txt
# FastAPI backend (terminal 1)
cd app
uvicorn main:app --reload

# React frontend (terminal 2, from the repository root)
cd app/frontend
npm install
npm run dev
```

## Environment setup & how to run

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
jupyter notebook notebooks/
```

1. The dataset is located at `data/smart_manufacturing_ml_dataset.csv`. The notebooks load it from that path.
2. Run **Kernel > Restart & Run All** on each notebook. A full run takes roughly 10-30 minutes depending on the machine (grid searches dominate).
3. Outputs: tables in `results/`; model files in `models/` (`final_classifier.pkl`, `final_regressor.pkl`, `app_metadata.json`).

All random operations use `random_state=42`. Scalers/encoders are fitted on the training split only.

## AI assistance declaration

Generative AI assistance was used for limited code scaffolding and editing support in the Review 2 sections, including Classification Part B, final-model-selection helpers, the clustering pipeline and web-app integration. The team independently selected the features, validated the results, interpreted the metrics, and made the domain conclusions. All team members are responsible for understanding and explaining the submitted code and analysis.

## References

- scikit-learn and SciPy documentation (`GridSearchCV`, `roc_curve`, `KMeans`, `AgglomerativeClustering`, `scipy.cluster.hierarchy.dendrogram`).
