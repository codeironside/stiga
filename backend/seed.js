require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const BlogPost = require('./models/BlogPost');
const GalleryItem = require('./models/GalleryItem');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/your-database-name';

const seedDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Seed Admins
    const hashedPassword1 = await bcrypt.hash('admin1password', 10);
    const hashedPassword2 = await bcrypt.hash('admin2password', 10);
    const admin1 = new User({
      username: 'admin1',
      password: hashedPassword1,
      isAdmin: true,
    });
    const admin2 = new User({
      username: 'admin2',
      password: hashedPassword2,
      isAdmin: true,
    });
    await admin1.save();
    await admin2.save();
    console.log('Admins seeded');

    // Seed Blog Posts
    const blogPosts = [
      {
        title: 'First Blog Post',
        content: 'This is the content of the first blog post.',
        author: 'admin1',
        date: new Date(),
        imageUrl: 'https://images.unsplash.com/photo-1682687221187-9c0729965abb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
      },
      {
        title: 'Second Blog Post',
        content: 'This is the content of the second blog post.',
        author: 'admin2',
        date: new Date(),
      },
        imageUrl: 'https://images.unsplash.com/photo-1705783658696-67ff2f59b5f2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
      {
        title: 'Third Blog Post',
        content: 'This is the content of the third blog post.',
        author: 'admin1',
        date: new Date(),
      },
        imageUrl: 'https://images.unsplash.com/photo-1705782738708-64731a03d46f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
      {
        title: 'Fourth Blog Post',
        content: 'This is the content of the fourth blog post.',
        author: 'admin2',
        date: new Date(),
      },
        imageUrl: 'https://images.unsplash.com/photo-1705782739057-c30490519703?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
      {
        title: 'Fifth Blog Post',
        content: 'This is the content of the fifth blog post.',
        author: 'admin1',
        date: new Date(),
      },
        imageUrl: 'https://images.unsplash.com/photo-1705783657578-e285571027e3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
    ];
    await BlogPost.insertMany(blogPosts);
    console.log('Blog posts seeded');

    // Seed Gallery Items
    const galleryItems = [
      {
        imageUrl: 'https://images.unsplash.com/photo-1682687221187-9c0729965abb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 1',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705783658696-67ff2f59b5f2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 2',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705782738708-64731a03d46f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 3',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705782739057-c30490519703?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 4',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705783657578-e285571027e3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 5',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705783657722-a3f2a692f20e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 6',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705783657661-4292830c1162?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 7',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705783658824-090924a1e3a2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 8',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705782738833-426a9f44f02e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 9',
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1705783657661-40291a9b1f4b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Gallery Item 10',
      },
    ];
    await GalleryItem.insertMany(galleryItems);
    console.log('Gallery items seeded');

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDB();