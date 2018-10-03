import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Dialog, DialogTitle, Checkbox, FormControlLabel, DialogContent, DialogActions, Button } from '@material-ui/core';
import { INetworkStore, withNetworkContext } from '../../contexts/NetworkContext';
import { IRoomMemberModel } from '../../constance/models';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {},
    open: boolean,
    members: IRoomMemberModel[],
    close(value: string[]): void
}
interface IState {
    selected: string[]
}

class NewMemberDialog extends React.Component<IProps & INetworkStore, IState>{
    constructor(props: IProps & INetworkStore) {
        super(props);
        this.state = {
            selected: []
        }
        this.onChange = this.onChange.bind(this);
    }
    public render() {
        const filteredList = this.props.friendList.filter((member) => {
            for (const rMember of this.props.members) {
                if (rMember.member.id === member.id) {
                    return false
                }
            }
            return true;
        })
        const handler1 = () => {
            this.props.close([]);
            this.setState({
                selected: []
            })
        }
        const handler2 = () => {
            this.props.close(this.state.selected)
            this.setState({
                selected: []
            })
        }
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Choose Friend</DialogTitle>
                <DialogContent>
                    {
                        filteredList.map((member, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            onChange={this.onChange}
                                            value={member.id}
                                        />
                                    }
                                    label={member.id}
                                />
                            );
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handler1}>Cancel</Button>
                    <Button onClick={handler2}>Accept</Button>
                </DialogActions>
            </Dialog>
        );
    }
    private onChange(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (checked) {
            this.setState({
                selected: [...this.state.selected, e.currentTarget.value]
            })
        } else {
            const list = this.state.selected;
            const target = e.currentTarget.value;
            const index = list.indexOf(target);
            list.splice(index, 1);
            this.setState({
                selected: list
            })
        }
    }
}

export default withNetworkContext(withStyles(style)(NewMemberDialog));