import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from '@material-ui/core';
import { IRoomMemberModel } from '../../constance/models';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {},
    open: boolean,
    members: IRoomMemberModel[],
    close(): void
}

interface IState {
    text: string;
}

class ListDialog extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            text: ""
        }
        this.onChange = this.onChange.bind(this);
    }
    public render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Set Your New Title</DialogTitle>
                <DialogContent>
                    <List>
                        {
                            this.props.members.map((member, index) => {
                                return (
                                    <ListItem key={index}>
                                        {member.member.id}
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close}>Close</Button>
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

export default withStyles(style)(ListDialog);