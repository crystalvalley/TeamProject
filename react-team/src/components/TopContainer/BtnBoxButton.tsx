import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, IconButton } from '@material-ui/core';
import List from "@material-ui/icons/List";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Accessibility from '@material-ui/icons/Accessibility';
import Person from '@material-ui/icons/Person';
import { NavLink } from 'react-router-dom';
import { IMemberModel } from '../../constance/models';
import AlarmPage from '../NewWindows/AlarmPage';





/**
 * @author:ChaMinJu
 * @since:2018.09.19
 * @version:2018.09.19
 */
/**
 * @author:ParkHyeokJoon
 * @since : 2018.09.23
 * @version:2018.09.23
 */


const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {
        btnBox: string;
    },
    friends: IMemberModel;
    loginedId:string;
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

        return (

            <span
                className={classes.btnBox}
            >
                <NavLink to={"/PersonalPage/"+this.props.loginedId}>
                    <IconButton>
                        <Person />
                    </IconButton>
                </NavLink>
                <NavLink to="/userUpdate">
                    <IconButton>
                        <AccountCircle />
                    </IconButton>
                </NavLink>
                <NavLink to="/AllFriends">
                    <IconButton>
                        <Accessibility />
                    </IconButton>
                </NavLink>
                <NavLink to="/listControl">
                    <IconButton>
                        <List />
                    </IconButton>
                </NavLink>
                <IconButton>
                    <AlarmPage/>
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