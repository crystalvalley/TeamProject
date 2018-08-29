import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField, Button } from '@material-ui/core';
import EditorMenu from './EditorMenu';
import { EditorState, } from 'draft-js';
import SNSEditor from './SnsEditor';
import { ILoginStore, withLoginContext } from "../../../../contexts/LoginContext"
import { SNSDecorator } from './Decorator';

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
        flexDirection: "column"
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
    start: number;
    end: number;
}


class SNSEditorContainer extends React.Component<IProps & ILoginStore, IState>{
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(SNSDecorator),
            title: "",
            start: 0,
            end: 0,
        }
        this.editorChange = this.editorChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
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
                </div>
                <div
                    className={classes.menuPart}
                >
                    <EditorMenu
                        editorState={editorState}
                        title={this.state.title}
                        writer={this.props.loginedId}
                    />
                    {this.state.title}<br />
                    {this.state.start}<br />
                    {this.state.end}<br />
                </div>
            </React.Fragment>
        );
    }
    private editorChange(e: EditorState) {
        const text = this.getNowBlock(e).getText();
        // let matchArr;
        let newstart = 0;
        let newend = 0;
        /*
        matchArr = /\#[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.;\-]+/g.exec(text)
        while (matchArr !== null) {
            newstart = matchArr.index;
            newend = newstart + matchArr[0].length
            matchArr = /\#[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.;\-]+/g.exec(text)
        }
        */

        this.setState({
            editorState: e,
            title: text,
            start: newstart,
            end: newend
        })


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