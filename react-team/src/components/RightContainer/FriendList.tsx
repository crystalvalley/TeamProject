import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List, } from '@material-ui/core';
import Friend from './Friend';
import FriendMenu from './FriendMenu';
import ExpandIcon from '@material-ui/icons/ExpandLess';
import { IVoiceStore, withVoice } from '../../contexts/VoiceRecogContext';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.17
 * @version : 2018.08.17
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    friendList: {
        width: "12vw",
        position: "fixed",
        display: "flex",
        right: "1vw",
        bottom: "2vh",
        zIndex: 1400,
        left: "auto",
        justifyContent: "flex-end",
        boxSizing: "inherit",
        backgroundColor: "#494949",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        borderRadius: "4px",
    },
    // List에도 적용되어 있음
    panel: {
        width: "100%"
    },
    detail: {
        height: "calc(100vh - 160px)",
        padding: 0
    },
})

interface IProps {
    classes: {
        friendList: string;
        panel: string;
        detail: string;
        textFont: string;
    }
}

interface IState {
    anchorEL?: HTMLElement;
    menuOpen: boolean;
    expanding : boolean;
}

class FriendList extends React.Component<IProps&IVoiceStore, IState> {
    constructor(props: IProps&IVoiceStore) {
        super(props);
        this.state = {
            menuOpen: false,
            expanding:false
        }
        this.setEl = this.setEl.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.voiceRecognition = this.voiceRecognition.bind(this);
        this.clickExpanded = this.clickExpanded.bind(this);
    }
    public componentWillReceiveProps(nextProps : IProps & IVoiceStore){
        if(nextProps.inputValue!==this.props.inputValue){
            this.voiceRecognition(nextProps.inputValue);
        }
    }

    public render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Jua"
                />
                <div
                    style={{
                        width: "240px",
                        flexShrink: 0,
                    }}
                />
                <div
                    className={classes.friendList}
                >
                    <ExpansionPanel
                        className={classes.panel}
                        expanded={this.state.expanding}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandIcon />}
                            onClick={this.clickExpanded}
                        >
                            Online Friend
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={classes.detail}
                        >
                            <List
                                className={classes.panel}
                            >
                                <Friend
                                    setEL={this.setEl}
                                    member={{
                                        avatar: "http://img.etoday.co.kr/pto_db/2018/08/20180809164454_1238623_600_750.jpg",
                                        id: "한 예슬"
                                    }}
                                    key={1}
                                />
                                <Friend
                                    setEL={this.setEl}
                                    member={{
                                        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/180524_%EA%B9%80%ED%8F%AC%EA%B3%B5%ED%95%AD_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_%EC%82%AC%EB%82%98.jpg/220px-180524_%EA%B9%80%ED%8F%AC%EA%B3%B5%ED%95%AD_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_%EC%82%AC%EB%82%98.jpg",
                                        id: "사나"
                                    }}
                                    key={2}
                                />
                            </List>
                            <FriendMenu
                                handleClose={this.handleClose}
                                anchorEL={this.state.anchorEL}
                                open={this.state.menuOpen}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </React.Fragment>
        );
    }
    private setEl(e: React.MouseEvent<HTMLInputElement>) {
        this.setState({
            menuOpen: true,
            anchorEL: e.currentTarget
        })
    }
    private handleClose() {
        this.setState({
            menuOpen: false
        })
    }

    private clickExpanded(){
        const next = this.state.expanding
        this.setState({
            expanding : !next
        })
    }

    private voiceRecognition(command : string){
        const trimedCommand = command.replace(/\s/gi, "");
        if(trimedCommand==="친구목록열어"){
            this.setState({
                expanding:true
            })
        }else if(trimedCommand==="친구목록닫아"){
            this.setState({
                expanding :false
            })
        }
    }
}

export default withVoice(withStyles(style)(FriendList));