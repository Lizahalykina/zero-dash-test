import ToggleSwitch from '../../controls/ToggleSwitch/ToggleSwitch';
import ExpPicker from '../../controls/ExpPicker/ExpPicker';
import './DashboardFilters.css';
import DatePickerFilter from '../../controls/DatePickerFilter/DatePickerFilter';
import { DataType } from '../Dashboard';

interface DashboardFiltersType {
    data: DataType[];
    applyFilters: () => void;
}

const DashboardFilters = ({data, applyFilters} : DashboardFiltersType) => {
    return(
        <div className='DashboardFiltersContent'>
            <div className='LogoWrapper'> <img src='./assets/Logo.svg' className='Logo'
            /></div>

            <div className='Filters'>
                <ToggleSwitch/>
                <ExpPicker data={data}/>
                <DatePickerFilter/>
            </div>
            
            <button className="apply-button" onClick={applyFilters}>
                <p>Apply Filters</p>
            </button>
        </div>
        
    )
}
export default DashboardFilters