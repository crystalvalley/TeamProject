import * as React from 'react';
import { RouteComponentProps, withRouter, match } from 'react-router';

interface IProps{
    match : match<any>
}

class Refresh extends React.Component<IProps&RouteComponentProps<{}>>{
    public componentDidMount(){
        alert(this.props.match.params.path)
        this.props.history.replace(this.props.match.params.path);
    }
    public render(){
        return(<div/>);
    }
}

export default withRouter(Refresh);