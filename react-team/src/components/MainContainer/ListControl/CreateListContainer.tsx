import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Typography, Table, TableHead, TableCell, TableRow, Button, IconButton, TextField } from '@material-ui/core';
import { IConditionModel, ROOTURL } from '../../../constance/models';
import ConditionRow from './ConditionRow';
import Done from '@material-ui/icons/Done';
import axios from "axios";

/**
 * @author ParkHyeokJoon
 * @since 2018.09.06
 * @version 2018.09.06
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    container: {
        flexBasis: "80%",
        padding: "12px",
        display: "flex",
        flexDirection: "column"
    },
    newList: {
        fontSize: "2em"
    },
    createBox: {
        flexGrow: 1,
        display: "flex",
        border: "1px solid black"
    },
    condition: {
        width: "15%",
        textAlign: "center"
    },
    alignCenter: {
        textAlign: "center"
    }

})

interface IProps {
    classes: {
        container: string;
        createBox: string;
        newList: string;
        condition: string;
        alignCenter: string;
    }
    listNames: string[];
    refresh(): void;
}
interface IState {
    bigConditions: IConditionModel[][]
    listName: string;
}

class CreateListContainer extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            listName: "",
            bigConditions: []
        }
        this.conditionChange = this.conditionChange.bind(this);
        this.addCondition = this.addCondition.bind(this);
        this.addBigCondition = this.addBigCondition.bind(this);
        this.targetChange = this.targetChange.bind(this);
        this.submitNewList = this.submitNewList.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.deleteCondition = this.deleteCondition.bind(this);
    }
    public render() {
        const { classes } = this.props;
        return (
            <div
                className={classes.container}
            >
                <Typography
                    className={classes.newList}
                >
                    <IconButton
                        onClick={this.submitNewList}
                    >
                        <Done />
                    </IconButton>
                    <TextField
                        onChange={this.nameChange}
                        style={{
                            marginLeft: "15px"
                        }}
                        value={this.state.listName}
                        placeholder="New List Name"
                    />
                </Typography>
                <div
                    className={classes.createBox}
                >
                    <Table>
                        <TableHead>
                            <TableCell
                                style={{
                                    width: "5%"
                                }}
                            >
                                Bundle
                            </TableCell>
                            <TableCell
                                className={classes.condition}
                            >
                                조건
                            </TableCell>
                            <TableCell
                                className={classes.alignCenter}
                            >
                                대상
                            </TableCell>
                            <TableCell
                                style={{
                                    width: "5%"
                                }}
                            >
                                삭제
                            </TableCell>
                        </TableHead>
                        {
                            this.state.bigConditions.map((conditions, index) => {
                                const addConditionHandler = () => { this.addCondition(index) }
                                return (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell
                                                className={classes.alignCenter}
                                                rowSpan={conditions.length + 2}
                                            >
                                                AND
                                            </TableCell>
                                            <TableCell
                                                className={classes.alignCenter}
                                                colSpan={3}

                                            >
                                                이하의 조건들은 AND처리됩니다. 대상 사이에는 ,를 넣어주세요
                                            </TableCell>
                                        </TableRow>
                                        {
                                            conditions.map((condition, index2) => {
                                                const handler = (e: React.ChangeEvent<HTMLSelectElement>) => { this.conditionChange(e, index, index2) }
                                                const targetChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => { this.targetChange(e, index, index2) }
                                                const delHandler = () => { this.deleteCondition(index,index2) }
                                                return (
                                                    <ConditionRow
                                                        delHandler={delHandler}
                                                        key={index2}
                                                        condition={condition}
                                                        handler={handler}
                                                        targetHandler={targetChangeHandler}
                                                        target={condition.target}
                                                    />
                                                )
                                            })
                                        }
                                        <TableRow>
                                            <TableCell
                                                className={classes.alignCenter}
                                                colSpan={3}
                                            >
                                                <Button
                                                    onClick={addConditionHandler}
                                                >
                                                    <Typography>
                                                        조건 추가하기
                                                    </Typography>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })
                        }
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className={classes.alignCenter}
                            >
                                <Button
                                    onClick={this.addBigCondition}
                                >
                                    <Typography>
                                        번들 추가하기
                                    </Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </Table>
                </div>
            </div>
        );
    }
    private conditionChange(e: React.ChangeEvent<HTMLSelectElement>, index: number, index2: number) {
        const newCondition = this.state.bigConditions;
        newCondition[index][index2].strategy = e.target.value
        this.setState({
            bigConditions: newCondition
        })
    }
    private addBigCondition() {
        const newCondition: IConditionModel[] = [];
        this.setState({
            bigConditions: [...this.state.bigConditions, newCondition]
        })
    }
    private deleteCondition(index: number, index2: number) {
        const newCondition = this.state.bigConditions;
        newCondition[index].splice(index2, 1);
        this.setState({
            bigConditions: newCondition
        })
    }
    private addCondition(index: number) {
        const addCondition: IConditionModel = {
            strategy: "all",
            target: ""
        }
        const newCondition = this.state.bigConditions
        newCondition[index].push(addCondition);
        this.setState({
            bigConditions: newCondition
        })
    }
    private nameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            listName: e.currentTarget.value
        })

    }
    private targetChange(e: React.ChangeEvent<HTMLInputElement>, index: number, index2: number) {
        const newCondition = this.state.bigConditions;
        newCondition[index][index2].target = e.currentTarget.value
        this.setState({
            bigConditions: newCondition
        })
    }
    private submitNewList() {
        if(this.state.listName===""){return;}
        if (this.props.listNames.indexOf(this.state.listName) === -1) {
            // 존재하지 않는 이름이라면 추가
            axios.post(ROOTURL+"/lists/addCustomList", {
                name: this.state.listName,
                lists: JSON.stringify(this.state.bigConditions)
            }).then(() => { this.props.refresh() })
        } else {
            // 존재하는 이름이면 수정
            axios.post(ROOTURL+"/lists/updateCustomList", {
                name: this.state.listName,
                lists: JSON.stringify(this.state.bigConditions)
            }).then(() => { this.props.refresh() })
        }
    }
}

export default withStyles(style)(CreateListContainer);
