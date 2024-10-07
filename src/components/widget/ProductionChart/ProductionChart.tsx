import React, { useRef, useEffect, useState } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { DataType } from "../../dashboard/Dashboard";
import './ProductionChart.css';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

interface ProductionChartType {
    data: DataType[];
}

const ProductionChart = ({ data }: ProductionChartType) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [showFuelLine, setShowFuelLine] = useState(true);
    const [showWaterLine, setShowWaterLine] = useState(true);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(item => item.experiment_id),
                    datasets: [
                        {
                            label: 'Fuel Mass (g)',
                            data: data.map(item => item.fuel_mass__g),
                            borderColor: '#D63D00',
                            backgroundColor: 'rgba(214, 61, 0, 0.2)',
                            fill: false,
                            tension: 0.1,
                            hidden: !showFuelLine
                        },
                        {
                            label: 'Water Mass (g)',
                            data: data.map(item => item.water_mass__g),
                            borderColor: '#00BCD6',
                            backgroundColor: 'rgba(0, 188, 214, 0.2)',
                            fill: false,
                            tension: 0.1,
                            hidden: !showWaterLine
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                            title: {
                                display: true,
                                font: {
                                    size: 10,
                                    weight: 'bold',
                                },
                                color: "#707070"
                            },
                            ticks: {
                                maxTicksLimit: 4,
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                font: {
                                    size: 10,
                                    weight: 'bold',
                                },
                            },
                            ticks: {
                                padding: 0,
                                callback: (value) => {
                                    if (value as number % 100 === 0) {
                                        return value;
                                    }
                                    return '';
                                }
                            }
                        }

                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Fuel Mass and Water data Over Time',
                            font: {
                                size: 10,
                                weight: 'bold',
                            },
                        },
                        legend: {
                            display: false,
                        }
                    }
                }
            });
        }
    }, [data, showFuelLine, showWaterLine]);

    const toggleFuelLine = () => {
        setShowFuelLine(prev => !prev);
    };

    const toggleWaterLine = () => {
        setShowWaterLine(prev => !prev);
    };

    return (
        <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '70%', 
                margin: '1%',
            }} className="prod-chart-container"
        >
            <h3>Production Chart</h3>
            <canvas 
                ref={chartRef} 
                style={{ 
                    width: '100%', 
                    height: '80%', 
                }}
            ></canvas>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <label className="toggle-label">
                    <input 
                        type="checkbox" 
                        className="toggle-input" 
                        onChange={toggleFuelLine} 
                        checked={showFuelLine} 
                    />
                    <div className="toggle-container fuel-toggle">
                        <div className="toggle-indicator"></div>
                    </div>
                    <span className="toggle-text">Fuel</span>
                </label>

                <label className="toggle-label" style={{ marginLeft: '10px' }}>
                    <input 
                        type="checkbox" 
                        className="toggle-input" 
                        onChange={toggleWaterLine} 
                        checked={showWaterLine} 
                    />
                    <div className="toggle-container water-toggle">
                        <div className="toggle-indicator"></div>
                    </div>
                    <span className="toggle-text">Water</span>
                </label>
            </div>
        </div>
    );
};

export default ProductionChart;
