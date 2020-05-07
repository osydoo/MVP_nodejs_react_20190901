import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

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
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [values] = React.useState({
    name : props.values.name,
    phone : props.values.phone,
  });
  const handleClickOpen = () => {
    let phone = values.phone.replace('-','').replace('-','').replace('010','10');
    var text = `${values.name}님 신청이 완료되었습니다. 감사합니다`;
    console.log(phone)
    console.log(text)
    axios.post('127.0.0.1:27017/api/sendMessageOne', {
      name: values.name,
      phone: phone,
      text: text
    })
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth size='large'>
        신청 내용 문자 발송
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          문자 전송이 완료 되었습니다.
        </DialogTitle>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
              확인
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
