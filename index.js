const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user-routes')
const publicRoutes = require('./routes/public/public')
const adminRoutes = require('./routes/admin/admin')

require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/users', userRoutes);
app.use(publicRoutes)
app.use(adminRoutes)

app.get('/', (req, res) => {
  res.send('<h1>Halo, Selamat Datang!</h1>');
});

app.listen(3030, () => {
  console.log('Server berjalan pada port 3030');
});
