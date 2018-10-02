import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {},
    open: boolean
    close(value: string): void
}

interface IState {
    text: string;
}

class TitleChangeDialog extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            text: ""
        }
        this.onChange=this.onChange.bind(this);
    }
    public render() {
        const handler1 = ()=>{this.props.close("")}
        const handler2 = ()=>{this.props.close(this.state.text)}
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Set Your New Title</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        fullWidth={true}
                        onChange={this.onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handler1}>Cancel</Button>
                    <Button onClick={handler2}>Accept</Button>
                </DialogActions>
            </Dialog>
        );
    }
    private onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            text: e.currentTarget.value
        })
    }
}

export default withStyles(style)(TitleChangeDialog);