import React, { forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

// Use forwardRef to forward refs to the TextField
const CustomTextField = styled(
  forwardRef((props: any, ref) => <TextField {...props} inputRef={ref} />)
)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

export default CustomTextField;
