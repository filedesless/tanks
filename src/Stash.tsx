import React from 'react';
import Coins from './Coins';
import { API_URL, API_KEY, GUILD_ID } from './globals';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'
import * as Icon from 'react-bootstrap-icons';


type ApiResponse = {
    upgrade_id: number,
    size: number,
    coins: number,
    note: string,
}

type Chest = {
    id: number,
    coins: Coins,
    name: string,
}

type StashState = {
    chests: Array<Chest>,
    loading: boolean,
}

class Stash extends React.Component {
    timerID?: any;
    state: StashState;

    constructor(props: any) {
        super(props);
        this.state = {
            chests: [],
            loading: false,
        };
    }

    loadStash() {
        this.setState({ loading: true });
        fetch(`${API_URL}/guild/${GUILD_ID}/stash?access_token=${API_KEY}`)
            .then(res => res.json())
            .then((stashes: ApiResponse[]) => {
                const chests: Chest[] = stashes.map(stash => ({
                    id: stash.upgrade_id,
                    coins: new Coins(stash.coins),
                    name: stash.note,
                }));
                this.setState({ loading: false, chests });
            });
    }

    async componentDidMount() {
        this.loadStash();
        this.timerID = setInterval(() => this.loadStash, 10 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <Button style={{ float: 'right', margin: '.2em' }} onClick={() => this.loadStash()}>
                    {this.state.loading && <Spinner animation="border" size="sm" /> || <Icon.ArrowClockwise />}
                </Button>
                <h2>Guild chest list</h2>
                <ul>
                    {this.state.chests.map((chest) => (
                        <li key={chest.id}>{chest.name}: {chest.coins.toString()}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Stash;
