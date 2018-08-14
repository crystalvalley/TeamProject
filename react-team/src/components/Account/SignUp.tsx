import * as React from 'react';
import { withStyles, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { signUpStyle } from './SignUpStyle';

/**
 * @author ParkHyeokJoon
 * @since 18.08.13
 * @version 18.08.13
 */
interface IProps {
    // Props 안에 classes property 무조건 넣어야함
    classes: {
        // className : string;
        backGround: string;
        rightTop: string;
        rightTopInner: string;
        leftBottom: string;
        leftBottomInner: string;
        formBox: string;
        head: string;
        footer: string;
        form: string;
        textField: string;
        btnRoot: string;
        headTyphoRoot: string;
    }
}

interface IState {
    user_id: string;
    password: string;
    passwordCheck: string;
    username: string;
    emailFirst:string;
    emailSecond:string;
    passwordValid: boolean;
    idValid: boolean;
}

class SignUp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            user_id: "",
            password: "",
            passwordCheck: "",
            passwordValid: false,
            idValid: false,
            username:"",
            emailFirst:"",
            emailSecond:""
        }
        this.onChange = this.onChange.bind(this);
    }
    public componentDidUpdate(presProps: IProps, prevState: IState) {
        const { user_id, idValid, password, passwordValid, passwordCheck } = this.state
        if (user_id.length > 6 && user_id.length < 16) {
            axios.get("http://localhost:8081/idCheck", {
                params: {
                    _id: this.state.user_id
                }
            }).then((response) => {
                if (response.data.msg === "success") {
                    if (idValid === true) { return }
                    this.setState({ idValid: true })
                } else {
                    if (idValid === false) { return }
                    this.setState({ idValid: false })
                }
            })
        } else {
            if (idValid === false) { return }
            this.setState({ idValid: false })
        }
        if (password === passwordCheck && password.length > 7 && password.length < 21) {
            if (passwordValid === true) { return }
            this.setState({ passwordValid: true })
        } else {
            if (passwordValid === false) { return }
            this.setState({ passwordValid: false })
        }
    }
    public render() {
        const { classes } = this.props;
        const { 
            idValid, passwordValid, user_id, passwordCheck, password, username ,emailFirst,emailSecond
        } = this.state
        return (
            <div className={classes.backGround}>
                {/* 배경의 삼각형들 */}
                <div className={classes.rightTop} />
                <div className={classes.rightTopInner} />
                <div className={classes.leftBottom} />
                <div className={classes.leftBottomInner} />
                {/* formbox */}
                <div className={classes.formBox}>
                    {/* Header */}
                    <div className={classes.head}>
                        <Typography
                            classes={{
                                root: classes.headTyphoRoot
                            }}
                        >
                            <h1>SNS SIGNUP</h1>
                        </Typography>
                    </div>
                    {/* form */}
                    <form
                        className={classes.form}
                        action="http://localhost:8081/signup"
                        method="get"
                    >
                        <TextField
                            onChange={this.onChange}
                            fullWidth={true}
                            className={classes.textField}
                            name="id"
                            label={
                                user_id === "" ?
                                    "userid" :
                                    idValid ?
                                        "사용가능한 ID입니다." :
                                        "사용할 수 없는 ID입니다."
                            }
                        />
                        <br />
                        <TextField
                            onChange={this.onChange}
                            fullWidth={true}
                            className={classes.textField}
                            type="password"
                            name="password"
                            label={
                                password === "" ?
                                    "password" :
                                    password.length < 8 || password.length > 20 ?
                                        "비밀번호는 8글자 이상 20글자 이하 여야합니다." :
                                        passwordValid ?
                                            "사용가능한 비밀번호 입니다." :
                                            "비밀번호 확인과 일치하지 않습니다."
                            }
                        />
                        <TextField
                            onChange={this.onChange}
                            fullWidth={true}
                            className={classes.textField}
                            type="password"
                            name="passwordCheck"
                            label={
                                passwordCheck === "" ?
                                    "passwordCheck" :
                                    password.length < 8 || password.length > 20 ?
                                        "비밀번호는 8글자 이상 20글자 이하여야 합니다." :
                                        passwordValid ?
                                            "사용가능한 비밀번호 입니다." :
                                            "비밀번호 확인과 일치하지 않습니다."
                            }
                        />
                        <br />
                        <TextField
                            onChange={this.onChange}
                            fullWidth={true}
                            className={classes.textField}
                            name="username"
                            label={
                                username.length > 2 && username.length < 15 ?
                                    "이름은 3글자 이상 14글자 이하여야 합니다." :
                                    "username"
                            }
                        />
                        <br />
                        <TextField
                            onChange={this.onChange}
                            className={classes.textField}
                            name="emailFirst"
                            label="email"
                        />
                        <span style={{color:"black"}}>@</span>
                        <TextField
                            onChange={this.onChange}
                            className={classes.textField}
                            name="emailSecond"
                            label="address"
                        />
                        <input type="hidden" name="email" value={emailFirst+"@"+emailSecond}/>
                        <br />
                        <Button
                            disabled={!this.submitValidation()}
                            type="submit"
                            classes={{
                                root: classes.btnRoot,
                            }}
                        >
                            Subscribe
                        </Button>
                    </form>
                    {/* footer */}
                    <div className={classes.footer}>
                        <Typography>
                            Powered By SCI
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
    private submitValidation():boolean{
        const { 
            idValid, passwordValid, username
        } = this.state
        // email validation 추가필요
        if(username.length > 2 && username.length < 15 ){
            return idValid && passwordValid;
        }else{
            return false;
        }
    }
    private onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name: string = e.currentTarget.name;
        this.setState({
            user_id: name === "id" ? e.currentTarget.value : this.state.user_id,
            password: name === "password" ? e.currentTarget.value : this.state.password,
            passwordCheck: name === "passwordCheck" ? e.currentTarget.value : this.state.passwordCheck,
            username: name === "username" ? e.currentTarget.value : this.state.username,
            emailFirst:name==="emailFirst"? e.currentTarget.value : this.state.emailFirst,
            emailSecond:name==="emailSecond"? e.currentTarget.value : this.state.emailSecond,
        })
    }
}
// SignUp Component를 style을 적용을 시켜서 export 하겠다
export default withStyles(signUpStyle)(SignUp)