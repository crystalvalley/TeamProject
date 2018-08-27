import * as React from 'react';
import { ICardModel } from '../../../constance/models';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

const style: StyleRulesCallback = (theme: Theme) => ({
    cardListWrapper: {
        width: "200px",
        border: "1px solid black",
        margin: "25px",
        padding: "10px"
    }
})

interface IProps {
    classes: {
        cardListWrapper: string;
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
        return (
            <Draggable
                draggableId={this.props.id}
                index={this.props.index}
            >
                {
                    (provided, snapshot) => {
                        return (
                            <div
                                className={this.props.classes.cardListWrapper}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                            >
                                <h3
                                    {...provided.dragHandleProps}
                                >
                                    {this.props.id}
                                </h3>
                                {
                                    this.props.cardList.map((card, index) => {
                                        return (
                                            <div
                                                key={index}
                                            >
                                                {card.title}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        );
                    }
                }
            </Draggable>
        );
    }
}


export default withStyles(style)(CardList)