import * as  React from 'react';


interface IMainStore {
    // 입력된 명령
    inputValue: string;
}

interface IMainContextValue {
    store: IMainStore;
}

const MainContext = React.createContext<IMainContextValue>({
    store: {
        inputValue: "",
    },
});
export const MainConsumer = MainContext.Consumer;
class MainProvider extends React.Component<{}, IMainStore> {
    constructor(props: {}) {
        super(props);
        this.state = {
            inputValue: "",
        }
    }
    public render() {
        return (
            <MainContext.Provider value={{
                store: this.state,
            }}>
                {this.props.children}
            </MainContext.Provider>
        );
    }
}
export { MainProvider };