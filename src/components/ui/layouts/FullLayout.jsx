import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Outlet } from 'react-router-dom'; 
import logoImg from '../../../assets/logoHere.png';
import BackImg from '../../../assets/mainBackground.svg'

// Sidebar Navigations
const SidebarItems = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home', //This is the home route
    title: 'Home',
    icon: <HomeOutlinedIcon />,
  },
  {
    segment: 'Assignments', //This is the Assigment route
    title: 'Assignment',
    icon: <AssignmentOutlinedIcon />,
    expanded: true,
    children: [
      {
        segment: 'pending', //This is the  Pending Assigment route
        title: 'Pending Assignments',
        icon: <PendingActionsOutlinedIcon />,
      },
      {
        segment: 'completed', //This is the  completed Assigment route
        title: 'Completed Assignments',
        icon: <ChecklistOutlinedIcon />,
      },
    ],
  },
  {
    segment: 'settings', //This is the settings route
    title: 'Settings',
    icon: <SettingsOutlinedIcon />,
  },
  
];

function FullLayout(props) {

//------ This is the custom theme for the sidebar layout ------

  // const customTheme = createTheme({
  //   cssVariables: {
  //     colorSchemeSelector: 'data-toolpad-color-scheme',
  //   },
  //   colorSchemes: {
  //     light: {
  //       palette: {
  //         background: {
  //           default: '#F9F9FE',
  //           paper: '#EEEEF9',
  //         },
  //       },
  //     },
  //     dark: {
  //       palette: {
  //         background: {
  //           default: '#2A4364',
  //           paper: '#112E4D',
  //         },
  //       },
  //     },
  //   },
  //   breakpoints: {
  //     values: {
  //       xs: 0,
  //       sm: 600,
  //       md: 600,
  //       lg: 1200,
  //       xl: 1536,
  //     },
  //   },
  // });
  
  return (
    <AppProvider
      //Sidebar menu items
      navigation={SidebarItems} 
      // theme={customTheme}   
      branding={{
        logo: <img style={{width:'100px'}} src={logoImg}></img>,
        homeUrl: '/',
        title: ' ',
      }}
      
    >
      <DashboardLayout 
      defaultSidebarCollapsed
      sidebarExpandedWidth='17%'
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        
      }} >
        {/* This is where nested content will be rendered */}
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

export default FullLayout;
