import React, { useState } from 'react';
import axios from 'axios';

const AddBlogPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/blogs', {
        title,
        excerpt,
        date,
        category,
        image,
      });
      // Reset form fields
      setTitle('');
      setExcerpt('');
      setDate('');
      setCategory('');
      setImage('');
      setError(null);
    } catch (err) {
      setError('Failed to add blog post');
    }
  };

  return (
    <div>
      <h1>Add New Blog Post</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Excerpt:</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <button type="submit">Add Blog Post</button>
      </form>
    </div>
  );
};

export default AddBlogPost;
