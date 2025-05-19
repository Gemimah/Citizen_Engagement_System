
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Complaint } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    fetch('/api/complaints')
      .then((res) => res.json())
      .then((data) => setComplaints(data));
  }, []);

  const statusData = {
    labels: ['Submitted', 'In Progress', 'Resolved'],
    datasets: [{
      label: 'Complaints by Status',
      data: [
        complaints.filter(c => c.status === 'Submitted').length,
        complaints.filter(c => c.status === 'In Progress').length,
        complaints.filter(c => c.status === 'Resolved').length
      ],
      backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: ['#36A2EB', '#FFCE56', '#4BC0C0'],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Complaint Status Distribution'
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Analytics Dashboard</h2>
      <div className="max-w-md mx-auto">
        <Bar data={statusData} options={options} />
      </div>
    </div>
  );
}
