import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import IntroPage from './IntroPage';
import TestPage from './TestPage';
import { drawerWidth } from '../../constance/Constances';


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
        marginRight: drawerWidth + "px",
    },
    "contentOpen": {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        marginRight: drawerWidth + "px",
        marginLeft: "240px"
    },
    "contentClose": {
        marginLeft: "72px"
    }
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
        const name =
            this.props.open ?
                "contentOpen" :
                "contentClose"
        return (
            <main
                className={
                    classes.content + " " + name
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