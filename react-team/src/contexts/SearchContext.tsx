import * as React from 'react';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.04
 * @version : 2018.09.04
 */

export interface ISearchState {
    keyword: string;
    keywordChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const searchContext = React.createContext<ISearchState>({
    keyword: "",
    keywordChange: (e: React.ChangeEvent<HTMLInputElement>) => { return }
})

export class SearchProvider extends React.Component<{}, ISearchState>{
    constructor(props: {}) {
        super(props);
        this.keywordChange = this.keywordChange.bind(this);
        this.state = {
            keyword: "",
            keywordChange: this.keywordChange
        }
    }

    public render() {
        return (
            <searchContext.Provider value={this.state}>
                {this.props.children}
            </searchContext.Provider>
        );
    }

    private keywordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            keyword: e.currentTarget.value
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