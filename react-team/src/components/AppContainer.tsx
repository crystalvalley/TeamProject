import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, } from "@material-ui/core";
import SideMenu from './LeftContainer/SideMenu';
import TopBar from './TopContainer/TopBar';
import MainContainerRouter from './MainContainer/MainContainerRouter';
import { drawerWidth } from '../constance/Constances';
import FriendList from './RightContainer/FriendList';


/**
 * @author:ParkHyeokJoon
 * @since:2018.08.13
 * @version:2018.08.17
 * 
 */

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginRight: drawerWidth
  },
  paper: {
    width: drawerWidth
  }
});

interface IProps {
  classes: {
    root: string,
    drawerPaper: string,
    drawerPaperClose: string,
    toolbar: string,
    content: string,
    paper: string
  }
  theme: Theme
}

interface IState {
  open: boolean;
}

class AppMain extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }


  public render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.root}
      >
        <TopBar
          open={this.state.open}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <SideMenu
          handleClose={this.handleDrawerClose}
          theme={this.props.theme}
          open={this.state.open}
        />
        <MainContainerRouter
          open={this.state.open}
        />
        <FriendList />
      </div>
    );
  }
  private handleDrawerOpen() {
    this.setState({ open: true });
  };

  private handleDrawerClose() {
    this.setState({ open: false });
  };
}

export default withStyles(styles, { withTheme: true })(AppMain);