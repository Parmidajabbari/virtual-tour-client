import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";

function TourViewer() {
  const { tourId } = useParams();
  const viewerRef = useRef(null);
  const [nodes, setNodes] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/tour/${tourId}`)
      .then((res) => res.json())
      .then((data) => setNodes(data))
      .catch((err) => {
        console.error("Failed to load tour:", err);
        alert("Failed to load tour. Please check your link or try again later.");
      });
  }, [tourId, API_BASE]);

  const handleReady = () => {
    const viewer = viewerRef.current?.viewer;
    if (!viewer || !nodes) return;
    const vt = viewer.getPlugin(VirtualTourPlugin);
    vt.setNodes(nodes);
  };

  if (!nodes) return <p>Loading tour...</p>;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactPhotoSphereViewer
        ref={viewerRef}
        src={nodes[0].panorama}
        plugins={[
          [VirtualTourPlugin, { renderMode: "3d", transitionOptions: { fadeIn: true } }]
        ]}
        onReady={handleReady}
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default TourViewer;
