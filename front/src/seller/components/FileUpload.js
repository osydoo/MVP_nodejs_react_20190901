import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [file, setFile] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const onSave = event =>{
    setFile(event.target.files[0])
    console.log(event.target.files[0])
  }

  const onClickHandler = () => {//CSV파일 서버저장 및 DB에 올리기 
    const data = new FormData() ;
    data.append('file', file);
    console.log(file)
    axios.post("127.0.0.1:27017/api/upload", data, {//파일을 서버에 저장
    })
    .then( res => {
      console.log(res.data.data)
      axios.post("127.0.0.1:27017/data/csvinsert", {//csv파일을 DB에 저장
        file : res.data.data
      })
    })
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        파일 올리기
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          파일 올리기
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            파일 선택 후 업로드 버튼을 누르시면 고객 정보가 저장됩니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <input type="file" name="file" id="upload" onChange={onSave} hidden/>
            <label htmlFor="upload">
                <Button type="button" className="upload" variant="contained" component="span">
                파일선택
                </Button>
            </label>
            <Button type="button" className="btn btn-success btn-block" onClick={onClickHandler} variant="contained" component="span" >업로드</Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}
