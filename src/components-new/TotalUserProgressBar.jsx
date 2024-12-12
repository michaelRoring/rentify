import React, { useEffect, useState } from 'react';
import IndicatorStatus from './IndicatorStatus';
import axios from 'axios';
import { animateCounter } from '@/utils/animatedCounter';

const TotalUserProgressBar = () => {

  const [totalVisitor, setTotalVisitor] = useState(0);
  const [isLoadingTotalVisitor, setIsLoadingTotalVisitor] = useState(true);

  useEffect(() => {
    const getRentStats = async () => {
      try {
        const {data} = await axios.get('/api/visitor-stats')
        if(data) {
          animateCounter(data.totalVisitors, setTotalVisitor)
        }
      }
      catch(error) {
        console.log('error: ', error);
      }

      setIsLoadingTotalVisitor(false)
    }
    getRentStats()
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-[20px]">
        <IndicatorStatus />
        <div>Total Online: {" "}{totalVisitor} User</div>
      </div>
      <div className="bg-[#ffffff07] backdrop-blur-lg w-full h-[16px] rounded-full border border-white/20">
        <div className="bg-[#0D7373] h-[16px] rounded-full shadow-lg shadow-[#61F8F8]/50" style={{width: `${(totalVisitor / 700) * 100}%`}}></div>
      </div>
    </div>
  );
}

export default TotalUserProgressBar;
