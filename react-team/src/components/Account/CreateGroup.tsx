import * as React from 'react';
import { withStyles, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { CreateGroupStyle } from './Styles/CreateGroupStyle';

/**
 * @author JoonsungGil
 * @since 18.09.06
 * @version 18.09.06
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
    groupName: string;
    groupMaster: string;
    category: string;
    nameValid: boolean;
}

class CreateGroup extends React.Component<IProps, IState> {
    private formRef: React.RefObject<HTMLFormElement>
    constructor(props: IProps) {
        super(props);
        this.state = {
            groupName: "",
            groupMaster: "",
            category: "",
            nameValid: true
        }
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    public componentDidUpdate(presProps: IProps, prevState: IState) {
        const { groupName } = this.state
        if (prevState.groupName !== groupName) {
            if (groupName.length > 5 && groupName.length < 16) {
                axios.get("http://localhost:8081/groups/nameValid", {
                    params: {
                        _id: this.state.groupName
                    }
                }).then((response) => {
                    if (response.data.msg === "success") {
                        if (this.state.nameValid === true) { return }
                        this.setState({ nameValid: true })
                    } else {
                        if (this.state.nameValid === false) { return }
                        this.setState({ nameValid: false })
                    }
                })
            } else {
                if (this.state.nameValid === false) { return }
                this.setState({ nameValid: false })
            }
        }

    }
    public render() {
        const { classes } = this.props;
        const { groupName,
            groupMaster,
            category,
            nameValid
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
                            Let's make a Group
                        </Typography>
                    </div>
                    {/* form 여기서 폼을 post로 보낸다*/}

                    <form
                        ref={this.formRef}
                        className={classes.form}
                        action="http://localhost:8081/groups/createGroup"
                        method="post"
                    >
                        <TextField
                            onChange={this.onChange}
                            fullWidth={true}
                            className={classes.textField}
                            name="Group Name"
                            label={
                                groupName === "" ?
                                    "Group Name" :
                                    nameValid ?
                                        "사용가능한 그룹명입니다." :
                                        "사용할 수 없는 그룹명입니다."
                            }
                        />
                        <br />
                        <TextField
                            onChange={this.onChange}
                            fullWidth={true}
                            className={classes.textField}
                            name="category"
                            label={
                                category === "" ?
                                    "그룹 카테고리 " :
                                    category.length > 2 && category.length < 15 ?
                                        "category" :
                                        "카테고리는 3글자 이상 14글자 이하여야 합니다."
                            }
                        />
                        <br />
                        <TextField
                            onChange={this.onChange}
                            fullWidth={true}
                            className={classes.textField}
                            name="groupMaster"
                            label={
                                groupMaster === "" ?
                                    "groupMaster" :
                                    groupMaster.length > 2 && groupMaster.length < 15 ?
                                        "groupMaster" :
                                        "마스터이름은 3글자 이상 14글자 이하여야 합니다."
                            }
                        />
                        <br />
                        {/*  <TextField
                            onChange={this.onChange}
                            className={classes.textField}
                            name="emailFirst"
                            label="email"
                        />
                        <span style={{ color: "black" }}>@</span>
                        <TextField
                            onChange={this.onChange}
                            className={classes.textField}
                            name="emailSecond"
                            label="address"
                        />
                        <input type="hidden" name="email" value={emailFirst + "@" + emailSecond} />
                        <br /> */}
                        <Button
                           disabled={!this.submitValidation()}
                            type="button"
                            classes={{
                                root: classes.btnRoot,
                            }}
                            onClick={this.submit}
                        >
                            그룹만들기
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
    private submitValidation(): boolean {
        const {
            nameValid, groupMaster
        } = this.state
        
        if (groupMaster.length > 2 && groupMaster.length < 15) {
            return nameValid
        } else {
            return false;
        }
    }

    private submit() {
        
        const data = new FormData();
        data.append("groupName", this.state.groupName);
        data.append("groupMaster", this.state.groupMaster);
        data.append("category", this.state.category);
        
        axios.post("http://localhost:8081/groups/createGroup", data)
            .then((response) => {
                
                location.href = "/";
            }
            )
    }

    private onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name: string = e.currentTarget.name;
        this.setState({
            groupName: name === "Group Name" ? e.currentTarget.value : this.state.groupName,
            groupMaster: name === "groupMaster" ? e.currentTarget.value : this.state.groupMaster,
            category: name ==="category" ? e.currentTarget.value : this.state.category
        })
    }
}
// SignUp Component를 style을 적용을 시켜서 export 하겠다
export default withStyles(CreateGroupStyle)(CreateGroup)