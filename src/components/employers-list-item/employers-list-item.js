import "./employers-list-item.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const EmployeesListItem = (props) => {
  
    const { name, salary, onDelete, onToggleProp, increase, rise} = props;
   

    let classNames = "list-group-item d-flex justify-content-between";

    if (increase) {
      classNames += " increase";
    }

    if (rise) {
      classNames += " like";
    }
    return (
      <li className={classNames}>
        <span className="list-group-item-label" onClick={onToggleProp} data-toggle="rise">
          {name}
        </span>
        <input
          type="text"
          className="list-group-item-input"
          defaultValue={`+380 ${salary}`}
        />
         <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Обрати дату"/>

        </LocalizationProvider>
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-heart btn-sm "
            onClick={onToggleProp}
            data-toggle='increase'
          >
            <i className="fas fa-heart"></i>
          </button>

          <button
            type="button"
            className="btn-trash btn-sm "
            onClick={onDelete}
          >
            <i className="fas fa-trash"></i>
          </button>
          <i className="fas fa-star"></i>
        </div>
      </li>
    );
  
}

export default EmployeesListItem;
