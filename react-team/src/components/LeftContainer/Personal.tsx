import * as React from 'react';
import {  withStyles, Avatar, ExpansionPanel, ExpansionPanelDetails, Typography, IconButton } from '@material-ui/core';
import Settings from '@material-ui/icons/SettingsApplications';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import AlarmOff from "@material-ui/icons/AlarmOff";
import AlarmOn from "@material-ui/icons/AlarmOn";
import Help from '@material-ui/icons/LiveHelp';
import Mail from '@material-ui/icons/Mail'
import Star from "@material-ui/icons/Star"
import Mic from "@material-ui/icons/Mic"
import MicOff from "@material-ui/icons/MicOff"
import Mood1 from "@material-ui/icons/SentimentVerySatisfied"
import Mood2 from "@material-ui/icons/Mood"
import Mood3 from "@material-ui/icons/SentimentSatisfied"
import Mood4 from "@material-ui/icons/SentimentDissatisfied"
import Mood5 from "@material-ui/icons/MoodBad"
import Mood6 from "@material-ui/icons/SentimentVeryDissatisfied"
import { personalStyle } from './Styles/PersonalStyles';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.17
 * @version : 2018.08.17
 */

interface IProps {
    classes: {
        avatar: string;
        userName: string;
        personalMenus: string;
        icon: string;
    },
    open: boolean
}

interface IState {
    // 임시로 체크 용
    alarm: boolean;
    notify: boolean;
    mic: boolean;
    sentiment: number;
}

class Personal extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            alarm: true,
            notify: true,
            mic: true,
            sentiment: 0
        }
        this.alaramChange = this.alaramChange.bind(this);
        this.notifyChange = this.notifyChange.bind(this);
        this.micChange = this.micChange.bind(this);
        this.sentimentChange = this.sentimentChange.bind(this);
    }
    public render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {/* Font */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Jua"
                />
                <div style={{ display: "flex" }}>
                    <Avatar
                        style={{ display: "inline-block" }}
                        className={classes.avatar}
                        src="https://pbs.twimg.com/profile_images/1014241239300861952/AR1Up0pf_400x400.jpg"
                    />
                    <Typography
                        className={classes.userName}
                    >
                        CrystalValley1
                    </Typography>
                </div>
                <ExpansionPanel expanded={this.props.open}>
                    <ExpansionPanelDetails
                        classes={{
                            root: classes.personalMenus
                        }}
                    >
                        <IconButton
                            className={classes.icon}
                            onClick={this.alaramChange}
                        >
                            {this.state.alarm ? <AlarmOn /> : <AlarmOff />}
                        </IconButton>
                        <IconButton
                            className={classes.icon}
                            onClick={this.notifyChange}
                        >
                            {this.state.notify ? <NotificationsActive /> : <NotificationsNone />}
                        </IconButton>
                        <IconButton
                            onClick={this.micChange}
                            className={classes.icon}
                        >
                            {this.state.mic ? <Mic /> : <MicOff />}
                        </IconButton>
                        <IconButton
                            onClick={this.sentimentChange}
                            className={classes.icon}
                        >
                            {
                                this.state.sentiment === 0 ?
                                    <Mood1 /> :
                                    this.state.sentiment === 1 ?
                                        <Mood2 /> :
                                        this.state.sentiment === 2 ?
                                            <Mood3 /> :
                                            this.state.sentiment === 3 ?
                                                <Mood4 /> :
                                                this.state.sentiment === 4 ?
                                                    <Mood5 /> : <Mood6 />

                            }
                        </IconButton>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails
                        className={classes.personalMenus}
                    >
                        <IconButton
                            className={classes.icon}
                        >
                            <Star />
                        </IconButton>
                        <IconButton
                            className={classes.icon}
                        >
                            <Mail />
                        </IconButton>
                        <IconButton
                            className={classes.icon}
                        >
                            <Help />
                        </IconButton>
                        <IconButton
                            className={classes.icon}
                        >
                            <Settings />
                        </IconButton>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </React.Fragment>
        );
    }
    private alaramChange() {
        const set = !this.state.alarm
        this.setState({
            alarm: set
        })
    }
    private notifyChange() {
        const set = !this.state.notify
        this.setState({
            notify: set
        })
    }
    private micChange() {
        const set = !this.state.mic
        this.setState({
            mic: set
        })
    }
    private sentimentChange() {
        let set = this.state.sentiment + 1;
        if (set === 6) {
            set = 0
        }
        this.setState({
            sentiment: set
        })
    }
}

export default withStyles(personalStyle)(Personal);