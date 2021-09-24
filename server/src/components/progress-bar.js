import React from 'react';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const ProgressBar = ({
  percent,
  amount,
  rate,
  text,
  disbursement,
  color,
  disbursementLabel,
  disbursementSpan,
  disbursementLabelText,
  disbursementSpanText,
}) => {
  return (
    <div className={`disburment-card mrg-btm ${color} `}>
      <div className="disburment-card-sec">
        <div className="disburment-card-img">
          <CircularProgressbarWithChildren value={percent}>
            <p className="progress-bar-number">
              {percent}
              <span className="progress-bar-precentage">%</span>
            </p>
          </CircularProgressbarWithChildren>
        </div>
        <div className="disburment-card-text">
          {amount ? (
            <h1>
              &#8377;
              {amount}
            </h1>
          ) : (
            <h1>{rate}</h1>
          )}

          <p>{text}</p>
          <label className={`${color}`}>{disbursement}</label>
        </div>
      </div>
      {disbursementLabel !== '' && (
        <div className="disburment-card-label">
          <label>
            {disbursementLabel}
            <span>{disbursementSpan}</span>
          </label>
        </div>
      )}

      {disbursementLabelText !== '' && (
        <div className="disburment-card-label">
          <label>
            {disbursementLabelText}
            <span>&#8377; {disbursementSpanText}</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
