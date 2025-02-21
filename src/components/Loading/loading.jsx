import React from 'react';
import Flow from './flow.json';
import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(54, 54, 54, 0.5)',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{width:'500px'}}>
      <Lottie animationData={Flow} loop={true}></Lottie>
      </div>

  <div style={{color:'#ffffff' , marginTop:'10px', fontWeight:'bold'}}>Loading ...</div> 
    </div>
  );
};

export default Loading;
