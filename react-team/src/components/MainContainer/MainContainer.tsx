import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, IconButton, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import InfoIcon from '@material-ui/icons/Info';


const styles: StyleRulesCallback = (theme: Theme) => ({
    MainContainer: {
        flexBasis: "85%",
        backgroundColor: "grey",
        padding : 5
    },
    ButtonContainer: {
        backgroundColor: "lightgrey",
    },
    divider: {
        height: "3%"
    },
    grid: {
        margin: 5
    }
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
                <div className={classes.divider} />
                <div className={classes.ButtonContainer}>
                    <IconButton>
                        <Done />
                    </IconButton>
                    <IconButton>
                        <Done />
                    </IconButton>
                    <IconButton>
                        <Done />
                    </IconButton>
                    <IconButton>
                        <Done />
                    </IconButton>
                    <IconButton>
                        <Done />
                    </IconButton>
                </div>
                <div className={classes.divider} />
                <GridList
                    className={classes.grid}
                    cols={3} spacing={40}
                >
                    {
                        testArray.map((item, index) => {
                            return (
                                <GridListTile
                                    key={index}
                                >
                                    <img
                                        src="http://www.orseu-concours.com/102-204-large/test-epso-exactitude-et-precision-2-fr.jpg"
                                        alt={item + ""} />
                                    <GridListTileBar
                                        title={item}
                                        subtitle={<span>by: {item}</span>}
                                        actionIcon={
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            );
                        })
                    }
                </GridList>
            </div>
        );
    }
}

const testArray = [11, 22, 33, 44, 55, 66, 77, 88, 99]

export default withStyles(styles)(MainContainer);