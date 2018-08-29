import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField, Button } from '@material-ui/core';
import EditorMenu from './EditorMenu';
import { EditorState, } from 'draft-js';
import SNSEditor from './SnsEditor';
import { ILoginStore, withLoginContext } from "../../../../contexts/LoginContext"
import { SNSDecorator } from './Decorator';
import SuggestBox, { ISuggestState } from './Suggestion/SuggestBox';


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
}

interface IState {
    editorState: EditorState;
    title: string;
    suggestState: ISuggestState
    focus: number;
    hashSuggest: boolean;
    sub: string;
}


class SNSEditorContainer extends React.Component<IProps & ILoginStore, IState>{
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(SNSDecorator),
            title: "",
            sub: "",
            suggestState: {
                start: 0,
                end: 0,
                suggest: false,
                positionX: 0,
                positionY: 0,
            },
            focus: -1,
            hashSuggest: false
        }
        this.editorChange = this.editorChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.onHashTag = this.onHashTag.bind(this);
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
                        <Button>Save</Button>
                    </div>
                    <SuggestBox
                        {...this.state.suggestState}
                    />
                </div>
                <div
                    className={classes.menuPart}
                >
                    <EditorMenu
                        editorState={editorState}
                        title={this.state.title}
                        writer={this.props.loginedId}
                    />
                </div>
            </React.Fragment>
        );
    }
    private editorChange(e: EditorState) {
        const nowBlock = this.getNowBlock(e);
        const text = nowBlock.getText();
        this.setState({
            editorState: e,
            title: text,
            focus: e.getSelection().getFocusOffset(),
        }, () => {
            this.onHashTag(e)
        })
    }
    private cursorXY(text: string,position:number) {
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
    private onHashTag(e: EditorState) {
        const nowBlock = this.getNowBlock(e);
        const text = nowBlock.getText();
        const nowFocus = e.getSelection().getFocusOffset();
        let matchArr;
        let newstart = 0;
        let newend = 0;
        const reg = /\#[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.;\-]+/g;
        matchArr = reg.exec(text)
        if (matchArr === null) {
            this.setState({
                suggestState: {
                    end: -1,
                    positionX: -1,
                    positionY: -1,
                    start: -1,
                    suggest: false
                }
            })
        }
        while (matchArr !== null) {
            newstart = matchArr.index;
            newend = newstart + matchArr[0].length
            matchArr = reg.exec(text)
            const xy = this.cursorXY(text,nowFocus);
            if (xy === undefined) { return; }
            if (newstart < nowFocus && newend >= nowFocus) {
                this.setState({
                    suggestState: {
                        end: newend,
                        start: newstart,
                        suggest: true,
                        positionX: xy[0],
                        positionY: xy[1]
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
                        suggest: false,
                    }
                })
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
}

export default withLoginContext(withStyles(style)(SNSEditorContainer))