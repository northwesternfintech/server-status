// Authored by ChatGPT and Andrew Li
// Comments by Andrew Li

import React from 'react';
import Options from '../Types/Option';

const getColor = (e: number): string => { // numbers can be adjusted
    if(e <= 33.3) {
        return "bg-green-500";
    } else if (e <= 66.7) {
        return "bg-yellow-500";
    } else {
        return "bg-red-500";
    }
};

const VerticalGraph: React.FC<{ data: {'timestamp': number, 'cpu_percent': number}[], options: Options }> = ({ data, options }) => {
    const [mouseX, setMouseX] = React.useState(0);
    const [mouseY, setMouseY] = React.useState(0);

    React.useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMouseX(event.clientX);
            setMouseY(event.clientY);
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
        window.removeEventListener(
            'mousemove',
            handleMouseMove
        );
        };
    },[]);

    const format = (date: Date) => {
        const stringMonth = `${date.getMonth() + 1}`.padStart(2,'0') + "/" + `${date.getDate()}`.padStart(2,'0') + "/" + `${date.getFullYear()}`.padStart(4,'0');
        const stringTime = ` @ ${date.getHours()}`.padStart(2,'0') + ":" + `${date.getMinutes()}`.padStart(2,'0') + ":" + `${date.getSeconds()}`.padStart(2,'0');
        return (<span>
            <span className='font-black'>[</span>
            {stringMonth} 
            <span className='font-black'>{stringTime}]</span></span>);
    };

    const HoverBox = (number: number, spec: number) => (
        <div className={`opacity-80 absolute bg-black px-1 py-1 text-white font-light text-sm`} style={{left: `${mouseX}px`, top: `${mouseY+15}px`}}>
            {format(new Date(number*1000))} <span className='font-black'>{`${Math.round(spec*1000)/1000}`.padEnd(5,'0')}%</span>
        </div>
    );

    return (
        <div className="flex flex-col border-2 p-1 justify-center items-center">
            <div className={`flex flex-row w-[${options.width}]`}>
                {data.map((e, index) => (
                    <div key={index+" "+e} className={`m-0.5 py-8 px-[0.3rem] ${getColor(e.cpu_percent)} rounded-sm hoverClass`}>

                        <div className="hoverBox">{HoverBox(e.timestamp, e.cpu_percent)}</div>

                    </div>
                ))}
            </div>
            <div className='text-gray text-sm'>
                Average CPU Usage {Math.round(100*data.reduce((acc,cur) => acc + cur.cpu_percent,0)/data.length)/100}%
            </div>
        </div>
    );
};

export default VerticalGraph;
