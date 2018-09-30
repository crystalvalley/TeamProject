import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, AppBar, Divider, Typography } from '@material-ui/core';
import classNames from 'classnames';
import BtnBox from './BtnBox';
import { IMemberModel } from '../../constance/models';
import pige from '../../img/end2.png';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';
import BtnBoxButton from './BtnBoxButton';
import { ILoginStore, withLoginContext } from '../../contexts/LoginContext';
/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.09.23
 * 
 */

/**
 * 버튼박스 분리
 * @author:ChaMinJu
 * @version:2018.09.19
 */
const styles: StyleRulesCallback = (theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  topBar: {
    display: "flex"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolBox: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "25%",
    flexGrow: 1,
    textAlign: "center"
  },
  id: {
    marginLeft: "10vw",
    fontSize: "3em",
    color: "black"
  }
})

interface IProps {
  classes: {
    appBar: string;
    appBarShift: string;
    menuButton: string;
    hide: string;
    secondaryToolbar: string;
    toolBox: string;
    topBar: string;
    id: string;
  },
}

interface IState {
  searchKeyword: string;
  userInfo: IMemberModel;
}

class TopBar extends React.Component<IProps & ILoginStore, IState> {
  constructor(props: IProps & ILoginStore) {
    super(props);
    this.state = {
      searchKeyword: "",
      userInfo: {
        profileImg: "",
        id: "",
      }
    }
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const { classes } = this.props
    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar)}
      >

        <Toolbar
          className={classes.topBar}
        >

          <NavLink to="/ ">
            <img src={pige} />
          </NavLink>
          <Typography
            className={classes.id}
          >
            {this.props.logined.id}
          </Typography>
          <span
            className={classes.toolBox}
          >
            <div>
              <BtnBox
                friends={this.state.userInfo}
              />
            </div>
            <div>
              <BtnBoxButton
                loginedId={this.props.logined.id}
                friends={this.state.userInfo}
              />
            </div>
          </span>
        </Toolbar>
        <Divider />
      </AppBar>
    );
  }
  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchKeyword: event.currentTarget.value
    })
  }
}

export default withLoginContext(withStyles(styles)(TopBar));