import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { withLoginContext, ILoginStore } from '../../../contexts/LoginContext';

/**
 * @author:chaMinju
 * @since:2018.08.21
 * @version:2018.09.02
 */
/**
 * @author : ParkHyeokJoon
 * @version : 2018.09.02
 *  - 이미지 업로드 기능 추가
 */


const style: StyleRulesCallback = (theme: Theme) => ({
    viewContainer: {
        backgroundColor: "white",
        height: "100%",
        padding: "10px",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: " space-around"
    },
    containers: {
        position: "absolute",
        top: "190px",
        right: "300px",
        width: "1100px",
        height: "65px",

    },
    imageContainer: {
        height: "80%",
        width: "30%",

    },
    imageSize: {
        padding: "10px",
        height: "320px",
        width: "320px"
    },
    replyContainer: {
        padding: "30px",
        top: "230px",
        height: "550px",
        width: "30%",

    },
    buttons: {
        position: "absolute",
        top: "800px",
        padding: "25px",
        width: "200px",
        left: "0",
        right: "0",
        margin: "0 auto",
    },
    buttons1: {
        position: "absolute",
        top: "800px",
        padding: "25px",
        width: "200px",
        left: "200px",
        right: "0",
        margin: "0 auto",
    },
    button: {
        margin: theme.spacing.unit,
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 14px)',
        height: "400px",
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
    input: {
        display: 'none',
    },

})


interface IProps {
    classes: {
        viewContainer: string;
        wrapper: string;
        containers: string;
        image: string;
        imageContainer: string;
        text: string;
        emotion: string;
        replyWriter: string;
        replyContainer: string;
        writer: string;
        imageSize: string;
        button: string;
        buttons: string;
        buttons1: string;
        bootstrapRoot: string;
        bootstrapInput: string;
        bootstrapFormLabel: string;
        input: string;
    }

}

class UpdateUser extends React.Component<IProps & ILoginStore>{
    private upload: HTMLInputElement | null;
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.onChangeFile = this.onChangeFile.bind(this);
    }
    public render() {
        const { classes, logined } = this.props;
        return (
            <div className={classes.viewContainer}>
                <Toolbar className={classes.containers}>
                    <div>
                        <h4>modify</h4>
                    </div>
                </Toolbar>
                <div className={classes.imageContainer}>
                    <br />
                    <img className={classes.imageSize} src={logined !== undefined ? "http://localhost:8081/resources" + logined.profileImg : ""} />
                    <br />
                    <TextField margin="normal"
                        label="AR1Up0pf_400x400.jpg" /><br /><br />
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        multiple={false}
                        ref={(ref) => this.upload = ref}
                        onChange={this.onChangeFile}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={classes.button}
                            color="default"
                        >
                            Upload
                        </Button>
                    </label>
                </div>

                <div
                    className={classes.replyContainer}>


                    <h2>개인정보 수정</h2><br />
                    <TextField label="닉네임" /><br /><br />
                    <TextField label="이름" /><br /><br />
                    <TextField type="password" label="비밀번호" /><br /><br />
                    <TextField type="password" label="비밀번호 확인" />

                </div>
                <div className={classes.replyContainer}>
                    <TextField
                        label="자기소개"
                        id="bootstrap-input"
                        InputProps={{
                            disableUnderline: true,
                            classes: {
                                root: classes.bootstrapRoot,
                                input: classes.bootstrapInput,
                            },
                        }}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.bootstrapFormLabel,
                        }}
                    />
                </div>
                <div className={classes.buttons}>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        뒤로가기
                    </Button>
                </div>
                <div className={classes.buttons1}>
                    <Button variant="outlined" color="primary" className={classes.button}>
                        정보수정
                      </Button>
                </div>
            </div>
        )
    }
    private onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.files === null) { return }
        const file = e.target.files[0];
        const data = new FormData();
        data.append("upload", file);
        axios.post("http://localhost:8081/account/uploadProfile", data)
            .then((res) => this.props.loginCheck());

    }
}
export default withLoginContext(withStyles(style)(UpdateUser));