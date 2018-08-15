import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';

const style: StyleRulesCallback = (theme: Theme) => ({
    test:{
        backgroundColor : "white"
    }
})

interface IProps {
    classes: {
        test:string;
    }
}

class IntroPage extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                test
            </div>
        );
    }
}

export default withStyles(style)(IntroPage)