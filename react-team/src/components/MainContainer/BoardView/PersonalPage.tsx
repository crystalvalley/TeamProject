import * as React from 'react';
import { StyleRulesCallback, withStyles, Avatar, Typography } from '@material-ui/core';
import { IPhotoModel, IMemberModel, ICardModel, ROOTURL } from '../../../constance/models';
import { ILoginStore } from '../../../contexts/LoginContext';
// import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PersonalList from './PersonalList';



/**
 * @author:KoBongSu
 * @since:2018.09.02
 * @version:2018.09.28
 */

const style: StyleRulesCallback = () => ({
    viewContainer: {
        backgroundColor: "white",
        flexGrow: 1,
        padding: "10px",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: " space-around",
    },
    firstContainer: {
        height: "100%",
        width: "50%",
    },
    secondContainer: {
        height: "100%",
        width: "50%"
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
        top: "26%",
        left: "23%"
    },
    texts: {
        position: "relative",
        top: "37%",
        left: "32%",
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
    id: string;
}
interface IState {
    item: {
        writer: string,
        image: IPhotoModel[],
    },
    userInfo: IMemberModel,
    click: number,
    firstContainer: string,
    cards: ICardModel[]
}
class PersonalPage extends React.Component<IProps, IState>{
    // 크롬계열 height %가 안 먹는 문제 해결
    private imgSize: HTMLDivElement | null;
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
            },
            click: 0,
            firstContainer: "",
            cards: []
        }
    }
    public componentDidMount() {
        axios.get(ROOTURL + "/boards/getPersonalPage", {
            params: {
                target: this.props.id
            }
        }).then((response) => {
            this.setState({
                userInfo: response.data.target,
                cards: response.data.cards
            })
        })
    }
    public render() {
        const { classes } = this.props;
        return (
            <div
                ref={(e) => { this.imgSize = e }}
                className={classes.viewContainer}
            >
                <div
                    className={classes.firstContainer}
                    style={{
                        height: this.imgSize ? this.imgSize.offsetHeight - 20 : ""
                    }}
                >
                    <PersonalList cards={this.state.cards} />
                </div>
                <div className={classes.secondContainer}>
                    <Avatar src={ROOTURL + "/resources" + this.state.userInfo.profileImg} className={classes.avatar} />
                    <div className={classes.textfields}>
                        <Typography
                            style={{
                                fontFamily: "Roboto,sans-serif",
                            }}
                        >
                            {this.props.id}
                        </Typography>
                        <br />
                        <br />
                    </div>
                    <div
                        style={{
                            fontFamily: "Roboto,sans-serif",
                        }}
                        className={classes.texts}
                    >
                        POKYBOOK에 오신 것을 환영합니다.
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(style)(PersonalPage)