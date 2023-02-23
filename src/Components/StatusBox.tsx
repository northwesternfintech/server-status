import { FC, useState } from "react";
import Color from "../Types/Color";
import axios from "axios";
import ReloadIcon from '../Reload.png';
import { Options } from "../Types/Option";
import useSWR from 'swr';

/**
 * CONFIG
 */

const REFRESH_INTERVAL_MS = 1000; // refersh every ? ms

// end config

const fetcher = (endpoint: string) => axios.get(endpoint).then(res => res.data);

export const StatusBox: FC<{endpoint: string, label: string, DataView: React.FC<{data: any[], options: Options}>}> = ({endpoint, label, DataView}) => {
    const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher, { refreshInterval: REFRESH_INTERVAL_MS });
    const [status, setStatus] = useState(0);

    if(error) {
        return (
            <div className="flex flex-col p-4 items-center justify-center w-2/4">
                <div className="font-bold flex flex-row w-full items-center justify-center">
                    <div className="m-1">{label}</div>
                    <img className="cursor-pointer m-1" onClick={() => reload()} src={ReloadIcon} width={20}/>
                    <div className={`m-1 font-black text-2xl text-red-600`}>•</div>
                </div>
            </div>
        );
    }

    if(isLoading) {
        return (
            <div className="flex flex-col p-4 items-center justify-center w-2/4">
                <div className="font-bold flex flex-row w-full items-center justify-center">
                    <div className="m-1">{label}</div>
                    <img className="cursor-pointer m-1" onClick={() => reload()} src={ReloadIcon} width={20}/>
                    <div className={`m-1 font-black text-2xl text-yellow-500`}>•</div>
                </div>
            </div>
        );
    }

    const reload = () => {
        setStatus(2);
        mutate().then(() => {
            setStatus(1);
        });
    };

    // const formatData = (data: Array<{'timestamp': number, 'cpu_percent': number}>): number[] => {
    //     // cannot assume this is sorted, so we sort by timestamp
    //     data.sort((a,b) => a.timestamp - b.timestamp);
    //     const output: number[] = [];
    //     data.forEach(e => {
    //         output.push(e.cpu_percent);
    //     });

    //     return output;
    // };

    const color = status === 3 ? "text-red-600" : status === 2 ? "text-yellow-500" : "text-green-500";

    return (
        <div className="flex flex-col p-4 items-center justify-center w-2/4">
            <div className="font-bold flex flex-row w-full items-center justify-center">
                <div className="m-1">{label}</div>
                <img className="cursor-pointer m-1" onClick={() => reload()} src={ReloadIcon} width={20}/>
                <div className={`m-1 font-black text-2xl ${color}`}>•</div>
            </div>
            <DataView data={data} options={{
                height: 250,
                width: 900,
                inset: 30,
                rounded: 0,
                borderColor: Color.fromHex("#414141"),
                borderThickness: 0,
                strokeColor: Color.fromHex("#414141"),
                strokeThickness: 2
            }}/>
        </div>
    );
};

export default StatusBox;

