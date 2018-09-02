import * as React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import CardList from './CardList';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
import axios from 'axios';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.27
 * @version : 2018.08.31
 * 
 * 로그인 컨텍스트 적용해야함
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    container: {
        display: "flex",
        height: "100%",
    }
})

interface IProps {
    classes: {
        container: string;
    }
}
interface IState {
    order: string[]
}

class CardListContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            order: []
        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    public componentDidMount() {
        axios.get("http://localhost:8081/lists/getListNames")
            .then((result) => {
                this.setState({
                    order: result.data
                })
            })
    }
    public componentWillUpdate(prevProps: IProps, pervState: IState) {
        if (this.state.order === pervState.order || this.state.order.length !== 0) { return; }
        axios.get("http://localhost:8081/lists/getListNames")
            .then((result) => {
                this.setState({
                    order: result.data
                })
            })
    }
    public render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <Droppable
                    droppableId={"Container"}
                    direction="horizontal"
                >{
                        (provided, snapshot) => {
                            return (
                                <div
                                    className={this.props.classes.container}
                                    ref={provided.innerRef}
                                >{
                                        this.state.order.map((name, index) => {
                                            return (
                                                <CardList
                                                    index={index}
                                                    key={index}
                                                    id={name}
                                                    listName={name}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            );
                        }
                    }
                </Droppable>
            </DragDropContext>
        );
    }
    private onDragEnd(result: DropResult) {
        const { destination, source, draggableId } = result;

        // 목적지가 없다면 => 바뀐게 없다면
        if (!destination) { return; }
        // 드랍된 곳이 원래 있던 곳인데, 순서가 그대로 라면
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) { return; }
        const newOrder = this.state.order;
        // 순서를 조절함
        newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, draggableId);

        const newState: IState = {
            ...this.state,
            order: newOrder
        }
        this.setState(newState);
        return;
    }
}

export default withStyles(style)(CardListContainer)