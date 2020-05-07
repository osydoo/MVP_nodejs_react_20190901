import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(0),
        height: theme.spacing(4),
        width: theme.spacing(10),
    }
  }));
  

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


export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
    const classes = useStyles(); 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Typography variant='button' style={{display: 'inline-block'}}>
        개인정보 수집 및 이용 동의(
        <Button variant="outlined" className={classes.button}size="small" onClick={handleClickOpen}>전문 보기</Button>
        )
    </Typography>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} actions>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          개인 정보 수집 및 이용 동의
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            어쩌구 저쩌구 어쩌구 저쩌구
          </Typography>
          <Typography gutterBottom>
            저쩌구
          </Typography>
          <Typography gutterBottom>
            쏼라쏼라
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}