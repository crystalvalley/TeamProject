import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, IconButton } from '@material-ui/core';
import Create from '@material-ui/icons/Create';

import Writer from '../NewWindows/Writer/Writer';
import FriendListIcon from '@material-ui/icons/Grade';

import AccountCircle from '@material-ui/icons/AccountCircle';

import Book from '@material-ui/icons/Book';
import { NavLink } from 'react-router-dom';
import { IMemberModel } from '../../constance/models';
import Mail from '@material-ui/icons/Mail';
import Writer2 from '../MainContainer/FriendList/FriendList/Writer2';
import ShowupFriendList from '../MainContainer/FriendList/FriendList/ShowupFriendList';

/**
 * @author:ParkHyeokJoon
 * @since:2018.08.28
 * @version:2018.08.28
 */


/**
 * 버튼박스 분리
 * @author:ChaMinJu
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
        const { modalOpen } = this.state;
        const writeHandler = () => this.openModal(0);
        const writeHandler2 = () => this.openModal(1);
        const writeHandler3 = () => this.openModal(2);
        return (
            <span
                className={classes.btnBox}
            >
                <IconButton
                    onClick={writeHandler3}
                >
                    <Mail />
                </IconButton>
                <Writer2
                    open={modalOpen === 2}
                    onClose={this.closeModal}
                />

                <IconButton
                    onClick={writeHandler}
                >
                    <Create />
                </IconButton>
                <Writer
                    open={modalOpen === 0}
                    onClose={this.closeModal}
                />

                <IconButton
                    onClick={writeHandler2}
                >
                    <FriendListIcon />
                </IconButton>
                <ShowupFriendList
                    open={this.state.modalOpen === 1}
                    openf={writeHandler2}
                    close={this.closeModal}
                />
                <NavLink to="/Users">
                    <IconButton>
                        <Book />
                    </IconButton>
                </NavLink>
                <NavLink to="/Users">
                    <IconButton>
                        <AccountCircle />
                    </IconButton>
                </NavLink>

            </span >

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