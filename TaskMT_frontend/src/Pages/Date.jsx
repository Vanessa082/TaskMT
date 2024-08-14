import React from 'react';  

const TodayDate = () => {  
  const today = new Date(); // Gets the current date  
  const formattedDate = today.toLocaleDateString(); // Formats the date  

  return <div>{formattedDate}</div>;  
};  

export default TodayDate;