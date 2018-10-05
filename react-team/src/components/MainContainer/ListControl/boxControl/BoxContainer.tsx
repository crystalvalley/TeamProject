import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { IBoxData } from './BoxData';
import SmallBox from './SmallBox';
/**
 * @author ParkHyeokJoon
 * @since 2018.09.06
 * @version 2018.09.06
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    container: {
        flexBasis: "20%",
        padding: "6px",
        display: "flex",
        minHeight: "200px",
    },
    box: {
        border:"1px solid black",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        flexBasis:"10%",
        padding : "6px"
    }
})

interface IProps {
    classes: {
        container: string;
        box: string;
    },
    listNames: string[]
    listOrderChange(listNames: string[]): void;
    refresh():void;
}


class BoxContainer extends React.Component<IProps, IBoxData>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            boxes: {},
            order: []
        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (this.props.listNames !== nextProps.listNames) {
            let sub = 1;
            let boxes: { [name: string]: string[] } = {};
            const order: string[] = [];
            for (const name of nextProps.listNames) {
                const str = "box" + sub;
                if (!boxes[str]) {
                    boxes = { ...boxes, [str]: [] }
                    order.push(str);
                }
                boxes[str].push(name);
                if (boxes[str].length === 5) {
                    sub++;
                }
            }
            this.setState({
                boxes,
                order
            })
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <div
                    className={classes.container}
                >
                    {
                        this.state.order.map((box, index) =>
                            <Droppable
                                droppableId={box}
                                direction="vertical"
                                key={index}
                            >
                                {
                                    (provided, snapshot) => {
                                        return (
                                            <div
                                                className={classes.box}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                <SmallBox
                                                    refresh={this.props.refresh}
                                                    list={this.state.boxes[box]}
                                                    id={box}
                                                    key={index}
                                                />
                                            </div>
                                        );
                                    }
                                }
                            </Droppable>
                        )

                    }
                </div>
            </DragDropContext>
        );
    }
    private onDragEnd(result: DropResult) {
        const { destination, source, draggableId } = result;
        if (!destination) { return; }
        else {
            const newBoxes = this.state.boxes;
            // 동일한 박스라면
            if (destination.droppableId === source.droppableId) {
                // 동일위치라면 return
                if (destination.index === source.index) { return; }
                newBoxes[source.droppableId].splice(source.index, 1);
                newBoxes[destination.droppableId].splice(destination.index, 0, draggableId);
                const newState: IBoxData = {
                    ...this.state,
                    boxes: newBoxes
                }
                this.setState(newState, () => {
                    let listNames: string[] = []
                    for (const name of this.state.order) {
                        listNames = [...listNames, ...this.state.boxes[name]]
                    }
                    this.props.listOrderChange(listNames);
                })
            } else {
                newBoxes[source.droppableId].splice(source.index, 1);
                newBoxes[destination.droppableId].splice(destination.index, 0, draggableId);
                const newState: IBoxData = {
                    ...this.state,
                    boxes: newBoxes
                }
                this.setState(newState, () => {
                    let listNames: string[] = []
                    for (const name of this.state.order) {
                        listNames = [...listNames, ...this.state.boxes[name]]
                    }
                    this.props.listOrderChange(listNames);
                })
            }
        }
    }
}

export default withStyles(style)(BoxContainer);