import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "@/components/ui/input";
import { Box, Paper, Grid, Typography, Button, Snackbar, Alert,TextField } from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import { Worker, Viewer } from "@react-pdf-viewer/core"; // For PDF rendering
import "@react-pdf-viewer/core/lib/styles/index.css"; // Include viewer styles
import mammoth from "mammoth"; // For DOCX rendering
import "../DragNDrop/DragNdropStyle.css";
import axios from "axios";

const fileTypes = ["pdf", "docx", "txt"];

export default function DragNDrop({onFileDrop}) {
  const [file, setFile] = useState(null);
  const [previewContent, setPreviewContent] = useState(null); // To store preview content
  const [fileType, setFileType] = useState(null); // To track file type
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const handleChange = async (file) => {
    setFile(file);
    onFileDrop(file);
    const fileExtension = file.name.split(".").pop().toLowerCase();
    setFileType(fileExtension);
  
    // Generate file preview
    if (fileExtension === "pdf") {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewContent(e.target.result);
      reader.readAsDataURL(file);
    } else if (fileExtension === "docx") {
      const reader = new FileReader();
      reader.onload = (e) => {
        mammoth
          .extractRawText({ arrayBuffer: e.target.result })
          .then((result) => setPreviewContent(result.value))
          .catch((err) => console.error("Error rendering DOCX:", err));
      };
      reader.readAsArrayBuffer(file);
    } else if (fileExtension === "txt") {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewContent(e.target.result);
      reader.readAsText(file);
    } else {
      setPreviewContent("Preview not available for this file type.");
    }
  
  };
  

  const handleDelete = () => {
    setFile(null); // Reset file state
    setPreviewContent(null); // Remove preview
    setSnackbarMessage("File removed successfully!")
    setSnackbarOpen(true); // Show Snackbar notification
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return; 
    setSnackbarOpen(false);
  };

  return (
    <div>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>


      
      <Grid container sx={{height:'40px'}}>

        <Grid item xs={1.5} sx={{backgroundColor:'#1570EF',borderRadius:'10px 0px 0px 10px',height:'36px',display:'flex', alignItems:'center',justifyContent:'center'}}>
           <Typography sx={{ fontSize: "14px" , color:'#ffff' }}>Name</Typography>
        </Grid>
        <Grid item xs={8.5}>
          <div className="space-y-1">
            <TextField
              id="name"
              disabled
              fullWidth
              variant="standard"
              type="text"
              placeholder={file ? file.name : "No files uploaded yet!"}
              size="small"
              sx={{height:'36px', border:'2px solid #1570EF',borderRadius:'1px 5px 5px 1px',justifyContent:'center',paddingLeft:'10px'}}
              InputProps={{
                disableUnderline: true , 
              }}
            />
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="standard"
            
            onClick={handleDelete}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              color:'#ffb18d'
            }}
          >
            <DeleteForeverTwoToneIcon />
          </Button>
        </Grid>
      </Grid>

      {/* File Upload Section */}
      <div className="FileUploaderComponent">
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label="Upload or drop a file right here"
          required
          dropMessageStyle={{ backgroundColor: "#aed1ff" }}
          hoverTitle="Drop file(s) here! Upload only Pdf, Docx, Text"
          maxSize="20"
          children={
            <div
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <BackupOutlinedIcon sx={{ width: "40px", height: "40px" }} />
              <Box>
                <Typography>Select a file or drag and drop here</Typography>
                <Typography sx={{ fontSize: "10px" }}>
                  .docx, Image, Text or PDF, file size no more than 20MB
                </Typography>
              </Box>
            </div>
          }
        />
      </div>

      {/* Preview Section */}
      {previewContent && (
        <Paper
          elevation={3}
          sx={{
            position:'inherit',
            marginTop: -59,
            borderRadius:'10px',
            maxWidth:'96%',
            height: "74vh",
            overflow: "auto",
            backgroundColor:'transparent'
          }}
        >
          {fileType === "pdf" ? (
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
              <Viewer fileUrl={previewContent} />
            </Worker>
          ) : (
            <Typography>{previewContent}</Typography>
          )}
        </Paper>
      )}
      
    </div>
  );
}
