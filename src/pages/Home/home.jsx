import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Box, Paper, Grid, Typography, Grid2, Button, TextField, useMediaQuery, IconButton } from '@mui/material';
import DragNDrop from '@/components/ui/DragNDrop/DragNDrop';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CustomScheme from './HomeTabs/CustomScheme';
import { Snackbar, Alert } from '@mui/material';
import smallheaderbox from '../../assets/smallHeaderImg.png'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router';
import Report from './Report';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdjustIcon from "@mui/icons-material/Adjust";
import Loading from '@/components/Loading/loading';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import LoadingButton from '@mui/lab/LoadingButton';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import BackImg from '../../assets/mainBackground 2.png'
import { TypeAnimation } from 'react-type-animation';
import SmallLoading from '../../components/Loading/smallLoading'
import Checkbox from '@mui/material/Checkbox';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Joyride from 'react-joyride';


const Home = () => {

  const navigate = useNavigate();
  const [criteria, setCriteria] = useState('');
  const [title, setTitle] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalScore, setTotalScore] = useState('0');
  const [totalWords, setTotalWords] = useState('0');
  const [reportData, setReportData] = useState(null);
  const [savedTime, setSavedTime] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [responseCheck, setResponseCheck] = useState(false);
  const [subtitleOpen, setSubtitleOpen] = useState('none');
  const [labeledit, setLabeledit] = useState('none');
  const [checkButton, setCheckButton] = useState(true);
  const [reportButton, setReportButton] = useState(true);
  const [totalTokens, setTotalTokens] = useState('0');
  const [completionTokens, setCompletionTokens] = useState('0');
  const [promptTokens, setPromptTokens] = useState('0');


  //tour Ride 
  const steps = [
    {
      target: '#uploadSection',
      title: 'Select Assessment',
      content: 'Starting by uploading the assessment here. ',
      disableBeacon: true,
    },
    {
      target: '#schemeDetailSection',
      title: 'Add scheme details',
      content: 'Enter scheme title and scheme description here',
      disableBeacon: true,
    },
    {
      target: '#generateButtonSection',
      title: 'Generate scheme criteria',
      content: 'After entering the details , click here to generate scheme criteria',
      disableBeacon: true,
    },
    {
      target: '#checkButtonSection',
      title: 'Start Assessment',
      content: 'After uploading an assignment/test file, click here to initiate the assessment.',
      disableBeacon: true,
    },
    {
      target: '#reportButtonSection',
      title: 'View Assessment Report.',
      content: 'Once you have checked the assessment. You can view and download the assessment report here.',
      disableBeacon: true,
    }
  ]


  //Before retrive scheme point label
  const [schemePointLabel, setSchemePointLabel] = useState([
    {
      id: 1,
      label: '-',
    },
    {
      id: 2,
      label: '-',
    },
    {
      id: 3,
      label: '-',
    },
    {
      id: 4,
      label: '-',
    },
    {
      id: 5,
      label: '-',
    }

  ]);

  //Before retrive scheme data
  const [schemePoints, setSchemePoints] = useState([
    {
      id: 1,
      score: "0",
      strengths: "Comment will be added when checked.",
      weaknesses: '',
      editable: false
    },
    {
      id: 2,
      score: "0",
      strengths: "Comment will be added when checked.",
      weaknesses: '',
      editable: false
    },
    {
      id: 3,
      score: "0",
      strengths: "Comment will be added when checked.",
      weaknesses: '',
      editable: false
    },
    {
      id: 4,
      score: "0",
      strengths: "Comment will be added when checked.",
      weaknesses: '',
      editable: false
    },
    {
      id: 5,
      score: "0",
      strengths: "Comment will be added when checked.",
      weaknesses: '',
      editable: false
    },
  ]);

  //set file to send
  const handleFileDrop = (file) => {
    setUploadedFile(file);
    setFileName(file.name);
  };

  //Submit all data to check the assignment
  const handleSubmit = async () => {

    if (
      !title ||
      !criteria ||
      !uploadedFile ||
      !fileName
    ) {
      setSnackbarMessage('Please generate marking scheme and upload a PDF file !');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.log('Fields not filled')
      return;
    }

    // Loading screen
    setIsLoading(true);

    //append data to formdata
    const formData = new FormData();
    formData.append("title", title);
    formData.append("criteria", criteria);
    formData.append("name", fileName);
    formData.append("file", uploadedFile);

    schemePointLabel.forEach((labelObj, index) => {
      formData.append(`academic_category_${index + 1}`, labelObj.label);
    });

    try {
      const response = await fetch(
        "https://devasscheck.beveltv.com/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      //Respose
      const data = await response.json();

      if (response.ok) {

        console.log('Response Success!');
        setTotalScore(data.analysis.overall_score);
        setTotalWords(data.analysis.word_stats.total_words);
        setReportData(data);
        setResponseCheck(true);
        setSubtitleOpen('flex');
        setReportButton(false);
        console.log(data);

        //set Tokens
        setTotalTokens(data.analysis.usage_metrics.total_tokens);
        setCompletionTokens(data.analysis.usage_metrics.completion_tokens);
        setPromptTokens(data.analysis.usage_metrics.prompt_tokens);

        // Extract and map the first 5 elements
        const schemePoints = Object.entries(data.analysis)
          .slice(0, 5)
          .map(([key, value], index) => ({
            id: index + 1,
            label: key,
            score: value.score || "0",
            strengths: value.strengths?.join(", ") || "No strengths noted",
            weaknesses: value.weaknesses?.join(", ") || "No weaknesses noted",
            editable: false,
          }));

        // Set the dynamically created schemePoints
        setSchemePoints(schemePoints);


      } else if (response.status === 400) {
        console.log("This is not an assignment");
        setSnackbarMessage('This is not an assignment, Please add a valid Assignment');
        setSnackbarOpen(true);

      } else if (response.status === 500) {
        console.log("File is too large");
        setSnackbarMessage('File is too large ! You have exceeded the maximum number words');
        setSnackbarOpen(true);

      } else {
        console.log("Error analyzing document");
        setSnackbarMessage('Error analyzing document.Try Again !');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage('Error analyzing document.Try Again !');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }

  };

  //close notofication bar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  //handle Scheme Generate process
  const handleGenerate = async () => {

    if (
      !title ||
      !criteria
    ) {
      setSnackbarMessage('Please fill title and criteria fields !');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.log('Fields not filled')
      return;
    }
    setButtonLoading(true);

    //append scheme points
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", criteria);

    try {

      const queryString = `title=${encodeURIComponent(title)}&description=${encodeURIComponent(criteria)}`;
      const response = await fetch(`https://devasscheck.beveltv.com/generate-scheme?${queryString}`, {
        method: "POST",
        body: formData,
        headers: { "Cache-Control": "no-cache" },
      });

      //SAve Respose
      const data = await response.json();

      if (response.ok) {
        console.log('Response Success!');
        console.log(data);
        setLabeledit('flex');
        setCheckButton(false);

        //set array to the labels
        setSchemePointLabel(
          [
            {
              id: 1,
              label: data.categories[0].name
            },
            {
              id: 2,
              label: data.categories[1].name,
            },
            {
              id: 3,
              label: data.categories[2].name,
            },
            {
              id: 4,
              label: data.categories[3].name,
            },
            {
              id: 5,
              label: data.categories[4].name,
            }
          ]
        );

      }

    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage('Error generating schema using criteria');
      setSnackbarOpen(true);
    } finally {
      setButtonLoading(false);
    }
  }

  // Calculate for Saved Time
  useEffect(() => {
    if (totalWords > 0) {
      const totalSeconds = totalWords * 0.6; // 100 words per 1 min
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      setSavedTime(`${hours}h ${minutes}m`);
    } else {
      setSavedTime("00 00");
    }
  }, [totalWords]);

  // Handle rename the lable
  const handleRename = (id) => {
    setSchemePoints((prevPoints) =>
      prevPoints.map((point) =>
        point.id === id ? { ...point, editable: !point.editable } : point
      )
    );
  };

  // Handle text change
  const handleLabelChange = (id, newValue) => {
    setSchemePointLabel((prevPoints) =>
      prevPoints.map((point) =>
        point.id === id ? { ...point, label: newValue } : point
      )
    );
  };


  return (
    <div style={{
      height: '100vh',
      width: '100%',
      margin: '0',
      padding: '20px',
      maxWidth: 'none',
      backgroundImage: `url(${BackImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} >
      {isLoading && <Loading />}
      <div>

        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <Grid container >

            {/* ------------Assignment Upload Section ----------------*/}
            <Grid item xs={12} md={6}>
              <div style={{
              }}>

                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: '18px' }}>Check your assignment</Typography>
                <Typography sx={{ fontSize: '12px', color: '#7c7c7c' }}>Please upload any assignment to check the marks</Typography>
                <br />

                <div id='uploadSection'>
                  {/*----file Uploader component */}
                  <DragNDrop onFileDrop={handleFileDrop} />
                  {/* <DragAndDropApp onFileDrop={handleFileDrop} /> */}
                </div>
              </div>
            </Grid>

            {/* ------------Generate Scheme Section ----------------*/}
            <Grid item xs={12} md={6} >
              <div
              //Style for scrollbar
              > <style>{`
            div {
              scrollbar-width: thin; 
              scrollbar-color: #888 #ff00000;
            }
              
          `}
                </style>
                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: '18px' }}>Assignment Marking Scheme/ Rubric</Typography>
                <Typography sx={{ fontSize: '12px', color: '#7c7c7c' }}>Generate new marking scheme or used that you previously created</Typography>
                <br />
                <Tabs defaultValue='newScheme'>
                  <TabsList className="grid w-full grid-cols-2" style={{ width: '100%', backgroundColor: '#a3a3a334' }}>
                    <TabsTrigger value='newScheme' >Generate New Scheme</TabsTrigger>
                    <TabsTrigger value='CustomScheme'>Custom Schemes</TabsTrigger>
                  </TabsList>


                  {/* ------------Generate New Scheme Tab ----------------*/}
                  <TabsContent value='newScheme'>
                    <div style={{
                      scrollbarGutter: "stable",
                      overflow: "auto",
                      maxHeight: "78vh",
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      paddingRight: '16px',
                      marginRight: '-12px'
                    }}>
                      {/*Authentication Notification*/}
                      <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      >
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                          {snackbarMessage}
                        </Alert>
                      </Snackbar>
                      <div id='schemeDetailSection' style={{ width: '90%' }} >
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px', gap: '10px' }}>
                          <AutoAwesomeIcon sx={{ color: '#fdd700' }}></AutoAwesomeIcon>
                          <Typography sx={{ fontWeight: 'bold', fontFamily: 'Poppins', fontSize: '18px' }}>Generate scheme with AI</Typography>
                        </div>
                        <br />
                        <TextField
                          label="Scheme Title"
                          value={title}   //Get scheme name here
                          onChange={(e) => setTitle(e.target.value)}
                          size='small'
                          placeholder='Enter title here'
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                          sx={{
                            width: '100%',
                            "& .MuiOutlinedInput-input": {
                              padding: "10px",
                              fontSize: "14px",
                              "&::placeholder": {
                                fontSize: "12px",
                                color: "gray",
                              },
                            },
                          }}></TextField>
                        <div>

                          <TextField
                            label="Description about scheme"
                            value={criteria}  //Get prompt here
                            onChange={(e) => setCriteria(e.target.value)}
                            multiline
                            maxRows={2}
                            placeholder='Please enter assignment scheme details and key assessment criteria. For better results, specify the main skills and knowledge areas to be evaluated.'
                            slotProps={{
                              inputLabel: {
                                shrink: true,
                              },
                            }}
                            sx={{
                              width: "100%",
                              marginTop: "20px",
                              "& .MuiInputBase-root": {
                                height: "80px",
                              },
                              "& .MuiOutlinedInput-input": {
                                padding: "10px",
                                fontSize: "14px",
                                "&::placeholder": {
                                  fontSize: "14px",
                                  color: "gray",
                                },
                              },

                            }}>
                          </TextField>
                        </div>
                      </div>
                      <br />

                      <Box sx={{ display: 'flex', justifyContent: "space-between", marginBottom: '10px' }}>
                        <div id='generateButtonSection'>
                          <LoadingButton loading={buttonLoading} loadingPosition="end"
                            sx={{ textTransform: "none", height: '45px' }}
                            variant='contained'
                            endIcon={<AutoModeIcon />}
                            onClick={handleGenerate}
                          >Generate Scheme</LoadingButton>
                        </div>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: "10px", border: '2px solid #60b7df', alignItems: 'center', padding: ' 0px 10px', borderRadius: '5px' }}>
                          <Typography sx={{ fontWeight: "bold", fontFamily: 'Poppins', color: '#1570EF' }}>Total Score</Typography>
                          <Box sx={{ display: "flex", flexDirection: "row", gap: "2px" }}>
                            <Typography sx={{ fontWeight: "bold", color: '#1570EF' }}>{totalScore}</Typography>  {/*Points will show here*/}
                            <Typography sx={{ fontWeight: "bold", color: '#1570EF' }}>/</Typography>
                            <Typography sx={{ fontWeight: "bold", color: '#1570EF' }}>100</Typography>  {/* All Points will show here*/}
                          </Box>
                        </Box>
                      </Box>

                      {/*----- Generated Scheme Details ---------- */}
                      <div style={{ marginBottom: '10px' }}>
                        {schemePoints.map((point) => {

                          // Find the corresponding label
                          const label = schemePointLabel.find((label) => label.id === point.id)?.label;
                          const progress = point.score * 5;
                          const strengthsText = point.strengths.replace(/[+*]/g, '');
                          const weaknessText = point.weaknesses.replace(/[+*]/g, '');

                          return (
                            <div className="schemePoints" key={point.id}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  width: '100%',
                                }}
                              >
                                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                  <AdjustIcon sx={{ width: '16px' }} color='warning' />
                                  <TextField
                                    variant="standard"
                                    InputProps={{
                                      disableUnderline: !point.editable,
                                      readOnly: !point.editable,
                                      style: {
                                        fontFamily: 'Poppins',
                                        fontWeight: 'bold',
                                      },
                                    }}
                                    value={label}
                                    onChange={(e) => handleLabelChange(point.id, e.target.value)}
                                    sx={{
                                      width: `${Math.max(label.length * 10)}px`,
                                      transition: "width 0.3s ease",
                                      fontWeight: 'bold', fontFamily: 'Poppins'
                                    }}
                                  ></TextField>
                                  <IconButton sx={{ display: labeledit }} onClick={() => handleRename(point.id)}>
                                    <DrawOutlinedIcon sx={{ width: '20px' }} />
                                  </IconButton>
                                </Box>

                                <Checkbox
                                  size="small"
                                  checked={responseCheck}
                                  icon={<CheckCircleRoundedIcon />}
                                  checkedIcon={<CheckCircleRoundedIcon color="success" />}
                                  disabled
                                />
                              </Box>

                              <Accordion
                                disableGutters
                                square
                                elevation={0}
                                defaultExpanded
                                sx={{ margin: '0', padding: '0', boxShadow: 'none' }}>
                                <Grid
                                  container
                                  gap={2}
                                  sx={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Grid item xs={1.25} >
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '2px',
                                        border: '0.5px solid #60b7df',
                                        borderRadius: '5px',
                                        padding: '4px 12px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '60px'
                                      }}
                                    >
                                      <Typography sx={{ fontWeight: 'bold' }}>{point.score}</Typography> {/* Points will show here */}
                                      <Typography sx={{ fontWeight: 'bold', color: '#858585' }}>/</Typography>
                                      <Typography sx={{ fontWeight: 'bold', color: '#858585' }}>20</Typography> {/* All Points will show here */}
                                    </Box>
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Box value={'10'} >
                                      {buttonLoading && <SmallLoading />}
                                    </Box>
                                    <Box value={'10'} >
                                      {!buttonLoading &&
                                        <LinearProgress
                                          variant="determinate"
                                          value={progress}
                                          sx={{
                                            borderRadius: '10px', height: '5px',
                                            backgroundColor: "#d6d6d673",
                                          }} />}
                                    </Box>
                                  </Grid>

                                  <Grid item xs={2} >
                                    <AccordionSummary expandIcon={<ExpandCircleDownIcon color='warning' sx={{ paddingRight: '4px' }} />}>
                                      <Typography color='warning' sx={{ fontSize: '14px' }}>
                                        Feedback
                                      </Typography>
                                    </AccordionSummary>
                                  </Grid>
                                </Grid>
                                <Box mb={2} sx={{ padding: '6px', boxShadow: '-3px 2px 5px #35353540' }}>
                                  <Box mb={1}>
                                    <Typography sx={{ fontSize: '14px', color: '#ff5f2f', fontWeight: 'bold', display: subtitleOpen }}>Strengths</Typography>
                                    <TypeAnimation
                                      key={point.strengths}
                                      sequence={[strengthsText]}
                                      wrapper="span"
                                      speed={55}
                                      style={{ fontSize: '14px', display: 'inline-block' }}
                                      cursor={false}
                                    />
                                  </Box>
                                  <Typography sx={{ fontSize: '14px', color: '#ff5f2f', fontWeight: 'bold', display: subtitleOpen }}>Weaknesses</Typography>
                                  <TypeAnimation
                                    key={point.weaknesses}
                                    sequence={[weaknessText]}
                                    wrapper="span"
                                    speed={85}
                                    style={{ fontSize: '14px', display: 'inline-block' }}
                                    cursor={false}
                                  />
                                </Box>

                              </Accordion>

                            </div>
                          );
                        })}
                      </div>



                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center'
                      }}>
                        <div id='checkButtonSection'>
                          <Button
                            sx={{ textTransform: "none", height: '45px' }}
                            variant='contained'
                            endIcon={<AutoFixHighIcon />}
                            onClick={handleSubmit}
                            disabled={checkButton}
                          >Check Assignment</Button>
                        </div >
                        {/* ------------Download Report Component ----------------*/}
                        <div id='reportButtonSection'>
                          <Report data={reportData} savedTime={savedTime} reportButton={reportButton} />
                        </div>
                      </Box>


                      {/*----- Time saved card & Total Words card ---------- */}
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Grid2
                          container
                          spacing={4}
                          padding={5}
                          sx={{
                            flexDirection: { xs: "column", sm: "row" },
                          }}
                        >
                          <Grid2 item xs={12} sm={6}>
                            <Box
                              sx={{
                                width: "180px",
                                height: "100px",
                                backgroundImage: `url(${smallheaderbox})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography sx={{ fontWeight: "bold", fontFamily: 'Poppins', color: "#ffffff" }}>Saved Time</Typography>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontFamily: 'Poppins',
                                  background: "linear-gradient(180deg, #ffffff, #6e6e6e)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  fontSize: "30px",
                                }}
                              >
                                {savedTime} {/*------ Fetch Saved Time Here ------*/}
                              </Typography>
                            </Box>
                          </Grid2>
                          <Grid2 item xs={12} sm={6}>
                            <Box
                              sx={{
                                width: "180px",
                                height: "100px",
                                backgroundImage: `url(${smallheaderbox})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography sx={{ fontWeight: "bold", fontFamily: 'Poppins', color: "#ffffff" }}>Total Words</Typography>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontFamily: 'Poppins',
                                  background: "linear-gradient(180deg, #ffffff, #6e6e6e)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  fontSize: "30px",
                                }}
                              >
                                {totalWords} {/*------- Fetch Word Count Here --------*/}
                              </Typography>
                            </Box>
                          </Grid2>
                        </Grid2>
                      </Box>
                      {/*------- Token showing secting --------*/}
                      <div style={{ fontSize: '14px', color: '#363636', justifyContent: 'space-between', display: 'flex', width: "100%", padding: '0 10px 10px 10px' }}>
                        <div>Total Tokens : <span style={{ fontWeight: 'bold' }}>{totalTokens}</span></div>
                        <div>Completion Tokens: <span style={{ fontWeight: 'bold' }}>{completionTokens}</span></div>
                        <div>Prompt Tokens: <span style={{ fontWeight: 'bold' }}>{promptTokens}</span></div>
                      </div>
                    </div>

                  </TabsContent>
                  {/* ------------Custom Scheme Tab ----------------*/}
                  <TabsContent value='CustomScheme'>
                    <CustomScheme />
                  </TabsContent>
                </Tabs>

              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Joyride
        steps={steps}
        locale={{ last: 'Start' }}
        continuous={true}
        showProgress
        showSkipButton
        scrollToFirstStep
        run={true}
        styles={{
          options: {
            arrowColor: '#ffffff',
            backgroundColor: '#ffffff',
            overlayColor: 'rgba(41, 41, 41, 0.781)',
            textColor: '#306df0',
            width: 350,
            zIndex: 1000,
          },
          tooltip: {
            fontSize: '14px',
          },

        }}
      />
    </div>
  );
};

export default Home;
