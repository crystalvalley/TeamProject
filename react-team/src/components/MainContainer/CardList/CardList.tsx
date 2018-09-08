import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Typography, Divider } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import Scrollbars from 'react-custom-scrollbars';
import { ICardModel } from '../../../constance/models';
import SmallCard from './Card/smallCard/SmallCard';
import SearchedList from './Card/SearchedList';
import { ISearchState, withSearchContext } from '../../../contexts/SearchContext';
import { IFavoriteStore, withFavoriteContext } from '../../../contexts/FavoriteContext';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.27
 * @Version : 2018.09.07
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

interface IProps extends ISearchState, IFavoriteStore {
    classes: {
        cardListWrapper: string;
        listName: string;
        listBody: string;
        box: string;
    },
    index: number;
    id: string;
    listName: string;
    cards : ICardModel[]
    scrollEnd(listName:string):void;
    favoriteCheck():void;
}


class CardList extends React.Component<IProps> {
    private scroll: Scrollbars | null;
    private div: HTMLDivElement | null;
    constructor(props: IProps) {
        super(props);
        this.state = {
            getPage: 0,
            end: false
        }
        this.setScrollPosition = this.setScrollPosition.bind(this);
    }
    public componentDidUpdate(prevProps: IProps) {
        if (this.props.listName !== "Favorites") { return; }
        if (this.props.refresh()) {
            this.props.favoriteCheck();
        }
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
                                        this.props.listName === "SearchField" ?
                                            <SearchedList
                                                searchedCard={this.props.searchedCard}
                                                keyword={this.props.keyword}
                                                keywordChange={this.props.keywordChange}
                                            /> :
                                            this.props.cards.map((card, index) => {
                                                return (
                                                    <SmallCard
                                                        card={card}
                                                        key={index}
                                                    />
                                                );
                                            })
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
        // 더 이상 불러올 글이 없다면
        if (this.props.listName === "SearchField") {
            this.props.addPage();
        }
        if ((nowScrollTop + scrollHeight) > divHeight) {
            this.props.scrollEnd(this.props.id);
        }

    }
}


export default withFavoriteContext(withSearchContext(withStyles(style)(CardList)));