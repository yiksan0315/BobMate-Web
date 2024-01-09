import classNames from 'classnames';
import React from 'react';

const NextButton = ({ children, onClick }) => {
  return (
    <div
      className={classNames(
        'mx-2 py-1 px-3 border-2 border-slate-950 rounded-md',
        'hover:scale-105 hover:bg-slate-200 transition-transform ease-in-out duration-100'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default NextButton;
