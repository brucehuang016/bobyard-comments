# Bobyard Comments

Full-stack comments app using Django and a JavaScript frontend.

Requirements:
- Python 3.11
- Node.js 18+
- npm

To run locally:

git clone https://github.com/brucehuang016/bobyard-comments.git
cd bobyard-comments

python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend
npm install
npm run dev

Backend runs at http://127.0.0.1:8000/
Frontend runs at http://localhost:5173/