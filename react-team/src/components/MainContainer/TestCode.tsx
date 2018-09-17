import * as React from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';
// 0. 뷰 완성
interface IState {
    id: string,
    pw: string,
    name: string,
    mail: string
}

export default class TestCode extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props);
        this.state = {
            id: "",
            pw: "",
            name: "",
            mail: ""
        }
        this.onChange1 = this.onChange1.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onChange3 = this.onChange3.bind(this);
        this.onChange4 = this.onChange4.bind(this);
        this.submit = this.submit.bind(this);
    }
    public render() {
        return (
            <div>
                <span>id</span>
                <TextField onChange={this.onChange1} /><br />
                <span>pw</span>
                <TextField onChange={this.onChange2} /><br />
                <span>mail</span>
                <TextField onChange={this.onChange3} /><br />
                <span>name</span>
                <TextField onChange={this.onChange4} /><br />
                <button onClick={this.submit}>제출</button>
            </div>
        );
    }
    private submit() {
        // 1. 엑시오스로 통신
        axios.get("http://localhost:8081/account/test", {
            params: {
                id: this.state.id,
                pw: this.state.pw,
                email: this.state.mail,
                name: this.state.name
            }
        })
    }

    private onChange1(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            id: e.currentTarget.value
        })
    }
    private onChange2(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            pw: e.currentTarget.value
        })
    }
    private onChange3(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            mail: e.currentTarget.value
        })
    }
    private onChange4(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.currentTarget.value
        })
    }
}