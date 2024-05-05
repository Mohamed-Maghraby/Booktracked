import { useState, useRef } from 'react';

function useTimedInfo(boolean, delay) {
  const [showInfo, setShowInfo] = useState(boolean);
  const timeoutIdRef = useRef(null); // Ref to store timeout ID

  function timedInfo () {
    //Reverse boolean
    setShowInfo(!showInfo);

    // Clear any existing timeout
    clearTimeout(timeoutIdRef.current)

    //set timeout, waits for delay then reverses the boolean agian (hides info after delay time) 
    timeoutIdRef.current = setTimeout(()=>{
      setShowInfo(prev => !prev);
    }, delay)
    
  }

  return [showInfo, timedInfo];
}

export default useTimedInfo;