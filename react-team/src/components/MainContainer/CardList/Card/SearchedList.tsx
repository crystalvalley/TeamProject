import * as React from 'react';
import { StyleRulesCallback, withStyles, Theme, TextField, InputAdornment } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { ISearchState, withSearchContext } from '../../../../contexts/SearchContext';
import { ICardModel } from '../../../../constance/models';
import axios from 'axios';
import SmallCard from './smallCard/SmallCard';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    }
}

interface IState {
    cards: ICardModel[];
}

class SearchedList extends React.Component<IProps & ISearchState, IState>{
    constructor(props: IProps & ISearchState) {
        super(props);
        this.state = {
            cards : []
        }
    }
    public componentDidUpdate(preProps:IProps&ISearchState,preSate:IState){
        if(this.props.keyword===preProps.keyword||this.props.keyword===""){return;}
        axios.get("http://localhost:8081/boards/search",{
            params:{
                keyword : this.props.keyword
            }
        }).then((result)=>{
            this.setState({
                cards : result.data
            })
        })
    }
    public render() {
        return (
            <React.Fragment>
                <TextField
                    fullWidth={true}
                    onChange={this.props.keywordChange}
                    label="Search Keyword in List"
                    value={this.props.keyword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                {
                        this.state.cards.map((card, index) => {
                            return (
                                <SmallCard
                                    card={card}
                                    key={index}
                                />
                            );
                        })
                }
            </React.Fragment>
        );
    }
}

export default withSearchContext(withStyles(style)(SearchedList));