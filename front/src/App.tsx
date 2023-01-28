import { FC } from 'react';
import './App.css';
import UselessComponent from './Components/UselessComponent';
import Icon from './Static/icon.png';

const App: FC = () => {
  return (
    <div className="App">
      <img src={Icon} alt="aaa" width={100}/>
      <UselessComponent/>
    </div>
  );
};

export default App;
