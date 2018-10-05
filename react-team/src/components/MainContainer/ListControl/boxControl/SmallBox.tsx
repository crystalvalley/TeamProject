import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import Axios from 'axios';
import { ROOTURL } from '../../../../constance/models';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.07
 * @version:2018.09.07
 * 
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    list: {
        margintTop: "5px",
        flexBasis: "20%"
    }
})

interface IProps {
    classes: {
        list: string;
    }
    list: string[]
    id: string;
    key: number;
    refresh(): void;
}

class SmallBox extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
        this.delList = this.delList.bind(this);
    }
    public render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {
                    this.props.list.map((listName, index) => {
                        const handler = () => { this.delList(listName) }
                        return (
                            <Draggable
                                draggableId={listName}
                                index={index}
                                key={index}
                            >
                                {
                                    (provided, snapshot) => {
                                        return (
                                            <div
                                                onDoubleClick={handler}
                                                className={classes.list}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {listName}
                                            </div>
                                        );
                                    }
                                }
                            </Draggable>
                        );
                    })
                }
            </React.Fragment>
        )
    }
    private delList(name: string) {
        if(name==="Base"||name==="SearchField"||name==="Follow"||name==="Friend"||name==="Favorite"){return;}
        Axios.get(ROOTURL + "/lists/delList", {
            params: {
                listName: name
            }
        }).then(() => {
            this.props.refresh();
        })
    }
}

export default withStyles(style)(SmallBox);