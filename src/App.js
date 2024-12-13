
import React, { useEffect, useState } from "react";

const BACKEND_URL = "https://ckeditor-neon.vercel.app"; 

const MCQApp = () => {
  const [mcqs, setMcqs] = useState([]);

  useEffect(() => {
    
    fetch(`${BACKEND_URL}/api/mcqs/`)
      .then((response) => response.json())
      .then((data) => setMcqs(data))
      .catch((error) => console.error("Error fetching MCQs:", error));
  }, []);

  const processContent = (content) => {
    // Replace relative paths in src attributes with absolute URLs
    return content.replace(/src="\/media/g, `src="${BACKEND_URL}/media`);
  };

  return (
    <div>
      <h1>MCQ App</h1>
      {mcqs.length > 0 ? (
        mcqs.map((mcq) => (
          <div key={mcq.id} style={{ border: "1px solid #ccc", margin: "20px", padding: "20px" }}>
            <h2>{mcq.question}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: processContent(mcq.content) }}
              style={{ marginBottom: "20px" }}
            />
            {mcq.subject_name && <p><strong>Subject:</strong> {mcq.subject_name}</p>}
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default MCQApp;
