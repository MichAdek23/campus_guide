const fileRoutes = require('./routes/fileRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const { authMiddleware } = require('./middleware/authMiddleware');
//const facultyRoutes = require('./routes/facultyRoutes');
//const departmentRoutes = require('./routes/departmentRoutes');
const accessCodeRoutes = require('./routes/accessCodeRoutes');


const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json()); // Parse JSON bodies


// MongoDB connection and server startup
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    // Server starts after successful DB connection
    const port = process.env.PORT || 3007;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit if connection fails
  });

// Routes for faculties and departments
//app.use('/api/faculties', facultyRoutes);
//app.use('/api/departments', departmentRoutes);

// Routes for access code management
app.use('/api/access-code', accessCodeRoutes);

// Routes for file and submission management
app.use('/api/files', authMiddleware, fileRoutes);
app.use('/api/submissions/submit', submissionRoutes);

// Serve static files from the React app (frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API running - React app running on separate dev server');
  });
}

// Default Route (Home)
app.get('/', (req, res) => {
  res.send('Welcome to the Campus Guide API');
});

// 404 error handling for undefined routes
app.use((req, res, next) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', error: err.message });
  }
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
