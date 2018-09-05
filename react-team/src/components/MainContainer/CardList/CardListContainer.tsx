import * as React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import CardList from './CardList';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
import axios from 'axios';
import { ICardModel } from '../../../constance/models';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.27
 * @version : 2018.09.05
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
interface IState {
    order: string[]
    lists: {
        [listName: string]: {
            cards: ICardModel[],
            getPage: number;
            end: boolean;
        }
    }
}

class CardListContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            order: [],
            lists: {
                // SearchField rendering용 초기값
                SearchField: {
                    cards: [],
                    end: false,
                    getPage: 0
                }
            }
        }
        this.onDragEnd = this.onDragEnd.bind(this);
        this.scrollEnd = this.scrollEnd.bind(this);
        this.favoriteCheck = this.favoriteCheck.bind(this);
    }
    public componentDidMount() {
        axios.get("http://localhost:8081/lists/getListNames")
            .then((result) => {
                this.setState({
                    order: result.data
                }, () => {
                    this.state.order.map((name, index) => {
                        // 검색만 예외, context에서 가져오므로
                        if (name === "SearchField") { return }
                        axios.get("http://localhost:8081/boards/getByListName", {
                            params: {
                                listName: name,
                                page: 0
                            }
                        }).then((result2) => {
                            this.setState({
                                lists: {
                                    ...this.state.lists,
                                    [name]: {
                                        cards: result2.data,
                                        getPage: 1,
                                        end: false
                                    }
                                }
                            })
                        })
                    })
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
                                            if (this.state.lists[name]) {
                                                return (
                                                    <CardList
                                                        scrollEnd={this.scrollEnd}
                                                        favoriteCheck={this.favoriteCheck}
                                                        cards={this.state.lists[name].cards}
                                                        index={index}
                                                        key={index}
                                                        id={name}
                                                        listName={name}
                                                    />
                                                );
                                            } else {
                                                return (<div key={index} />)
                                            }
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
        const axiosInstance = axios.create();
        axiosInstance.post("http://localhost:8081/lists/setListOrder", {
            names: newOrder
        })
        return;
    }

    private favoriteCheck() {
        // 리프레시는 초기화
        axios.get("http://localhost:8081/boards/getByListName", {
            params: {
                listName: "Favorites",
                page: 0
            }
        }).then((result) => {
            this.setState({
                lists: {
                    ...this.state.lists,
                    Favorites: {
                        cards: result.data,
                        end: this.state.lists.Favorites.end,
                        getPage: 1
                    }
                }
            })
        })

    }

    private scrollEnd(listName: string) {
        if (this.state.lists[listName].end) { return }
        const pageOffset = this.state.lists[listName].getPage;
        axios.get("http://localhost:8081/boards/getByListName", {
            params: {
                listName,
                page: pageOffset + 1
            }
        }).then((result) => {
            const newCards = [...this.state[listName].cards, ...result.data];
            if (result.data.length === 0) {
                this.setState({
                    lists: {
                        ...this.state.lists,
                        [listName]: {
                            cards: this.state[listName].cards,
                            end: true,
                            getPage: this.state[listName].getPage
                        }
                    }
                })
            }
            this.setState({
                lists: {
                    ...this.state.lists,
                    [listName]: {
                        cards: newCards,
                        end: this.state[listName].end,
                        getPage: pageOffset + 1
                    }
                }
            })
        })
    }
}

export default withStyles(style)(CardListContainer)