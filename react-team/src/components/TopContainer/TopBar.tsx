import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, IconButton, AppBar, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { drawerWidth } from '../../constance/Constances';
import SearchField from './SearchField';
import { withVoice, IVoiceStore } from '../../contexts/VoiceRecogContext';

/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.14
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
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
})

interface IProps {
  classes: {
    appBar: string;
    appBarShift: string;
    menuButton: string;
    hide: string;
  }
  open: boolean
  handleDrawerOpen(): void;
}

interface IState {
  searchKeyword: string;
}

class TopBar extends React.Component<IProps&IVoiceStore, IState> {
  constructor(props: IProps&IVoiceStore) {
    super(props);
    this.state = {
      searchKeyword: ""
    }
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const { classes } = this.props
    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, this.props.open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!this.props.open}>
          <IconButton
            aria-label="Open drawer"
            onClick={this.props.handleDrawerOpen}
            className={classNames(classes.menuButton, this.props.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" noWrap={true}>
            VOICEBOOK
          </Typography>
          <span>
            {this.props.open?"true":"false"}
          </span>
          <SearchField
            onChange={this.onChange}
          />
        </Toolbar>
      </AppBar>
    );
  }
  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchKeyword: event.currentTarget.value
    })
  }
}

export default withVoice(withStyles(styles)(TopBar));