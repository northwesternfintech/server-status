import React, { useState } from "react";

type DataType = {
    dockerId: string,
    personName: string,
    status: number, // 1 = finished, 2 = running, 3 = crashed, other = error
    startedAt: Date,
    debugNotes: Array<{date: Date, msg: string, type: number}> // type: 1 = ok, 2 = warn, 3 = fail/error/fatal
};

const StatusIcon: React.FC<{status: number}> = ({status}) => {
    switch(status) {
        case 1:
            return (<div className="text-green-700 bg-green-300 rounded-lg px-2 py-1 font-bold text-center">Finished!</div>);
        case 2:
            return (<div className="text-yellow-600 bg-yellow-300 rounded-lg px-2 py-1 font-bold text-center">Running...</div>);
        case 3:
            return (<div className="text-red-600 bg-red-300 rounded-lg px-2 py-1 font-bold text-center">Crashed!</div>);
        default:
            return (<div className="text-white bg-black rounded-lg px-2 py-1 font-bold text-center">Error!</div>);
    }
};

const DockerRow: React.FC<{data: DataType, showNotesCallback: (data: DataType) => void}> = ({data, showNotesCallback}) => {
    const getMinsSecs = (date: Date) => {
        let S_SINCE = new Date().getTime()/1000 - date.getTime()/1000;
        const M_SINCE = Math.floor(S_SINCE/60);
        S_SINCE %= 60;
        S_SINCE = Math.round(S_SINCE);

        return `${M_SINCE} mins ${S_SINCE} secs`;
    };

    return (
        <tr>
            <td className="hidden md:table-cell">{data.dockerId}</td>
            <td>{data.personName}</td>
            <td className="hidden sm:table-cell"><StatusIcon status={data.status}/></td>
            <td className="hidden md:table-cell">{getMinsSecs(data.startedAt)}</td>
            <td colSpan={2}>
                <div onClick={() => showNotesCallback(data)} className="cursor-pointer text-blue-600 bg-blue-200 rounded-lg px-2 py-1 font-bold text-center">Show Notes</div>
            </td>
        </tr>
    );
};

export const DockerStatus: React.FC = () => {
    const [notes, setNotes] = useState(false); // true = show notes, false = don't show notes
    const [active, setActive] = useState<DataType>(); // null = when notes aren't shown, something else = data to show

    const [forceReload, setForceReload] = useState(false);

    const FAKE_DATA: Array<DataType> = [
        {startedAt: new Date(2023, 1, 4), dockerId: "123", personName: "Bob", status: 1, debugNotes: [{date: new Date(), msg: "Note 1", type: 1}, {date: new Date(), msg: "Note 2", type: 1}]}, 
        {startedAt: new Date(2023, 1, 1), dockerId: "54871524", personName: "Dead Person", status: 2, debugNotes: [{date: new Date(), msg: "Note 3", type: 2}, {date: new Date(), msg: "Note 4", type: 3}]},
        {startedAt: new Date(2023, 0, 2), dockerId: "1234", personName: "Dead Person 2", status: 3, debugNotes: [{date: new Date(), msg: "Note 3", type: 1}, {date: new Date(), msg: "Note 4", type: 2}]},
        {startedAt: new Date(2022, 11, 31), dockerId: "A2", personName: "Error", status: 4, debugNotes: [{date: new Date(), msg: "Note 3", type: 1}, {date: new Date(), msg: "A very long note to see what happens if text wants to wrap for some reason because that is a real possibility this is a very long run on sentence but who cares. A very long note to see what happens if text wants to wrap for some reason because that is a real possibility this is a very long run on sentence but who cares.", type: 3}]}
    ];

    const showNotes = (data: DataType) => {
        setNotes(true);
        setActive(data);
    };

    if(notes) { // if showing notes, return all notes
        return (<table className="dockerStatusTable" style={{maxWidth: "50vw"}}>
            <thead>
                <th className="text-left"></th>
                <th className="text-left">Time</th>
                <th className="text-left">Message</th>
                <th onClick={() => setNotes(false)} className="cursor-pointer text-right">&#x2715;</th>
            </thead>
            <tbody>
                {active?.debugNotes.map((e) => (
                    <tr className={e.type === 1 ? "" : e.type === 2 ? "text-orange-400" : "text-red-500"}>
                        <td>{e.type === 1 ? "" : e.type === 2 ? "[WARN]" : "[ERROR]"}</td>
                        <td>{e.date.toISOString()}</td>
                        <td colSpan={2}>{e.msg}</td>
                    </tr>
                ))}
            </tbody>
        </table>);
    } else { // if not showing notes, return main interface
        return (
            <table className="dockerStatusTable">
                <thead>
                    <th className="text-left hidden md:table-cell">Docker ID</th>
                    <th className="text-left">Runner Name</th>
                    <th className="text-left hidden sm:table-cell">Status</th>
                    <th className="text-left hidden md:table-cell">Time Since Start</th>
                    <th className="text-left">View Debug Notes</th>
                    <th onClick={() => setForceReload(!forceReload)} className="cursor-pointer text-right">&#8634;</th>
                </thead>
                <tbody>
                    {FAKE_DATA.map((e) => (
                        <DockerRow data={e} key={e.dockerId} showNotesCallback={showNotes}/>
                    ))}
                </tbody>
            </table>
        );
    }
};

export default DockerStatus;
