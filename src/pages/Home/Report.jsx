import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, Snackbar, Alert } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import BackgroundImg from '../../assets/pdfBackground.png'
import HeaderBox from '../../assets/headerbox.png';
import BackgroundImg2 from '../../assets/pdfBackground2.png'
import Approved from '../../assets/approved.png'
import Cicrle from '../../assets/circle.png'
import { useState, useEffect } from 'react';

const Report = ({ data, savedTime, reportButton }) => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  //close notofication bar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const generatePDF = () => {

    if (data == null) {
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
    }
    const doc = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // ====== Cover Page =====
    // Background
    doc.setFillColor("#1C7AE8"); // Blue gradient-like background
    doc.addImage(BackgroundImg, "PNG", 0, 0, pageWidth, pageHeight, "F", 'FAST')

    //approved img
    doc.addImage(Approved, 'PNG', 145, 120, 50, 50, undefined, 'FAST');

    //unilogo
    doc.setFontSize(28);
    doc.setTextColor("#FFFFFF");
    doc.setFont("helvetica", "bold");
    doc.text("University Name Here", 20, 30);

    //slogan here
    doc.setFontSize(16);
    doc.setTextColor("#FFFFFF");
    doc.text("Slogan Here", 20, 40);

    // Title01
    doc.setFontSize(44);
    doc.setTextColor("#783293");
    doc.setFont("helvetica", "bold");
    doc.text("ASSESSMENT", 30, 193);

    //TITLE 02
    doc.setFontSize(32);
    doc.setTextColor("#783293");
    doc.setFont("helvetica");
    doc.text("Report", 140, 193);


    // Subtitle
    doc.setFontSize(16);
    doc.setTextColor("#212121");
    doc.text("Generated for Academic Review", 30, 203);

    //seperator
    doc.setDrawColor("#1C7AE8");
    doc.line(30, 213, 65, 213);

    // Metadata (e.g., Date, ID)
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 30, 235);
    doc.text("Report ID: 001", 30, 225);

    // Add a new page
    doc.addPage();

    // ========= Page 1 Content =========
    // Background
    doc.addImage(BackgroundImg2, "PNG", 0, 0, pageWidth, pageHeight, undefined, 'FAST');
    doc.addImage(HeaderBox, 'PNG', 0, 0, pageWidth, 45, 'MEDIUM')
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#FFFFFF");
    doc.text("Evaluation Result", 10, 22);

    // Marks cricle
    doc.setFillColor("#FFFFFF");
    doc.circle(176, 23, 15, "F");
    doc.addImage(Cicrle, 'PNG', 161, 8, 30, 30, undefined, 'FAST');
    doc.setTextColor("#000000");
    doc.setFontSize(24);
    doc.text(`${data.analysis.overall_score}%`, 168.5, 26.5);

    doc.setFontSize(12);
    doc.text("No: 001", 10, 32);

    //rectangle under totalwords
    doc.setFillColor("#FFF494");
    doc.roundedRect(51, 57.5, 20, 10, 2, 2, "F");

    // Total Words Section
    doc.setFontSize(18);
    doc.setTextColor("#000000");
    doc.text("Total Words", 10, 65);
    doc.setFontSize(18);
    doc.text(`${data.analysis.word_stats.total_words}`, 55, 65);

    // 1st Tab Contents
    const stats = [
      { label: "Identincal", value: data.analysis.word_stats.identical || 0, color: "#AEFF7C" },
      { label: "Minor changes", value: data.analysis.word_stats.minor_changes || 0, color: "#79D7FF" },
      { label: "Paraphrased", value: data.analysis.word_stats.paraphrased || 0, color: "#EC79FF" },
      { label: "Original Text ", value: data.analysis.word_stats.original_text || 0, color: "#A074FF" },
    ];
    let y = 85;
    stats.forEach((stat) => {
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`${stat.label}`, 10, y - 1);

      // Background bar (light gray for all)
      doc.setFillColor("#EEEEEE");
      doc.roundedRect(44, y - 5, 0.2 * pageWidth, 5, 2, 2, "F");

      // Progress bar
      doc.setFillColor(stat.color);
      doc.roundedRect(44, y - 5, ((stat.value / data.analysis.word_stats.total_words || 0) * 0.2 * pageWidth), 5, 2, 2, "F");

      // Display value
      doc.setTextColor("#000000");
      doc.text(`${stat.value}`, 89, y - 1);

      // Move down for the next stat
      y += 10;
    });



    // 2nd tab (Omitted, Human Text, AI Content)
    const stats2 = [
      { label: "Omitted Words", value: data.analysis.word_stats.omitted_words || 0, color: "#FFA726" },
      { label: "Human Text", value: data.analysis.word_stats.human_text || 0, color: "#29B6F6" },
      { label: "AI Content", value: data.analysis.word_stats.ai_content || 0, color: "#EF5350" },
    ];
    y = 85;
    stats2.forEach((stat2) => {
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`${stat2.label}`, 110, y - 1);

      // Background bar (light gray for all)
      doc.setFillColor("#EEEEEE");
      doc.roundedRect(144, y - 5, 0.2 * pageWidth, 5, 2, 2, "F");

      // Progress bar
      doc.setFillColor(stat2.color);
      doc.roundedRect(144, y - 5, ((stat2.value / data.analysis.word_stats.total_words || 0) * 0.2 * pageWidth), 5, 2, 2, "F");

      // Display value
      doc.setTextColor("#000000");
      doc.text(`${stat2.value}`, 189, y - 1);

      // Move down for the next stat
      y += 10;
    });


    // 4. Evaluation Details
    doc.setFontSize(18);
    doc.text("Evaluation Details", 10, 135);

    // Extract and map the first 5 elements from the analysis object to schemePoints
    const details = Object.entries(data.analysis)
      .slice(0, 5) // Get only the first 5 elements
      .map(([key, value], index) => ({
        id: index + 1,
        label: key,
        score: value.score || "0",
        color: "#42A5F5"
      }));



    y = 148;
    details.forEach((detail) => {

      // remark based on score function
      let remark;
      let remarkcolor;
      if (detail.score >= 0 && detail.score <= 7) {
        remark = "Weak";
        remarkcolor = "#E53F44";
      } else if (detail.score >= 8 && detail.score <= 12) {
        remark = "Medium";
        remarkcolor = "#F1C21B";
      } else if (detail.score >= 13 && detail.score <= 17) {
        remark = "Good";
        remarkcolor = "#3B82F6";
      } else if (detail.score >= 18 && detail.score <= 20) {
        remark = "Great";
        remarkcolor = "#24B043";
      } else {
        remark = "Weak";
        remarkcolor = "#E53F44";
      }
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(detail.label, 10, y);

      // Background bar
      doc.setFillColor("#EEEEEE");
      doc.roundedRect(90, y - 5, 0.3 * pageWidth, 5, 2, 2, "F");

      doc.setFillColor(remarkcolor);
      doc.roundedRect(90, y - 5, ((detail.score / 20) * 0.3 * pageWidth), 5, 2, 2, "F"); // Scaled bar {x codinate ,y codinate,width,height,style}
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`${detail.score}/20`, 160, y - 1);

      //rectangles foe remarks
      doc.setFillColor(remarkcolor);
      doc.roundedRect(178, y - 6, 20, 8, 2, 2, "F");

      doc.setFontSize(10)
      doc.setTextColor("#FFFFFF");
      doc.text(remark, 181.5, y - 0.7);
      y += 11;
    });

    // 5. Overall Feedback Section
    doc.setFontSize(14);
    doc.setTextColor("#000000");
    doc.text("Overall Feedback", 10, y + 10);

    doc.setFontSize(10);
    doc.setTextColor("#646464");

    const feedbackText = "";
    const feedbackLines = doc.splitTextToSize(feedbackText, pageWidth - 20);

    const maxLinesPerPage = 5;
    let currentLineIndex = 0;
    let feedbackY = y + 20;


    while (currentLineIndex < feedbackLines.length) {
      if (feedbackY + 10 > pageHeight - 20) {
        // Add a new page when there is no space left
        doc.addPage();
        feedbackY = 20; // Reset Y position for the new page
      }

      const linesToPrint = feedbackLines.slice(
        currentLineIndex,
        currentLineIndex + maxLinesPerPage
      );

      linesToPrint.forEach((line, index) => {
        doc.text(line, 10, feedbackY + index * 6);
      });

      // Update currentLineIndex
      currentLineIndex += maxLinesPerPage;
      feedbackY += linesToPrint.length * 6;
    }

    // 6. Footer Section with Time and Words
    y = doc.internal.pageSize.height - 30;
    doc.setFillColor("#F0F0F0");
    doc.rect(0, y, pageWidth, 30, "F");

    doc.setTextColor("#000000");
    doc.text("Saved Time", 10, y + 10);
    doc.text("Total Words", pageWidth - 50, y + 10);

    doc.setFontSize(14);
    doc.setTextColor("#1C7AE8");
    doc.text(`${savedTime}`, 10, y + 20);
    doc.text(`${data.analysis.word_stats.total_words}`, pageWidth - 50, y + 20);



    // === Page 2 Content ===
    doc.addPage();
    // Background
    doc.addImage(BackgroundImg2, "PNG", 0, 0, pageWidth, pageHeight, undefined, 'FAST');

    let page2Y = 20; // Start Y position for page 2

    // 1. Suggestions Section
    doc.setFillColor("#F0F0F0"); // Light gray background
    doc.rect(0, 0, pageWidth, 30, "F"); // Header background
    doc.setFontSize(18);
    doc.setTextColor("#000000");
    doc.text("Suggestions", 10, page2Y);

    page2Y += 20; // Space below section title

    doc.setFontSize(10);
    doc.setTextColor("#3C3C3C");

    const suggestionsText = " "; // suggestions text
    const suggestionsLines = doc.splitTextToSize(suggestionsText, pageWidth - 20);

    // Print suggestions dynamically
    suggestionsLines.forEach((line) => {
      if (page2Y + 10 > pageHeight - 20) {
        // Add a new page if space runs out
        doc.addPage();
        page2Y = 20; // Reset Y position
      }
      doc.text(line, 10, page2Y);
      page2Y += 6; // Line spacing
    });

    page2Y += 10;


    // 2. Evaluation Details Section
    doc.setFontSize(14);
    doc.setTextColor("#000000");
    doc.text("Evaluation Details", 10, page2Y);

    page2Y += 10;

    // Extract and map the first 5 elements from the analysis object
    const evaluations = Object.entries(data.analysis)
      .slice(0, 5) // Get only the first 5 elements
      .map(([key, value], index) => ({
        id: index + 1,
        label: key,
        score: value.score || "0",
        strengths: value.strengths
          ?.map((s) => s.replace(/[+*]/g, ''))
          .join(", ") || "No strengths noted",
        weaknesses: value.weaknesses
          ?.map((w) => w.replace(/[+*]/g, ''))
          .join(", ") || "No weaknesses noted",
      }))



    evaluations.forEach((evaluation) => {
      if (page2Y + 30 > pageHeight - 30) {
        // Add a new page if space runs out
        doc.addPage();
        page2Y = 20; // Reset Y position
      }

      // remark based on score function
      let remark;
      let remarkcolor;
      if (evaluation.score >= 1 && evaluation.score <= 5) {
        remark = "Weak";
        remarkcolor = "#E53F44";
      } else if (evaluation.score >= 6 && evaluation.score <= 10) {
        remark = "Medium";
        remarkcolor = "#F1C21B";
      } else if (evaluation.score >= 11 && evaluation.score <= 15) {
        remark = "Good";
        remarkcolor = "#3B82F6";
      } else if (evaluation.score >= 16 && evaluation.score <= 20) {
        remark = "Great";
        remarkcolor = "#24B043";
      } else {
        remark = "Weak";
        remarkcolor = "#E53F44";
      }


      // Section Header
      doc.setFontSize(14);
      doc.setTextColor("#000000");
      doc.setFont("helvetica", "bold");
      doc.text(`${evaluation.label}`, 10, page2Y);

      // Score Bar
      doc.setFillColor("#EEEEEE"); // Gray background bar
      doc.roundedRect(10, page2Y + 4.5, pageWidth * 0.75, 2, 1, 1, "F");

      doc.setFillColor(remarkcolor); // colored score bar
      doc.roundedRect(
        10,
        page2Y + 4.5,
        (evaluation.score / 20) * pageWidth * 0.75,
        2,
        1,
        1,
        "F"
      );

      // Score and Remark
      doc.setDrawColor(remarkcolor);
      doc.roundedRect(175, page2Y - 3.2, 25, 10, 1, 1, 'S');
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#000000");
      doc.text(`${evaluation.score} /20`, 181, page2Y + 3.5);

      //remarks text
      doc.setFontSize(11);
      doc.setTextColor(remarkcolor);
      doc.text(remark, 156, page2Y + 1);

      page2Y += 15;

      // Strength and weaknesses description
      doc.setFontSize(11);
      doc.setTextColor("#FF5F2F"); // orange color for titles 
      doc.setFont("helvetica", "bold");

      // Split and render Strengths title
      const strengthTitle = doc.splitTextToSize('Strengths:', pageWidth - 20);
      strengthTitle.forEach((line) => {
        if (page2Y + 10 > pageHeight - 10) {
          doc.addPage();
          page2Y = 20;
        }
        doc.text(line, 10, page2Y);
        page2Y += 6;
      });

      // Split and render strengths content
      doc.setFontSize(12);
      doc.setTextColor("#3C3C3C");
      doc.setFont("helvetica", "normal");


      const strengthLines = doc.splitTextToSize(`${evaluation.strengths}`, pageWidth - 20);
      strengthLines.forEach((line) => {
        if (page2Y + 10 > pageHeight - 10) {
          doc.addPage();
          page2Y = 20;
        }
        doc.text(line, 10, page2Y);
        page2Y += 6;
      });

      // Split and render Weaknesses title
      doc.setFontSize(11);
      doc.setTextColor("#FF5F2F"); // orange color for titles 
      doc.setFont("helvetica", "bold");
      const weaknessesTitle = doc.splitTextToSize('Weaknesses:', pageWidth - 20);
      weaknessesTitle.forEach((line) => {
        if (page2Y + 10 > pageHeight - 10) {
          doc.addPage();
          page2Y = 20;
        }
        doc.text(line, 10, page2Y);
        page2Y += 6; // Line spacing
      });

      // Split and render weaknesses content
      doc.setFontSize(12);
      doc.setTextColor("#3C3C3C"); // Gray color for content
      doc.setFont("helvetica", "normal");
      const weaknessesLines = doc.splitTextToSize(`${evaluation.weaknesses}`, pageWidth - 20);
      weaknessesLines.forEach((line) => {
        if (page2Y + 10 > pageHeight - 10) {
          doc.addPage();
          page2Y = 20;
        }
        doc.text(line, 10, page2Y);
        page2Y += 6; // Line spacing
      });

      // Space between evaluations
      page2Y += 10;

    });


    // Save the PDF
    doc.save("Report.pdf");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Snackbar
        //notofication for empty report
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          Check your Assignment first !
        </Alert>
      </Snackbar>
      <Button
        sx={{ textTransform: "none", height: '45px' }}
        onClick={generatePDF}
        variant='contained'
        disabled={reportButton}
        endIcon={<DownloadIcon />}
      >Report
      </Button>
    </div>
  );
};

export default Report;
