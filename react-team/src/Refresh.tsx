import * as React from 'react';
import { RouteComponentProps, withRouter} from 'react-router';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.22
 * @version : 2018.09.22
 * 
 */
interface IProps{
    path:string
}

class Refresh extends React.Component<IProps&RouteComponentProps<{}>>{
    public componentDidMount(){
        const path = this.props.path===undefined?"":this.props.path
        this.props.history.replace("/"+path);
    }
    public render(){
        return(<div/>);
    }
}

export default withRouter(Refresh);