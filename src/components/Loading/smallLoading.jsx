import React from 'react'
import Lottie from 'lottie-react';
import Paper from './Paper.json';
import Scan from './Scan.json';

const smallLoading = () => {
  return (
    <div style={{width:'100px'}}>
      <Lottie animationData={Scan} loop={true}/>
    </div>
  )
}

export default smallLoading
