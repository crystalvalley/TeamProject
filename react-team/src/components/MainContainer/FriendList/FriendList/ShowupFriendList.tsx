import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Forming from './Forming';
import { IMemberModel } from '../../../../constance/models';
import { ILoginStore, withLoginContext } from '../../../../contexts/LoginContext';
import { ListItem } from '@material-ui/core';
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars';
  

/**
 * @author:Kim MinJeong
 * @since:2018.08.28
 * @version:2018.08.30
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
  friends: IMemberModel[];
  cutted: boolean;
  open: boolean;
}

class ShowupFriendList extends React.Component<ILoginStore & IProps, IState> {

  constructor(props: ILoginStore & IProps) {
    super(props);
    this.state = {
      friends: [
        {
          id: "",
          name: "",
          profileImg: ""
        }
      ],
      cutted: false,
      open: false
    }
  }

  public componentDidMount() {
    const axiosInstance = axios.create({
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
    axiosInstance.get("http://localhost:8081/members/members").then((result) => {
      this.setState({
        friends: result.data
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
              height="100%"
              autoHide={true}
            >
         
              <List>
                {
                  this.state.friends.map((showfriend, index) => {
                    return (
                      <ListItem
                        key={index}
                      >    
                        <Forming
                    
                          list={this.props.classes.list}
                          friendInfo={showfriend}
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

export default withLoginContext(withStyles(styles)(ShowupFriendList));