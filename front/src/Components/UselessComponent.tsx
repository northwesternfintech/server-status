import { FC, useState } from "react";
import LineGraph from "./LineGraph";

// Useless Component: does nothing
/**
 * Props:
 * [param1: Type]: does nothing
 * [param2: Type]: does nothing
 * [param3: Type]: does nothing
 */
export const UselessComponent: FC = () => {
    const [data, setData] = useState<number[]>([3,2,4]);

    const range = (min: number, max: number): Array<number> => {
        const arr = [];
        for(let i = min; i <= max; i ++) {
          arr.push(i);
        }
    
        return arr;
    };

    const input = {
        labels: range(1,data.length),
        datasets: [
            {
                label: 'string', 
                data: data, 
                borderColor: 'rgb(255,0,0)', 
                backrgoundColor: 'rgb(0,255,0)'
            }
        ]
    };

    return (
        <div style={{width: "50%"}}>
            Click me to add a random data point from 1-10: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                // ignore the fact that this code is unreadable for now...
                const currentData = data;

                currentData.push(Math.round(Math.random()*10));

                setData([...currentData]);
            }}>Add</button>
            <LineGraph data={input}/>

            <p>{data.join(" ")}</p>
        </div>
    );
};

export default UselessComponent;
