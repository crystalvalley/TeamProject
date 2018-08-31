import * as React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { ICardContainerModel, ICardModel } from '../../../constance/models';
import { testData } from './testData';
import CardList from './CardList';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.27
 * @version : 2018.08.31
 * 
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

class CardListContainer extends React.Component<IProps, ICardContainerModel> {
    constructor(props: IProps) {
        super(props);
        this.state = testData;
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    public componentWillUpdate(prevProps:IProps,pervState:ICardContainerModel){

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
                                        this.state.order.map((id, index) => {
                                            const cardList: ICardModel[] = this.state.lists[id];
                                            return (
                                                <CardList
                                                    index={index}
                                                    key={id}
                                                    id={id}
                                                    cardList={cardList}
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

        const newState: ICardContainerModel = {
            ...this.state,
            lists: {
                ...this.state.lists
            },
            order: newOrder
        }
        this.setState(newState);
        return;
    }
}

export default withStyles(style)(CardListContainer)