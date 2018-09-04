import * as React from 'react';
import { StyleRulesCallback, Theme, IconButton, withStyles } from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import { EditorState, convertToRaw } from 'draft-js';
import axios from 'axios';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.08.23
 */

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    }
    title: string;
    editorState: EditorState;
    writer:string;
}

class EditorMenu extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.sendData = this.sendData.bind(this);
    }
    public render() {
        return (
            <div>
                <IconButton
                    onClick={this.sendData}
                >
                    <Save />
                </IconButton>
            </div>
        );
    }
    private sendData() {
        const data = new FormData();
        data.append("content",
            JSON.stringify(
                convertToRaw(this.props.editorState.getCurrentContent())
            )
        );
        data.append("plainText",
            this.props.editorState.getCurrentContent().getPlainText()
        )
        data.append("title", this.props.title);
        data.append("writerId",this.props.writer)
        axios.post("http://localhost:8081/boards/writeBoard", data)
            .then((response) => {
                // alert(response.data);
                location.href = "/";
            })
            .catch(() => {
                location.href = "/";
            })
    }
}

export default withStyles(style)(EditorMenu);