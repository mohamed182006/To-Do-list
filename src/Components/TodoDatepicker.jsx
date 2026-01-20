import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

const TodoDatePicker = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="date-picker-wrapper">
        <DateTimePicker
          label="اختر التاريخ والوقت"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => (
            <TextField {...params} className="mui-date-input" />
          )}
        />
      </div>
    </LocalizationProvider>
  );
};

export default TodoDatePicker;
