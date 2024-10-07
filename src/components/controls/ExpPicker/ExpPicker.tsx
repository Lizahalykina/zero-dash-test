import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './ExpPicker.css';
import { useFilters } from '../../../FiltersContext';
import { DataType } from '../../dashboard/Dashboard';

interface ExpPickerType {
  data: DataType[];
}

interface DropdownOption {
  label: string;
  value: string;
}

const createDropdownOptions = (data: DataType[]): DropdownOption[] => {
  const uniqueExperimentIds = Array.from(new Set(data.map(item => item.experiment_id)));

  return uniqueExperimentIds.map(experimentId => ({
    label: "Experiment: " + experimentId,
    value: experimentId
  }));
};

const ExpPicker = ({ data }: ExpPickerType) => {
  const { selectedExperiment, setSelectedExperiment } = useFilters();

  const handleChange = (value: string | null) => {
    if (value) {
      setSelectedExperiment(value);
    } else {
      setSelectedExperiment('all');
    }
  };

  return (
      <SelectPicker
        data={createDropdownOptions(data)}
        style={{ width: 224 }}
        placeholder="All Experiments"
        value={selectedExperiment === 'all' ? null : selectedExperiment}
        onChange={handleChange}
        cleanable
        className="experiment-picker" 
      />
  );
};

export default ExpPicker;
