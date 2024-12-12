import React from 'react';
import TextTitle from './TextTitle';
import IndicatorStatus from './IndicatorStatus';

const TextTitleWithStatus = ({text, withoutIndicator}) => {
  
  return (
    <TextTitle>
      <div className="flex items-center gap-[20px]">
        {text}
        {!withoutIndicator && <IndicatorStatus />}
      </div>
    </TextTitle>
  );
}

export default TextTitleWithStatus;
