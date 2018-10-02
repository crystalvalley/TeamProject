
import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { withLoginContext, ILoginStore } from '../../../contexts/LoginContext';
import { IMemberModel, ROOTURL } from '../../../constance/models';
import Dropzone from 'react-dropzone';

/**
 * @author:chaMinju
 * @since:2018.08.21
 * @version:2018.09.02
 */
/**
 * @author : ParkHyeokJoon
 * @version : 2018.09.23
 *  - 이미지 업로드 기능 추가
 */


const style: StyleRulesCallback = (theme: Theme) => ({
    viewContainer: {
        backgroundColor: "white",
        height: "100%",
        padding: "10px",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        display: "flex",
        flexDirection: "column"
    },
    imageContainer: {
        flexBasis: "50%",
        padding: "30px",
    },
    right: {
        padding: "30px",
        flexBasis: "50%",
        textAlign: "center",
    },

})

interface IProps {
    classes: {
        viewContainer: string;
        wrapper: string;
        imageContainer: string;
        emotion: string;
        right: string;
        writer: string;
    }

}

interface IState {
    userInfo: IMemberModel,
    pw: string;
    userid: string;
    chepw: string,
    profile?: File
}

class UpdateUser extends React.Component<IProps & ILoginStore, IState>{
    private upload: Dropzone | null;
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.state = {
            userInfo: {
                id: "",
                profileImg: "",
            },
            userid: "",
            chepw: "",
            pw: "",
        }
        this.resetProfile = this.resetProfile.bind(this);
        this.submit = this.submit.bind(this);
        this.doChangepw = this.doChangepw.bind(this);
        this.doChangechepw = this.doChangechepw.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    public render() {
        const handler = () => { this.upload!.open() }
        const { classes } = this.props;
        // const doChange = (e:Event) => this.doChange(e);
        return (
            <div className={classes.viewContainer}>
                <h2>개인정보 수정</h2><br />
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        overflow: "hidden"
                    }}
                >
                    <div className={classes.imageContainer}>
                        <Dropzone
                            ref={(e: any) => { this.upload = e }}
                            accept="image/*"
                            style={{
                                border: "1px solid black",
                                width: "35vh",
                                height: "35vh",
                                textAlign: "center",
                            }}
                            multiple={false}
                            onDrop={this.onDrop}
                        >
                            <img
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    maxWidth: "35vh",
                                    maxHeight: "35vh",
                                }}
                                src={this.state.profile
                                    ? URL.createObjectURL(this.state.profile)
                                    : this.props.profileURL}
                            />
                        </Dropzone>
                        <Button
                            style={{
                                fontFamily: "Roboto,sans-serif",
                            }}
                            onClick={handler}
                        >
                            Upload
                        </Button>
                        <Button
                            style={{
                                fontFamily: "Roboto,sans-serif",
                            }}
                            onClick={this.resetProfile}
                        >
                            사진 변경
                        </Button>
                    </div>
                    <div
                        className={classes.right}
                    >
                        <TextField label={this.props.logined.id} name="id" disabled={true} /><br /><br />
                        {/*에이젝스로 비밀번호르 쏴서 확인한다*/}
                        <TextField type="password" name="userpw" label="비밀번호" onChange={this.doChangepw} >{this.state.pw}</TextField><br /><br />
                        <TextField type="password" label="비밀번호 확인" name="chepw" onChange={this.doChangechepw}>{this.state.chepw}</TextField>
                        <br />
                        <br />
                        <Button
                            style={{
                                fontFamily: "Roboto,sans-serif",
                            }}
                            onClick={this.submit}
                        >
                            정보수정
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
    private doChangepw(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            pw: event.currentTarget.value
        })
    }
    private doChangechepw(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            chepw: event.currentTarget.value
        })
    }
    private resetProfile() {
        if (!this.state.profile) { return; }
        const data = new FormData();
        data.append("upload", this.state.profile!);
        axios.post(ROOTURL + "/account/uploadProfile", data)
            .then((res) => {return;});
    }

    private submit() {
        this.resetProfile();
        const data = new FormData();
        data.append("chepw", this.state.chepw);
        data.append("id", this.props.logined.id);
        data.append("password", this.state.pw);
        axios.post(ROOTURL + "/account/updateuser", data)
            .then((response) => {
                this.props.loginCheck();
            })
    }
    private onDrop(files: File[]) {
        const file = files[0]
        this.setState({
            profile: file,
        })
    }


}
export default withLoginContext(withStyles(style)(UpdateUser));
