import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import Done from '@material-ui/icons/Done';


const styles: StyleRulesCallback = (theme: Theme) => ({
    TopContainer: {
        flexBasis: "10%",
        backgroundColor: "blue"
    },
    SearchField: {
        width : "25%"
    },
    divider:{
        flexGrow : 1
    }
})

interface IProps {
    classes: {
        TopContainer: string;
        SearchField: string;
        divider:string;
    }
}

class TopContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props
        return (
            <div className={classes.TopContainer}>
                <Toolbar>
                    <div>
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
                    <div className={classes.divider}/>
                    <TextField
                        className={classes.SearchField}
                        label="Search Keyword"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Toolbar>
            </div>
        );
    }
}

export default withStyles(styles)(TopContainer);