import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Grid2 } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from 'react-router-dom';

const CustomScheme = () => {

  const navigate = useNavigate();

  const [schemeDetails, setSchemeDetails] = useState([
    { score: '', description: '' }, // Initialize with one scheme detail
  ]);

  // Add a new scheme detail
  const addSchemeDetail = () => {
    setSchemeDetails((prev) => [
      ...prev,
      { score: '', description: '' }, // Add a new empty scheme detail
    ]);
  };

  // Remove a scheme detail by index
  const removeSchemeDetail = (index) => {
    setSchemeDetails((prev) => prev.filter((_, i) => i !== index));
  };

  // Update a scheme detail by index and field
  const updateSchemeDetail = (index, field, value) => {
    setSchemeDetails((prev) =>
      prev.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail
      )
    );
  };

  // Handle form submission or retrieve input data
  const handleSubmit = () => {
    
    navigate('/NotFound');

    console.log('Marking Scheme Details:', schemeDetails);
    // send to an API
  };

  return (
    <div >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Grid2 container spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid2 item>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '16px',
                gap: '10px',
              }}
            >
              <AutoAwesomeIcon sx={{ color: '#fdd700' }} />
              <Typography sx={{ fontWeight: 'bold' }}>Create Your Own Scheme</Typography>
            </Box>
            <Typography sx={{ fontSize: '12px', color: '#7c7c7c' }}>
              Marking Scheme Details
            </Typography>
          </Grid2>
          <Grid2 item>
            <Button
              onClick={handleSubmit}
              sx={{ textTransform: 'none', height: '45px' }}
              variant="contained"
              endIcon={<AutoFixHighIcon />}
            >
              Check Assignment
            </Button>
          </Grid2>
        </Grid2>
      </div>
      <Grid2 container width="100%" sx={{ display: 'flex', mt: '20px' }}>
        <Grid2 item size={3}>
          <Typography sx={{ color: '#555555' }}>Score</Typography>
        </Grid2>
        <Grid2 item size={7}>
          <Typography sx={{ color: '#555555' }}>Marking Description</Typography>
        </Grid2>
        <Grid2 item size={2} sx={{ display:'flex', justifyContent:'center'}}>
          <Typography sx={{ color: '#555555' }}>Actions</Typography>
        </Grid2>
      </Grid2>
      <div id="scheme-details">
        {schemeDetails.map((detail, index) => (
          <Grid2 container width="100%" sx={{ display: 'flex', mt: '20px' }} key={index}>
            <Grid2 item size={3}>
              <TextField
                variant="outlined"
                placeholder="Score"
                type="number"
                value={detail.score}
                onChange={(e) =>
                  updateSchemeDetail(index, 'score', e.target.value)
                }
                sx={{
                  width: {xs:'70px' , sm:'100px'},
                  '& .MuiOutlinedInput-input': {
                    padding: '10px',
                    fontSize: '16px',
                    fontWeight:'bold',
                    '&::placeholder': {
                      fontSize: '14px',
                      color: 'gray',
                    },
                  },
                }}
              />
            </Grid2>
            <Grid2 item size={7}>
              <TextField
                variant="outlined"
                multiline
                maxRows={3}
                placeholder="Marking Description"
                value={detail.description}
                onChange={(e) =>
                  updateSchemeDetail(index, 'description', e.target.value)
                }
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    height: '100px',
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '10px',
                    fontSize: '14px',
                    '&::placeholder': {
                      fontSize: '14px',
                      color: 'gray',
                    },
                  },
                }}
              />
            </Grid2>
            <Grid2 item size={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: {xs:'-1px',sm:'20px'} }}>
                <Button onClick={addSchemeDetail}>
                  <ControlPointOutlinedIcon />
                </Button>
                {schemeDetails.length > 1 && (
                  <Button
                    color="error"
                    onClick={() => removeSchemeDetail(index)}
                  >
                    <DeleteForeverOutlinedIcon />
                  </Button>
                )}
              </Box>
            </Grid2>
          </Grid2>
        ))}
      </div>
    </div>
  );
};

export default CustomScheme;
