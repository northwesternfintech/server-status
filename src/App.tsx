import { FC } from 'react';
import './App.css';
import D3Line from './Components/D3Line';
import DockerStatus from './Components/DockerStatus';
import { StatusBox } from './Components/StatusBox';
import VerticalGraph from './Components/VerticalGraph';

const App: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <StatusBox label={"Server Uptime"} endpoint='https://www.andrewli.org/api/nuft/fakedata' DataView={D3Line}/>
      <StatusBox label={"Server Uptime 2"} endpoint='https://www.andrewli.org/api/nuft/fakedata' DataView={VerticalGraph}/>
      <DockerStatus/>
    </div>
  );
};

export default App;
