import './ToggleSwitch.css';
import { useFilters } from "../../../FiltersContext";

type ToggleValue = "Run" | "Experiment" | "Month";

const TripleToggleSwitch = () => {
    const { filterType, setFilterType } = useFilters();

    const handleToggle = (value: ToggleValue) => {
        setFilterType(value);
        console.log("Selected: Option " + value);
    };

    return (
        <div className="toggle-switch">
            <div className="toggle-switch__wrapper">
                <div className="toggle-switch__radio-group">
                    <input
                        id="toggle-run"
                        name="toggle-switch"
                        type="radio"
                        value="Run"
                        className="toggle-switch__input"
                        checked={filterType === "Run"}
                        onChange={() => handleToggle("Run")}
                    />
                    <label htmlFor="toggle-run" className="toggle-switch__label toggle-switch__label--run">
                        Run
                    </label>

                    <input
                        id="toggle-experiment"
                        name="toggle-switch"
                        type="radio"
                        value="Experiment"
                        className="toggle-switch__input"
                        checked={filterType === "Experiment"}
                        onChange={() => handleToggle("Experiment")}
                    />
                    <label htmlFor="toggle-experiment" className="toggle-switch__label toggle-switch__label--experiment">
                        Experiment
                    </label>

                    <input
                        id="toggle-month"
                        name="toggle-switch"
                        type="radio"
                        value="Month"
                        className="toggle-switch__input"
                        checked={filterType === "Month"}
                        onChange={() => handleToggle("Month")}
                    />
                    <label htmlFor="toggle-month" className="toggle-switch__label toggle-switch__label--month">
                        Month
                    </label>

                    <span className="toggle-switch__selector" />
                </div>
            </div>
        </div>
    );
};

export default TripleToggleSwitch;
