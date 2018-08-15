import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, IconButton, AppBar, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { drawerWidth } from '../../constance/Constances';

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
        appBar:string;
        appBarShift:string;
        menuButton:string;
        hide:string;
    }
    open : boolean
    handleDrawerOpen():void;
}

class TopBar extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
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
              </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(TopBar);