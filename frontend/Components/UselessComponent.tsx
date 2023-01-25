import { FunctionComponent, useState } from "react";

// Useless Component: does nothing
/**
 * Props:
 * [param1: Type]: does nothing
 * [param2: Type]: does nothing
 * [param3: Type]: does nothing
 */
export const UselessComponent: FunctionComponent = () => {
    const [state, setState] = useState(false);

    return (
        <div onClick={() => setState(!state)} className={` ${state ? "text-3xl bg-red-300" : "text-2xl bg-blue-300"} font-bold underline`}>
            <span>I am {state ? "big" : "small"} text. Click me to change me.</span>
        </div>
    );
};

export default UselessComponent;
