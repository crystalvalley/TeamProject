import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '../node_modules/@material-ui/core';
import LeftContainer from './components/LeftContainer/LeftContainer';
import TopContainer from './components/TopContainer/TopContainer';
import MainContainer from './components/MainContainer/MainContainer';
import RightContainer from './components/RightContainer/RightContainer';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.08.11
 */

const styles: StyleRulesCallback = (theme: Theme) => ({
  App: {
    display: "flex",
    height: "100%"
  },
  Division1: {
    flexBasis: "85%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  Division2: {
    flexBasis: "90%",
    display: "flex"
  },
})

interface IProps {
  classes: {
    App: string;
    Division1: string;
    Division2: string;
  }
}

class App extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.App}>
        {/* LeftContainer */}
        <LeftContainer />
        <div className={classes.Division1}>
          <TopContainer />
          <div className={classes.Division2}>
            <MainContainer />
            <RightContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
