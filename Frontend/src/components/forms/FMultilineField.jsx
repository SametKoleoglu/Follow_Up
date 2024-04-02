import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function FMultilineField(props) {
  const { name, control, label, placeholder,width } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          id="standart-multiline-static"
          sx={{ width: { width } }}
          label={label}
          multiline
          onChange={onChange}
          value={value}
          rows={1}
          variant="standard"
          placeholder={placeholder}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
}
