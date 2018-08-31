import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, AppBar, Divider, IconButton } from '@material-ui/core';
import axios from 'axios';
import classNames from 'classnames';
import SearchField from './SearchField';
import { withVoice, IVoiceStore } from '../../contexts/VoiceRecogContext';
import BtnBox from './BtnBox';
import { IMemberModel } from '../../constance/models';
import AccountCircle from '@material-ui/icons/AccountCircle';
/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.24
 * 
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
  }
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
        avatar: "",
        id: ""
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
          <SearchField
            onChange={this.onChange}
          />
          <span
            className={classes.toolBox}
          >
            <BtnBox />
            <IconButton

              onClick={this.submit}
            ><AccountCircle /></IconButton>
          </span>
        </Toolbar>
        <Divider />
        <Toolbar
          variant="dense"
        >
          <span>
            {this.props.inputValue}
          </span>

        </Toolbar>
      </AppBar>
    );
  }
  private submit() {
    axios.get("http://localhost:8081/userUpdate")
      .then((response) => {
        location.replace("/userUpdate")
        // 컴포넌트를 만들어서 컨테이너를 만들고 그페이지가 자식이 되서  프롭스로 넣어준다.
      }
      )
  }



  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchKeyword: event.currentTarget.value
    })
  }
}

export default withVoice(withStyles(styles)(TopBar));