import React from 'react';

export type ProgressBarProps = {
    bgcolor?: string, // hex code
    xmin: number,
    xmax: number,
    value: number,
    label: string,
    width?: number
};

const FTProgressBar: React.FC<ProgressBarProps> = ({ bgcolor = "#4E2A84", xmin, xmax, value, label, width = 500 }) => {
    // make width customizable
    const MIN_WIDTH = 300;
    const WIDTH_STRING = `${width < MIN_WIDTH ? MIN_WIDTH : width}px`;
    return (
        <div className={`flex flex-col border-2 p-2 m-1`} style={{width: `${WIDTH_STRING}`}}>
            <div className='font-bold text-black'>
                {label} {WIDTH_STRING}
            </div>
            <div className={`flex flex-row w-full bg-gray-200 rounded`}>
                <div className={`p-3 px-0 rounded`} style={{backgroundColor: bgcolor, width: `${value < xmin ? 0 : 100*(value-xmin)/(xmax-xmin)}%`}}></div>
            </div>
            <div className='w-full flex justify-between align-middle text-sm'>
                <div>{xmin}</div>
                <div>{xmax}</div>
            </div>
        </div>
    );
};

export default FTProgressBar;
