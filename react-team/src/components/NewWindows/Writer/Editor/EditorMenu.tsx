import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { EditorState } from 'draft-js';
import Dropzone from 'react-dropzone';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.09.09
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    buttons: {
        display: "flex",
        minHeight: "50px",
        border: "1px solid black",
        margin: "5px"
    },
    audio: {
        display: "flex",
        minHeight: "50px",
        border: "1px solid black",
        flexBasis: "10%",
        margin: "5px"
    },
    photos: {
        display: "flex",
        minHeight: "50px",
        flexGrow: 1,
        border: "1px solid black",
        margin: "5px",
        flexDirection: "column"
    }
})

interface IProps {
    classes: {
        container: string;
        photos: string;
        buttons: string;
        audio: string;

    }
    title: string;
    editorState: EditorState;
    writer: string;
}

interface IState {
    files: File[];
}

class EditorMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            files: []
        }
        this.onDrop = this.onDrop.bind(this);
    }
    public render() {
        const { classes } = this.props
        return (
            <div
                className={classes.container}
            >
                <div
                    className={classes.buttons}
                >
                    Buttons
                </div>
                <div
                    className={classes.audio}
                >
                    Audio
                </div>
                <div
                    className={classes.photos}
                >
                    <Dropzone
                        onDrop={this.onDrop}
                    >
                        <p>Drop here</p>
                    </Dropzone>
                    <aside>
                        <h2>dropped files</h2>
                        <ul>
                            {
                                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                            }
                        </ul>
                    </aside>
                </div>
            </div>
        );
    }
    private onDrop(files: File[]) {
        this.setState({
            files
        })
    }
}

export default withStyles(style)(EditorMenu);