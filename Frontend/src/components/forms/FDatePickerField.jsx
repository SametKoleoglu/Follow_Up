import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export default function FDatePickerField(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { onChange, value },fieldState: { error } }) => (
          <DatePicker
            label={props.label}
            value={value}
            onChange={onChange}
            sx={{ width: props.width }}
            slotProps={{ textField: { error: !!error,helperText: error ? error.message : null } }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
