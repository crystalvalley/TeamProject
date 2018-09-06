import * as React from 'react';
import { ICardModel } from '../constance/models';
import axios from 'axios';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.04
 * @version : 2018.09.04
 */

export interface ISearchState {
    keyword: string;
    searchedCard: ICardModel[];
    getPage: number;
    end: boolean;
    keywordChange(e: React.ChangeEvent<HTMLInputElement>): void;
    addPage(): void;
}

const searchContext = React.createContext<ISearchState>({
    keyword: "",
    searchedCard: [],
    getPage: 0,
    end: false,
    keywordChange: (e: React.ChangeEvent<HTMLInputElement>) => { return },
    addPage: () => { return }

})

export class SearchProvider extends React.Component<{}, ISearchState>{
    constructor(props: {}) {
        super(props);
        this.keywordChange = this.keywordChange.bind(this);
        this.addPage = this.addPage.bind(this);
        this.state = {
            keyword: "",
            searchedCard: [],
            getPage: 0,
            end: false,
            keywordChange: this.keywordChange,
            addPage: this.addPage
        }
        this.getCards = this.getCards.bind(this);
    }
    public componentDidUpdate(preProps: {}, preState: ISearchState) {
        if (this.state.keyword !== preState.keyword&&this.state.getPage!==0) {
            // keyword가 달라지면 page 초기화
            this.setState({
                searchedCard:[],
                getPage: 0,
                end:false
            },()=>{
                this.getCards();
            })
            return;
        }
        if ((this.state.keyword === preState.keyword && this.state.getPage === preState.getPage)
            || this.state.keyword === "") { return; }
        if (this.state.end) { return; }
        this.getCards();
    }

    public render() {
        return (
            <searchContext.Provider value={this.state}>
                {this.props.children}
            </searchContext.Provider>
        );
    }
    private getCards(){
        axios.get("http://localhost:8081/boards/search", {
            params: {
                keyword: this.state.keyword,
                page: this.state.getPage

            }
        }).then((result) => {
            if (result.data.length === 0) {
                this.setState({
                    end: true
                })
            }
            const page = this.state.getPage
            const newCard = [...this.state.searchedCard, ...result.data];
            this.setState({
                searchedCard: newCard,
                getPage: page+1
            })
        })
    }

    private keywordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            keyword: e.currentTarget.value
        })
    }
    private addPage() {
        const page = this.state.getPage
        this.setState({
            getPage: page + 1
        })
    }
}

export function withSearchContext<P extends ISearchState>(Component: React.ComponentType<P>) {
    return function serachContext(props: Pick<P, Exclude<keyof P, keyof ISearchState>>) {
        return (
            <searchContext.Consumer>
                {
                    value =>
                        <Component {...value} {...props} />
                }
            </searchContext.Consumer>
        );
    }
}