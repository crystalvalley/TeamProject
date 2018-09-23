import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField, Button } from '@material-ui/core';
import EditorMenu from './EditorMenu';
import { EditorState, Modifier, SelectionState, convertToRaw, } from 'draft-js';
import SNSEditor from './SnsEditor';
import { ILoginStore, withLoginContext } from "../../../../contexts/LoginContext"
import { SNSDecorator } from './Decorator';
import TagSuggestBox from './Suggestion/Components/TagSuggestBox';
import { ISuggestState } from './EditorConstance/props';
import MentionSuggestBox from './Suggestion/Components/MentionSuggestBox';
import axios from "axios";
import { withRouter, RouteComponentProps } from 'react-router';


/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.08.28
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    editorContainer: {
        backgroundColor: "white",
        height: "100%",
        padding: "20px",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        display: "flex",
        flexDirection: "column"
    },
    editorPart: {
        flexBasis: "75%",
        height: "100%",
        marginRight: "20px",
        padding: "25px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        position: "relative"
    },
    menuPart: {
        flexBasis: "25%",
        height: "100%",
        backgroundColor: "white"
    },
})

interface IProps {
    classes: {
        editorContainer: string;
        editorPart: string;
        menuPart: string;
    },
    onClose(): void;
}

interface IState {
    editorState: EditorState;
    title: string;
    suggestState: ISuggestState
    focus: number;
    hashSuggest: boolean;
    mentionSuggest: boolean;
    sub: string;
    sS: SelectionState;
    files: File[]
}


