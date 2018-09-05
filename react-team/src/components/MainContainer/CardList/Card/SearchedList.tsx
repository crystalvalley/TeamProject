import * as React from 'react';
import { StyleRulesCallback, withStyles, Theme, TextField, InputAdornment } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import SmallCard from './smallCard/SmallCard';
import { ICardModel } from '../../../../constance/models';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    }
    searchedCard:ICardModel[];
    keyword:string;
    keywordChange(e:React.ChangeEvent<HTMLInputElement>):void;
}

class SearchedList extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
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
                        this.props.searchedCard.map((card, index) => {
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

export default withStyles(style)(SearchedList)