import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, GridList, GridListTile, } from '@material-ui/core';
import CardContent from './CardContent';
import { ICardModel } from '../../../constance/models';
import axios from 'axios';
import { Location } from 'history';

/**
 * @author:ParkHyeokJoon
 * @since:2018.08.15
 * @version:2018.08.15
 * 
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    test: {
        backgroundColor: "white"
    },
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    photos: {
        padding: "30px",
    }
})

interface IProps {
    classes: {
        test: string;
        gridList: string;
        photos: string;
    }
    location:Location;
}
interface IState {
    boards: ICardModel[]
}

class CardList extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            boards: []
        }
    }

    public componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        axios.get("http://localhost:8081/getBoard",{
            params: {
                // 카드 타입 => 게시글, 카드
                boardType: params.get("type")
                // 
            }
        })
            .then((response) => {
                this.setState({
                    boards: response.data
                });
            })
    }
    public componentWillUpdate(nextProps: IProps,nextState:IState) {
        const params = new URLSearchParams(this.props.location.search);
        if ((this.state.boards !== this.state.boards)||(this.props.location!==nextProps.location)) {
            axios.get("http://localhost:8081/getBoard", {
                params: {
                    // 카드 타입 => 게시글, 카드
                    boardType: params.get("type")
                    // 
                }
            }).then((result) => this.setState({
                boards : result.data
            }))
        }
    }



    public render() {
        const { classes } = this.props;
        return (
            <div
                className={classes.photos}
            >
                <div>
                    <GridList
                        cellHeight={300}
                        spacing={20}
                        className={classes.gridList}
                        cols={3}
                        style={{
                            overflow: "auto",
                            height: "80vh"
                        }}
                    >
                        {
                            this.state.boards.map((board, index) => {
                                return (
                                    <GridListTile
                                        key={index}
                                        cols={1}
                                    >
                                        <CardContent 
                                            card={board}
                                        />
                                    </GridListTile>
                                );
                            })
                        }
                    </GridList>
                </div>
            </div>
        );
    }
}
export default withStyles(style)(CardList)