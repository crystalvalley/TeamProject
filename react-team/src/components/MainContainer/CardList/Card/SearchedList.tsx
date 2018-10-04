import * as React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import SmallCard from './smallCard/SmallCard';
import { ICardModel } from '../../../../constance/models';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.27
 * @version : 2018.09.05
 * 
 */

interface IProps {
    searchedCard: ICardModel[];
    keyword: string;
    keywordChange(e: React.ChangeEvent<HTMLInputElement>): void;
    boardRefresh(): void;
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
                                boardRefresh={this.props.boardRefresh}
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

export default SearchedList