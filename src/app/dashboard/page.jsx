"use client";
import React, { useState, useEffect } from 'react';
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
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { mockArticles } from '../../data/mockArticles';
import { Tilt3D } from '../../components/ui/Tilt3D';
import { useStore } from '../../store/useStore';
import { useRouter } from 'next/navigation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const categoryColors = {
  'Geopolitics': '#4F46E5',
  'International Relations': '#10B981',
  'Laws & Legislation': '#F59E0B',
  'Policies': '#EF4444',
  'Defense & Security': '#8B5CF6',
  'Global Economy': '#EC4899',
  'Science & Tech': '#06B6D4',
  'Health': '#F97316',
  'Energy & Climate': '#84CC16',
  'Diplomacy': '#14B8A6'
};

export default function Dashboard() {
  const { isAdmin } = useStore();
  const router = useRouter();
  
  React.useEffect(() => {
    if (!isAdmin) {
      const timeout = setTimeout(() => {
        if (!useStore.getState().isAdmin) router.push('/');
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isAdmin, router]);

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { db } = await import('../../lib/firebase');
        const { collection, getDocs } = await import('firebase/firestore');
        const querySnapshot = await getDocs(collection(db, 'articles'));
        const fetchedArticles = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const savedArticles = articles;
  const allArticles = [...savedArticles, ...mockArticles];
  const totalArticlesCount = savedArticles.length;
  
  const subscribers = []; // For now, we can skip fetching subscribers or mock it
  const totalSubscribersCount = subscribers.length;

  const loggedViewsSum = savedArticles.reduce((sum, article) => sum + (article.views || 0), 0);
  const totalViewsCount = loggedViewsSum;

  // Compute category counts
  const categoryCounts = {};
  allArticles.forEach(a => {
    const cat = a.category || 'Geopolitics';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const textColor = isDark ? '#9CA3B8' : '#4B5563';
  const gridColor = isDark ? '#2A3040' : '#E0E2E8';

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Article Views',
        data: [650, 590, 800, 810, 1050, 1200, 1500 + loggedViewsSum],
        borderColor: '#3B82F6',
        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
        fill: true,
        tension: 0.4
      },
    ],
  };

  const barData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Articles Published',
        data: Object.values(categoryCounts),
        backgroundColor: Object.keys(categoryCounts).map(cat => categoryColors[cat] || '#3B82F6'),
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: { family: 'Inter', size: 11 }
        }
      }
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: 'Inter', size: 10 } }
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { family: 'Inter', size: 10 } }
      }
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-2xl)' }}>Creator Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
        <Tilt3D maxAngle={8} scale={1.03} style={{ display: 'flex' }}>
          <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)', width: '100%', transformStyle: 'preserve-3d' }}>
            <h3 className="parallax-3d-sm" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', margin: 0 }}>Total Views</h3>
            <p className="parallax-3d-lg" style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: 'var(--space-xs) 0' }}>
              {totalViewsCount.toLocaleString()}
            </p>
            <span className="parallax-3d-md" style={{ color: 'var(--success)', fontSize: 'var(--text-sm)', display: 'block' }}>+{12 + loggedViewsSum > 0 ? (12 + (loggedViewsSum / 66).toFixed(1)) : 12}% from last month</span>
          </div>
        </Tilt3D>
        
        <Tilt3D maxAngle={8} scale={1.03} style={{ display: 'flex' }}>
          <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)', width: '100%', transformStyle: 'preserve-3d' }}>
            <h3 className="parallax-3d-sm" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', margin: 0 }}>Published Articles</h3>
            <p className="parallax-3d-lg" style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: 'var(--space-xs) 0' }}>
              {totalArticlesCount}
            </p>
            <span className="parallax-3d-md" style={{ color: 'var(--success)', fontSize: 'var(--text-sm)', display: 'block' }}>+{savedArticles.length} this session</span>
          </div>
        </Tilt3D>
        
        <Tilt3D maxAngle={8} scale={1.03} style={{ display: 'flex' }}>
          <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)', width: '100%', transformStyle: 'preserve-3d' }}>
            <h3 className="parallax-3d-sm" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', margin: 0 }}>Subscribers</h3>
            <p className="parallax-3d-lg" style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: 'var(--space-xs) 0' }}>
              {totalSubscribersCount.toLocaleString()}
            </p>
            <span className="parallax-3d-md" style={{ color: 'var(--success)', fontSize: 'var(--text-sm)', display: 'block' }}>+{subscribers.length} new signups</span>
          </div>
        </Tilt3D>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-xl)' }}>
        <Tilt3D maxAngle={4} scale={1.01} style={{ display: 'flex' }}>
          <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)', width: '100%', transformStyle: 'preserve-3d' }}>
            <h3 className="parallax-3d-sm" style={{ marginBottom: 'var(--space-md)' }}>Traffic Overview</h3>
            <div className="parallax-3d-md">
              <Line options={chartOptions} data={lineData} />
            </div>
          </div>
        </Tilt3D>
        <Tilt3D maxAngle={4} scale={1.01} style={{ display: 'flex' }}>
          <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)', width: '100%', transformStyle: 'preserve-3d' }}>
            <h3 className="parallax-3d-sm" style={{ marginBottom: 'var(--space-md)' }}>Content Distribution</h3>
            <div className="parallax-3d-md">
              <Bar options={chartOptions} data={barData} />
            </div>
          </div>
        </Tilt3D>
      </div>
    </div>
  );
}
