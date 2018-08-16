import * as React from 'react';
import { withStyles, TextField, Button, Typography } from '@material-ui/core';
import { signInStyle } from './SignInStyle';
import axios, { AxiosResponse } from 'axios';

/**
 * @author : ParkHyeokJoon
 * @since : 18.08.13
 * @version : 18.08.13
 */

interface IProps {
    classes: {
        backGround: string;
        formBox: string;
        form: string;
        head: string;
        textField: string;
        footer: string;
        btnRoot: string;
        headTyphoRoot: string;
        rightTop: string;
        leftBottom: string;
        leftBottomInner: string;
        rightTopInner: string;
    }
}

// 상태
// login에 필요한 정보가 들어감
interface IState {
    userid: string;
    password: string;
}

class SignIn extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state={
            password:"",
            userid:""
        }
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangePw = this.onChangePw.bind(this);
        this.login = this.login.bind(this);
    }
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.backGround}>
                <div className={classes.leftBottom} />
                <div className={classes.rightTop} />
                <div className={classes.leftBottomInner} />
                <div className={classes.rightTopInner} />
                <div className={classes.formBox}>
                    <div className={classes.head}>
                        <Typography
                            classes={{
                                root: classes.headTyphoRoot
                            }}
                        >
                            <h1>SNS LOGIN</h1>
                        </Typography>
                    </div>
                    <form
                        className={classes.form}
                    >
                        <TextField
                            onChange={this.onChangeId}
                            name="userid"
                            className={classes.textField}
                            fullWidth={true}
                            label="Username"
                        />
                        <br />
                        <TextField
                            onChange={this.onChangePw}
                            name="password"
                            className={classes.textField}
                            fullWidth={true}
                            type="Password"
                            label="Password"
                        />
                        <br />
                        <Button
                            onClick={this.login}
                            variant="contained"
                        >
                            Subscribe
                        </Button>
                    </form>
                    <div className={classes.footer}>
                        <Typography>
                            Powered By SCI
                        </Typography>
                        {this.state.userid}<br />
                        {this.state.password}
                    </div>
                </div>
            </div>
        );
    }
    // event를 파라미터로 입력받음
    private onChangeId(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            userid: event.currentTarget.value
        })
    }
    private onChangePw(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.currentTarget.value
        })
    }
    private login(){
        axios.get("http://localhost:8081/login",{
            params :{
                userid : this.state.userid,
                password : this.state.password
            }
        }).then((response : AxiosResponse)=>{
            if(response.data.msg === "success"){
                alert("Good")
            }else{
                alert(response.data.description)
            }
        })
    }
}
export default withStyles(signInStyle)(SignIn);