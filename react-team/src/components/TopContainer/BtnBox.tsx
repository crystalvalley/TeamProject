import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, IconButton } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import Writer from '../NewWindows/Writer/Writer';
import FriendListIcon from '@material-ui/icons/Grade';
import Exit from '@material-ui/icons/ExitToApp';
import Book from '@material-ui/icons/Book';
import { NavLink } from 'react-router-dom';
import { IMemberModel } from '../../constance/models';
import ShowupFriendList from '../MainContainer/FriendList/FriendList/ShowupFriendList';


/**
 * @author:ParkHyeokJoon
 * @since:2018.08.28
 * @version:2018.09.23
 */

/**
 * 버튼박스 분리
 * @author:ChaMinJu
 * @version:2018.09.19
 */

/**
 * 버튼박스 첫번째 메일아이콘 삭제
 * @author:Kim MinJeong
 * @version:2018.09.23
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
    open: boolean
}
class BtnBox extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            modalOpen: -1,
            open: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openMenu = this.openMenu.bind(this);
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
                    style={{color:"#80aaff"}}
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
                <IconButton onClick={this.logout}>
                    <Exit />
                </IconButton>
            </span>
        );
    }
    private openMenu(clicked: number) {
        this.setState({
            open: true
        })
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
    private logout(){
        location.href="/logout"
    }


}

export default withStyles(style)(BtnBox);