import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Typography, Divider } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import Scrollbars from 'react-custom-scrollbars'
import { ICardModel } from '../../../constance/models';
import axios from 'axios';
import SmallCard from './Card/smallCard/SmallCard';
import SearchedList from './Card/SearchedList';
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
}

class CardList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            cards: []
        }
    }

    public componentDidMount() {
        axios.get("http://localhost:8081/boards/getByListName", {
            params: {
                listName: this.props.listName
            }
        }).then((result) => {
            this.setState({
                cards: result.data
            })
        })
    }

    public componentWillReceiveProps(prevProps: IProps) {
        if (this.props.listName === prevProps.listName) { return; }
        axios.get("http://localhost:8081/boards/getByListName", {
            params: {
                listName: prevProps.listName
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
                                >
                                    <div
                                        className={classes.listBody}
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
                                                <SearchedList/>
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
}


export default withStyles(style)(CardList)