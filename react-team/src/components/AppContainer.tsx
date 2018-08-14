import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, AppBar, Toolbar, IconButton, Typography, } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import SideMenu from './LeftContainer/SideMenu';
// import MainContainer from './MainContainer/MainContainer';


const drawerWidth = 240;

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
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
  },
});

interface IProps {
  classes: {
    root: string,
    appBar: string,
    appBarShift: string,
    hide: string,
    menuButton: string,
    drawerPaper: string,
    drawerPaperClose: string,
    toolbar: string,
    content: string
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
      open: false,
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }


  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" noWrap={true}>
              SNS MAIN
            </Typography>
          </Toolbar>
        </AppBar>
        <SideMenu
          handleClose={this.handleDrawerClose}
          theme={this.props.theme}
          open={this.state.open}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
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