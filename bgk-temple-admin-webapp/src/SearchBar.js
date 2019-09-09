import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 100,
    },
    dropDown: {
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
        width: 150
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
}));

export default function SearchBar() {
    const classes = useStyles();
    const customClasses = ["myTextField","mySearchBtn","myDropDown"]
    customClasses.forEach(customclass=>{classes[customclass] = customclass})
    const currencies = [
        {
            value: 'First_Name',
            label: 'First Name',
        },
        {
            value: 'Surname',
            label: 'Surname',
        },
        {
            value: 'Address_Number',
            label: 'Address Number',
        }
    ];
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div className="search-bar-row">
                <div className="search-bar-element text">
                    <TextField
                        id="outlined-search"
                        label="Search field"
                        type="search"
                        className={classes.textField + ' ' + classes.myTextField}
                        margin="normal"
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className="search-bar-element field">
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        className={classes.dropDown + ' ' + classes.myDropDown}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Search By"
                        margin="normal"
                        variant="outlined"
                    >
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="search-bar-element searchBtn">
                    <Button variant="contained" color="primary" className={classes.button + ' ' + classes.mySearchBtn }>
                        <SearchIcon></SearchIcon> Search
                    </Button>
                </div>
            </div>
        </form>
    );
}