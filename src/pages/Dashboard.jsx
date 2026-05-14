import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Article Views',
      data: [650, 590, 800, 810, 1050, 1200, 1500],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4
    },
  ],
};

const barData = {
  labels: ['Geopolitics', 'Laws', 'Diplomacy', 'Policies'],
  datasets: [
    {
      label: 'Articles Published',
      data: [12, 19, 8, 15],
      backgroundColor: '#8B5CF6',
    },
  ],
};

export function Dashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-2xl)' }}>Creator Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
        <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase' }}>Total Views</h3>
          <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: 'var(--space-xs) 0' }}>6,600</p>
          <span style={{ color: 'var(--success)', fontSize: 'var(--text-sm)' }}>+12% from last month</span>
        </div>
        <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase' }}>Published Articles</h3>
          <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: 'var(--space-xs) 0' }}>54</p>
          <span style={{ color: 'var(--success)', fontSize: 'var(--text-sm)' }}>+3 this week</span>
        </div>
        <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase' }}>Subscribers</h3>
          <p style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: 'var(--space-xs) 0' }}>1,240</p>
          <span style={{ color: 'var(--success)', fontSize: 'var(--text-sm)' }}>+8% from last month</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-xl)' }}>
        <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Traffic Overview</h3>
          <Line options={{ responsive: true }} data={lineData} />
        </div>
        <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)' }}>
          <h3 style={{ marginBottom: 'var(--space-md)' }}>Content Distribution</h3>
          <Bar options={{ responsive: true }} data={barData} />
        </div>
      </div>
    </div>
  );
}
