import sqlite3

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    # Users table 
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')

    # Songs table
    c.execute('''
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            length TEXT NOT NULL,
            plays INTEGER NOT NULL,
            unlocked TEXT NOT NULL,
            genre TEXT NOT NULL,
            user_id INTEGER,
            image TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    ''')


    # Unlocked songs
    c.execute('''
        CREATE TABLE IF NOT EXISTS unlocked_songs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            song_id INTEGER,
            UNIQUE(user_id, song_id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(song_id) REFERENCES songs(id)
        )
    ''')

    # Events
    c.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            date TEXT NOT NULL
        )
    ''')

    # RSVPed events
    c.execute('''
        CREATE TABLE IF NOT EXISTS rsvped_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            event_id INTEGER,
            UNIQUE(user_id, event_id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(event_id) REFERENCES events(id)
        )
    ''')

    # Extra info
    c.execute('''
        CREATE TABLE IF NOT EXISTS extra (
            id INTEGER PRIMARY KEY,
            info TEXT NOT NULL
        )
    ''')
    # Questionnaire responses
    c.execute('''
    CREATE TABLE IF NOT EXISTS questionnaire_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    ''')   



    # Sample users 
    users = [
        ('alice', 'alice@example.com', 'password123'),
        ('bob', 'bob@example.com', 'password123'),
        ('carol', 'carol@example.com', 'password123'),
        ('dave', 'dave@example.com', 'password123'),
        ('eve', 'eve@example.com', 'password123'),
        ('frank', 'frank@example.com', 'password123'),
        ('grace', 'grace@example.com', 'password123'),
        ('heidi', 'heidi@example.com', 'password123')
    ]
    c.executemany("INSERT OR IGNORE INTO users (username, email, password) VALUES (?, ?, ?)", users)

    # Sample songs
    songs = [
        ('Golden Skies', 'slaphead', '3:42', 124, 'y', 'Indie Rock', 1, '/public/max.jpg'),
        ('Moonlit Eyes', 'slaphead', '4:01', 87, 'n', 'Dream Pop', 2, '/public/lily.jpg'),
        ('Shape of You', 'Ed Sheeran', '3:53', 540, 'n', 'Pop', 3, '/public/bella.jpg'),
        ('Someone Like You', 'Adele', '4:45', 623, 'n', 'Pop Soul', 4, '/public/shadow.jpg'),
        ('Levitating', 'Dua Lipa', '3:23', 430, 'y', 'Disco Pop', 5, '/public/oreo.jpg'),
        ('Concrete Dreams', 'slaphead', '2:59', 212, 'y', 'Alt Rock', 6, '/placeholder.jpg'),
        ('Blinding Lights', 'The Weeknd', '3:22', 998, 'n', 'Synthwave Pop', 7, '/placeholder.jpg'),
        ('Bad Habit', 'Steve Lacy', '3:50', 315, 'n', 'R&B / Indie', 8, '/placeholder.jpg'),
        ('HUMBLE.', 'Kendrick Lamar', '2:57', 811, 'n', 'Hip Hop', 1, '/placeholder.jpg'),
        ('Viva La Vida', 'Coldplay', '4:04', 712, 'n', 'Alternative Rock', 2, '/placeholder.jpg'),
        ('Bohemian Rhapsody', 'Queen', '5:55', 1500, 'n', 'Classic Rock', 3, '/placeholder.jpg'),
        ('Watermelon Sugar', 'Harry Styles', '2:54', 560, 'n', 'Pop Rock', 4, '/placeholder.jpg'),
        ('Thunderstruck', 'AC/DC', '4:52', 834, 'n', 'Hard Rock', 5, '/placeholder.jpg'),
        ('Velvet Sunrise', 'slaphead', '3:36', 143, 'y', 'Indie Folk', 6, '/placeholder.jpg'),
        ("Don't Stop Believin'", 'Journey', '4:10', 1080, 'n', 'Arena Rock', 7, '/placeholder.jpg'),
        ('Hotel California', 'Eagles', '6:30', 1399, 'y', 'Classic Rock', 8, '/placeholder.jpg'),
        ('Happy', 'Pharrell Williams', '3:53', 720, 'n', 'Funk Pop', 1, '/placeholder.jpg'),
        ('Halo', 'Beyoncé', '4:21', 653, 'n', 'Pop R&B', 2, '/placeholder.jpg'),
        ('Uptown Funk', 'Bruno Mars', '4:29', 820, 'n', 'Funk Pop', 3, '/placeholder.jpg'),
        ('Fix You', 'Coldplay', '4:55', 345, 'n', 'Alternative Rock', 4, '/placeholder.jpg'),
        ('Party in the USA', 'Miley Cyrus', '3:22', 590, 'n', 'Pop', 5, '/placeholder.jpg'),
        ('Neon Shadows', 'slaphead', '3:17', 205, 'n', 'Synth Rock', 6, '/placeholder.jpg'),
        ('Imagine', 'John Lennon', '3:07', 945, 'y', 'Soft Rock', 7, '/placeholder.jpg'),
        ('Smells Like Teen Spirit', 'Nirvana', '5:01', 1320, 'y', 'Grunge Rock', 8, '/placeholder.jpg')
  ]


    c.executemany(
        "INSERT OR IGNORE INTO songs (title, artist, length, plays, unlocked, genre, user_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
        songs
    )

    # Sample events
    events = [
        ("Song-a-thon Weekend", "2025-09-04"),
        ("Singing Yoga", "2025-09-10"),
        ("Summer Artist Café Meetup", "2025-09-15")
    ]
    c.executemany("INSERT OR IGNORE INTO events (id, name, date) VALUES (?, ?, ?)", [(i+1, e[0], e[1]) for i, e in enumerate(events)])

    # Extra info
    c.execute("INSERT OR IGNORE INTO extra (id, info) VALUES (?, ?)", (1, "Welcome to the extended API!"))

    conn.commit()
    conn.close()
    print("Database initialized with sample users, songs, and events.")

if __name__ == "__main__":
    init_db()

