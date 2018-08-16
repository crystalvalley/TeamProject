import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField } from '@material-ui/core';

const style:StyleRulesCallback = (theme :Theme)=>({
    test: {
        background:""
    }
})

interface IProps{
    classes :{
        test: string;
    }
    onChange(event:React.ChangeEvent<HTMLInputElement>):void;
}

class SearchField extends React.Component<IProps>{
    public render(){
        return(
            <TextField
              onChange={this.props.onChange}
              style={{
                right: "0",
                position: "absolute"
              }}
              label="Search"
            />
        );
    }
}

export default withStyles(style)(SearchField);