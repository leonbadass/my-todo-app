import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,LinearScale,BarElement);

const BarChart = ({ taskList }) => {
  const tasks = Object.values(taskList);
  const notStarted = tasks.filter(task => task.status === 'Not Started').length;
  const completed = tasks.filter(task => task.status === 'Completed').length;
  const ongoing = tasks.filter(task => task.status === 'Ongoing').length;

  const data = {
    labels: ['Not Started', 'Ongoing', 'Completed'],
    datasets: [
      {
        label: 'Task Status',
        data: [notStarted, ongoing, completed],
        backgroundColor: [ '#8b0000','#e69603', '#008000'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='barchart'>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
