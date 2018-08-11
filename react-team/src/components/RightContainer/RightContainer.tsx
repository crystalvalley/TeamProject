import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField, InputAdornment } from '@material-ui/core';
import Search from '@material-ui/icons/Search';


const styles: StyleRulesCallback = (theme: Theme) => ({
    RightContainer: {
        flexBasis: "15%",
        backgroundColor: "darkBlue",
        display: "flex",
        flexDirection: "column"
    },
    friendList: {
        backgroundColor: "lightblue",
        flexGrow: 1,
        margin: 5
    },
    friendSearch:{
        backgroundColor: "lightblue",
        margin: 5
    }
})

interface IProps {
    classes: {
        RightContainer: string;
        friendList: string;
        friendSearch:string;
    }
}

class RightContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props
        return (
            <div className={classes.RightContainer}>
                <div className={classes.friendList}>
                    friendList
                </div>
                <div>
                    <TextField
                        className={classes.friendSearch}
                        label="Search Friend"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RightContainer);