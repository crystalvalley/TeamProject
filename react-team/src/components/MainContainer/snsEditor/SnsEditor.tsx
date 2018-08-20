import * as React from 'react';
import { EditorState, Editor } from 'draft-js';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.08.20
 */

interface IProps {
    editorState: EditorState;
    editorChange(e: EditorState): void;
}

export default class SNSEditor extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Editor
                editorState={this.props.editorState}
                onChange={this.props.editorChange}
            />
        );
    }
}