import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import CardList from './cardList/CardList';
import ViewContainer from './boardView/ViewContainer';
import SnsEditorContainer from './snsEditor/SnsEditorContainer';

/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.20
 * 
 */
const styles: StyleRulesCallback = (theme: Theme) => ({
    MainContainer: {
        height: "100%"
    },
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
        display:"flex",
        flexDirection:"column"
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
                    <Route path="/Editor" component={SnsEditorContainer} />
                    <Route path="/view" component={ViewContainer} />
                    <Route path="/" component={CardList} />
                </Switch>
            </main>
        );
    }
}


export default withStyles(styles)(MainContainerRouter);