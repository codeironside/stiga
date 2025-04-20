const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');
const galleryItemRoutes = require('./routes/galleryItemRoutes');

const mongoURI = process.env.MONGO_URI || "mongodb+srv://fury25423:qRtnCG5xBXljm1YE@cluster0.wcvl7fd.mongodb.net/";

// MongoDB Connection
mongoose.connect(mongoURI, {
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogPostRoutes);
app.use('/api/gallery', galleryItemRoutes);
const imageUploadRoutes = require('./routes/imageUploadRoutes');
app.use(imageUploadRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});