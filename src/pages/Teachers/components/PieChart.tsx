import { FC } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const PieChart: FC = () => {
  const data = {
    labels: ["Teal", "Blue", "Yellow", "HotPink", "Red"],
    datasets: [
      {
        label: "My Pie Chart",
        data: [50, 50, 100, 110, 35.93],
        backgroundColor: ["teal", "blue", "yellow", "hotPink", "Red"],
        hoverOffset: 4,
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieChart;
