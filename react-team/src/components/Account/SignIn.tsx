import * as React from 'react';
import { withStyles, TextField, Button, Typography } from '@material-ui/core';
import { signInStyle } from './Styles/SignInStyle';
import { ILoginStore, withLoginContext } from '../../contexts/LoginContext';

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

class SignIn extends React.Component<IProps & ILoginStore, IState> {
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.state={
            password:"",
            userid:""
        }
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangePw = this.onChangePw.bind(this);
    }

    public componentWillReceiveProps(){
        if(this.props.logined.id!==""){            
            // 이미 로그인이 되있다면
            location.replace("/")
        }
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
                        method="post"
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
                            type="submit"
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
                        {this.state.password}<br/>
                        {this.props.logined.id}
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
}
export default withLoginContext(withStyles(signInStyle)(SignIn));