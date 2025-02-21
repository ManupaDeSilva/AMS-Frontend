import React, { useState } from "react";

function DragAndDropUpload({ onFileDrop }) {
  const [file, setFile] = useState(null); // Store the uploaded file

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0]; // Get the first file
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      onFileDrop && onFileDrop(uploadedFile); // Call the callback if provided
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleFileSelect = (event) => {
    const uploadedFile = event.target.files[0]; // Get the selected file
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      onFileDrop && onFileDrop(uploadedFile); // Call the callback if provided
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = () => {
    setFile(null);
  };

  return (
    <div>
      {file ? (
        <div style={{ textAlign: "center" }}>
          <h3>Preview</h3>
          <iframe
            src={URL.createObjectURL(file)}
            width="100%"
            height="500px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            title="PDF Preview"
          ></iframe>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <input
              type="text"
              value={file.name}
              readOnly
              style={{
                padding: "8px",
                width: "80%",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <br />
            <button
              onClick={handleDelete}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete File
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #ccc",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            background: "#f9f9f9",
          }}
        >
          <p>Drag and drop your PDF here, or click to upload</p>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            style={{
              display: "none",
            }}
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              color: "#fff",
              backgroundColor: "#007bff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Upload File
          </label>
        </div>
      )}
    </div>
  );
}

export default DragAndDropUpload;
