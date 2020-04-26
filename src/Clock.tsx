import React from 'react';

interface IProps {
}

interface IState {
    hours: number,
    minutes: number,
    seconds: number
}

class Clock extends React.Component<IProps, IState> {
    timerID?: any;

    constructor(props: IProps) {
        super(props);
        this.state = this.setTimeUntilReset();
    }

    setTimeUntilReset(): IState {
        // get current time
        const now = new Date();
        // get target time (next midnight)
        const rst = new Date();
        rst.setUTCHours(0, 0, 0, 0);
        rst.setUTCDate(rst.getUTCDate() + 1);
        // get time difference in seconds
        const dst = Math.floor((rst.getTime() - now.getTime()) / 1000);
        return {
            hours: Math.floor(dst / 60 / 60),
            minutes: Math.floor(dst / 60 % 60),
            seconds: dst % 60
        };

    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState(this.setTimeUntilReset()),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h1>Time until daily reset</h1>
                <h3>{this.state.hours}h {this.state.minutes}m {this.state.seconds}s</h3>
            </div>
        );
    }
}

export default Clock;
