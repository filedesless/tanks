'use strict';

const API_URL = "https://api.guildwars2.com/v2";
const API_KEY = "80C77C67-C099-6247-B918-E1923A826C088E44B09F-C6A8-4F6F-95DC-6997446B06F6";
const GUILD_ID = "7311D77B-E708-EA11-81AA-A77AA130EAB8";

function coin2gold(coins) {
    return [Math.floor(coins / 10000), Math.floor(coins / 100 % 100), coins % 100];
}

$(document).ready(() => {
    $.getJSON(`${API_URL}/guild/${GUILD_ID}/stash?access_token=${API_KEY}`, (stashes) => {
        stashes.forEach((stash) => {
            const coins = stash.coins;
            const [g, s, c] = coin2gold(coins);
            $("#gold").text(g);
            $("#silver").text(s);
            $("#copper").text(c);
        });
        console.log(stashes);
    });

    $.getJSON(`${API_URL}/guild/${GUILD_ID}/log?access_token=${API_KEY}`, (logs) => {
        logs.filter((log) => log.type === "stash")
            .filter((log) => log.operation === "deposit")
            .forEach((log) => {
                const [g, s, c] = coin2gold(log.coins);
                $("#logs").append(`<li>${log.user} has deposited ${g} gold, ${s} silver and ${c} copper on ${log.time}</li>`);
            });
    });
});
