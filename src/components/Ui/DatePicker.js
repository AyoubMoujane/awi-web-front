import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { format } from 'date-fns'

export function DatePicker({date, onChange, label}) {

    const handleChange = (date) => {
        const dateSelected =  date? format(date, 'yyyy-MM-dd') : null
        onChange(dateSelected)
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    size="small"
                    margin="normal"
                    id="date-picker-dialog"
                    label={label}
                    format="yyyy-MM-dd"
                    value={date}
                    onChange={handleChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
