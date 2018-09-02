import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Typography, Divider } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import Scrollbars from 'react-custom-scrollbars'
import { ICardModel } from '../../../constance/models';
import axios from 'axios';
import SmallCard from './Card/smallCard/SmallCard';
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
        flexGrow: 1,
        margin: "0.25%",
    }
})

interface IProps {
    classes: {
        cardListWrapper: string;
        listName: string;
        listBody: string;
    },
    index: number;
    id: string;
    listName:string;
}

interface IState{
    cards : ICardModel[]
}

class CardList extends React.Component<IProps,IState> {
    constructor(props: IProps) {
        super(props);
        this.state={
            cards : []
        }
    }

    public componentDidMount() {
        axios.get("http://localhost:8081/boards/getByListName",{
            params :{
                listName : this.props.listName
            }
        }).then((result)=>{
            this.setState({
                cards : result.data
            })
        })
    }

    public componentWillReceiveProps(prevProps : IProps){
        if(this.props.listName === prevProps.listName){return;}
        axios.get("http://localhost:8081/boards/getByListName",{
            params :{
                listName : prevProps.listName
            }
        }).then((result)=>{
            this.setState({
                cards : result.data
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
                                            this.state.cards.map((card,index)=>{
                                                return(
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
}


export default withStyles(style)(CardList)