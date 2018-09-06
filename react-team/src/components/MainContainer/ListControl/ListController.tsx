import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import BoxContainer from './BoxContainer';
import CreateListContainer from './CreateListContainer';
import axios from 'axios';

/**
 * @author ParkHyeokJoon
 * @since 2018.09.06
 * @version 2018.09.06
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    contollerBody: {
        border: "1px solid black",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    boxes: {
        flexBasis: "50%",
        border: "1px solid black",
    },
    createListBox: {
        flexBasis: "50%",
        border: "1px solid black",
    }

})

interface IProps {
    classes: {
        contollerBody: string;
        boxes: string;
        createListBox: string;
    }
}

interface IState {
    listNames: string[];
}

class ListController extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            listNames: []
        }
        this.refresh = this.refresh.bind(this);
    }

    public componentDidMount() {
        this.refresh();
    }

    public render() {
        const { classes } = this.props;
        return (
            <div
                className={classes.contollerBody}
            >
                <BoxContainer 
                    listNames = {this.state.listNames}
                />
                <CreateListContainer 
                    listNames={this.state.listNames}
                    refresh = {this.refresh}
                />
            </div>
        );
    }
    private refresh(){
        axios.get("http://localhost:8081/lists/getListNames")
            .then((result) => {
                this.setState({
                    listNames: result.data
                })
            })

    }
}

export default withStyles(style)(ListController);