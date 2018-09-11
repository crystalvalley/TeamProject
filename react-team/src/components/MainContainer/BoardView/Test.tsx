import * as deepstream from "deepstream.io-client-js";
import * as React from 'react'
import ConnectionState = deepstreamIO.ConnectionState;
interface IState{
    value:string;
    connectionState : ConnectionState;

}
export default class Test extends React.Component<{},IState> {
    private ds:any;
    constructor(props:{}){
        super(props);
        this.ds = deepstream("wss://localhost:8081");
        this.state = {
        value: '',
        connectionState:ConnectionState.OPEN
        };
        this.ds.on( 'connectionStateChanged', this.handleConnectionState.bind(this));
        this.handleChange = this.handleChange.bind(this);
    }
    public render() {
        return (
            <div>
                test
            </div>
        );
    }

    private handleConnectionState( connectionState : ConnectionState){
        this.setState({connectionState});
    }

    private handleChange(e:any) {
        this.setState({value: e.target.value});
    }
}