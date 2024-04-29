import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BarChartProps {
  stats: Stat[];
}

const BarChart = ({ stats }: BarChartProps) => {
  const labels = stats.map((stat) => stat.stat.name);
  const data = {
    labels,
    datasets: [
      {
        data: stats.map((stat) => stat.base_stat),
        backgroundColor: 'rgba(0, 162, 235)',
      },
    ],
  };

  return <Bar data={data} options={{ responsive: true }} />;
};

export default BarChart;
