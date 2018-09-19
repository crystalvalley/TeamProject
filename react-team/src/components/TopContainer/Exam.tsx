import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import Writer from '../NewWindows/Writer/Writer';
import FriendListIcon from '@material-ui/icons/Grade';
import ShowupFriendList from '../MainContainer/FriendList/FriendList/ShowupFriendList';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Compare from '@material-ui/icons/Compare';
import Accessibility from '@material-ui/icons/Accessibility';
import { NavLink } from 'react-router-dom';
import { IMemberModel } from '../../constance/models';



/**
 * @author:ParkHyeokJoon
 * @since:2018.08.28
 * @version:2018.08.28
 */


const style: StyleRulesCallback = (theme: Theme) => ({
    root: {
        width: 500,
      },
})

interface IProps {
    classes: {
        btnBox: string;
    },
    friends:IMemberModel;
   
}

interface IState {
    modalOpen: number;
}

class BtnBox extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            modalOpen: -1
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    public render() {
        const { classes } = this.props;
        const { modalOpen } = this.state;
        const writeHandler = () => this.openModal(0);
        const writeHandler2 = () => this.openModal(1);

        return (
          
            <BottomNavigation
                className={classes.btnBox}
            >
                <BottomNavigationAction
                    onClick={writeHandler}
                >
                    <Create />
                </BottomNavigationAction>

                <Writer
                    open={modalOpen === 0}
                    onClose={this.closeModal}
                />

                <BottomNavigationAction
                    onClick={writeHandler2}
                >
                    <FriendListIcon />
                </BottomNavigationAction>
                <BottomNavigationAction>
                    <NavLink to="/userUpdate">
                        <AccountCircle />
                    </NavLink>
                </BottomNavigationAction>

                <BottomNavigationAction>
                    <NavLink to="/AllFriends">
                        <Accessibility />
                    </NavLink>
                </BottomNavigationAction>


                <BottomNavigationAction>
                    <NavLink to="/createGroup">
                        <Compare />
                    </NavLink>
                </BottomNavigationAction>


                <ShowupFriendList
                    open={this.state.modalOpen === 1}
                    openf={writeHandler2}
                    close={this.closeModal}
                />
            </BottomNavigation>
           
        );
    }

    private openModal(clicked: number) {
        this.setState({
            modalOpen: clicked
        })
    }
    private closeModal() {
        this.setState({
            modalOpen: -1
        })
    }


}

export default withStyles(style)(BtnBox);