import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, } from '@material-ui/core';


const styles: StyleRulesCallback = (theme: Theme) => ({
    MainContainer: {
        backgroundColor: "black",
        height:"100%"
    },
})

interface IProps {
    classes: {
        MainContainer: string;
        ButtonContainer: string;
        divider: string;
        grid: string;
    }
}

class MainContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props
        return (
            <div className={classes.MainContainer}>
                main container
            </div>
        );
    }
}


export default withStyles(styles)(MainContainer);