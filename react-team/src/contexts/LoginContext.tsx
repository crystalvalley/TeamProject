import * as  React from 'react';
import axios from 'axios';
import { IMemberModel, IRoomModel, IMsgModel, IAlarmModel } from '../constance/models';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.20
 * @version : 18.09.13
 */

export interface ILoginStore {
    logined: IMemberModel;
    rooms: {
        [roomId: number]: IRoomModel
    }
    roomIds: number[];
    profileURL: string,
    alarms: IAlarmModel[];
    loginCheck(): void;
    sendMessage(msg: IMsgModel): void;
    socketRefesh(dataType: string): void;
    alarmRefresh(): void;
}


const loginContext = React.createContext<ILoginStore>({
    logined: {
        profileImg: "",
        id: "",
    },
    alarms: [],
    rooms: {},
    roomIds: [],
    profileURL: "",
    loginCheck: () => { return },
    sendMessage: (msg: IMsgModel) => { return },
    socketRefesh: (dataType: string) => { return },
    alarmRefresh: () => { return; }
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
        this.socketRefesh = this.socketRefesh.bind(this);
        this.alarmRefresh = this.alarmRefresh.bind(this);
        this.state = {
            logined: {
                profileImg: "",
                id: "testid",
            },
            alarms: [],
            profileURL: "",
            rooms: {},
            roomIds: [],
            loginCheck: this.loginCheck,
            sendMessage: this.sendMessage,
            socketRefesh: this.socketRefesh,
            alarmRefresh: this.alarmRefresh
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
                if (response.data.id === "FAILED LOGIN") { return; }
                this.setState({
                    logined: response.data
                }, () => {
                    // 로그인 처리 완료 후에 소켓을 즉시 연결
                    this.connect();
                    this.alarmRefresh();
                    if (this.state.profileURL === "") {
                        const xhr = new XMLHttpRequest();
                        xhr.open("GET", "http://localhost:8081/resources" + this.state.logined.profileImg);
                        xhr.responseType = "blob";
                        xhr.addEventListener("load", () => {
                            this.setState({
                                profileURL: URL.createObjectURL(xhr.response)
                            })
                        })
                        xhr.send();
                    }
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
    private socketRefesh(dataType: string) {
        this.sock.send(
            JSON.stringify({
                type: "refresh",
                sender: this.state.logined.id,
                data: dataType
            })
        )
    }
    private send() {
        this.sock.send(
            JSON.stringify(
                {
                    type: "msg",
                    dest: this.peer,
                    sender: this.state.logined,
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
                let roomIds: number[] = [];
                let rooms = {};
                for (const data of message.data) {
                    rooms = { ...rooms, [data.roomId]: data }
                    roomIds = [...roomIds, data.roomId]
                }
                this.setState({
                    rooms,
                    roomIds
                })
            } else if (message.type === "chat-response") {
                const nextRooms = this.state.rooms;
                const sub = nextRooms[message.roomId];
                if (sub.chat === undefined) { sub.chat = [] }
                sub.chat = [...nextRooms[message.roomId].chat, { type: "", sender: message.sender, destination: [], roomId: message.roomId, data: message.data }]
                this.setState({
                    rooms: nextRooms
                })
            } else if (message.type === "refresh") {
                this.socketRefesh(message.data);
            } else if (message.type === "alarm-Refresh") {
                this.alarmRefresh();
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
                        roomId: -1,
                        sender: this.state.logined,
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
                    roomId: -1,
                    sender: this.state.logined,
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
    private alarmRefresh() {
        axios.get("http://localhost:8081/alarms/requestAlarms")
            .then((response) => {
                alert(response.data)
                this.setState({
                    alarms: response.data
                })
            })
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

