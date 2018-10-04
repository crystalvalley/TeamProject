import * as React from 'react';

interface IProps {
    percentage: number;
    name: string
}

export default class TagPercent extends React.Component<IProps>{
    public render() {
        return (
            <div>
                {this.props.name} {this.props.percentage+"%"}
                <div
                    style={{
                        height:"1em",
                        backgroundColor:"skyblue",
                        width:this.props.percentage+"%",
                        borderRadius:"10px",

                    }}
                />
            </div>
        );
    }
}