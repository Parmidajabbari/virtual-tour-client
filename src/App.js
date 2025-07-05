import React, { useState } from "react";
import axios from "axios";

function App() {
  const [files, setFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tourLink, setTourLink] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const CLIENT_BASE = process.env.REACT_APP_CLIENT_BASE_URL;

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    setUploading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/upload`, formData);
      const tourId = res.data.tourId;
      setTourLink(`${CLIENT_BASE}/tour/${tourId}`);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Try again.");
    }
    setUploading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>🌀 360° Virtual Tour Creator</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      <br /><br />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Create Tour"}
      </button>

      {tourLink && (
        <div style={{ marginTop: 30 }}>
          <h3>Your tour link:</h3>
          <a href={tourLink} target="_blank" rel="noreferrer">
            {tourLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
