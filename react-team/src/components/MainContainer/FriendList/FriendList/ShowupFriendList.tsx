import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Forming from './Forming';
import { ListItem } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import { withNetworkContext, INetworkStore } from '../../../../contexts/FriendContext';


/**
 * @author:Kim MinJeong
 * @since:2018.08.28
 * @version:2018.09.08
 */
/**
 * @author:ParkHyeokJoon
 * @version:2018.09.08
 */


const styles: StyleRulesCallback = (theme: Theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

interface IProps {
  classes: {
    list: string;
    fullList: string;
  },
  open: boolean;
  close(): void;
  openf(): void;
}

interface IState {
  cutted: boolean;
  open: boolean;
}

class ShowupFriendList extends React.Component<INetworkStore & IProps, IState> {

  constructor(props: INetworkStore & IProps) {
    super(props);
    this.state = {
      cutted: false,
      open: false
    }
  }


  public render() {
    const { classes } = this.props;
    return (

      <Drawer
        open={this.props.open}
        onClose={this.props.close}
        onOpen={this.props.openf}
      >


        <div className={classes.list}>

          <Scrollbars
            style={{
              height: "100vh"
            }}
            autoHide={true}
          >
            <List>
              {
                this.props.friendList.map((friend, index) => {
                  return (
                    <ListItem
                      key={index}
                    >
                      <Forming
                        delFriend={this.props.delFriend}
                        list={this.props.classes.list}
                        friendInfo={friend}
                      />
                    </ListItem>
                  );
                })
              }
            </List>
          </Scrollbars>
        </div>
      </Drawer>

    );
  }

}

export default withNetworkContext(withStyles(styles)(ShowupFriendList));