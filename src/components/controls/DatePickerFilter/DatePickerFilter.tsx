import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useFilters } from '../../../FiltersContext';

const DatePickerFilter = () => {
  const { dateRange, setDateRange } = useFilters();

  const minDate = new Date('2024-08-11');
  const maxDate = new Date('2024-10-01');
  const defaultCalendarDate = new Date('2024-08-01');

  return (
    <div className="custom-date-picker-wrapper">
      <DateRangePicker
        onChange={(value: [Date, Date] | null) => {
          if (value) {
            setDateRange({ from: value[0], to: value[1] });
          } else {
            setDateRange({ from: null, to: null });
          }
        }}
        style={{ width: 224 }}
        placeholder="Select Date Range"
        disabledDate={(date) => date < minDate || date > maxDate}
        defaultCalendarValue={[defaultCalendarDate, defaultCalendarDate]}
      />
    </div>
  );
};

export default DatePickerFilter;
