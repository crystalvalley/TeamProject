import * as  React from 'react';
import axios from 'axios';

/**
 * @author : ParkHyeokjoon
 * @since : 18.09.05
 * @version : 18.09.05
 */

export interface IFavoriteStore {
    favorites : number[],
    setFavorite(num:number):void;
}

const favoriteContext = React.createContext<IFavoriteStore>({
    favorites:[],    
    setFavorite:(num:number)=>{return}
});
class FavoriteProvider extends React.Component<{}, IFavoriteStore> {
    constructor(props: {}) {
        super(props);
        this.setFavorite = this.setFavorite.bind(this);
        this.state = {
            favorites:[],    
            setFavorite:this.setFavorite
        }
        this.getFavorites = this.getFavorites.bind(this);
    }
    public componentDidMount(){
        this.getFavorites();
    }

    public render() {
        return (
            <favoriteContext.Provider value={this.state}>
                {this.props.children}
            </favoriteContext.Provider>
        );
    }

    private setFavorite(num : number){
        const newFav = this.state.favorites;
        // 이미 있으면 제거
        if(newFav.indexOf(num)!==-1){
            newFav.splice(newFav.indexOf(num),1);
        }else{
            newFav.push(num);
        }
        this.setState({
            favorites : newFav
        })
        axios.get("http://localhost:8081/boards/setFavorites",{
            params:{
                id : num
            }
        })
    }

    private getFavorites(){
        axios.get("http://localhost:8081/boards/getFavorites")
            .then((result)=>{
                this.setState({
                    favorites : result.data
                })
            })

    }
}
export { FavoriteProvider };


export function withFavoriteContext<P extends IFavoriteStore>(Component: React.ComponentType<P>) {
    return function userFavoriteContext(props: Pick<P, Exclude<keyof P, keyof IFavoriteStore>>) {
        return (
            <favoriteContext.Consumer>
                {
                    value =>
                        <Component {...value} {...props} />
                }
            </favoriteContext.Consumer>
        );
    }
}