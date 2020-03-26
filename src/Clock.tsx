import React from 'react';

interface IProps {
}

interface IState {
    date: Date;
}

class Clock extends React.Component<IProps, IState> {
    timerID?: any;

    constructor(props: IProps) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({date: new Date()}),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h1>Hello world</h1>
                <h3>{this.state.date.toLocaleTimeString()}</h3>
            </div>
        );
    }
}

export default Clock;
