const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Set up storage for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'MeetingScheduler',
});

db.connect((err) => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to the MySQL database.');
});

// Register User
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required: name, email, password, role' });
  }

  try {
    // Check if the email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email is already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error: ' + err.message });
          }
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login User
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }

    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      role: results[0].role, // Include the role in the response
    });
  });
});

// Host Routes
app.post('/host/timeslots', (req, res) => {
  const { start_time, end_time, timezone } = req.body;

  if (!start_time || !end_time || !timezone) {
    return res.status(400).json({ message: 'Missing required fields: start_time, end_time, timezone' });
  }

  db.query(
    'INSERT INTO time_slots (start_time, end_time, timezone) VALUES (?, ?, ?)',
    [start_time, end_time, timezone],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error creating time slot: ' + err.message });
      }
      res.status(201).json({ message: 'Time slot created successfully' });
    }
  );
});
// Update Slot
app.put('/host/timeslots/:id', (req, res) => {
    const { id } = req.params;
    const { start_time, end_time, timezone } = req.body;
  
    db.query(
      'UPDATE time_slots SET start_time = ?, end_time = ?, timezone = ? WHERE id = ?',
      [start_time, end_time, timezone, id],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error updating time slot: ' + err.message });
        }
        res.json({ message: 'Time slot updated successfully' });
      }
    );
  });
  
  // Delete Slot
  app.delete('/host/timeslots/:id', (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM time_slots WHERE id = ?', [id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error deleting time slot: ' + err.message });
      }
      res.json({ message: 'Time slot deleted successfully' });
    });
  });
  
// Guest Routes
app.get('/guest/timeslots', (req, res) => {
  db.query('SELECT * FROM time_slots WHERE booked = 0', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching available time slots: ' + err.message });
    }
    res.json(results);
  });
});

app.post('/guest/book/:id', (req, res) => {
  const timeSlotId = req.params.id;

  db.query('UPDATE time_slots SET booked = 1 WHERE id = ? AND booked = 0', [timeSlotId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error booking time slot: ' + err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(400).json({ message: 'Time slot already booked or not available' });
    }

    db.query('INSERT INTO bookings (time_slot_id) VALUES (?)', [timeSlotId], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error saving booking: ' + err.message });
      }
      res.json({ message: 'Time slot booked successfully' });
    });
  });
});

// Upload Profile Picture
app.post('/api/users/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
