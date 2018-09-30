import * as React from 'react';
import { StyleRulesCallback, withStyles } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import { ICardModel } from '../../../constance/models';
import SmallCard from '../CardList/Card/smallCard/SmallCard';



const style: StyleRulesCallback = () => ({
    viewContainer: {
        backgroundColor: "white",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: " space-around"
    },
    Container: {
        margin: "5px",
        height: "100%",
        width: "30%",
        border: "1px solid black"
    },
    listBody: {
        display: "flex",
        flexDirection: "column",
        margin: "5px",
        marginRight: "15px"
    },
    listName: {
        paddingLeft: "1em",
        fontSize: "1.5em"
    }
})
interface IProps {
    classes: {
        viewContainer: string;
        Container: string;
        listName: string;
        listBody: string;
    },
    cards: ICardModel[];
}
class PersonalList extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.viewContainer} style={{ height: "100%" }}>
                <Scrollbars
                    autoHide={true}
                >
                    <div className={classes.listBody}>
                        {this.props.cards.map((card, index) => {
                            return (
                                <SmallCard
                                    card={card}
                                    key={index}
                                    personal={true}
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


export default withStyles(style)(PersonalList);