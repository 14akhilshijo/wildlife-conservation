require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan'); // For logging requests in development

// Custom modules
const connectDB = require('./config/db'); // ✅ Already implemented in a separate file
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const wildlifeRoutes = require('./routes/wildlifeRoutes');
const rescueRoutes = require('./routes/rescueRoutes');
const alertRoutes = require('./routes/alertRoutes');
const donationRoutes = require('./routes/donationRoutes');
const { errorHandler } = require('./middleware/errorHandler'); // Import error handler once

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: '*', // Set to your frontend domain in production
    methods: ['GET', 'POST'],
  },
});

// Real-time socket connection
io.on('connection', (socket) => {
  console.log(`⚡ Client connected: ${socket.id}`);

  socket.on('new-wildlife-sighting', (data) => {
    console.log('New Wildlife Sighting:', data);
    io.emit('wildlife-sighting-updated', data);
  });

  socket.on('new-rescue-case', (data) => {
    console.log('New Rescue Case:', data);
    io.emit('rescue-case-updated', data);
  });

  socket.on('new-donation', (data) => {
    console.log('New Donation:', data);
    io.emit('donation-updated', data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

app.set('io', io);

// 🔌 Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Setup morgan for logging

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wildlife', wildlifeRoutes);
app.use('/api/rescue', rescueRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/donations', donationRoutes);


// Global Error Handler
app.use(errorHandler); // Apply error handler middleware here

// Server Listen
const PORT = process.env.PORT || 4321;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
