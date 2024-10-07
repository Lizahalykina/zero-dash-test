import React, { useState } from "react";
import { DataType } from "../../dashboard/Dashboard";
import "./TotalChart.css";

interface TotalChartProps {
  data: DataType[];
  title: string;
}

const TotalChart = ({ data, title }: TotalChartProps) => {
  const [isFuelSelected, setIsFuelSelected] = useState(true);

  const totalFuelInKg = data.reduce((acc, curr) => acc + curr.fuel_mass__g, 0) / 1000;
  const totalWaterInKg = data.reduce((acc, curr) => acc + (curr.water_mass__g || 0), 0) / 1000;
  const totalValue = isFuelSelected ? totalFuelInKg : totalWaterInKg;

  const roundedTotalValue = Math.round(totalValue);

  const toggleDataType = () => {
    setIsFuelSelected((prevState) => !prevState);
  };

  return (
    <div
      className={`totalChart-container ${
        isFuelSelected ? "fuel-background" : "water-background"
      }`}
    >
      <div className="totalChart-content">
        <h2 className="totalChart-title">{isFuelSelected ? "Total Fuel" : "Total Water"}</h2>
          <p className="totalChart-value">{roundedTotalValue} kg</p>
        <div className="totalChart-Wrapper">
          <div className={`totalChart-circle ${isFuelSelected ? "fuel-circle" : "water-circle"}`}>
            <div className="liquid"></div>
          </div>
        </div>
        <div className="totalChart-toggle-wrapper">
          <span className="totalChart-toggle-text">Fuel</span>
          <label className="totalChart-toggle-label">
            <input
              type="checkbox"
              className="totalChart-toggle-input"
              onChange={toggleDataType}
              checked={!isFuelSelected}
            />
            <div className="totalChart-toggle-container">
              <div className="totalChart-toggle-indicator"></div>
            </div>
          </label>
          <span className="totalChart-toggle-text">Water</span>
        </div>
      </div>
    </div>
  );
};

export default TotalChart;
