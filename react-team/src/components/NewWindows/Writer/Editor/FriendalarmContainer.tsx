import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField } from '@material-ui/core';
import { EditorState } from 'draft-js';
import { ILoginStore, withLoginContext } from "../../../../contexts/LoginContext"
import { SNSDecorator } from './Decorator';

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
    }
}

interface IState {
    editorState: EditorState;
    title: string;
    focus: number;
}

class FriendalarmContainer extends React.Component<IProps & ILoginStore, IState>{
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(SNSDecorator),
            title: "",
            focus: -1,
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div
                    className={classes.editorPart}
                >
                    <TextField
                        style={{
                            color: "grey"
                        }}

                        fullWidth={true}
                        label="Title"
                    />
                    
                </div>
            </React.Fragment>
        );
    }
}

export default withLoginContext(withStyles(style)(FriendalarmContainer))