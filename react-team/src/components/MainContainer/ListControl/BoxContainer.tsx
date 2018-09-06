import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
/**
 * @author ParkHyeokJoon
 * @since 2018.09.06
 * @version 2018.09.06
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    container: {
        flexBasis: "20%",
        padding: "6px",
        display: "flex",
    },
    box: {
        flexBasis: "10%",
        border: "1px solid black",
        margin: "5px",
        backgroundColor:"skyblue",
        display:"flex",
        flexDirection:"column"
    }

})

interface IProps {
    classes: {
        container: string;
        box: string;
    },
    listNames: string[]
}

interface IState {
    boxes: string[][];
}

class BoxContainer extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            boxes: []
        }
    }

    public componentDidUpdate() {
        if (this.props.listNames && this.state.boxes.length === 0) {
            const array: string[][] = [];
            const listnum = this.props.listNames.length;
            let boxnum = listnum / 5;
            if (listnum % 5 !== 0) {
                boxnum += 1;
            }
            for (let i = 0; i < boxnum; i++) {
                array.push(this.props.listNames.slice(5 * i, 5 * (i + 1)))
                if (listnum % 5 !== 0 && i === boxnum - 1) {
                    array.push(this.props.listNames.slice(-listnum % 5));
                }
            }
            this.setState({
                boxes: array
            })
        }

    }

    public render() {
        const { classes } = this.props;
        return (
            <div
                className={classes.container}
            >
                    {
                        this.state.boxes.map((subArray, index) => {
                            return (
                                <div
                                    className={classes.box}
                                    key={index}
                                >
                                    {
                                        subArray.map((listName, index2) => {
                                            return (
                                                <div
                                                    style={{
                                                        flexBasis:"20%",
                                                        flexGrow:0,
                                                        paddingLeft:"3px",
                                                        margin:"2px",
                                                        border:"1px solid black"
                                                    }}
                                                    key={index2}
                                                >
                                                    {listName}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
            </div>
        );
    }
}

export default withStyles(style)(BoxContainer);