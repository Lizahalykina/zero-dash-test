import Widget, { WidgetTypes } from '../../widget/Widget';
import { DataType } from '../Dashboard';
import './DashboardMetrics.css';

interface DashboardMetricsType {
    data: DataType[];
}

interface Wgt  {
    gridColumn: string,
    gridRow: string,
    type:  WidgetTypes,
    groupBy?: keyof DataType,
}


const DashboardMetrics = ({data} : DashboardMetricsType) => {
    const widgets : Wgt[] = [
        {  gridColumn: 'span 1', gridRow: 'span 2', type: 'maxLevel', groupBy: "fuel_mass__g" },
        {  gridColumn: 'span 1', gridRow: 'span 2', type: 'maxLevel', groupBy: "water_mass__g" },
        {  gridColumn: 'span 2', gridRow: 'span 4', type: 'productionChart' },
        {  gridColumn: 'span 2', gridRow: 'span 2', type: 'productionLevel'  },
        {  gridColumn: 'span 1', gridRow: 'span 3', type: 'totalChart'  },
        {  gridColumn: 'span 3', gridRow: 'span 3', type: 'dataReportTable'  },
    ];

    return (
        <div className='DashboardMetrics'>
            {widgets.map((widget, index) => (
                <div 
                    key={index} 
                    className="Widget" 
                    style={{
                        gridColumn: widget.gridColumn,
                        gridRow: widget.gridRow
                    }}
                >
                <Widget data={data} type={widget.type} groupBy={widget.groupBy}/>
                </div>
            ))}
        </div>
    );
};

export default DashboardMetrics;
