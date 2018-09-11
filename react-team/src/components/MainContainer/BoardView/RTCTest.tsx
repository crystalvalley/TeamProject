import * as React from 'react'

export default class RTCTest extends React.Component {
    private pc: any;
    private peer: any;
    private loggedIn: boolean;
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
        this.loggedIn = false;
        this.logError = this.logError.bind(this);
        this.connect = this.connect.bind(this);
        this.startRTC = this.startRTC.bind(this);
        this.offer = this.offer.bind(this);
        this.localDescCreated = this.localDescCreated.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }
    public render() {
        const handler = () => this.connect("test");
        return (
            <div>
                <button onClick={handler}>test</button>
                <video ref={(e) => { this.remoteView = e }} width="640" height="480" autoPlay={true} style={{ display: "inline" }} />
                <video ref={(e) => { this.selfView = e }} width="320" height="240" autoPlay={true} style={{ display: "inline" }} />
                {this.loggedIn}
                {this.remoteView}
            </div>
        )
    }

    private logError(error: any) {
        alert(error)
    }

    private connect(username: string) {
        let { sock } = this;
        alert("connected")
        const uri = "ws://localhost:8081/signal"
        sock = new WebSocket(uri);

        sock.onopen = (e: any) => {
            alert('open' + e);
            sock.send(
                JSON.stringify(
                    {
                        type: "login",
                        data: username
                    }
                )
            );
            // should check better here, it could have failed
            // moreover not logout implemented
            this.loggedIn = true
        }

        sock.onclose = (e: CloseEvent) => {
            alert('close' + e);
        }

        sock.onerror = (e: Event) => {
            alert('error' + e);
        }

        sock.onmessage = (e: MessageEvent) => {
            const { pc } = this;
            alert('message' + e.data);
            if (!pc) {
                this.startRTC();
            }

            const message = JSON.parse(e.data);
            if (message.type === 'rtc') {
                if (message.data.sdp) {
                    pc.setRemoteDescription(
                        new RTCSessionDescription(message.data.sdp),
                        () => {
                            // if we received an offer, we need to answer
                            if (pc.remoteDescription.type === 'offer') {
                                this.peer = message.dest;
                                pc.createAnswer(this.localDescCreated, this.logError);
                            }
                        },
                        this.logError);
                }
                else {
                    pc.addIceCandidate(new RTCIceCandidate(message.data.candidate));
                }
            }
        }

        // setConnected(true);
    }

    private startRTC() {
        this.pc = new webkitRTCPeerConnection(this.configuration);

        // send any ice candidates to the other peer
        this.pc.onicecandidate = function (evt: any) {
            if (evt.candidate) {
                this.sendMessage(
                    {
                        type: "rtc",
                        dest: this.peer,
                        data: {
                            'candidate': evt.candidate
                        }
                    }
                );
            }
        };

        // once remote stream arrives, sho480w it in the remote video element
        this.pc.onaddstream = function (evt: any) {
            this.remoteView.src = URL.createObjectURL(evt.stream);
        };

        // get a local stream, show it in a self-view and add it to be sent
        navigator.getUserMedia({
            'audio': true,
            'video': true
        }, (stream) => {
            this.selfView!.src = URL.createObjectURL(stream);
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
                    dest: this.peer,
                    data: {
                        'sdp': this.pc.localDescription
                    }
                }
            );
        }, this.logError);
    };

    private sendMessage(payload: any) {
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