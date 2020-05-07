import React from 'react';
import InstagramEmbed from 'react-instagram-embed';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import axios from 'axios';
import PersonalNeed from './components/persnonalneed' 
import DaumPostcode from 'react-daum-postcode';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Validator from 'email-validator'
import FinRequest from './components/finalcheck'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
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
  personal: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  requestlet: {
    background: props =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    padding:16
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

  
function TextMaskCustom(props){
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      keepCharPositions={true}
      guide={false}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function App() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    phone: '',
    email:'',
    address2:' ',
    age: '',
    checkemail: false
  });
  const [address, setAddress] = React.useState({
    address: '',
    zonecode: ''
  })

  const [open, setOpen] = React.useState(false);

  const [pageopen, setPageopen] = React.useState(false);

  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleAddress = data => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    let zoneAddress = data.zonecode;
    if (data.addressType === 'R') {
    if (data.bname !== '') {
        extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
    }
    fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setAddress({address : fullAddress, zonecode: zoneAddress})
    setOpen(false);
    console.log(fullAddress + zoneAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
}

  const handlecheckChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handlenameChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handlephoneChange = phone => event => {
    console.log(values.phone)
    setValues({ ...values, [phone]: event.target.value });
  };
  const handleemailChange = email => event => {
    console.log(event.target.value)
    setValues({ ...values, [email]: event.target.value });
  };
  const handleaddressChange = address2 => event => {
    setValues({ ...values, [address2]: event.target.value });
  };
  const Watch = () => {
    console.log("이름 : " + values.name)
    console.log("전번 : " + values.phone)
    console.log("메일 : " + values.email)
    console.log("주소 : " + address.address)
    var temp = Validator.validate(values.email)
    if(temp){
      let myaddress = address.address + ' ' + values.address2;
      console.log(myaddress)
      let phone = values.phone.replace('-','').replace('-','');
      axios.post('127.0.0.1:27017/data/datainsert', {
        name: values.name,
        phone: phone,
        email: values.email,
        address: myaddress,
        zonecode : address.zonecode
      })
      .then((res)=>console.log(res))
      setPageopen(true)
    }
    else{
      alert("이메일 형식이 올바르지 않습니다.")
      console.log('이메일 형식이 올바르지 않습니다.')
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Grid align='center'>
        <InstagramEmbed
          url='https://www.instagram.com'
          hideCaption={true}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </Grid>
      <div>
      <Grid item xs={12}>
        <Grid container className={classes.root} justify="space-between">
          <div className={classes.requestlet} size="large" >참여 신청</div>
          <Button href="#text-buttons" className={classes.button} size="small" >참여 안내 ></Button>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container className={classes.root}>
            <TextField
              id="name"
              label="이름"
              style={{ margin: 8 }}
              placeholder="입금자 이름과 동일"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handlenameChange('name')}
              InputLabelProps={{
                shrink: true,
              }}
            />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container className={classes.root}>
            <TextField
              id="phone"
              label="전화번호"
              className={classes.root}
              style={{ margin: 8 }}
              placeholder="01012341234"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputComponent: TextMaskCustom,
                value: values.phone,
                onChange: handlephoneChange('phone')
              }}
            />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container className={classes.root}>
            <TextField
              id="email"
              label="이메일"
              style={{ margin: 8 }}
              placeholder="example@google.com"
              fullWidth
              margin="normal"
              variant="outlined"
              value={values.email}
              onChange={handleemailChange('email')}
              InputLabelProps={{
                shrink: true,
              }}
            />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.root}>
          <TextField
                id="outlined-read-only-input"
                label="우편 번호"
                style={{ margin: 8 }}
                margin="normal"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={address.zonecode}
            />
            <Button variant="contained" size="small" className={classes.button} onClick={handleClickOpen}>주소검색</Button>
        </Grid>
      </Grid>
      <Dialog onClose={handleClose} fullScreen={true} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          우편 번호 검색
        </DialogTitle>
        <DialogContent dividers>
          <Grid onChange={handleClose}>
            <DaumPostcode
              onComplete={handleAddress}
              autoClose={true}
            />
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid item xs={12}>
        <Grid container className={classes.root}>
          <TextField
            id="outlined-read-only-input"
            label="주소"
            style={{ margin: 8 }}
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
              }}
            InputLabelProps={{
              shrink: true,
            }}
            value={address.address}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.root}>
            <TextField
                id="outlined-address"
                label="상세 주소"
                margin="normal"
                style={{ margin: 8 }}
                fullWidth
                variant="outlined"
                onChange={handleaddressChange('address2')}
                InputLabelProps={{
                  shrink: true,
                }}
            />
        </Grid>
      </Grid>
      <Grid>
      </Grid>
      <Grid container className={classes.personal}>
        <PersonalNeed />
      </Grid>
      <Grid container className={classes.root}>
        <Typography>
        <Checkbox
          checked={state.checkedA}
          onChange={handlecheckChange('checkedA')}
          value="checkedA"
          inputProps={{
            'aria-label': 'primary checkbox',
          }}
        />
          네, 확인 했습니다.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container className={classes.root}>
          <Button variant="contained" disabled={!state.checkedA} className={classes.button} size="large" onClick={Watch} fullWidth>신청 완료 ></Button>
          <Dialog onClose={handleClose} fullScreen={true} aria-labelledby="customized-dialog-title" open={pageopen}>
            <FinRequest values={values}/>
          </Dialog>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}
