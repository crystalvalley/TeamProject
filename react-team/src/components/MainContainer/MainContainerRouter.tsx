import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import CardListContainer from './CardList/CardListContainer';
import UpdateUser from './BoardView/UpdateUser';
import AllFriends from './FriendList/FriendList/AllFriends';
import ListController from './ListControl/ListController';
import PersonalPage from './BoardView/PersonalPage';
import ChattingContainer from '../Chatting/ChattingContainer';
import Allmembers from './FriendList/FriendList/Allmembers';
import Refresh from '../../Refresh';


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
        marginRight: "7.5%",
        marginBottom: "100px"
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
                    {/* refresh 용도*/}
                    <Route path="/refreshPage/:path?" component={this.refreshHandler()} />
                    <Route path="/Users" component={Allmembers} />
                    <Route path="/PersonalPage/:id" component={this.personalPageHandler()} />
                    <Route path="/listControl" component={ListController} />
                    <Route path="/AllFriends" component={AllFriends} />
                    <Route path="/userUpdate" component={UpdateUser} />
                    <Route path="/" component={CardListContainer} />
                </Switch>
                <ChattingContainer />
            </main>
        );
    }
    private refreshHandler() {
        return ({ match }: any) => (
            <Refresh path={match.params.path} />
        )
    }
    private personalPageHandler() {
        return ({ match }: any) => (
            <PersonalPage id={match.params.id}/>
        )
    }
}


export default withStyles(styles)(MainContainerRouter);