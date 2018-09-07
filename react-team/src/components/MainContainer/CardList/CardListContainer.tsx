import * as React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import CardList from './CardList';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
import axios from 'axios';
import { ICardModel } from '../../../constance/models';
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { Motion, spring } from 'react-motion';

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
    },
    arrow: {
        position: "absolute",
        height: "100%",
        width: "7.5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
})

interface IProps {
    classes: {
        container: string;
        arrow: string;
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
    slide: number;
    left: boolean;
    right: boolean;
    starting: number;
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
            },
            slide: 0,
            left: false,
            right: false,
            starting: 0
        }
        this.onDragEnd = this.onDragEnd.bind(this);
        this.scrollEnd = this.scrollEnd.bind(this);
        this.favoriteCheck = this.favoriteCheck.bind(this);
        this.checkArrow = this.checkArrow.bind(this);
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
            }).then(() => { this.checkArrow(0) })
    }

    public render() {
        const { classes } = this.props;
        const { starting } = this.state

        const handlLeft = () => { this.checkArrow(-1) }
        const handlRight = () => { this.checkArrow(1) }
        return (
            <React.Fragment>
                <div
                    onClick={handlLeft}
                    className={classes.arrow}
                    style={{ left: 0, }}
                >
                    <Motion
                        defaultStyle={{ op: 0 }}
                        style={{ op: this.state.left ? spring(1) : spring(0) }}
                    >
                        {
                            (configStyle) => {
                                return (
                                    <ArrowLeft
                                        style={{ fontSize: "7.5vw", opacity: configStyle.op }}
                                    />
                                );
                            }
                        }
                    </Motion>
                </div>
                <div
                    onClick={handlRight}
                    className={classes.arrow}
                    style={{ right: 0, }}
                >
                    <Motion
                        defaultStyle={{ op: 0 }}
                        style={{ op: this.state.right ? spring(1) : spring(0) }}
                    >
                        {
                            (configStyle) => {
                                return (
                                    <ArrowRight
                                        style={{ fontSize: "7.5vw", opacity: configStyle.op }}
                                    />
                                );
                            }
                        }
                    </Motion>
                </div>
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
                                            this.state.order.slice(starting, starting + 5).map((name, index) => {
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
            </React.Fragment>
        );
    }
    private onDragEnd(result: DropResult) {
        const { destination, source, draggableId } = result;
        const offset = this.state.starting;

        // 목적지가 없다면 => 바뀐게 없다면
        if (!destination) { return; }
        // 드랍된 곳이 원래 있던 곳인데, 순서가 그대로 라면
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) { return; }
        const newOrder = this.state.order;
        // 순서를 조절함
        newOrder.splice(offset + source.index, 1);
        newOrder.splice(offset + destination.index, 0, draggableId);
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
            if (!this.state.lists[listName]) { return }
            const newCards = [...this.state.lists[listName].cards, ...result.data];
            if (result.data.length === 0) {
                this.setState({
                    lists: {
                        ...this.state.lists,
                        [listName]: {
                            cards: this.state.lists[listName].cards,
                            end: true,
                            getPage: this.state.lists[listName].getPage
                        }
                    }
                })
                return;
            }
            this.setState({
                lists: {
                    ...this.state.lists,
                    [listName]: {
                        cards: newCards,
                        end: this.state.lists[listName].end,
                        getPage: pageOffset + 1
                    }
                }
            })
        })
    }
    private checkArrow(turn: number) {
        if (!this.state.left && turn === -1) { return }
        if (!this.state.right && turn === 1) { return }
        const remain = this.state.order.length % 5
        const adder = remain === 0 ? 0 : 1;
        const maxSlide = Math.floor(this.state.order.length / 5 + adder);
        const slide = this.state.slide + turn;
        const left = slide === 0 ? false : true;
        const right = slide === maxSlide - 1 ? false : true;
        // 오른쪽 마지막 페이지라면, 부족한 칸은 더 땡겨와야됨
        const starting = !right ? (slide - 1) * 5 + remain : slide * 5
        this.setState({
            left,
            right,
            slide,
            starting
        })
    }
}

export default withStyles(style)(CardListContainer)