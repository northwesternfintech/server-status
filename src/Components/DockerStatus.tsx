import React, { useState } from "react";

type ContainerInfo = {
    dockerId: string,
    personName: string,
    status: number, // 1 = finished, 2 = running, 3 = crashed, other = error
    startedAt: Date,
    debugNotes: Array<DebugNote> // type: 1 = ok, 2 = warn, 3 = fail/error/fatal
};

type DebugNote = {
    date: Date,
    msg: string,
    type: number
};

const StatusIcon: React.FC<{status: number}> = ({status}) => {
    switch(status) {
        case 1:
            return (<div className="cursor-default text-green-700 bg-green-300 rounded-lg px-2 py-1 font-bold text-center">Finished!</div>);
        case 2:
            return (<div className="cursor-default text-yellow-600 bg-yellow-300 rounded-lg px-2 py-1 font-bold text-center">Running...</div>);
        case 3:
            return (<div className="cursor-default text-red-600 bg-red-300 rounded-lg px-2 py-1 font-bold text-center">Crashed!</div>);
        default:
            return (<div className="cursor-default text-gray-300 bg-gray-700 rounded-lg px-2 py-1 font-bold text-center crashed-box">Error!</div>);
    }
};

const DockerRow: React.FC<{data: ContainerInfo, showNotesCallback: (data: ContainerInfo) => void}> = ({data, showNotesCallback}) => {
    
    /**
     * getMinsSecs returns a string containing minutes and seconds since a given date
     * @param date Date object
     * @returns Date formatted as MINUTES mins SECONDS secs
     */
    const getMinsSecs = (date: Date) => {
        let S_SINCE = new Date().getTime()/1000 - date.getTime()/1000;
        const M_SINCE = Math.floor(S_SINCE/60);
        S_SINCE %= 60;
        S_SINCE = Math.round(S_SINCE);

        return `${M_SINCE} mins ${S_SINCE} secs`;
    };

    /**
     * Returns a table containing information for this data row given from data props. On button click the callback is called.
     */
    return (
        <tr>
            <td>{data.personName}</td>
            <td className="hidden md:table-cell">{data.dockerId}</td>
            <td className="hidden sm:table-cell"><StatusIcon status={data.status}/></td>
            <td className="hidden md:table-cell">{getMinsSecs(data.startedAt)}</td>
            <td colSpan={2}>
                <div onClick={() => showNotesCallback(data)} className="cursor-pointer text-blue-600 bg-blue-200 hover:bg-blue-300 rounded-lg px-2 py-1 font-bold text-center transition-all ease-in">Show Notes</div>
            </td>
        </tr>
    );
};

export const DockerStatus: React.FC = () => {
    /**
     * Notes: do I show notes, or show all dockers?
     */
    const [notes, setNotes] = useState(false); // true = show notes, false = don't show notes

    /**
     * Which data is active?
     */
    const [active, setActive] = useState<ContainerInfo>(); // null = when notes aren't shown, something else = data to show

    /**
     * On change, the page is forcibly reloaded
     */
    const [forceReload, setForceReload] = useState(false);

    const FAKE_DATA: Array<ContainerInfo> = [
        {startedAt: new Date(2023, 1, 4), dockerId: "123", personName: "Bob", status: 1, debugNotes: [{date: new Date(), msg: "Note 1", type: 1}, {date: new Date(), msg: "Note 2", type: 1}]}, 
        {startedAt: new Date(2023, 1, 1), dockerId: "54871524", personName: "Dead Person", status: 2, debugNotes: [{date: new Date(), msg: "Note 3", type: 2}, {date: new Date(), msg: "Note 4", type: 3}]},
        {startedAt: new Date(2023, 0, 2), dockerId: "1234", personName: "Dead Person 2", status: 3, debugNotes: [{date: new Date(), msg: "Note 3", type: 1}, {date: new Date(), msg: "Note 4", type: 2}]},
        {startedAt: new Date(2022, 11, 31), dockerId: "A2", personName: "Error", status: 4, debugNotes: [{date: new Date(), msg: "Note 3", type: 1}, {date: new Date(), msg: "A very long note to see what happens if text wants to wrap for some reason because that is a real possibility this is a very long run on sentence but who cares. A very long note to see what happens if text wants to wrap for some reason because that is a real possibility this is a very long run on sentence but who cares.", type: 3}]},
        {startedAt: new Date(2023, 1, 7, 23, 30, 45), dockerId: "152634", personName: "God", status: 1, debugNotes: [{date: new Date(2020,1,23), msg: "EEEE aaaaa IOooOoOoOo iiiIiiIIiI uUuUuUUuUUuuuuu SAHKBDLSAHDAHSKAFBDJYHBFEYIDAJH =BFHASGBIUASLHKFASYGHK -COVID 19 virus", type: 3}]}
    ];

    /**
     * Show notes for given container
     * @param data which one to show
     */
    const showNotes = (data: ContainerInfo) => {
        setNotes(true);
        setActive(data);
    };

    /**
     * Formats date: MM/DD/YYYY hh:mm:ss
     */
    const formatDate = (date: Date, isShort=true): string => {
        const MONTH = (date.getMonth() + 1).toString().padStart(2, "0");
        const DAY = (date.getDate()).toString().padStart(2, "0");
        const YEAR = (date.getFullYear()).toString();

        const HOURS = date.getHours().toString().padStart(2, "0");
        const MINS = date.getMinutes().toString().padStart(2, "0");
        const SECS = date.getSeconds().toString().padStart(2, "0");

        if(isShort) {
            return `${MONTH}/${DAY}, ${HOURS}:${MINS}:${SECS}`;
        } else {
            return `${MONTH}/${DAY}/${YEAR} @ ${HOURS}:${MINS}:${SECS}`;
        }
    };

    /**
     * If show notes, show notes for active docker container. If not, show all containers.
     */
    if(notes) { // if showing notes, return all notes
        return (<table className="dockerStatusTable">
            <thead>
                <th className="text-left hidden sm:table-cell"></th>
                <th className="text-left">Time</th>
                <th className="text-left">Message</th>
                <th onClick={() => setNotes(false)} className="cursor-pointer text-right">&#x2715;</th>
            </thead>
            <tbody>
                {active?.debugNotes.map((e: DebugNote) => (
                    <tr className={e.type === 1 ? "" : e.type === 2 ? "text-orange-400" : "text-red-500"}>
                        <td className="hidden sm:table-cell"><span className="font-bold">{e.type === 1 ? "" : e.type === 2 ? "[WARN]" : "[ERROR]"}</span></td>
                        <td className="hidden sm:table-cell">{formatDate(e.date, false)}</td>
                        <td className="table-cell sm:hidden">{formatDate(e.date, true)}</td>
                        <td colSpan={2} className="hidden sm:table-cell">{e.msg}</td>
                        <td colSpan={2} className="table-cell sm:hidden"><span className="font-bold">{e.type === 1 ? "" : e.type === 2 ? "[WARN]" : "[ERROR]"}</span> {e.msg}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <td colSpan={4}></td>
            </tfoot>
        </table>);
    } else { // If not showing notes, return main interface
        return (
            <table className="dockerStatusTable">
                <thead>
                    <th className="text-left">Runner Name</th>
                    <th className="text-left hidden md:table-cell">Docker ID</th>
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
                <tfoot>
                    <td colSpan={6}></td>
                </tfoot>
            </table>
        );
    }
};

export default DockerStatus;
