import * as React from 'react'
import { TextField } from '@material-ui/core';
import { ROOTSOCKETURL } from '../../../constance/models';

interface IState{
    msg : string;
}

export default class RTCTest extends React.Component<{},IState> {
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
        this.state={
            msg :""
        }
        this.loggedIn = false;
        this.logError = this.logError.bind(this);
        this.connect = this.connect.bind(this);
        this.startRTC = this.startRTC.bind(this);
        this.offer = this.offer.bind(this);
        this.localDescCreated = this.localDescCreated.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.onChage = this.onChage.bind(this);
        this.send = this.send.bind(this);
    }
    public render() {
        // id가 test임
        const handler = () => this.connect("test");
        const handler2 = () => this.offer("test2");
        const handler3 = () => this.connect("test2");
        const handler4 = () => this.offer("test");
        return (
            <div>
                <button onClick={handler}>test</button>
                <button onClick={this.startRTC}>RTC</button>
                <button onClick={handler2}>offer</button>
                <button onClick={handler3}>test2</button>
                <button onClick={this.startRTC}>RTC2</button>
                <button onClick={handler4}>offer2</button>
                <video ref={(e) => { this.remoteView = e }} width="640" height="480" autoPlay={true} style={{ display: "inline" }} />
                <video ref={(e) => { this.selfView = e }} width="320" height="240" autoPlay={true} style={{ display: "inline" }} />
                <TextField onChange={this.onChage}/>
                <button onClick={this.send}>send</button>
                {this.loggedIn}
            </div>
        )
    }
    private onChage(e:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            msg : e.currentTarget.value
        })
    }
    private send(){
        this.sock.send(JSON.stringify({type:"msg",dest:this.peer,data:{msg:this.state.msg}}));
    }

    private logError(error: any) {
        alert(error)
    }

    private connect(userid: string) {
        alert("connected")
        const uri = "ws://"+ROOTSOCKETURL+"/signal"
        this.sock = new WebSocket(uri);

        this.sock.onopen = (e: any) => {
            this.sock.send(
                JSON.stringify(
                    {
                        type: "login",
                        data: userid
                    }
                )
            );
            // should check better here, it could have failed
            // moreover not logout implemented
            this.loggedIn = true
        }

        this.sock.onclose = (e: CloseEvent) => {
            // alert('close' + e);
        }

        this.sock.onerror = (e: Event) => {
            alert('error' + e);
        }

        this.sock.onmessage = (e: MessageEvent) => {            
            alert('message' + e.data);
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
            }else if(message.type==="msg"){
                alert(message.data.msg);
            }
        }

        // setConnected(true);
    }

    private startRTC() {
        this.pc = new webkitRTCPeerConnection(this.configuration);

        // send any ice candidates to the other peer
        this.pc.onicecandidate = (evt: any) => {
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