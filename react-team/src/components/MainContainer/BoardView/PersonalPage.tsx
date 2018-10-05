import * as React from 'react';
import { StyleRulesCallback, withStyles, Avatar, Typography } from '@material-ui/core';
import { IPhotoModel, IMemberModel, ICardModel, ROOTURL } from '../../../constance/models';
import { ILoginStore, withLoginContext } from '../../../contexts/LoginContext';
// import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PersonalList from './PersonalList';
import Dropzone from 'react-dropzone';



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
        width: "50%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    imageSize: {
        padding: "8px",
        height: "100px",
        width: "100px"
    },
    id: {
        fontFamily: "Roboto,sans-serif",
        fontSize: "2em",
        fontStyle: "bold",
        marginBottom: "5vh"
    },
    dropzone: {
        marginTop: "10vh",
        width: "25vh",
        height: "25vh",
        marginBottom: "5vh",
    },
    avatar: {
        width: "100%",
        height: "100%",
        border: "0.5px solid black",
    },
    otherAvatar: {
        marginTop: "10vh",
        width: "25vh",
        height: "25vh",
        border: "0.5px solid black",
    },
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
        avatar: string;
        texts: string;
        id: string;
        dropzone: string;
        otherAvatar: string;
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
    profile?: File,

}
class PersonalPage extends React.Component<IProps & ILoginStore, IState>{
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
            cards: [],
        }
        this.onDrop = this.onDrop.bind(this);
        this.update = this.update.bind(this);
    }
    public componentDidMount() {
        this.update();
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
                    <PersonalList
                        boardRefresh={this.update}
                        cards={this.state.cards}
                    />
                </div>
                <div className={classes.secondContainer}>
                    {
                        this.props.id === this.props.logined.id ?
                            <Dropzone
                                accept="image/*"
                                multiple={false}
                                className={classes.dropzone}
                                onDrop={this.onDrop}
                            >
                                <Avatar
                                    src={this.props.profileURL}
                                    className={classes.avatar}
                                />

                            </Dropzone> :
                            <Avatar
                                src={ROOTURL + "/resources" + this.state.userInfo.profileImg}
                                className={classes.otherAvatar}
                            />
                    }
                    <Typography
                        className={classes.id}
                    >
                        {this.props.id}
                    </Typography>
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
    private update() {
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
    private onDrop(files: File[]) {
        const data = new FormData();
        data.append("upload", files[0]);
        axios.post(ROOTURL + "/account/uploadProfile", data)
            .then((res) => {
                this.update();
                this.props.loginCheck()
            });
    }
}
export default withLoginContext(withStyles(style)(PersonalPage));