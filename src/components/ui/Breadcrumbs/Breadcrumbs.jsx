import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';

const BreadcrumbsComponent = () => {
  const location = useLocation(); // Get the current location
  const pathSegments = location.pathname.split('/').filter((segment) => segment); // Get path segments for breadcrumbs

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: '2%' }} >
      {/*---breadcrumbs icon ----- */}
      <ChromeReaderModeTwoToneIcon sx={{ width: '18px' }} />
      {/*---breadcrumbs content ----- */}
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return (
          <Link key={index} to={path} style={{ textDecoration: 'none' }}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
