import * as React from 'react';

export default class TestView extends React.Component {
    public render() {
        return (
            <div>
                <video 
                    autoPlay={true}
                    playsinline={true}
                />
            </div>
        );
    }
}