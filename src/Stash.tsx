import React from 'react';
import Coins from './Coins';

const API_URL = "https://api.guildwars2.com/v2";
const API_KEY = "80C77C67-C099-6247-B918-E1923A826C088E44B09F-C6A8-4F6F-95DC-6997446B06F6";
const GUILD_ID = "7311D77B-E708-EA11-81AA-A77AA130EAB8";

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
}

class Stash extends React.Component {
    state: StashState;

    constructor(props: any) {
        super(props);
        this.state = {
            chests: []
        };
    }

    componentDidMount() {
        fetch(`${API_URL}/guild/${GUILD_ID}/stash?access_token=${API_KEY}`)
            .then(res => res.json())
            .then((stashes: ApiResponse[]) => {
                console.log(stashes);
                const chests: Chest[] = stashes.map(stash => ({
                    id: stash.upgrade_id,
                    coins: new Coins(stash.coins),
                    name: stash.note,
                }));
                this.setState({ chests });
            });
    }

    render() {
        return (
            <div>
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
