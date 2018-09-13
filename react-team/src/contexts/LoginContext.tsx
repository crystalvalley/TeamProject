import * as  React from 'react';
import axios from 'axios';
import { IMemberModel, IRoomModel, IMsgModel } from '../constance/models';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.20
 * @version : 18.09.13
 */

export interface ILoginStore {
    logined: IMemberModel;
    rooms: IRoomModel[]
    loginCheck(): void;
    sendMessage(msg: IMsgModel): void;
}


const loginContext = React.createContext<ILoginStore>({
    logined: {
        profileImg: "",
        id: "",
        username: ""
    },
    rooms: [],
    loginCheck: () => { return },
    sendMessage: (msg: IMsgModel) => { return }
});
class LoginProvider extends React.Component<{}, ILoginStore> {

    private pc: any;
    private peer: any;
    private selfView: HTMLVideoElement | null;
    private remoteView: HTMLVideoElement | null;
    private sock: WebSocket;
    private configuration = {
        'iceServers': [{
            'urls': 'stun:stun.example.org'
        }]
    };
    constructor(props: {}) {
        super(props);
        this.loginCheck = this.loginCheck.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            logined: {
                profileImg: "",
                id: "",
                username: ""
            },
            rooms: [],
            loginCheck: this.loginCheck,
            sendMessage: this.sendMessage
        }
        this.logError = this.logError.bind(this);
        this.connect = this.connect.bind(this);
        this.startRTC = this.startRTC.bind(this);
        this.offer = this.offer.bind(this);
        this.localDescCreated = this.localDescCreated.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.send = this.send.bind(this);
    }

    // 새로고침 했을 때 적용하도록
    public componentDidMount() {
        this.loginCheck();
    }
    public componentDidUpdate(nextProps: {}, nextState: ILoginStore) {
        if (this.state.logined === undefined) {
            this.loginCheck();
        } else {
            return;
        }
    }
    public render() {
        return (
            <loginContext.Provider value={this.state}>
                {this.props.children}
            </loginContext.Provider>
        );
    }

    private loginCheck() {
        axios.post("http://localhost:8081/account/loginCheck")
            .then((response) => {
                this.setState({
                    logined: response.data
                }, () => {
                    // if(response.data.id==="FAILED LOGIN"){return;}
                    this.setState({
                        logined :{
                            id:"testid",
                            profileImg:"",
                            username:""
                        }
                    },()=>{
                        // 로그인 처리 완료 후에 소켓을 즉시 연결
                        this.connect();
                    })
                })
                /*
                else{
                    // 로그인 되지 않았고 loginPage라면
                    if(window.location.href.indexOf("signin")!==-1){
                        location.href = "/signin";
                    }
                }
                */
            })

    }
    private send() {
        this.sock.send(
            JSON.stringify(
                {
                    type: "msg",
                    dest: this.peer,
                    sender: this.state.logined.id,
                    data: {
                        msg: ""
                    }
                })
        );
    }

    private logError(error: any) {
        alert(error)
    }

    private connect() {
        const uri = "ws://localhost:8081/signal"
        this.sock = new WebSocket(uri);
        this.sock.onopen = (e: any) => {
            this.sock.send(
                JSON.stringify(
                    {
                        type: "login",
                        sender: this.state.logined.id
                    }
                )
            );
        }

        this.sock.onclose = (e: CloseEvent) => {
            alert('close' + e);
        }

        this.sock.onerror = (e: Event) => {
            alert('error' + e);
        }

        this.sock.onmessage = (e: MessageEvent) => {
            /*
            if (!this.pc) {
                this.startRTC();
            }

            const message = JSON.parse(e.data);
            if (message.type === 'rtc') {
                if (message.data.sdp) {
                    this.pc.setRemoteDescription(
                        new RTCSessionDescription(message.data.sdp),
                        () => {
                            // if we received an offer, we need to answer
                            if (this.pc.remoteDescription.type === 'offer') {
                                this.peer = message.dest;
                                this.pc.createAnswer(this.localDescCreated, this.logError);
                            }
                        },
                        this.logError);
                }
                else {
                    this.pc.addIceCandidate(new RTCIceCandidate(message.data.candidate));
                }
            } else if (message.type === "msg") {
                alert(message.data.msg);
            }
            */
            const message: IMsgModel = JSON.parse(e.data);
            if (message.type === "login-response") {
                this.setState({
                    rooms: message.data
                })
            }else if(message.type==="chat-response"){
                
            }
        }
    }

    private startRTC() {
        this.pc = new webkitRTCPeerConnection(this.configuration);

        // send any ice candidates to the other peer
        this.pc.onicecandidate = (evt: any) => {
            if (evt.candidate) {
                this.sendMessage(
                    {
                        type: "rtc",
                        destination: [],
                        sender: this.state.logined.id,
                        data: {
                            'candidate': evt.candidate
                        }
                    }
                );
            }
        };

        // once remote stream arrives, sho480w it in the remote video element
        this.pc.onaddstream = (evt: any) => {
            this.remoteView!.srcObject = evt.stream;
        };

        // get a local stream, show it in a self-view and add it to be sent
        navigator.getUserMedia({
            'audio': true,
            'video': true
        }, (stream) => {
            this.selfView!.srcObject = stream;
            this.pc.addStream(stream);
        }, this.logError);

    }

    private offer(dest: any) {
        this.peer = dest;
        this.pc.createOffer(this.localDescCreated, this.logError);
    }

    private localDescCreated(desc: any) {
        this.pc.setLocalDescription(desc, () => {
            // ici en voyé un obj {type: offer, dest: B, data: desc}
            this.sendMessage(
                {
                    type: "rtc",
                    destination: [],
                    sender: this.state.logined.id,
                    data: {
                        'sdp': this.pc.localDescription
                    }
                }
            );
        }, this.logError);
    };

    private sendMessage(payload: IMsgModel) {
        this.sock.send(JSON.stringify(payload));
    }

    private disconnect() {
        alert('disconnect');
        if (this.sock != null) {
            this.sock.close();
        }
        // this.setConnected(false);
    }
}
export { LoginProvider };


export function withLoginContext<P extends ILoginStore>(Component: React.ComponentType<P>) {
    return function userLoginContext(props: Pick<P, Exclude<keyof P, keyof ILoginStore>>) {
        return (
            <loginContext.Consumer>
                {
                    value =>
                        <Component {...value} {...props} />
                }
            </loginContext.Consumer>
        );
    }
}