import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, } from "@material-ui/core";
import TopBar from './TopContainer/TopBar';
import MainContainerRouter from './MainContainer/MainContainerRouter';


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
  },
});

interface IProps {
  classes: {
    root: string,
    drawerPaper: string,
    drawerPaperClose: string,
    toolbar: string,
    content: string,
    paper: string,
  }
  theme: Theme
}


class AppMain extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: true,
    };
  }


  public render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.root}
      >
        <TopBar />
        <MainContainerRouter />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppMain);