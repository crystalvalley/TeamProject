import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme, Button, } from '@material-ui/core';
import { IEmotionStore, withEmotionContext } from '../../../../../contexts/EmotionContext';
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
class EmotionBox extends React.Component<IProps & IEmotionStore>{
    constructor(props: IProps & IEmotionStore) {
        super(props);
        this.state = {
            clicked: -1,
            count: []
        }
    }
    public componentDidMount() {
        this.props.emotionRequest(this.props.id);
    }

    public render() {
        const clicked = this.props[this.props.id] !== undefined ?
            this.props[this.props.id] : -1;
        const { classes, emotionClick, id } = this.props;
        const handler1 = () => emotionClick(id, 1);
        const handler2 = () => emotionClick(id, 2);
        const handler3 = () => emotionClick(id, 3);
        const handler4 = () => emotionClick(id, 4);
        const handler5 = () => emotionClick(id, 5);
        const count = this.props[this.props.id] !== undefined ?
            this.props[this.props.id] : [0, 0, 0, 0, 0]
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
}
export default withEmotionContext(withStyles(style)(EmotionBox));