import * as React from 'react';
import { Editor, EditorState } from 'draft-js';
import Scrollbars from 'react-custom-scrollbars';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.12
 * @version:2018.09.28
 */
interface IProps {
    editorState: EditorState,
    editorChange(e:EditorState):void
}

export default class ReplyEditor extends React.Component<IProps>{
    private editor:any;
    constructor(props: IProps) {
        super(props);
        this.focus = this.focus.bind(this);
    }
    public render() {
        return (
            <div
                style={{
                    width: "100%",
                    backgroundColor: "#f9fbff",
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
                        editorState={this.props.editorState}
                        onChange={this.props.editorChange}
                        placeholder="댓글은 여기에 쓰세요"
                    />
                </Scrollbars>
            </div>
        );
    }
    private focus() {
        this.editor.focus();
    }
}