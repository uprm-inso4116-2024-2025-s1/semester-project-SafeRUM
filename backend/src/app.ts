import express from 'express';
import sequelize from '../config/database';
import authRoutes from '../routes/authRoutes';
import cors from 'cors';


const app = express();

app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Authentication routes
app.use('/api', authRoutes);

// Connect to the database and start the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Error connecting to the database: ', err);
  });
