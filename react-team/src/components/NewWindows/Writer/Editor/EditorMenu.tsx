import * as React from 'react';
import { StyleRulesCallback, Theme, IconButton, withStyles } from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import { EditorState } from 'draft-js';

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
    writer: string;
}

class EditorMenu extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        return (
            <div>
                <IconButton>
                    <Save />
                </IconButton>
            </div>
        );
    }
}

export default withStyles(style)(EditorMenu);