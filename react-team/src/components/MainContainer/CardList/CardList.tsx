import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Typography, Divider } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import Scrollbars from 'react-custom-scrollbars'
import { ICardModel } from '../../../constance/models';
import axios from 'axios';
import SmallCard from './Card/smallCard/SmallCard';
import SearchedList from './Card/SearchedList';
import { ISearchState, withSearchContext } from '../../../contexts/SearchContext';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.27
 * @Version : 2018.08.27
 * 
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    listBody: {
        display: "flex",
        flexDirection: "column",
        margin: "5px",
        marginRight: "15px"
    },
    listName: {
        paddingLeft: "1em",
        fontSize: "1.5em"
    },
    cardListWrapper: {
        flexGrow: 0,
        flexShrink: 0,
        margin: "0.25%",
        flexBasis: "20%"
    },
    box: {
        width: "1em",
        height: "1em",
        backgroundColor: "blue",
        display: "inline-block",
        marginRight: "0.5em"
    }
})

interface IProps {
    classes: {
        cardListWrapper: string;
        listName: string;
        listBody: string;
        box: string;
    },
    index: number;
    id: string;
    listName: string;
}

interface IState {
    cards: ICardModel[]
    getPage: number;
    end: boolean;
}

class CardList extends React.Component<IProps & ISearchState, IState> {
    private scroll: Scrollbars | null;
    private div: HTMLDivElement | null;
    constructor(props: IProps & ISearchState) {
        super(props);
        this.state = {
            cards: [],
            getPage: 0,
            end: false
        }
        this.setScrollPosition = this.setScrollPosition.bind(this);
    }

    public componentDidMount() {
        axios.get("http://localhost:8081/boards/getByListName", {
            params: {
                listName: this.props.listName,
                page: this.state.getPage
            }
        }).then((result) => {
            this.setState({
                cards: result.data
            })
        })
    }

    public render() {
        const { classes } = this.props;
        return (
            <Draggable
                draggableId={this.props.id}
                index={this.props.index}
            >
                {
                    (provided, snapshot) => {
                        return (
                            <div
                                className={classes.cardListWrapper}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                            >
                                <Typography
                                    className={classes.listName}
                                    {...provided.dragHandleProps}
                                >
                                    {this.props.listName}
                                </Typography>
                                <Scrollbars
                                    autoHide={true}
                                    ref={(element) => { this.scroll = element }}
                                    onScrollStop={this.setScrollPosition}
                                >
                                    <div
                                        className={classes.listBody}
                                        ref={(element) => { this.div = element }}
                                    >
                                        <Divider />
                                        {
                                            this.props.listName !== "SearchField" ?
                                                this.state.cards.map((card, index) => {
                                                    return (
                                                        <SmallCard
                                                            card={card}
                                                            key={index}
                                                        />
                                                    );
                                                }) :
                                                <SearchedList
                                                    {...this.props}
                                                />
                                        }
                                    </div>
                                </Scrollbars>
                            </div>
                        );
                    }
                }
            </Draggable>
        );
    }
    private setScrollPosition() {
        const nowScrollTop = this.scroll!.getScrollTop();
        const scrollHeight = this.scroll!.getClientHeight()
        const divHeight = this.div!.scrollHeight;
        const pageOffset = this.state.getPage;
        // 더 이상 불러올 글이 없다면
        if (this.state.end) { return }
        if(this.props.listName==="SearchField"){
            this.props.addPage();
        }
        if ((nowScrollTop + scrollHeight) > divHeight) {
            axios.get("http://localhost:8081/boards/getByListName", {
                params: {
                    listName: this.props.listName,
                    page: pageOffset + 1
                }
            }).then((result) => {
                const newCards = [...this.state.cards, ...result.data];
                if (result.data.length === 0) {
                    this.setState({
                        end: true
                    })
                }
                this.setState({
                    cards: newCards,
                    getPage: pageOffset + 1
                })
            })
        }
    }
}


export default withSearchContext(withStyles(style)(CardList));