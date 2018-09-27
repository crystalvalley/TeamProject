import * as React from 'react';
import { TableRow, TableCell, Select, MenuItem, TextField, Button } from '@material-ui/core';
import { IConditionModel } from '../../../constance/models';

interface IProps {
    condition: IConditionModel
    target: string;
    handler(e: React.ChangeEvent<HTMLSelectElement>): void;
    targetHandler(e: React.ChangeEvent<HTMLInputElement>): void;
    delHandler(): void;
}

export default class ConditionRow extends React.Component<IProps> {
    public render() {
        const str = this.props.condition.strategy
        const disable: boolean = (str === "All" || str === "Favorite" || str === "Friend" || str === "Follow") ? true : false
        return (
            <TableRow>
                <TableCell>
                    <Select
                        style={{
                            width: "100%",
                            color: "black"
                        }}
                        value={this.props.condition.strategy}
                        onChange={this.props.handler}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Favorite">Favorite</MenuItem>
                        <MenuItem value="Follow">Follow</MenuItem>
                        <MenuItem value="Friend">Follow</MenuItem>
                        <MenuItem value="Mention">Mention</MenuItem>
                        <MenuItem value="Tag">Tag</MenuItem>
                        <MenuItem value="Writer">Writer</MenuItem>
                        <MenuItem value="Group">Group</MenuItem>
                        <MenuItem value="Content">Content</MenuItem>
                    </Select>
                </TableCell>
                <TableCell
                    style={{
                        textAlign: "center"
                    }}
                >
                    <TextField
                        disabled={disable}
                        value={this.props.target}
                        fullWidth={true}
                        onChange={this.props.targetHandler}
                    />
                </TableCell>
                <TableCell>
                    <Button
                        onClick={this.props.delHandler}
                    >
                        삭제
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
}
