import classNames from 'classnames';
import React from 'react';

const RoundButton = ({ title, onClick, isSelected, children, className }) => {
  return (
    <div
      className={classNames(
        'rounded-full bg-grayscale-200 flex flex-col items-center justify-around text-center p-10 m-5',
        'hover:scale-105 hover:bg-grayscale-300 transition-transform ease-in-out duration-200 ',
        { 'scale-105 bg-grayscale-400': isSelected },
        className
      )}
      onClick={onClick}
    >
      <div className='text-xl font-bold lg:text-2xl max-w-prose break-keep'>
        {title}
      </div>
      {children ? (
        <div className='text-xs lg:text-sm break-keep'>{children}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoundButton;
