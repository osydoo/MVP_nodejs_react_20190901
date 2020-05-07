import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SendMessage from './sendmessage'
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        },
    input: {
      display: 'none',
    },
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3, 2),
      },
    img: {
    margin: 'auto',
    display: 'block',
    Width: '100%',
    Height: '100%',
    },
  }));

export default function App(props) {
    const classes = useStyles();
    const [values] = React.useState({
        name : props.values.name,
        phone : props.values.phone,
      });
      const Watch = () => {
        console.log("이름 : " + values.name)
        console.log("전번 : " + values.phone)
      }
    return (
        <div className="App">
            <Grid item>
            <ButtonBase className={classes.img}>
              <img className={classes.img} alt="complex" src="https://media.giphy.com/media/3oEdva9BUHPIs2SkGk/giphy.gif" />
            </ButtonBase>
          </Grid>
            <Grid className={classes.root}>
                <Typography variant="h5" className={classes.button}>
                    신청 완료
                </Typography>
                <Typography variant="body1">
                    계좌이체를 완료해야 구매가 완료됩니다.
                </Typography>
            </Grid>
            <Grid>
            <Paper className={classes.paper} square>
                <Typography variant="subtitle1" align='center'>
                    국민 123123-12-123456 김미미 6,000원
                </Typography>
            </Paper>
            </Grid>
            <Grid className={classes.button}>
                <SendMessage values={values}/>
            </Grid>
        </div>
    )
}