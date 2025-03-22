import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseCompletion = ({ userId, courseId }) => {
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCertificate = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/certificate/generate/${userId}/${courseId}`);
      setCertificateUrl(res.data.url);
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Course Completed!</h2>
      <button onClick={generateCertificate} disabled={loading}>
        {loading ? "Generating..." : "Get Certificate"}
      </button>
      {certificateUrl && (
        <div>
          <p>Download your certificate:</p>
          <a href={certificateUrl} target="_blank" rel="noopener noreferrer">Download Certificate</a>
        </div>
      )}
    </div>
  );
};

export default CourseCompletion;
