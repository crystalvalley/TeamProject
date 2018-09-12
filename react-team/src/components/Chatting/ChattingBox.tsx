import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, Typography, Switch, Grow, Paper } from '@material-ui/core';

const style: StyleRulesCallback = (theme: Theme) => ({
    chatBox: {
        width: "120px",
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing.unit,
        boxShadow:"1px 1px 2px 2px black"
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    chatname:{
        bottom:0
    }
})

interface IProps {
    classes: {
        chatBox: string;
        container: string;
        paper: string;
        svg: string;
        polygon: string;
        chatname:string;
    }
}

interface IState {
    checked: boolean;
}

class ChattingName extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            checked: false
        }
        this.onCheck = this.onCheck.bind(this);
    }
    public render() {
        const { checked } = this.state;
        const { classes } = this.props;
        return (
            <div
                className={classes.chatBox}
            >
                <div className={classes.container}>
                    <Grow in={checked}>
                        <Paper elevation={4} className={classes.paper}>
                            <svg className={classes.svg}>
                                <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
                            </svg>
                        </Paper>
                    </Grow>
                </div>
                <Typography
                    className={classes.chatname}
                >
                    채팅방1
                    <Switch
                        checked={checked}
                        onChange={this.onCheck}
                        aria-label="Collapse"
                    />
                </Typography>
            </div>
        );
    }
    private onCheck() {
        const next = !this.state.checked
        this.setState({
            checked: next
        })
    }
}

export default withStyles(style)(ChattingName);