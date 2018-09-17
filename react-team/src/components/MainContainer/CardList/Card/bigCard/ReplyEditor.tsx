import * as React from 'react';
import { Editor, EditorState } from 'draft-js';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import Scrollbars from 'react-custom-scrollbars';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.12
 * @version:2018.09.12
 */
interface IState {
    editorState: EditorState
}

export default class ReplyEditor extends React.Component<{}, IState>{
    private editor:any;
    constructor(props: {}) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(SNSDecorator)
        }
        this.editorChange = this.editorChange.bind(this);
        this.focus = this.focus.bind(this);
    }
    public render() {
        return (
            <div
                style={{
                    width: "100%",
                    backgroundColor: "skyblue",
                    padding: "6px"
                }}
            >
                <Scrollbars
                    onClick={this.focus}
                    autoHide={true}
                    style={{
                        height:"75px"
                    }}
                >
                    <Editor
                        ref={(e)=>{this.editor=e}}
                        editorState={this.state.editorState}
                        onChange={this.editorChange}
                    />
                </Scrollbars>
            </div>
        );
    }
    private editorChange(e: EditorState) {
        this.setState({
            editorState: e
        })
    }
    private focus() {
        this.editor.focus();
    }
}