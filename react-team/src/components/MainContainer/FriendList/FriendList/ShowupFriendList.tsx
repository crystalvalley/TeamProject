import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import { withNetworkContext, INetworkStore } from '../../../../contexts/NetworkContext';
import { IMemberModel } from '../../../../constance/models';
import Axios from '../../../../../node_modules/axios';
import ShowupFriendListtile from './ShowupFriendListtile';

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
  friends: IMemberModel[];
}

class ShowupFriendList extends React.Component<INetworkStore & IProps, IState> {

  constructor(props: INetworkStore & IProps) {
    super(props);
    this.state = {
      cutted: false,
      open: false,
      friends: [

        {
          id: "",
          profileImg: ""
        }

      ]
    }
  }
  public componentDidMount() {
    const axiosInstance = Axios.create({
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    axiosInstance.get("http://localhost:8081/networks/getNetworks").then((result) => {
      this.setState({
        friends: result.data.friendlist
      })
    })
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
                this.props.friendList.map((friendlsit, index) => {
                  return (
                    <ListItem
                      key={index}
                    >
                      <ShowupFriendListtile
                        sendMsg={this.props.sendMsg}
                        list={this.props.classes.list}
                        delFriend={this.props.delFriend}
                        friendInfo={friendlsit}
                        id={this.props.loginedId}
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