import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import CardListContainer from './cardList/CardListContainer';
import ViewContainer from './boardView/ViewContainer';
import SnsEditorContainer from './snsEditor/SnsEditorContainer';
import largeCard from './cardList/largeCard';

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
        marginLeft:"5%",
        marginRight:"5%"
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
                    <Route path="/view" component={ViewContainer} />
                    <Route path="/" component={CardListContainer} />
                </Switch>
            </main>
        );
    }
}


export default withStyles(styles)(MainContainerRouter);