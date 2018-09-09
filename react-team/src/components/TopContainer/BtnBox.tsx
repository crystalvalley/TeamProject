import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, IconButton, Button, Icon } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import Writer from '../NewWindows/Writer/Writer';
import FriendListIcon from '@material-ui/icons/Grade';
import ShowupFriendList from '../MainContainer/FriendList/FriendList/ShowupFriendList';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Compare from '@material-ui/icons/Compare';
import Accessibility from '@material-ui/icons/Accessibility';
import Alarm from '@material-ui/icons/Alarm';
import { NavLink } from 'react-router-dom';
import { IMemberModel } from '../../constance/models';



/**
 * @author:ParkHyeokJoon
 * @since:2018.08.28
 * @version:2018.08.28
 */


const style: StyleRulesCallback = (theme: Theme) => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },

});


interface IProps {
    classes: {
        btnBox: string;
        button: string;
        leftIcon: string;
        rightIcon: string;
        iconSmall: string
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

        return (
            <span
                className={classes.btnBox}
            >
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
                    <a href="http://naver.com">
                        <Alarm />
                    </a>
                </IconButton>

                
                <Button variant="contained" color="primary" className={classes.button}>
                    send
                <Icon className={classes.rightIcon}>send</Icon>
                </Button>
                
                <ShowupFriendList
                    open={this.state.modalOpen === 1}
                    openf={writeHandler2}
                    close={this.closeModal}
                />
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