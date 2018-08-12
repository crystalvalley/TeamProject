import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import LeftContainer from './LeftContainer/LeftContainer';
import TopContainer from './TopContainer/TopContainer';
import MainContainer from './MainContainer/MainContainer';
import RightContainer from './RightContainer/RightContainer';
import { Route } from 'react-router';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.08.11
 */

const styles: StyleRulesCallback = (theme: Theme) => ({
  App: {
    display: "flex",
    height:"100%",
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

class AppMain extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.App}>
        <LeftContainer />
        <div className={classes.Division1}>
          <TopContainer />
          <div className={classes.Division2}>
            {/* 주소가 변함에 따라 바뀌는 건 MainContainer 뿐임 */}
            <Route path="main">
              {/* 수정 해야 함 */}
              <MainContainer />
            </Route>
            <RightContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AppMain);
