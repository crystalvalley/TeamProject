import * as  React from 'react';
import axios from 'axios';

/**
 * @author : ParkHyeokjoon
 * @since : 18.09.05
 * @version : 18.09.05
 */

export interface IEmotionStore {
    [boardId: number]: {
        clicked: number;
        count: number[];
    };
    emotionRequest(boardId: number): void;
    emotionClick(id: number, click: number): void;
}

const emotionContext = React.createContext<IEmotionStore>({
    emotionRequest: (boardId: number) => { return },
    emotionClick: (id: number, click: number) => { return }
});
class EmotionProvider extends React.Component<{}, IEmotionStore> {
    constructor(props: {}) {
        super(props);
        this.emotionClick = this.emotionClick.bind(this);
        this.emotionRequest = this.emotionRequest.bind(this);
        this.state = {
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
    private emotionRequest(boardId: number) {
        if (this.state[boardId]) { return; }
        axios.get("http://localhost:8081/boards/getEmotion", {
            params: {
                boardId
            }
        })
            .then((result) => {
                this.setState({
                    ...this.state,
                    [boardId]: {
                        clicked: result.data[0],
                        count: result.data
                    }
                })
            })
    }
    private emotionClick(id: number, click: number) {
        if (this.state[id].clicked === click) { return; }
        const exNum = this.state[id].count[this.state[id].clicked];
        const exNum2 = this.state[id].count[click];
        const array = this.state[id].count;
        array[this.state[id].clicked] = exNum - 1;
        array[click] = exNum2 + 1;
        this.setState({
            ...this.state,
            [id]: {
                clicked: click,
                count: array
            }
        })
        axios.get("http://localhost:8081/boards/addEmotion", {
            params: {
                boardId: id,
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