import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import IntroPage from './cardList/CardList';
import TestPage from './TestPage';

/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.16
 * 
 */
const styles: StyleRulesCallback = (theme: Theme) => ({
    MainContainer: {
        height: "100%"
    },
    Toolbar: {
        border: "1px solid black"
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
    open: boolean;
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
                <Toolbar className={classes.Toolbar}>
                    sub menu bar
                </Toolbar>
                <Switch>
                    <Route path="/test" component={TestPage} />
                    <Route path="/" component={IntroPage} />
                </Switch>
            </main>
        );
    }
}


export default withStyles(styles)(MainContainerRouter);