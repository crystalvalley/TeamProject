import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, Typography } from '@material-ui/core';
import { ICardModel, IPhotoModel } from '../../../constance/models';
import axios from 'axios';
import Viewer from './Viewer';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.08.20
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    viewContainer: {
        backgroundColor: "white",
        height: "100%",
        padding: "10px",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        display: "flex",
        flexDirection: "column"
    },
    wrapper: {
        flexGrow: 1,
        display: "flex",
    },
    containers: {
        flexGrow: 1,
        flexBasis:"50%",
        display: "flex",
        flexDirection: "column",
        margin: "1vw"
    },
    imageContainer: {
        flexBasis: "65%",
        marginBottom: "1vh",
        overflowWrap:"normal",
        display:"flex",
        justifyContent:"center",
    },
    emotion: {
        border: "1px solid black",
        flexBasis: "2.5em"
    },
    replyWriter: {
        border: "1px solid black",
        flexBasis: "15%",
        marginBottom: "1vh"
    },
    replyContainer: {
        border: "1px solid black",
        flexGrow: 1,
    },
    writer: {
        border: "1px solid black",
        flexBasis: "2.5em",
        marginBottom: "1vh"
    },
    image: {
        margin: "0 auto",
    }
})

interface IProps {
    classes: {
        viewContainer: string;
        wrapper: string;
        containers: string;
        image: string;
        imageContainer: string;
        text: string;
        emotion: string;
        replyWriter: string;
        replyContainer: string;
        writer: string;
    }
    location: Location;
}

interface IState {
    item: {
        content: ICardModel,
        writer: string,
        image: IPhotoModel[],
    }
}

class ViewContainer extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            item: {
                content: {
                    content: "",
                    hitcount: 0,
                    id: -1,
                    image: "",
                    sound: "",
                    title: "",
                    updateDaty: "",
                    writeDay: "",
                },
                image: [],
                writer: ""
            }
        }
    }

    public componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        axios.get("http://localhost:8081/boards/view", {
            params: {
                // 카드 타입 => 게시글, 카드
                type: params.get("type"),
                // 카드 넘버
                num: params.get("num")
            },
        })
            .then((response) => {
                this.setState({
                    item: response.data
                });
            })
    }
    public componentWillUpdate(nextProps: IProps, nextState: IState) {
        const params = new URLSearchParams(this.props.location.search);
        if ((this.state.item !== this.state.item) || (this.props.location !== nextProps.location)) {
            axios.get("http://localhost:8081/view", {
                params: {
                    // 카드 타입 => 게시글, 카드
                    type: params.get("type"),
                    // 카드 넘버
                    num: params.get("num")
                },
            })
                .then((response) => {
                    this.setState({
                        item: response.data
                    });
                })
        }
    }


    public render() {
        const { classes } = this.props;
        const { item } = this.state;
        return (
            <div className={classes.viewContainer}>
                <Toolbar
                    style={{
                        border: "1px solid black"
                    }}
                >
                    <Typography>
                        {item.content.title}
                    </Typography>
                    <div
                        style={{
                            position: "relative",
                            left: "90%"
                        }}
                    >
                        아이콘
                    </div>
                </Toolbar>
                <div className={classes.wrapper}>
                    <div className={classes.containers}>
                        <div className={classes.imageContainer}>
                            <img
                                className={classes.image}
                                src="https://material-ui.com/static/images/grid-list/breakfast.jpg"
                            />
                        </div>
                        <div className={classes.writer}>
                            {item.writer}
                        </div>
                        <Viewer
                            content={item.content.content}
                        />
                        <div className={classes.emotion}>
                            감정표현
                        </div>
                    </div>
                    <div
                        style={{
                            marginLeft: 0
                        }}
                        className={classes.containers}
                    >
                        <div className={classes.replyWriter}>
                            댓글 입력
                        </div>
                        <div className={classes.replyContainer}>
                            댓글
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(style)(ViewContainer);