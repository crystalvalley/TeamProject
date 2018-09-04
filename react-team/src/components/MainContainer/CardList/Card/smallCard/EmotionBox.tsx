import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme, Button, } from '@material-ui/core';
import axios from 'axios';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.29
 * @version : 2018.09.03
 * 
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    unclicked: {
        color: "rgba(0,0,0,0.54)",
        flexShrink: 1
    },
    clicked: {
        color: "rgba(0,0,0,1)",
        flexShrink: 1
    },
});

interface IProps {
    classes: {
        unclicked: string;
        clicked: string;
    }
    id: number;
}
interface IState {
    clicked: number;
    count: number[];
}
class EmotionBox extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            clicked: -1,
            count: []
        }
        this.checkEmotion = this.checkEmotion.bind(this);
        this.emotionClick = this.emotionClick.bind(this);
    }
    public componentDidMount() {
        this.checkEmotion();
    }

    public render() {
        const { count, clicked } = this.state;
        const { classes } = this.props;
        const handler1 = () => this.emotionClick(1);
        const handler2 = () => this.emotionClick(2);
        const handler3 = () => this.emotionClick(3);
        const handler4 = () => this.emotionClick(4);
        const handler5 = () => this.emotionClick(5);
        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                }}
            >
                <Button
                    style={{
                        minWidth: 0
                    }}
                    className={clicked === 1 ?
                        classes.clicked :
                        classes.unclicked
                    }
                    onClick={handler1}
                >
                    😍{count[1]}
                </Button>
                <Button
                    style={{
                        minWidth: 0
                    }}
                    className={clicked === 2 ?
                        classes.clicked :
                        classes.unclicked
                    }
                    onClick={handler2}
                >
                    😄{count[2]}
                </Button>
                <Button
                    style={{
                        minWidth: 0
                    }}
                    className={clicked === 3 ?
                        classes.clicked :
                        classes.unclicked
                    }
                    onClick={handler3}
                >
                    😐{count[3]}
                </Button>
                <Button
                    style={{
                        minWidth: 0
                    }}
                    className={clicked === 4 ?
                        classes.clicked :
                        classes.unclicked
                    }
                    onClick={handler4}
                >
                    ☹️{count[4]}
                </Button>
                <Button
                    style={{
                        minWidth: 0
                    }}
                    className={clicked === 5 ?
                        classes.clicked :
                        classes.unclicked
                    }
                    onClick={handler5}
                >
                    😠{count[5]}
                </Button>
            </div>
        );
    }
    private checkEmotion() {
        axios.get("http://localhost:8081/boards/getEmotion", {
            params: { boardId: this.props.id }
        })
            .then((result) => {
                this.setState({
                    clicked: result.data[0],
                    count: result.data
                })
            })
    }
    private emotionClick(num: number) {
        if(this.state.clicked === num){return;}
        const exNum = this.state.count[this.state.clicked];
        const exNum2 = this.state.count[num];
        const array = this.state.count;
        array[this.state.clicked] = exNum - 1;
        array[num] = exNum2 + 1;
        this.setState({
            clicked: num,
            count: array
        })
        axios.get("http://localhost:8081/boards/addEmotion", {
            params: {
                boardId: this.props.id,
                emotionType: num
            }
        })

    }
}
export default withStyles(style)(EmotionBox);