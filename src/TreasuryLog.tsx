import React from 'react';
import logo from './logo.svg';
import Coins from './Coins';
import { API_URL, API_KEY, GUILD_ID } from './globals';
import { hide_user_digits } from './utils';

interface ApiResponse {
    id: number
    time: Date
    user: string
    type: string
}

enum Operation {
    Deposit = "deposit",
    Withdraw = "withdraw"
}

interface StashApiResponse extends ApiResponse {
    coins: number
    operation: Operation
}

type TreasuryLogsState = {
    logs: Array<StashApiResponse>,
    contributors: Contributor[],
}

type Contributor = {
    username: string,
    coins: number
}

function getContributors(logs: StashApiResponse[]): Contributor[] {
    const m: Map<string, number> = new Map();
    logs.forEach(log => {
        switch (log.operation) {
            case Operation.Deposit:
                m.set(log.user, (m.get(log.user) || 0) + log.coins);
                break;
            case Operation.Withdraw:
                m.set(log.user, (m.get(log.user) || 0) - log.coins);
                break;
        }
    });

    const ret: Contributor[] = [];
    m.forEach((value, key) => {
        ret.push({ username: key, coins: value });
    });

    ret.sort((a, b) => a.coins < b.coins ? 1 : -1);

    return ret;
}

function top_contributor(list: Contributor[]): Contributor {
    return list.reduce((acc, cur) => acc.coins < cur.coins ? cur : acc);
}

async function load_data(): Promise<StashApiResponse[]> {
    return fetch(`${API_URL}/guild/${GUILD_ID}/log?access_token=${API_KEY}`)
        .then(res => res.json())
        .then(res =>
            res.filter((entry: ApiResponse) =>
                entry.type === "stash"))
        .then(res =>
            res.filter((entry: StashApiResponse) =>
                entry.operation === Operation.Deposit ||
                entry.operation === Operation.Withdraw))
        .then(res =>
            res.filter((entry: StashApiResponse) => entry.coins !== 0))
        .then(res =>
            res.map((entry: StashApiResponse) => {
                entry.user = hide_user_digits(entry.user);
                return entry;
            }));
}

function log2line(log: StashApiResponse) {
    const word = log.operation === Operation.Deposit ? "deposited" : "withdrawed";
    const time = new Date(log.time).toLocaleString();
    return `${time} - ${log.user} ${word} ${new Coins(log.coins).toString()}`;
}

function contributor2line(contributor: Contributor) {
    return `${contributor.username}: ${new Coins(contributor.coins).toString()}`;
}

class TreasuryLogs extends React.Component {
    state: TreasuryLogsState;

    constructor(props: any) {
        super(props);
        this.state = {
            logs: [],
            contributors: [],
        };
    }

    async componentDidMount() {
        const logs = await load_data();
        const contributors = getContributors(logs);
        this.setState({ logs, contributors });
    }

    render() {
        return (
            <div>
                <h2>Treasury access logs</h2>
                {
                    this.state.logs.length === 0 ?
                        <img src={logo} className="App-logo" alt="logo" /> :
                        <ul>
                            {this.state.logs.map((log) =>
                                <li key={log.id}>{log2line(log)}</li>
                            )}
                        </ul>
                }
                <h3>Scoreboard</h3>
                <ul>
                    {this.state.contributors.map((log) =>
                        <li key={log.username}>{contributor2line(log)}</li>)}
                </ul>
            </div>
        );
    }
}

export default TreasuryLogs;
