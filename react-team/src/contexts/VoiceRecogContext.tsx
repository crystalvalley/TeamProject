import * as  React from 'react';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.08.11
 */

export interface IVoiceStore {
    // 입력된 명령
    inputValue: string;
    show: boolean,
    listening: boolean,
}
const voiceContext = React.createContext<IVoiceStore>({
    show: false,
    listening: true,
    inputValue: "",
});
class VoiceProvider extends React.Component<{}, IVoiceStore> {
    private recognition: SpeechRecognition;
    constructor(props: {}) {
        super(props);
        this.state = {
            show: false,
            listening: true,
            inputValue: "",
        }
        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    public componentDidMount() {
        const Recognition = webkitSpeechRecognition;

        if (!Recognition) {
            alert(
                'Speech Recognition API is not supported in this browser, try chrome'
            );
            return;
        }

        this.recognition = new Recognition();
        this.recognition.lang = 'ko';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onresult = event => {
            const text = event.results[0][0].transcript;
            this.setState({ 
                inputValue : text
             });
        };

        this.recognition.onspeechend = () => {
            this.setState({ show: true });
        };

        this.recognition.onnomatch = event => {
            this.setState({ 
                inputValue: "Sorry, can't hear"
             });
        };

        this.recognition.onstart = () => {
            this.setState({
                listening: true,
            });
        };

        this.recognition.onend = () => {
            this.setState({
                listening: false,
            });
            this.end();
        };

        this.recognition.onerror = event => {
            this.setState({
                show: true,
                inputValue: event.error,
            });
        };
        this.recognition.start();
    }

    public render() {
        return (
            <voiceContext.Provider value={this.state}>
                {this.props.children}
            </voiceContext.Provider>
        );
    }
    private start(){
        this.recognition.start();
    }
    private end(){
        this.recognition.stop();
        this.recognition.start();
    }
    private handleClose(){
        this.setState({
            show:false
        })
    }
}
export { VoiceProvider };

export function withVoice<P extends IVoiceStore>(Component: React.ComponentType<P>) {
    return function userLoginContext(props: Pick<P, Exclude<keyof P, keyof IVoiceStore>>) {
        return (
            <voiceContext.Consumer>
                {
                    value =>
                        <Component {...value} />
                }
            </voiceContext.Consumer>
        );
    }
}