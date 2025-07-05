import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";

function TourViewer() {
  const { tourId } = useParams();
  const viewerRef = useRef(null);
  const [nodes, setNodes] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tour/${tourId}`)
      .then((res) => res.json())
      .then((data) => setNodes(data));
  }, [tourId]);

  const handleReady = () => {
    const viewer = viewerRef.current?.viewer;
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
