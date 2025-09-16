import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import "./Records.css";

export default function Records({ user, onLogout }) {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [selectedImage, setSelectedImage] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/records", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) setRecords(res.data);
      else if (Array.isArray(res.data.records)) setRecords(res.data.records);
      else setRecords([]);
    } catch (err) {
      console.error(err);
      setRecords([]);
    }
  };

  // Open edit modal
  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({ title: record.title, description: record.description });
    setSelectedImage(null);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingRecord(null);
    setFormData({ title: "", description: "" });
    setSelectedImage(null);
  };

  // Update record with confirmation and file upload
  const handleUpdate = async () => {
    const confirmSave = window.confirm("Do you want to save the changes?");
    if (!confirmSave) return;

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      if (selectedImage) form.append("image", selectedImage);

      const res = await axios.put(
        `http://localhost:5000/api/records/${editingRecord._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setRecords(records.map((r) => (r._id === res.data._id ? res.data : r)));
      handleCancel();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete record with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/records/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(records.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Filter records by search
  const filteredRecords = records.filter((record) =>
    record.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="records-page">
        <div className="search-bar">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records..."
          />
        </div>

        <div className="records-gallery">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div className="record-card" key={record._id}>
                {record.imageUrl && (
                  <img
                    src={`http://localhost:5000${record.imageUrl}`}
                    alt={record.title}
                    style={{ cursor: "pointer" }}
                    onClick={() => setViewingRecord(record)}
                  />
                )}
                <h3>{record.title}</h3>
                <p>{record.description}</p>
                <div className="card-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No records found</p>
          )}
        </div>

        {/* Edit Modal */}
        {editingRecord && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Record</h2>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Title"
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              {/* Preview selected image */}
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="preview-image"
                />
              )}
              <div className="modal-buttons">
                <button className="save-btn" onClick={handleUpdate}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Record Detail Modal */}
        {viewingRecord && (
          <div
            className="record-detail-overlay"
            onClick={() => setViewingRecord(null)}
          >
            <div
              className="record-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {viewingRecord.imageUrl && (
                <img
                  src={`https://medtrack-8oj5.onrender.com${viewingRecord.imageUrl}`}
                  alt={viewingRecord.title}
                  className="detail-image"
                />
              )}
              <h2>{viewingRecord.title}</h2>
              <p>{viewingRecord.description}</p>
              <button
                className="close-btn"
                onClick={() => setViewingRecord(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
