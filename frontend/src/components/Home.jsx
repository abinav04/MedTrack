import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";

export default function Home({ user,onLogout,token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.post(
        "https://medtrack-8oj5.onrender.com/api/records",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Record added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading record");
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="home-container">
        <h2>Add Medical Record</h2>
        <form className="record-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

