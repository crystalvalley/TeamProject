import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Avatar, Button, TextField } from '@material-ui/core';
import { IPhotoModel, IMemberModel } from '../../../constance/models';
import { ILoginStore, withLoginContext } from '../../../contexts/LoginContext';
import { Switch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import CardListContainer from '../CardList/CardListContainer';
import UpdateUser from './UpdateUser';



/**
 * @author:KoBongSu
 * @since:2018.09.05
 * @version:2018.09.06
 */

const style: StyleRulesCallback = (theme: Theme) => ({
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
        border:"0.5px solid black"
    },
    buttons: {
        position: "relative",
        top: "30%",
        left: "19%"
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

interface IProps {
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
    location: Location;
}
interface IState {
    item: {
        writer: string,
        image: IPhotoModel[],
    },
    userInfo: IMemberModel,
    click: number,
    firstContainer: string,
    order:string[]
}
class GroupPage extends React.Component<IProps & ILoginStore, IState>{
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
            order:[]
        }
    }

    public componentDidMount() {
        axios.get("http://localhost:8081/account/SignIn")
            .then((result) => {
                this.setState({
                    order: result.data
                })
            })
    }


    public render() {
        const { classes } = this.props;
        const handler = () => this.numberhandler(0)
        const handler1 = () => this.numberhandler(1)
        return (
            <div className={classes.viewContainer}>
                <div className={classes.firstContainer}>
                    <Switch>
                        <Route path="/GroupPage/CardListContainer" component={CardListContainer}/>
                        <Route path="/GroupPage/UpdateUser" componenet={UpdateUser}/>
                    </Switch>
                </div>


                <div className={classes.secondContainer}>
                    <Avatar alt="user" src="https://pbs.twimg.com/profile_images/1014241239300861952/AR1Up0pf_400x400.jpg" className={classes.avatar} />
                    <div className={classes.textfields}>
                        <TextField label="그룹페이지" /><br /><br />
                    </div>
                    <div className={classes.buttons}>
                        <Button variant="contained" onClick={handler} color="primary" className={classes.buttons}>
                            <NavLink to="/GroupPage/CardListContainer">타임라인</NavLink>
                        </Button>
                        <Button variant="contained" onClick={handler1} color="primary" className={classes.buttons}>
                            <NavLink to="/GroupPage/UpdateUser">개인정보</NavLink>
                        </Button>
                        
                    </div>
                    <div className={classes.texts}>
                        그룹 페이지다 이것들아
                        </div>
                </div>
            </div>
        );
    }
    private numberhandler(num: number) {
        this.setState({
            click: num
        })

    }
}

export default withLoginContext(withStyles(style)(GroupPage))