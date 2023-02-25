import { FC } from 'react';
import './App.css';
//import D3Line from './Components/D3Line';
import DockerStatus from './Components/DockerStatus';
import { StatusBox } from './Components/StatusBox';
import VerticalGraph from './Components/VerticalGraph';

const App: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <StatusBox label={"CPU Usage"} endpoint='https://www.andrewli.lol/api/nuft/fakedata' DataView={VerticalGraph}/>
      <DockerStatus/>
    </div>
  );
};

export default App;
