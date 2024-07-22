// TasksList.js
import React, { ReactNode } from 'react';
import { TimelineProvider } from './apiContext';

export  const Timeline : React.FC<{ children: ReactNode }>=({children}) => {
  return <TimelineProvider>{children}</TimelineProvider>;
};


