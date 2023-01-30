import { FC } from 'react';
import './App.css';
import { StatusBox } from './Components/StatusBox';

const App: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <StatusBox label={"Server Uptime"} endpoint='https://www.andrewli.org/api/nuft/fakedata'/>
      <StatusBox label={"Server Uptime 2"} endpoint='https://www.andrewli.org/api/nuft/fakedata'/>
    </div>
  );
};

export default App;
