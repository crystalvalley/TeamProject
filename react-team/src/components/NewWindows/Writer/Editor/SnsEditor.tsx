import * as React from 'react';
import { EditorState, Editor } from 'draft-js';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.08.28
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    editorWrapper: {
        margin: "5px",
        padding: "25px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        boxShadow: "3px 3px 3px 3px lightgrey",
    },
    editorForm: {
        flexGrow: 1,
    }
})
interface IProps {
    classes: {
        editorWrapper: string;
        editorForm: string;
    };
    editorState: EditorState;
    editorChange(e: EditorState): void;
}

class SNSEditor extends React.Component<IProps>{
    public editor: any;
    constructor(props: IProps) {
        super(props);
        this.focus = this.focus.bind(this);
    }

    public render() {
        const { classes } = this.props;
        return (
            <div
                className={classes.editorWrapper}
            >
                <Scrollbars
                    onClick={this.focus}
                    className={classes.editorForm}
                    autoHide={true}
                >
                    <Editor
                        
                        ref={(element => { this.editor = element })}
                        editorState={this.props.editorState}
                        onChange={this.props.editorChange}
                    />
                </Scrollbars>
            </div>
        );
    }
    private focus() {
        this.editor.focus();
    }
}


export default withStyles(style)(SNSEditor)