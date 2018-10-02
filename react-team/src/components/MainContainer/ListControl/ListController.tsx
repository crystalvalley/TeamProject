import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import BoxContainer from './boxControl/BoxContainer';
import CreateListContainer from './CreateListContainer';
import axios from 'axios';
import { ROOTURL } from '../../../constance/models';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.06
 * @version : 2018.09.22
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    contollerBody: {
        border: "1px solid black",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
        this.listOrderChange = this.listOrderChange.bind(this);
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
                    listOrderChange={this.listOrderChange}
                    listNames={this.state.listNames}
                />
                <CreateListContainer
                    listNames={this.state.listNames}
                    refresh={this.refresh}
                />
            </div>
        );
    }
    private refresh() {
        axios.get(ROOTURL+"/lists/getListNames")
            .then((result) => {
                this.setState({
                    listNames: result.data
                })
            })
    }
    private listOrderChange(listNames: string[]) {
        this.setState({
            listNames
        }, () => {
            axios.post(ROOTURL+"/lists/refreshListOrder", {
                listNames: this.state.listNames
            })
        })
    }
}

export default withStyles(style)(ListController);