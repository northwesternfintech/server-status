import { FC, useEffect, useState } from "react";
import Color from "../Types/Color";
import D3Line from "./D3Line";
import axios, { AxiosResponse } from "axios";
import ReloadIcon from '../Reload.png';

export const StatusBox: FC<{endpoint: string, label: string}> = ({endpoint, label}) => {
    const [data, setData] = useState<number[]>([100]);
    const [status, setStatus] = useState(1); // 1 = not ok, 2 = questionable, 3 = ok

    useEffect(() => {
        axios.get(endpoint).then((res: AxiosResponse) => {
            setData(res.data);
            setStatus(3);
        }).catch((error: Error) => {
            setStatus(1);
            console.error(error.message);
        });
    },[]);

    const reload = () => {
        setStatus(2);
        axios.get(endpoint).then((res: AxiosResponse) => {
            setData(res.data);
            setStatus(3);
        }).catch((error: Error) => {
            setStatus(1);
            console.error(error.message);
        });
    };

    const color = status === 1 ? "text-red-600" : status === 2 ? "text-yellow-500" : "text-green-500";

    return (
        <div className="flex flex-col p-4 items-center justify-center w-2/4">
            <div className="font-bold flex flex-row w-full items-center justify-center">
                <div className="m-1">{label}</div>
                <img className="cursor-pointer m-1" onClick={() => reload()} src={ReloadIcon} width={20}/>
                <div className={`m-1 font-black text-2xl ${color}`}>•</div>
            </div>
            <D3Line data={data} options={{
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
