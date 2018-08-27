import * as React from 'react';
import { ICardModel } from '../../../constance/models';
import { StyleRulesCallback, Theme, withStyles, Typography, Divider } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import TestCard from './Test';
import Scrollbars from 'react-custom-scrollbars'
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
    cardListWrapper:{
        flexGrow:1, 
        margin: "0.25%",
    }
})

interface IProps {
    classes: {
        cardListWrapper: string;
        listName: string;
        listBody:string;
    },
    index: number;
}

interface IProps {
    id: string;
    cardList: ICardModel[];
}

class CardList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
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
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                            >
                                <Typography
                                    className={classes.listName}
                                >
                                    {this.props.id}
                                </Typography>
                                <Scrollbars
                                    autoHide={true}
                                >
                                    <div
                                        className={classes.listBody}
                                    >
                                        <Divider />
                                        {
                                            this.props.cardList.map((card, index) => {
                                                return (
                                                    <TestCard
                                                        key={index}
                                                    />
                                                )
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