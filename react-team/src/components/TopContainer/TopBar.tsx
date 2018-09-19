import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, AppBar, Divider } from '@material-ui/core';
import classNames from 'classnames';
import { withVoice, IVoiceStore } from '../../contexts/VoiceRecogContext';
import BtnBox from './BtnBox';
import { IMemberModel } from '../../constance/models';
import pige from '../../img/end2.png';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import BtnBoxButton from './BtnBoxButton';
/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.24
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
  },
}

interface IState {
  searchKeyword: string;
  userInfo: IMemberModel;
}

class TopBar extends React.Component<IProps & IVoiceStore, IState> {
  constructor(props: IProps & IVoiceStore) {
    super(props);
    this.state = {
      searchKeyword: "",
      userInfo: {
        profileImg: "",
        id: "",
        username: ""
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
         
            <NavLink to="/CardListContainer">
              <img src={pige} onClick={this.home} />
            </NavLink>

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
              friends={this.state.userInfo}
            />
            </div>
          </span>
        </Toolbar>
        <Divider />
      </AppBar>
    );
  }
  private home() {
    axios.get("http://localhost:8081/home")
  }


  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchKeyword: event.currentTarget.value
    })
  }
}

export default withVoice(withStyles(styles)(TopBar));