import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";

export default function FSelectField(props) {
  const { control, label, name, width, options } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl variant="standard" sx={{ width: { width } }}>
          <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={value}
            onChange={onChange}
            error={!!error}
          >
            {options.map((option) => (
              <MenuItem value={option.id}>{option.name}</MenuItem>
            ))}
          </Select>

          <FormHelperText sx={{ color: "#d32f2f" }}>
            {error ? error.message : null}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
