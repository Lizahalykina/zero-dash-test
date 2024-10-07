import { useEffect, useState } from "react";
import axios from 'axios';
import './Dashboard.css';
import DashboardFilters from "./DashboardFilters/DashboardFilters";
import DashboardMetrics from "./DashboardMetrics/DashboardMetrics";
import { useFilters } from "../../FiltersContext";

export interface DataType {
    [x: string]: any;
    datetime: string;
    experiment_id: string;
    fuel_mass__g: number;
    water_mass__g: number;
}

const Dashboard = () => {
    const { filterType, dateRange, selectedExperiment } = useFilters();
    const [data, setData] = useState<DataType[]>();
    const [filteredData, setFilteredData] = useState<DataType[]>();

    const applyFilters = () => {
        if (!data) return;

        let filtered = [...data];

        if (selectedExperiment !== 'all') {
            filtered = filtered.filter(item => item.experiment_id === selectedExperiment);
        }

        if (dateRange.from && dateRange.to) {
            const fromDate = dateRange.from;
            const toDate = dateRange.to;
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.datetime);
                return itemDate >= fromDate && itemDate <= toDate;
            });
        }

        if (filterType === 'Run') {
            setFilteredData(filtered);
        } else if (filterType === 'Experiment') {
            const experimentAggregated = filtered.reduce((acc: DataType[], current) => {
                const existing = acc.find(item => item.experiment_id === current.experiment_id);
                if (existing) {
                    existing.fuel_mass__g += current.fuel_mass__g;
                    existing.water_mass__g += current.water_mass__g;
                } else {
                    acc.push({ ...current });
                }
                return acc;
            }, []);
            setFilteredData(experimentAggregated);
        } else if (filterType === 'Month') {
            const monthAggregated = filtered.reduce((acc: DataType[], current) => {
                const monthYear = new Date(current.datetime).toLocaleString('default', { month: 'long', year: 'numeric' });
                const existing = acc.find(item => {
                    const itemMonthYear = new Date(item.datetime).toLocaleString('default', { month: 'long', year: 'numeric' });
                    return itemMonthYear === monthYear;
                });
                if (existing) {
                    existing.fuel_mass__g += current.fuel_mass__g;
                    existing.water_mass__g += current.water_mass__g;
                } else {
                    acc.push({ ...current });
                }
                return acc;
            }, []);
            setFilteredData(monthAggregated);
        }
    };

    useEffect(() => {
        axios.get(`/dummy-api`)
        .then(res => {
            const fetchedData = res.data;
            setData(fetchedData);
            setFilteredData(fetchedData);
        })
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filterType, dateRange, selectedExperiment, data]);

    return (
        <div className="Dashboard">
            {data && filteredData ? <DashboardFilters data={filteredData} applyFilters={applyFilters}/> : null}
            {data && filteredData ? <DashboardMetrics data={filteredData}/> : null}
        </div>
    );
};

export default Dashboard;
