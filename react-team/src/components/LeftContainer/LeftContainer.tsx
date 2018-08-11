import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';


const styles: StyleRulesCallback = (theme: Theme) => ({
    leftContainer: {
        backgroundColor: "green",
        flexBasis: "15%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    logo: {
        backgroundColor: "lightgreen",
        margin: 5,
        flexBasis: "10%"
    },
    divider: {
        height: "5%"
    },
    profile :{
        backgroundColor: "lightgreen",
        margin: 5,
        flexBasis: "10%"
    },
    menus :{
        backgroundColor: "lightgreen",
        margin: 5,
        flexGrow:1
    }
})

interface IProps {
    classes: {
        leftContainer: string;
        logo: string;
        divider: string;
        profile: string;
        menus:string;
    }
}

class LeftContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props
        return (
            <div className={classes.leftContainer}>
                <div className={classes.logo}>
                    Logo Container
                </div>
                <div className={classes.divider} />
                <div className={classes.profile}>
                    Profile Container
                </div>
                <div className={classes.menus}>
                    menu Container
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LeftContainer);