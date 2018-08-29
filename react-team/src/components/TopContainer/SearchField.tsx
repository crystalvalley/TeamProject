import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField } from '@material-ui/core';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.14
 * @version : 2018.08.14
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    searchField: {
        flexBasis: "35%"
    }
})

interface IProps {
    classes: {
        searchField: string;
    }
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

class SearchField extends React.Component<IProps>{
    public render() {
        const {classes} = this.props;
        return (
            <span
                className={classes.searchField}
            >
                <TextField
                    fullWidth={true}
                    onChange={this.props.onChange}
                    label="Search"
                />
            </span>
        );
    }
}

export default withStyles(style)(SearchField);