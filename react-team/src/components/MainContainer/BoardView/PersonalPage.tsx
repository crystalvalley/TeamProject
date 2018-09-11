import * as React from 'react';
import { StyleRulesCallback,  withStyles, Avatar, Button, TextField } from '@material-ui/core';
import { IPhotoModel, IMemberModel, ICardModel } from '../../../constance/models';
import { ILoginStore, withLoginContext } from '../../../contexts/LoginContext';
import { Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import UpdateUser from './UpdateUser';
import { DropResult } from 'react-beautiful-dnd';
import CardList from '../CardList/CardList';
import { ISearchState } from '../../../contexts/SearchContext';
import { IFavoriteStore } from '../../../contexts/FavoriteContext';



/**
 * @author:KoBongSu
 * @since:2018.09.02
 * @version:2018.09.04
 */

const style: StyleRulesCallback = () => ({
    viewContainer: {
        backgroundColor: "white",
        height: "100%",
        padding: "10px",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: " space-around"
    },
    firstContainer: {
        height: "100%",
        width: "50%",
        border: "1px solid black"
    },
    secondContainer: {
        height: "100%",
        width: "50%",
        border: "1px solid black"
    },
    imageSize: {
        padding: "8px",
        height: "100px",
        width: "100px"
    },
    avatar: {
        width: "150px",
        height: "150px",
        left: "40%",
        top: "15%",
        border: "0.5px solid black"
    },
    buttons: {
        position: "relative",
        top: "30%",
        left: "15.5%"
    },
    texts: {
        position: "relative",
        top: "40%",
        left: "38%",
        font: "bold"
    },
    textfields: {
        position: "relative",
        left: "37%",
        top: "20%"
    }
})

interface IProps extends ISearchState, IFavoriteStore{
    classes: {
        viewContainer: string;
        wrapper: string;
        containers: string;
        image: string;
        firstContainer: string;
        secondContainer: string;
        emotion: string;
        writer: string;
        imageSize: string;
        buttons: string;
        avatar: string;
        texts: string;
        textField: string;
        textfields: string;
    }
    location: Location,
    card:ICardModel
}
interface IState {
    item: {
        writer: string,
        image: IPhotoModel[],
    },
    userInfo: IMemberModel,
    click: number,
    firstContainer: string,
    order:string[],
    cards: ICardModel[],
    

}
class PersonalPage extends React.Component<IProps & ILoginStore, IState>{
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.state = {
            item: {
                image: [],
                writer: ""
            },
            userInfo: {
                id: "",
                profileImg: "",
                username: ""
            },
            click: 0,
            firstContainer: "",
            order:[],
            cards:[]
            
        }
      

        this.onDragEnd = this.onDragEnd.bind(this);
    }
       
    public componentDidMount() {
        axios.get("http://localhost:8081/boards/getById")
            .then((response) => {
               this.setState({
                    cards: response.data 
                  })
            })
    }
   

    public render() {
        const { classes, logined } = this.props;
        const handler = () => this.numberhandler(0);
        const handler1 = () => this.numberhandler(1);
        const handler2 = () => this.numberhandler(2);
        return (
            <div className={classes.viewContainer}>
                <div className={classes.firstContainer}>
                    <Switch>
                        {/*<CardList cards={this.state.cards} />*/}
                        <Route path="/PersonalPage/UpdateUser" componenet={UpdateUser}/>
                        <Route path="/PersonalPage/UpdateUser2" componenet={UpdateUser}/>
                    </Switch>
                </div>


                <div className={classes.secondContainer}>
                    <Avatar alt="user" src={logined.profileImg} className={classes.avatar} />
                    <div className={classes.textfields}>
                        <TextField label={logined.id} /><br /><br />
                    </div>
                    <div className={classes.buttons}>
                        <Button variant="contained" onClick={handler} color="primary" className={classes.buttons}>
                            <NavLink to="/PersonalPage/CardListContainer">타임라인</NavLink>
                        </Button>
                        <Button variant="contained" onClick={handler1} color="primary" className={classes.buttons}>
                            <NavLink to="/PersonalPage/UpdateUser">개인정보</NavLink>
                        </Button>
                        <Button variant="contained" onClick={handler2} color="primary" className={classes.buttons}>
                        <NavLink to="/PersonalPage/UpdateUser">친구목록</NavLink>
                        </Button>
                    </div>
                    <div className={classes.texts}>
                        나의 페이지다 이것들아
                        </div>
                </div>
            </div>
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

    private numberhandler(num: number) {
        this.setState({
            click: num
        })

    }



}

export default withLoginContext(withStyles(style)(PersonalPage))