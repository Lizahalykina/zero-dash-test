import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { DataType } from "../../dashboard/Dashboard";
import "./MaxLevel.css";

Chart.register(ArcElement, Tooltip, Legend);

interface MaxLevelType {
    data: DataType[];
    groupBy: keyof DataType;
}

function findLargestByProperty(arr: DataType[], property: keyof DataType): DataType | null {
    if (arr.length === 0) return null;
    return arr.reduce((max, item) => {
        return (item[property] as number) > (max[property] as number) ? item : max;
    }, arr[0]);
}

const createGradient = (ctx: CanvasRenderingContext2D, groupBy: keyof DataType) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    if (groupBy === "water_mass__g") {
        gradient.addColorStop(0, "#074095");
        gradient.addColorStop(0.3, "#00BCD6");
        gradient.addColorStop(0.6, "#7EE0FF");
        gradient.addColorStop(1, "#00BCD6");
    } else if (groupBy === "fuel_mass__g") {
        gradient.addColorStop(0, "#820000");
        gradient.addColorStop(0.3, "#d63d00");
        gradient.addColorStop(0.6, "#f8e719");
        gradient.addColorStop(1, "#d63d00");
    }
    return gradient;
};

const MaxLevel = ({ data, groupBy }: MaxLevelType) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const value = findLargestByProperty(data, groupBy);

    useEffect(() => {
        if (!chartRef.current || !value) return;

        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        const gradient = createGradient(ctx, groupBy);

        const chartData = {
            datasets: [
                {
                    label: `${groupBy} Level`,
                    data: [value[groupBy] as number, 550 - (value[groupBy] as number)],
                    backgroundColor: [gradient, "#0D0D0D"],
                    hoverBackgroundColor: [gradient, "#0D0D0D"],
                    borderWidth: 0
                },
            ],
        };

        const chartOptions = {
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true },
            },
            cutout: "40%",
            rotation: -90,
            circumference: 180,
        };

        const donutChart = new Chart(chartRef.current, {
            type: "doughnut",
            data: chartData,
            options: chartOptions,
        });

        return () => {
            donutChart.destroy();
        };
    }, [groupBy, value]);

    const title = groupBy === "fuel_mass__g" ? "Max Fuel Level" : "Max Water Level";

    return (
        <div className="chart-container">
            <div className="chart-container-content">
                <div className="chart-text">
                    <h2 className="chart-title">{title}</h2>
                    <p className="chart-title-value">{value?.[groupBy].toFixed(1)}</p>
                </div>
                </div>
                <canvas ref={chartRef} className="chart-canvas"/>
        </div>
    );
};

export default MaxLevel;
