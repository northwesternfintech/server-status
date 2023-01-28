// Written by Andrew Li, CO2026 in December 2022

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FunctionComponent } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineGraph: FunctionComponent<{data: any}> = ({data}) => {
    return (
        <Line data={data} />
    );
};

export default LineGraph;
