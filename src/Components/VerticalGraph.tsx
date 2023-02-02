// Authored by ChatGPT and Andrew Li
// Comments by Andrew Li

import React, { useEffect, useRef, useState } from 'react';
import Color from '../Types/Color';

type VerticalProps = {
  data: number[],
  options?: Options,
};

type Options = {
    height: number,
    width: number,
    unitRadius: number,
    unitPadding: number,
    errorColor: Color,
    warningColor: Color,
    goodColor: Color
};

const getColor = (e: number): string => { // numbers can be adjusted
    if(e >= 97) {
        return "bg-green-500";
    } else if (e >= 93) {
        return "bg-yellow-500";
    } else {
        return "bg-red-500";
    }
};

const VerticalGraph: React.FC<VerticalProps> = ({ data, options }) => {
  return (
    <div className="flex flex-col border-2 p-1 justify-center items-center">
        <div className={`flex flex-row w-[${options?.width}]`}>
            {data.map((e) => (
                <div className={`m-0.5 py-8 px-1 ${getColor(e)} rounded-sm`}></div>
            ))}
        </div>
        <div className='text-gray text-sm'>
            Average CPU Usage {Math.round(100*data.reduce((acc,cur) => acc + cur,0)/data.length)/100}%
        </div>
    </div>
  );
};

export default VerticalGraph;
