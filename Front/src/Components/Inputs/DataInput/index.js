import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePickerContainer } from './style';

export default function DatePickerValue({ onChange, value }) {
  const handleChange = (newValue) => {
    if (newValue && dayjs.isDayjs(newValue)) {
      onChange(newValue);
    } else {
      onChange(dayjs(newValue));  // Certifica que o valor é dayjs
    }
  };

  return (
    <DatePickerContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          label=""
          value={value}
          onChange={handleChange}
          format="DD/MM/YYYY"  // Certifique-se que o formato seja aplicado corretamente
        />
      </LocalizationProvider>
    </DatePickerContainer>
  );
}
