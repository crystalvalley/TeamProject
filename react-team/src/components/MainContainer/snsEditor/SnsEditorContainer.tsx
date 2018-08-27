import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField } from '@material-ui/core';
import EditorMenu from './EditorMenu';
import { EditorState } from 'draft-js';
import SNSEditor from './SnsEditor';
import Scrollbars from 'react-custom-scrollbars';
import { ILoginStore, withLoginContext } from '../../../contexts/LoginContext';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.08.20
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    editorContainer: {
        backgroundColor: "white",
        height: "100%",
        padding: "10px",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        display: "flex",
    }
})

interface IProps {
    classes: {
        editorContainer: string;
    },
}

interface IState {
    editorState: EditorState;
    title: string;
}


class SNSEditorContainer extends React.Component<IProps&ILoginStore, IState>{
    constructor(props: IProps&ILoginStore) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            title:""
        }
        this.editorChange = this.editorChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
    }

    public render() {
        const { classes } = this.props;
        const {editorState} = this.state;
        return (
            <div className={classes.editorContainer}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        flexBasis: "50%",
                        overflow: "hidden"
                    }}
                >
                    <TextField
                        style={{
                            color: "grey"
                        }}
                        onChange={this.titleChange}
                        fullWidth={true}
                        label="Title"
                    />
                    <EditorMenu
                        editorState={editorState}
                        title={this.state.title}
                        writer={this.props.loginedId}
                    />
                    <Scrollbars>
                        <SNSEditor
                            editorState={editorState}
                            editorChange={this.editorChange}
                        />
                    </Scrollbars>
                </div>
                <div
                    style={{
                        border: "1px solid black",
                        flexGrow: 1,
                        flexShrink: 0,
                        flexBasis: "50%"
                    }}
                >
                    음성파일 제어
                </div>
            </div>
        );
    }
    private editorChange(e: EditorState) {
        this.setState({
            editorState: e
        })
    }
    private titleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: e.currentTarget.value
        })
    }
}

export default withLoginContext(withStyles(style)(SNSEditorContainer))