class SNSEditorContainer extends React.Component<IProps & ILoginStore & RouteComponentProps<{}>, IState>{
    constructor(props: IProps & ILoginStore & RouteComponentProps<{}>) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(SNSDecorator),
            title: "",
            sub: "",
            suggestState: {
                start: 0,
                end: 0,
                positionX: 0,
                positionY: 0,
                text: ""
            },
            focus: -1,
            hashSuggest: false,
            mentionSuggest: false,
            files: [],
            sS: SelectionState.createEmpty("")
        }
        this.editorChange = this.editorChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.typeChange = this.typeChange.bind(this);
        this.changeTag = this.changeTag.bind(this);
        this.sendData = this.sendData.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    public render() {
        const { classes } = this.props;
        const { editorState } = this.state;
        return (
            <React.Fragment>
                <div
                    className={classes.editorPart}
                >
                    <TextField
                        style={{
                            color: "grey"
                        }}
                        onChange={this.titleChange}
                        fullWidth={true}
                        label="Title"
                    />
                    <SNSEditor
                        editorState={editorState}
                        editorChange={this.editorChange}
                    />
                    <div>
                        <Button
                            onClick={this.sendData}
                        >
                            Save
                        </Button>
                    </div>
                    <TagSuggestBox
                        open={this.state.hashSuggest}
                        tagChange={this.changeTag}
                        {...this.state.suggestState}
                    />
                    <MentionSuggestBox
                        open={this.state.mentionSuggest}
                        mentionChange={this.changeTag}
                        {...this.state.suggestState}
                    />
                </div>
                <div
                    className={classes.menuPart}
                >
                    <EditorMenu
                        onDrop={this.onDrop}
                        files={this.state.files}
                        deleteImage={this.deleteImage}
                        editorState={editorState}
                        title={this.state.title}
                        writer={this.props.logined.id}
                    />
                </div>
            </React.Fragment>
        );
    }
    private sendData() {
        const data = new FormData();
        data.append("content",
            JSON.stringify(
                convertToRaw(this.state.editorState.getCurrentContent())
            )
        );
        data.append("plainText",
            this.state.editorState.getCurrentContent().getPlainText()
        )
        data.append("title", this.state.title);
        data.append("writerId", this.props.logined.id)
        for (const file of this.state.files) {
            data.append("image", file)
        }
        axios.post("http://localhost:8081/boards/writeBoard", data)
            .then((response) => {
                // alert(response.data);
                this.props.history.push("/refreshPage" + window.location.pathname)
                this.props.onClose();
            })
            .catch(() => {
                this.props.history.push("/")
            })
    }
    private editorChange(e: EditorState) {
        this.setState({
            editorState: e,
            focus: e.getSelection().getFocusOffset(),
            sS: e.getSelection()
        }, () => {
            this.typeChange(e)
        })
    }
    private cursorXY(text: string, position: number) {
        let sub;
        try {
            const nowNode = window.getSelection().focusNode.parentElement!;
            sub = document.createElement("span");
            const copyStyle = getComputedStyle(nowNode);
            sub.style.margin = copyStyle.margin;
            sub.style.padding = copyStyle.padding;
            nowNode.appendChild(sub);
            const getofs = document.getElementById("getOffset");
            const left = sub.offsetLeft + getofs!.offsetLeft - 15;
            const top = sub.offsetTop + getofs!.offsetTop + 30;
            sub.remove();
            return [left, top];
        } catch{
            return;
        }
    }
    private typeChange(e: EditorState) {
        const nowBlock = this.getNowBlock(e);
        const text = nowBlock.getText();
        const nowFocus = e.getSelection().getFocusOffset();

        let newstart = 0;
        let newend = 0;
        const regArr: RegExp[] = [/\#[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.;\-]+/g, /\@[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.;\-]+/g];
        const hashMatch = regArr[0].exec(text);
        const mentionMatch = regArr[1].exec(text);
        if (hashMatch === null && mentionMatch === null) {
            this.setState({
                suggestState: {
                    ...this.state.suggestState,
                    positionX: -1,
                    positionY: -1,
                },
                hashSuggest: false,
                mentionSuggest: false
            })
            return;
        }
        const matchArr = [hashMatch, mentionMatch];
        for (let index = 0; index < matchArr.length; index++) {
            while (matchArr[index] !== null) {
                newstart = matchArr[index]!.index;
                newend = newstart + matchArr[index]![0].length
                matchArr[index] = regArr[index].exec(text)
                const xy = this.cursorXY(text, nowFocus);
                if (xy === undefined) { return; }
                if (newstart < nowFocus && newend >= nowFocus) {
                    this.setState({
                        hashSuggest: index === 0 ? true : false,
                        mentionSuggest: index === 1 ? true : false,
                        suggestState: {
                            end: newend,
                            start: newstart,
                            positionX: xy[0],
                            positionY: xy[1],
                            text: text.slice(newstart, newend)
                        }
                    })
                    return;
                } else {
                    const exSuggestState = this.state.suggestState;
                    this.setState({
                        suggestState: {
                            ...exSuggestState,
                            end: -1,
                            start: -1,
                        },
                        hashSuggest: false,
                        mentionSuggest: false
                    })
                }
            }
        }
    }

    private titleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: e.currentTarget.value
        })
    }

    private getNowBlock(e: EditorState) {
        return this.state.editorState.getCurrentContent().getBlockForKey(
            this.state.editorState.getSelection().getFocusKey()
        );
    }
    private changeTag(start: number, end: number, str: string) {
        let e = this.state.editorState;
        const blockKey = this.getNowBlock(e).getKey();
        const ss: SelectionState = new SelectionState({
            anchorKey: blockKey,
            anchorOffset: start,
            focusKey: blockKey,
            focusOffset: end,
        })
        const replaced = Modifier.replaceText(
            e.getCurrentContent(),
            ss,
            str
        );
        e = EditorState.push(
            e,
            replaced,
            "change-block-data"
        )
        this.setState({
            editorState: EditorState.forceSelection(e, new SelectionState({
                anchorKey: blockKey,
                anchorOffset: start + str.length,
                focusKey: blockKey,
                focusOffset: start + str.length,
            })),
            hashSuggest: false
        }, () => {
            this.typeChange(this.state.editorState)
        })
    }
    private deleteImage(index: number) {
        const files = this.state.files;
        files.splice(index, 1);
        this.setState({
            files
        })
    }
    private onDrop(files: File[]) {
        const subFiles = [...this.state.files, ...files];
        this.setState({
            files: subFiles
        })
    }
}

export default withRouter(withLoginContext(withStyles(style)(SNSEditorContainer)))