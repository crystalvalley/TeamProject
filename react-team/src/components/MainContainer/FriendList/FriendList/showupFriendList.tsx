import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import { forming } from './Forming';
// import { friendlistform } from './tileData';


/**
 * @author:KimMinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 */

const styles = {
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
};

interface IProps{
    classes:{
        list:string;
        fullList:string;
    },
    open:boolean;
    close():void;
    openf():void;
    

}

class SwipeableTemporaryDrawer extends React.Component<IProps> {

  public render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{forming}</List>      
      </div>
    );

   return (

      <div>       
        <SwipeableDrawer
          open={this.props.open}
          onClose={this.props.close}
          onOpen={this.props.openf}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.close}
            onKeyDown={this.props.close}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
        
      </div>

    );
  }
}

export default withStyles(styles)(SwipeableTemporaryDrawer);