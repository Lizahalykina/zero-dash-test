import { title } from 'process';
import { DataType } from '../dashboard/Dashboard';
import MaxLevel from './MaxLevel/MaxLevel';
import ProductionChart from './ProductionChart/ProductionChart';
import EfficiencyLevel from './EfficiencyLevel/EfficiencyLevel';
import TotalChart from './TotalChart/TotalChart';
import './Widget.css';
import DataReportTable from './DataReportTable/DataReportTable';

export type WidgetTypes = "maxLevel" | "productionChart" | "productionLevel" | "totalChart" | "dataReportTable";

export interface WidgetType {
    type: WidgetTypes;
    data: DataType[];
    groupBy?: keyof DataType;
}

const Widget = ({ type, data, groupBy }: WidgetType) => {
    const renderWidgetContent = () => {
        switch (type) {
            case "maxLevel":
                return (
                    <MaxLevel data={data} groupBy={groupBy ?? "datetime"}/>
                );

            case "productionChart":
                return (
                    <ProductionChart data={data}/>
                );

            case "productionLevel":
                return (
                    <EfficiencyLevel data={data} />
                );

            case "totalChart":
                return (
                    <TotalChart data={data} title={"title"} />
                );

            case "dataReportTable":
                return (
                    <DataReportTable data={data} />
                );

            default:
                return <p>Unknown widget type</p>;
        }
    };

    return (
        <div className='Widget'>
            {renderWidgetContent()}
        </div>
    );
};

export default Widget;
