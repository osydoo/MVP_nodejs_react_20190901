import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddressFind from './addressfind'
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';


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
    width: 200,
  },
}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });
  const [state, setState] = React.useState({
    address: '',
    zonecode: '',
    insertaddress: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCreate = (data) => {
    setState({
        address: data.values.address,
        zonecode: data.values.zonecode,
        state: false
    })
    console.log("주소값을보자 : "+data.values.address)
  }


  return (
        <div>
        <Grid item xs={12}>    
            <TextField
                id="outlined-read-only-input"
                label="Read Only"
                defaultValue={values.zonecode}
                className={classes.textField}
                margin="normal"
                InputProps={{
                readOnly: true,
                }}
                variant="outlined"
            />
            <Button variant="contained">Button</Button>
        </Grid>
        <AddressFind 
                onCreate={handleCreate}
                id="address"
        />
        <TextField
        id="outlined-read-only-input"
        label="Read Only"
        defaultValue={values.zonecode}
        className={classes.textField}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        />
        <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
        />
      </div>
  );
}