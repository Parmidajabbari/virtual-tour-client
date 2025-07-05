import React, { useState } from "react";
import axios from "axios";

function App() {
  const [files, setFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tourLink, setTourLink] = useState(null);

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    setUploading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      setTourLink(`http://localhost:3000/tour/${res.data.tourId}`);
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>360° Virtual Tour Creator</h1>
      <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Create Tour"}
      </button>
      {tourLink && (
        <div>
          <h3>Your tour link:</h3>
          <a href={tourLink} target="_blank" rel="noreferrer">{tourLink}</a>
        </div>
      )}
    </div>
  );
}

export default App;
