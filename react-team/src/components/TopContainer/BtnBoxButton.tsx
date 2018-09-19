import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, IconButton } from '@material-ui/core';
import List from "@material-ui/icons/List";
import ShowupFriendList from '../MainContainer/FriendList/FriendList/ShowupFriendList';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Compare from '@material-ui/icons/Compare';
import Accessibility from '@material-ui/icons/Accessibility';

import { NavLink } from 'react-router-dom';
import { IMemberModel } from '../../constance/models';
import AlarmBadge from './AlarmBadge';



/**
 * @author:ChaMinJu
 * @since:2018.09.19
 * @version:2018.09.19
 */


const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {
        btnBox: string;
    },
    friends: IMemberModel;
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
        const writeHandler2 = () => this.openModal(1);

        return (
          
            <span
                className={classes.btnBox}
            >
                 <IconButton>
                    <NavLink to="/userUpdate">
                        <AccountCircle />
                    </NavLink>
                </IconButton>
                <IconButton>
                    <NavLink to="/AllFriends">
                        <Accessibility />
                    </NavLink>
                </IconButton>
                <IconButton>
                    <NavLink to="/createGroup">
                        <Compare />
                    </NavLink>
                </IconButton>
                <IconButton>
                    <NavLink to="/listControl">
                        <List />
                    </NavLink>
                </IconButton>
                <ShowupFriendList
                    open={this.state.modalOpen === 1}
                    openf={writeHandler2}
                    close={this.closeModal}
                />
                <IconButton>
                    <AlarmBadge count="2"/>
                </IconButton>
            </span>
           
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