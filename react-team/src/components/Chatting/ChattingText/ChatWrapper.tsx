import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';


const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    }
}

class ChatWrapper extends React.Component<IProps>{
    public render() {
        return (
            <Scrollbars
                style={{
                    height: "300px"
                }}
                autoHide={true}
            >
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
                test<br />
            </Scrollbars>
        );
    }
}

export default withStyles(style)(ChatWrapper);