
---

## Backend Architecture

- **Flask** app with modular route files
- REST-style API design
- SQLite for persistence
- Clear separation by domain:
  - users
  - songs
  - events
  - questionnaires

All routes are registered through `main.py`.

The backend is designed to be:
- Easy to extend
- Readable for documentation review
- Suitable for containerization

---

## Frontend Architecture

- **React** (standard `src/` structure)
- Fetch-based API communication
- Page-based navigation
- User state tied to backend sessions / tokens

The frontend focuses on:
- Clean UX for code entry
- Simple music unlock flow
- Event visibility and RSVP interactions

---

## Local Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 18+
- Docker (optional but supported)

---

### Backend Setup (Local)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Initialize Database

`python init_db.py`  
Run backend  
`python main.py`  
Backend runs at:  
`http://127.0.0.1:5000`  







