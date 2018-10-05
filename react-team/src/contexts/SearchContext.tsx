import * as React from 'react';
import { ICardModel, ROOTURL } from '../constance/models';
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
    setKeyword(str: string): void;
    addPage(): void;
}

const searchContext = React.createContext<ISearchState>({
    keyword: "",
    searchedCard: [],
    getPage: 0,
    end: false,
    keywordChange: (e: React.ChangeEvent<HTMLInputElement>) => { return },
    setKeyword: (str: string) => { return },
    addPage: () => { return }

})

export class SearchProvider extends React.Component<{}, ISearchState>{
    constructor(props: {}) {
        super(props);
        this.keywordChange = this.keywordChange.bind(this);
        this.addPage = this.addPage.bind(this);
        this.setKeyword = this.setKeyword.bind(this);
        this.state = {
            keyword: "",
            searchedCard: [],
            getPage: 0,
            end: false,
            keywordChange: this.keywordChange,
            addPage: this.addPage,
            setKeyword: this.setKeyword
        }
        this.getCards = this.getCards.bind(this);
    }

    public render() {
        return (
            <searchContext.Provider value={this.state}>
                {this.props.children}
            </searchContext.Provider>
        );
    }
    private setKeyword(str: string) {
        this.setState({
            searchedCard:[],
            end: false,
            keyword: str,
            getPage: 0
        },this.getCards)
    }
    private getCards() {
        axios.get(ROOTURL+"/boards/search", {
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
                getPage: page + 1
            })
        })
    }

    private keywordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const t = e.currentTarget.value;
        alert(t);
        this.setState({
            searchedCard:[],
            end: false,
            keyword: t,
            getPage: 0
        }, ()=>{
            if(t===""){return;}
            this.getCards();
        })
    }

    private addPage() {
        const page = this.state.getPage
        this.setState({
            getPage: page + 1
        }, this.getCards)
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