import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  margin: {
    margin: '5'
  },
  fullList: {
    width: 'fullWidth',
  },
  input: {
    display: 'none',
  },
});


class PhoneForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bottom: false,
            num: props.usernum
          }
        };

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      name: '',
    })
  }

  toggleDrawer = (open) => event => {
    this.setState({ bottom: open });
  };

  opendrawer = () => {
    this.setState({bottom:true})
  }

  closedrawer = () => {
    this.setState({bottom:false})
  }

  render() {
    const { classes } = this.props;
    return (
        <div>
        <Button size="large" variant="contained" className='sendmessage'  align='center' fullWidth onClick={this.opendrawer}>
            문자보내기
            <Icon className='sendmessage'>send</Icon>
          </Button>
        <Drawer anchor="bottom" open={this.state.bottom} onClose={this.closedrawer}>
          {
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="filled-multiline-static"
                    label="Multiline"
                    multiline
                    rows="4"
                    defaultValue=''
                    className={classes.list}
                    margin="normal"
                    variant="filled"
                    style={{ margin: 0 }}
                    fullWidth
                    onChange={this.handleChange}
                />
                <div      
                className='temp'
                role="presentation"
                onClick={this.closedrawer}
                onKeyDown={this.closedrawer}
                >
                    <button type="submit" id="sendmessage" hidden>등록</button>
                    <label htmlFor="sendmessage">
                        <Button type="submit" className={classes.fullList} variant="contained" component="span" fullWidth>
                        문자 발송
                        </Button>
                    </label>
                    <div>{this.state.name} {this.state.phone}</div>
                </div>
            </form>
          }
        </Drawer>
      </div>
    );
  }
}

PhoneForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneForm);
