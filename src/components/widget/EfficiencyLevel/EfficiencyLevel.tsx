import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DataType } from '../../dashboard/Dashboard';

interface ProductionLevelProps {
  data: DataType[];
}

const ProductionLevel = ({ data }: ProductionLevelProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const labels = data.slice(0, 4).map((item) => item.datetime);
    const efficiencyData = data.slice(0, 4).map((item) => {
      return item.water_mass__g !== 0 ? item.fuel_mass__g / item.water_mass__g : 0;
    });

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Efficiency',
            data: efficiencyData,
            backgroundColor: 'lightgrey',
            borderRadius: 10,
            categoryPercentage: 0.8,
            barPercentage: 0.8,
            hoverBackgroundColor: '#d63d00',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Latest Efficiency Levels',
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          x: {
            title: {
              display: true,
            },
            ticks: {
              font: {
                size: 15,
              },
              maxRotation: 0,
              minRotation: 0,
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>;
};

export default ProductionLevel;
