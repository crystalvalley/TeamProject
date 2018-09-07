import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.07
 * @version:2018.09.07
 * 
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    list:{
        margintTop:"5px",
        flexBasis:"20%"
    }
})

interface IProps {
    classes: {
        list:string;
    }
    list: string[]
    id: string;
    key: number;
}

class SmallBox extends React.Component<IProps>{
    public render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {
                    this.props.list.map((listName, index) => {
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
}

export default withStyles(style)(SmallBox);