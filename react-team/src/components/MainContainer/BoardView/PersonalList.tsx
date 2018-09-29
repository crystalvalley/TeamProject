import * as React from 'react';
import { StyleRulesCallback, withStyles } from '@material-ui/core';
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars';
import { ICardModel, IMemberModel } from '../../../constance/models';
import SmallCard from '../CardList/Card/smallCard/SmallCard';



const style: StyleRulesCallback = () => ({
    viewContainer: {
        backgroundColor: "white",
        height: "100%",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
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
interface IState  {
   
    userInfo : IMemberModel;
    cards: ICardModel[];
}

class PersonalList extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
           
            userInfo: {
                id: "",
                profileImg: ""
            },
            cards: []
        }
        axios.get("http://localhost:8081/boards/getById")
        .then((response) => {
           this.setState({
                cards: response.data 
              })
        })
    }
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.viewContainer}>
                <Scrollbars
                    autoHeight={true}
                    autoHide={true}
                >
                    <div className={classes.listBody}>
                        {this.state.cards.map((card, index) => {
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


export default withStyles(style)(PersonalList);