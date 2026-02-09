
---

## Backend Architecture

- ***Flask*** app with modular route files
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

```
python init_db.py  
python main.py  #Run backend  
```    
Backend runs at: `http://127.0.0.1:5000`  

##Frontend
```bash
cd frontend
npm install
npm start
```
Runs at: `http://localhost:3000`

---

## Current Features 

- Current Features
- User account creation & login
- Code-based music unlocking
- Persistent unlocked content per user
- Event listings & RSVP support
- Questionnaire submission & storage
- Modular API structure for easy extension
- Docker-ready backend and frontend

---

## Work In Progress Areas

- Image handling for songs & events is being actively fixed
  - Upload pipeline exists but still being refined
  - Display consistency across browsers in progress
- UI polish still ongoing (spacing, mobile layout)
- Error handling is functional but not fully surfaced to the UI
- Authentication flow still being tightened for edge cases

## Planned Future Features

- Admin dashboard for managing:
  - songs
  - events
  - unlock codes
- Time-limited or expiring unlocks
- Analytics on unlock usage
- Enhanced media previews
- Mobile-first layout improvements
- React version parity with non-React static prototype
- Deployment to cloud hosting (Docker-based)

## Author
Mikael Daluz  
Computer Science @ UConn  
Full-stack / Data-oriented developer  


