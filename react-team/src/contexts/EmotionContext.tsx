import * as  React from 'react';
import axios from 'axios';
import { ROOTURL } from '../constance/models';

/**
 * @author : ParkHyeokjoon
 * @since : 18.09.05
 * @version : 18.09.05
 */

export interface IEmotionStore {
    emotions: {
        [boardId: string]: {
            clicked: number;
            count: number[];
        };

    }
    emotionRequest(boardId: string): void;
    emotionClick(boardId: string, click: number): void;
}

const emotionContext = React.createContext<IEmotionStore>({
    emotions: {},
    emotionRequest: (boardId: string) => { return },
    emotionClick: (id: string, click: number) => { return }
});
class EmotionProvider extends React.Component<{}, IEmotionStore> {
    constructor(props: {}) {
        super(props);
        this.emotionClick = this.emotionClick.bind(this);
        this.emotionRequest = this.emotionRequest.bind(this);
        this.state = {
            emotions: {},
            emotionRequest: this.emotionRequest,
            emotionClick: this.emotionClick
        }
    }
    public render() {
        return (
            <emotionContext.Provider value={this.state}>
                {this.props.children}
            </emotionContext.Provider>
        );
    }
    private emotionRequest(boardId: string) {
        if (this.state.emotions[boardId]) { return; }
        axios.get(ROOTURL+"/boards/getEmotion", {
            params: {
                boardId: boardId.substr(1)
            }
        })
            .then((result) => {
                this.setState({
                    emotions: {
                        ...this.state.emotions,
                        [boardId]: {
                            clicked: result.data[0] === null ? -1 : result.data[0],
                            count: result.data
                        }
                    }
                })
            })
    }
    private emotionClick(boardId: string, click: number) {
        if (this.state.emotions[boardId].clicked === click) { return; }
        const exNum = this.state.emotions[boardId].count[this.state.emotions[boardId].clicked];
        const exNum2 = this.state.emotions[boardId].count[click];
        const array = this.state.emotions[boardId].count;
        array[this.state.emotions[boardId].clicked] = exNum - 1;
        array[click] = exNum2 + 1;
        this.setState({
            emotions: {
                ...this.state.emotions,
                [boardId]: {
                    clicked: click,
                    count: array
                }
            }
        })
        axios.get(ROOTURL+"/boards/addEmotion", {
            params: {
                boardId: boardId.substr(1),
                emotionType: click
            }
        })

    }
}
export { EmotionProvider };


export function withEmotionContext<P extends IEmotionStore>(Component: React.ComponentType<P>) {
    return function userEmotionContext(props: Pick<P, Exclude<keyof P, keyof IEmotionStore>>) {
        return (
            <emotionContext.Consumer>
                {
                    value =>
                        <Component {...value} {...props} />
                }
            </emotionContext.Consumer>
        );
    }
}