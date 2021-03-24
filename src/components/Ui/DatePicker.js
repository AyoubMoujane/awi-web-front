import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { format } from 'date-fns'

export function DatePicker({dateFestival, onDateChange}) {

    const handleChange = (date) => {
        const dateSelected =  date? format(date, 'yyyy-MM-dd') : null
        onDateChange(dateSelected)
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date"
                    format="yyyy-MM-dd"
                    value={dateFestival}
                    onChange={handleChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
