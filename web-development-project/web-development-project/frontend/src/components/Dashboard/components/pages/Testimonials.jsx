import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserReview = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review || rating === 0) {
      toast.error('Please fill out the review description and rating.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }
    formData.append('rating', rating);
    formData.append('review', review);

    const token = localStorage.getItem('jwtToken');

    try {
      const response = await fetch('http://localhost:8080/api/testimonial', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Review submitted successfully!');
        // Reset form data
        setName('');
        
        setImage(null);
        setRating(0);
        setReview('');
        window.location.reload(); 
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the review.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4" style={{height: "80vh"}}>
      <h2 className="text-2xl font-bold mb-4">Submit a Testimonial</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
            Name:
          </label>
          <input
            type="text"
            id="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userImage">
            Upload Image (Optional):
          </label>
          <input
            type="file"
            id="userImage"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userRating">
            Rating (1-5):
          </label>
          <select
            id="userRating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
          >
            <option value={0}>Select a rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userReview">
            Review Description (Required):
          </label>
          <textarea
            id="userReview"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="5"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
            placeholder="Enter your review description..."
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {uploading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserReview;
