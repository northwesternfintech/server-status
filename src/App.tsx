import React, { FC, useState } from 'react';
import './App.css';
import DockerStatus from './Components/Dataviews/DockerStatus';
import FTHistogram from './Components/Dataviews/FTHistogram';
import FTLineMetric from './Components/Dataviews/FTLineMetric';
import FTProgressBar from './Components/Dataviews/FTProgressBar';
import { LineMetricProps } from './Components/Dataviews/FTLineMetric';
import { ProgressBarProps } from './Components/Dataviews/FTProgressBar';
import { HistogramProps } from './Components/Dataviews/FTHistogram';

const LineMetricCreate: FC<{callback: (arg1: LineMetricProps) => void}> = ({callback}) => {
  const [xString, setXString] = React.useState("");
  const [yString, setYString] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const add = () => {
    if(xString === "" || yString === "" || !title || !width || !height) {
      return;
    }

    //parse data
    const d: {x: number, y: number}[] = [];
    const parsedX = xString.match(/(\d)*([.]*)(\d)+/g) || [];
    const parsedY = yString.match(/(\d)*([.]*)(\d)+/g) || [];

    if(parsedX.length === 0 || parsedY.length === 0) {
      return;
    }

    const shorterLength = parsedX.length < parsedY.length ? parsedX.length : parsedY.length;
    for(let i = 0; i < shorterLength; i ++) {
      d.push({x: parseFloat(parsedX[i]), y: parseFloat(parsedY[i])});
    }

    callback({unsortedData: d, title: title, width: width, height: height});
  };

  return (
    <div>
      <div>Create New Line Graph</div>
      <div>Enter X values, separated by spaces: <input value={xString} onChange={(e) => setXString(e.target.value)} placeholder='Enter x values, separated by spaces' className='border-2'/></div>
      <div>Enter Y values, separated by spaces: <input value={yString} onChange={(e) => setYString(e.target.value)} placeholder='Enter y values, separated by spaces' className='border-2'/></div>
      <div>Title: <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='border-2'/></div>
      <div>Width (PIXELS): <input value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} placeholder='Width' type={'number'} className='border-2'/></div>
      <div>Height (PIXELS): <input value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} placeholder='Height' type={'number'} className='border-2'/></div>
      <div><button onClick={add} className='px-5 py-1 m-1 bg-red-200'>Add</button></div>
    </div>
  );
};

const ProgressBarCreate: FC<{callback: (arg1: ProgressBarProps) => void}> = ({callback}) => {
  const [title, setTitle] = React.useState("");
  const [width, setWidth] = React.useState(0);
  const [xmin, setXmin] = React.useState(0);
  const [xmax, setXmax] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const add = () => {
    callback({label: title, width: width, xmin: xmin, xmax: xmax, value: value});
  };

  return (
    <div>
      <div>Create New Progress Bar</div>
      <div>Title: <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='border-2'/></div>
      <div>Width (PIXELS): <input value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} placeholder='Width' type={'number'} className='border-2'/></div>
      <div>Min X: <input value={xmin} onChange={(e) => setXmin(parseFloat(e.target.value))} placeholder='Min X' type={'number'} className='border-2'/></div>
      <div>Max X: <input value={xmax} onChange={(e) => setXmax(parseFloat(e.target.value))} placeholder='Max X' type={'number'} className='border-2'/></div>
      <div>Value: <input value={value} onChange={(e) => setValue(parseFloat(e.target.value))} placeholder='Value' type={'number'} className='border-2'/></div>
      <div><button onClick={add} className='px-5 py-1 m-1 bg-red-200'>Add</button></div>
    </div>
  );
};

const HistogramCreate: FC<{callback: (arg1: HistogramProps) => void}> = ({callback}) => {
  const [title, setTitle] = React.useState("");
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [data, setData] = React.useState("");

  const add = () => {
    const parsedData = data.match(/(\d)*([.]*)(\d)+/g) || [];

    if(parsedData.length === 0) {
      return;
    }

    const intData = [];
    for(const s of parsedData) {
      intData.push(parseFloat(s));
    }

    callback({title: title, width: width, height: height, data: intData});
  };

  return (
    <div>
      <div>Create New Histogram</div>
      <div>Title: <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='border-2'/></div>
      <div>Width (PIXELS): <input value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} placeholder='Width' type={'number'} className='border-2'/></div>
      <div>Height (PIXELS): <input value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} placeholder='Height' type={'number'} className='border-2'/></div>
      <div>Data, separate with spaces: <input value={data} onChange={(e) => setData(e.target.value)} placeholder='Data, separate with spaces' className='border-2'/></div>
      <div><button onClick={add} className='px-5 py-1 m-1 bg-red-200'>Add</button></div>
    </div>
  );
};

const App: FC = () => {
  const [lineMetrics, setLineMetrics] = React.useState<LineMetricProps[]>([]);
  const [progressBars, setProgressBars] = React.useState<ProgressBarProps[]>([]);
  const [histograms, setHistograms] = React.useState<HistogramProps[]>([]);

  const [upd, setUpd] = React.useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <DockerStatus/>
      <LineMetricCreate callback={(a: LineMetricProps): void => {
        const cur = lineMetrics;
        cur.push(a);
        setLineMetrics(cur);
        setUpd(!upd);
      }}/>
      {lineMetrics.map(e => (
        <FTLineMetric key={e.unsortedData.toString()} title={e.title} unsortedData={e.unsortedData} width={e.width} height={e.height}/>
      ))}

      <ProgressBarCreate callback={(a: ProgressBarProps): void => {
        const cur = progressBars;
        cur.push(a);
        setProgressBars(cur);
        setUpd(!upd);
      }}/>
      {progressBars.map(e => (
        <FTProgressBar label={e.label} xmin={e.xmin} xmax={e.xmax} value={e.value} width={e.width}/>
      ))}

      <HistogramCreate callback={(a: HistogramProps): void => {
        const cur = histograms;
        cur.push(a);
        setHistograms(cur);
        setUpd(!upd);
      }}/>
      {histograms.map(e => (
        <FTHistogram title={e.title} width={e.width} height={e.height} data={e.data}/>
      ))}
    </div>
  );
};

export default App;
