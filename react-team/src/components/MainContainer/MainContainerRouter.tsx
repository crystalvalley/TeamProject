import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import CardListContainer from './CardList/CardListContainer';
import UpdateUser from './BoardView/UpdateUser';
import AllFriends from './FriendList/FriendList/AllFriends';
import ListController from './ListControl/ListController';
import GroupPage from './BoardView/GroupPage';
import PersonalPage from './BoardView/PersonalPage';
import RTCTest from './BoardView/RTCTest';
import ChattingContainer from '../Chatting/ChattingContainer';
import TestCode from './TestCode';





/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.20
 * 
 */
const styles: StyleRulesCallback = (theme: Theme) => ({
    Toolbar: {
        border: "1px solid black",
        marginBottom: "30px"
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        display: "flex",
        flexDirection: "column",
        marginLeft: "7.5%",
        marginRight: "7.5%"
    },
})

interface IProps {
    classes: {
        content: string;
        toolbar: string;
        Toolbar: string;
        contentOpen: string;
        contentClose: string;
    }
}

class MainContainerRouter extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props
        return (
            <main
                className={
                    classes.content
                }
            >
                <div className={classes.toolbar} />
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/Test2" component={TestCode} />
                    <Route path="/Test" component={RTCTest} />
                    <Route path="/PersonalPage" component={PersonalPage} />
                    <Route path="/GroupPage" component={GroupPage} />
                    <Route path="/listControl" component={ListController} />
                    <Route path="/AllFriends" component={AllFriends} />
                    <Route path="/userUpdate" component={UpdateUser} />
                    <Route path="/" component={CardListContainer} />
                </Switch>
                <ChattingContainer />
            </main>
        );
    }
}


export default withStyles(styles)(MainContainerRouter);