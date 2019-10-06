const WordPos = require("wordpos");
const wordpos = new WordPos();
const lookupResponse = require("../utils/lookupResponse");
const sendResponse = require("../utils/sendResponse");

module.exports = message => {
    let responseObject = lookupResponse(message, definitions, aliases);

    if (responseObject.response) {
        return sendResponse(message, responseObject.response);
    }

    if (responseObject.request === "") {
        var keys = Object.keys(definitions);
        var suggestion = keys[Math.floor(Math.random() * keys.length)];
        return sendResponse(message, `You... didn't ask me to define anything. How about... ${suggestion}. ${definitions[suggestion]}`);
    }

    if (responseObject.request === "list") {
        var keys = Object.keys(definitions);
        keys = keys.sort();
        sendResponse(message, `I'll send you a DM, since there are a lot of them.`);
        return message.member.send(`I have definitions for these things: ${keys.join(", ")}.`);
    }

    wordpos.lookup(request, (result, word) => {
        if(result[0] && result[0].def) {
            return sendResponse(message, `The dictionary says: ${result[0].def}.`);
        } else {
            return sendResponse(message, `I don't know the definition of ${requestArray.join(" ")}. Are you sure you spelt it right?`);
        }
    });
};

const definitions = {
    "tanyao": "Tanyao is a hand that contains only number tiles from 2 through 8. It's worth one han, and is usually allowed to be open. See kuitan for more on that.\nExample: <:2m:466437921550106627><:3m:466437922577580052><:4m:466437922556608522><:7m:466437922250555393><:7m:466437922250555393><:7m:466437922250555393><:5p:466437922732769290><:6p:466437922393030657><:7p:466437922980102144><:2s:466437921663352842><:2s:466437921663352842><:6s:466437922586099723><:7s:466437922632105984><:8s:466437922380316673>.",
    "kuitan": "Kuitan is a rule that allows open tanyao. Kuitan ari means open tanyao is allowed, while kuitan nashi means it's not allowed, and you can only score tanyao if your hand is closed. Kuitan ari is the more popular option.",
    "tenpai": "A hand is tenpai if it's one tile away from winning.",
    "furiten": "Furiten is a rule that prevents you from winning a hand by ron if you have a tile in your discards that would complete your hand. For example, if your final shape was <:2p:466437922669985823><:3p:466437922426716161>, and you had a <:1p:466437920908378113> in your discards, you could not win the hand by ron, even on the <:4p:466437922401550337>.",
    "tsumo": "Tsumo is the act of drawing a tile yourself.",
    "tsumogiri": "Tsumogiri is when a player cuts (giri) the tile they drew (tsumo). The opposite is tedashi, cutting a tile from the hand.",
    "tedashi": "Tedashi is when a player cuts (dashi, go out) a tile from their hand (te). The opposite is tsumogiri, cutting the tile that was drawn.",
    "ryanmen": "A ryanmen shape is a two-sided wait for a run, such as <:2p:466437922669985823><:3p:466437922426716161>.",
    "kanchan": "A kanchan shape is a closed wait for a run, such as <:2p:466437922669985823><:4p:466437922401550337>.",
    "penchan": "A penchan shape is an edge wait for a run, such as <:1p:466437920908378113><:2p:466437922669985823>.",
    "shanpon": "A shanpon shape is when you are waiting for one of two pairs to turn into a triplet, such as <:2p:466437922669985823><:2p:466437922669985823><:4s:466437922527248384><:4s:466437922527248384>.",
    "tanki": "A tanki is when you're tenpai and waiting on a tile to complete a pair.",
    "hadaka": "A hadaka tanki is when you've called four times, and are left with a single tile in your hand.",
    "entotsu": "An entotsu shape is when you're waiting either on a ryanmen or a shanpon. It looks like <:2p:466437922669985823><:2p:466437922669985823><:2p:466437922669985823><:3p:466437922426716161><:4p:466437922401550337><:3z:466437922560671744><:3z:466437922560671744>. This wins on <:2p:466437922669985823>-<:5p:466437922732769290> and <:3z:466437922560671744>.",
    "sanmenchan": "A sanmenchan is a three-sided wait for a run, such as <:2p:466437922669985823><:3p:466437922426716161><:4p:466437922401550337><:5p:466437922732769290><:6p:466437922393030657>.",
    "gyakuten": "Gyakuten is the act of improving your placement, usually in the final round of a game.",
    "suji": "Suji refers to tiles three more or less than a tile. For example, <:2p:466437922669985823> and <:8p:466437922380316683> are suji of the <:5p:466437922732769290> tile. See this article for more information: http://arcturus.su/wiki/Suji",
    "nakasuji": "Nakasuji refers to when a middle tile is made safer by both of its suji being in an opponents' discards. If an opponent had cut both <:2p:466437922669985823> and <:8p:466437922380316683>, the <:5p:466437922732769290> would be safer.",
    "nagare": "Nagare is a word for luck, or flow. A player winning a lot has good nagare.",
    "shanten": "Shanten is how far your hand is from tenpai. Tenpai would be 0-shanten, and then it goes up from there.",
    "ukeire": "Ukeire is the number of tiles that decrease your hand's shanten.",
    "iishanten": "A hand that's one tile away from tenpai.",
    "ryanshanten": "A hand that's two tiles away from tenpai.",
    "nobetan": "A nobetan shape is when you're waiting on one of two tiles to become the pair for your hand, such as <:2s:466437921663352842><:3s:466437922258681869><:4s:466437922527248384><:5s:466437922258812929>.",
    "yonrenkei": "A yonrenkai is a run of four in your hand. It could become a nobetan, or be seen as two ryanmen.",
    "nakabukure": "A nakabukure, or bulging shape, is a run with an extra tile in the middle, like <:2s:466437921663352842><:3s:466437922258681869><:3s:466437922258681869><:4s:466437922527248384>. This could be a run, or it could be two ryanmen.",
    "hatsu": "The green dragon. <:6z:466437922317402143>",
    "chun": "The red dragon. <:7z:466437922279784469>",
    "haku": "The white dragon. <:5z:466437921550106625>",
    "ton": "The east wind. <:1z:466437921688518656>",
    "nan": "The south wind. <:2z:466437922594226187>",
    "naan": "A type of leavened flatbread, usually round. Often paired with hummus.",
    "sha": "The west wind. <:3z:466437922560671744>", "shaa": "The west wind. <:3z:466437922560671744>", "xia": "The west wind. <:3z:466437922560671744>",
    "pei": "The north wind. <:4z:466437922518728744>",
    "menzen": "Closed.",
    "menzentsumo": "Menzen tsumo is a yaku awarded for drawing your winning tile while your hand is closed. Worth one han.",
    "pinfu": "Pinfu is a yaku for a hand which scores no extra fu points, aside from those for tsumo and ron. This means the hand has only runs, a pair that isn't yakuhai, and the final wait was a ryanmen. Must be closed, and is worth one han.\nExample: <:1m:466437920698531841><:2m:466437921550106627><:3m:466437922577580052><:4m:466437922556608522><:5m:466437922401419274><:6m:466437922556739584><:6p:466437922393030657><:7p:466437922980102144><:9p:466437922854404106><:9p:466437922854404106><:3s:466437922258681869><:4s:466437922527248384><:5s:466437922258812929>",
    "sanshoku": "Sanshoku doujun is a yaku for having the same run in each suit. Worth two han closed, and one han open.\nExample: <:1m:466437920698531841><:1m:466437920698531841><:1m:466437920698531841><:5m:466437922401419274><:6m:466437922556739584><:7m:466437922250555393><:5p:466437922732769290><:6p:466437922393030657><:7p:466437922980102144><:5s:466437922258812929><:6s:466437922586099723><:7s:466437922632105984><:6z:466437922317402143><:6z:466437922317402143>",
    "iipeikou": "Iipeikou is a yaku for having two identical runs, such as <:2s:466437921663352842><:2s:466437921663352842><:3s:466437922258681869><:3s:466437922258681869><:4s:466437922527248384><:4s:466437922527248384>. Must be closed, and is worth one han.",
    "dora": "The dora is a bonus tile, one greater than the dora indicator. This wraps around, so <:9m:466437922430648330> as indicator makes <:1m:466437920698531841> dora. Each one gives you an extra han, but they don't count as a yaku. The order for honors is <:1z:466437921688518656>-><:2z:466437922594226187>-><:3z:466437922560671744>-><:4z:466437922518728744>-><:1z:466437921688518656>, and <:5z:466437921550106625>-><:6z:466437922317402143>-><:7z:466437922279784469>-><:5z:466437921550106625>.",
    "ura": "Ura dora indicators are the tile(s) under the dora indicator(s), which create ura dora. Revealed when a player who is in riichi wins the round, and act the same as regular dora.",
    "aka": "Aka means red. Akadora are the red tiles, <:0m:466442879880134657><:0s:466441485542359042><:0p:466442879930466316>, that each grant one han, but do not count as yaku.",
    "itsu": "Itsu is a yaku awarded when you have a full straight from one to nine in a single suit. Worth two han closed, and one han open.\nExample: 1m:<:2m:466437921550106627><:3m:466437922577580052><:1p:466437920908378113><:2p:466437922669985823><:3p:466437922426716161><:4p:466437922401550337><:5p:466437922732769290><:6p:466437922393030657><:7p:466437922980102144><:8p:466437922380316683><:9p:466437922854404106><:7s:466437922632105984><:7s:466437922632105984>",
    "yakuhai": "Yakuhai are the value tiles. The three dragons are always yakuhai, along with the round wind and your seat wind. If you have a triplet of a yakuhai tile, it counts as a yaku, and awards one han per triplet. If you have a triplet of the wind that is both the round wind and your seat wind, you get two han.",
    "dabuton": "Double East. When the dealer has a triplet of <:1z:466437921688518656> during the East round.",
    "chanta": "Chanta is a yaku awarded for having every set in your hand involve a terminal or honor, with at least one run. Worth two han closed, or one han open.\nExample: <:1m:466437920698531841><:2m:466437921550106627><:3m:466437922577580052><:9m:466437922430648330><:9m:466437922430648330><:9m:466437922430648330><:1p:466437920908378113><:1p:466437920908378113><:1s:466437921893908480><:2s:466437921663352842><:3s:466437922258681869><:2z:466437922594226187><:2z:466437922594226187><:2z:466437922594226187>",
    "rinshan": "The rinshan tile is the tile you draw when you declare a kan. If you win on it, you score the rinshan kaihou yaku, and are awarded an extra han.",
    "chankan": "Chankan is a yaku awarded for winning on a tile an opponent added to a triplet to make a kan. Worth one han. On Majsoul, you can chankan on a closed kan if you have a kokushi tenpai.",
    "haitei": "The haitei tile is the last tile in the wall. If you win by drawing it, you score the haitei yaku, and gain a han.",
    "houtei": "Houtei is a yaku awarded for winning on the last possible discard. Grants one han.",
    "ryanpeikou": "Ryanpeikou is a yaku awarded when you have iipeikou twice in the same hand. Worth three han closed, and can't be open. Doesn't stack with iipeikou.\nExample: <:5p:466437922732769290><:5p:466437922732769290><:6p:466437922393030657><:6p:466437922393030657><:7p:466437922980102144><:7p:466437922980102144><:2s:466437921663352842><:2s:466437921663352842><:3s:466437922258681869><:3s:466437922258681869><:4s:466437922527248384><:4s:466437922527248384><:3z:466437922560671744><:3z:466437922560671744>",
    "chinitsu": "Chinitsu is a yaku awarded when all the tiles in your hand are from the same suit. It can be hard to read sometimes. Worth six han closed, and five open.\nExample: <:1s:466437921893908480><:2s:466437921663352842><:3s:466437922258681869><:3s:466437922258681869><:4s:466437922527248384><:5s:466437922258812929><:5s:466437922258812929><:5s:466437922258812929><:6s:466437922586099723><:7s:466437922632105984><:8s:466437922380316673><:9s:466437922850209792><:9s:466437922850209792><:9s:466437922850209792>",
    "nagashi": "Nagashi mangan is a special kind of draw that happens when the games goes to an exhaustive draw while you have only discarded honors and terminals, and nobody has called from you. Counts as scoring a mangan, but not as winning, if that makes sense. The round repeats if the dealer was tenpai.",
    "aman": "Haha, very funny.",
    "chiitoi": "Chiitoitsu is an exceptional yaku granted when your hand consists of seven pairs. Worth two han, and always scores 25 fu. Has to be closed, obviously. Also, the pairs usually can't be duplicated.\nExample: <:1m:466437920698531841><:1m:466437920698531841><:3m:466437922577580052><:3m:466437922577580052><:9m:466437922430648330><:9m:466437922430648330><:2s:466437921663352842><:2s:466437921663352842><:0s:466441485542359042><:5s:466437922258812929><:2z:466437922594226187><:2z:466437922594226187><:7z:466437922279784469><:7z:466437922279784469>",
    "chiitoitsu": "Chiitoitsu is an exceptional yaku granted when your hand consists of seven pairs. Worth two han, and always scores 25 fu. Has to be closed, obviously. Also, the pairs usually can't be duplicated.\nExample: <:1m:466437920698531841><:1m:466437920698531841><:3m:466437922577580052><:3m:466437922577580052><:9m:466437922430648330><:9m:466437922430648330><:2s:466437921663352842><:2s:466437921663352842><:0s:466441485542359042><:5s:466437922258812929><:2z:466437922594226187><:2z:466437922594226187><:7z:466437922279784469><:7z:466437922279784469>",
    "sanshokudokou": "Sanshoku dokou is a yaku awarded for having the same triplet in each suit. Worth two han.\nExample: <:2m:466437921550106627><:3m:466437922577580052><:4m:466437922556608522><:9m:466437922430648330><:9m:466437922430648330><:9m:466437922430648330><:9p:466437922854404106><:9p:466437922854404106><:9p:466437922854404106><:9s:466437922850209792><:9s:466437922850209792><:9s:466437922850209792><:1z:466437921688518656><:1z:466437921688518656>",
    "sanankou": "Sanankou is a yaku awarded for having three concealed triplets (or kans) in your hand. Worth two han. The rest of your hand can be open.\nExample: <:4m:466437922556608522><:5m:466437922401419274><:6m:466437922556739584><:6m:466437922556739584><:6m:466437922556739584><:6m:466437922556739584><:4p:466437922401550337><:4p:466437922401550337><:4p:466437922401550337><:9s:466437922850209792><:9s:466437922850209792><:9s:466437922850209792><:1z:466437921688518656><:1z:466437921688518656>",
    "sankantsu": "Sankantsu is a yaku awarded for having three kans. Worth two han.\nExample: <:2s:466437921663352842><:2s:466437921663352842><:6p:466437922393030657><:7p:466437922980102144><:8p:466437922380316683><:tileBack:466437984216940544><:6m:466437922556739584><:6m:466437922556739584><:tileBack:466437984216940544><:tileBack:466437984216940544><:4p:466437922401550337><:4p:466437922401550337><:tileBack:466437984216940544><:tileBack:466437984216940544><:1z:466437921688518656><:1z:466437921688518656><:tileBack:466437984216940544>",
    "toitoi": "Toitoi is a yaku awarded for having four triplets (or kans) and one pair. Worth two han.\nExample: <:2m:466437921550106627><:2m:466437921550106627><:2m:466437921550106627><:6m:466437922556739584><:6m:466437922556739584><:6m:466437922556739584><:4p:466437922401550337><:4p:466437922401550337><:4p:466437922401550337><:9s:466437922850209792><:9s:466437922850209792><:9s:466437922850209792><:1z:466437921688518656><:1z:466437921688518656>",
    "honitsu": "Honitsu is a yaku awarded for having all your number tiles be from the same suit. Honors are okay, too. Worth three han closed, or two han open.\nExample: <:1p:466437920908378113><:2p:466437922669985823><:3p:466437922426716161><:4p:466437922401550337><:5p:466437922732769290><:6p:466437922393030657><:6p:466437922393030657><:6p:466437922393030657><:7p:466437922980102144><:7p:466437922980102144><:7p:466437922980102144><:6z:466437922317402143><:6z:466437922317402143><:6z:466437922317402143>",
    "shousangen": "Shousangen is a yaku awarded for having two dragon triplets and a pair of the third dragon. Worth four han, or two han plus the two han from the dragon triplets, depending on ruleset. Either way, it scores the same.\nExample: <:3p:466437922426716161><:4p:466437922401550337><:5p:466437922732769290><:5s:466437922258812929><:5s:466437922258812929><:5s:466437922258812929><:5z:466437921550106625><:5z:466437921550106625><:6z:466437922317402143><:6z:466437922317402143><:6z:466437922317402143><:7z:466437922279784469><:7z:466437922279784469><:7z:466437922279784469>",
    "honroutou": "Honroutou is a yaku awarded for having only terminals and honors in your hand. Worth two han.\nExample: <:1m:466437920698531841><:1m:466437920698531841><:1m:466437920698531841><:1p:466437920908378113><:1p:466437920908378113><:1p:466437920908378113><:9s:466437922850209792><:9s:466437922850209792><:9s:466437922850209792><:2z:466437922594226187><:2z:466437922594226187><:2z:466437922594226187><:7z:466437922279784469><:7z:466437922279784469>",
    "junchan": "Junchan is a yaku awarded for every set in your hand include a terminal, with at least one run. Worth three han closed, or two han open.\nExample: <:9m:466437922430648330><:9m:466437922430648330><:9m:466437922430648330><:1p:466437920908378113><:1p:466437920908378113><:1p:466437920908378113><:1p:466437920908378113><:2p:466437922669985823><:3p:466437922426716161><:1s:466437921893908480><:1s:466437921893908480><:7s:466437922632105984><:8s:466437922380316673><:9s:466437922850209792>",
    "kokushi": "Kokushi is an exceptional yakuman awarded for having one of each terminal and honor in your hand, plus one paired. If you have one of each but no pair, it's a double yakuman if you win in some rulesets, such as on Majsoul.\nExample: <:1m:466437920698531841><:9m:466437922430648330><:1p:466437920908378113><:9p:466437922854404106><:1s:466437921893908480><:9s:466437922850209792><:1z:466437921688518656><:2z:466437922594226187><:3z:466437922560671744><:3z:466437922560671744><:4z:466437922518728744><:5z:466437921550106625><:6z:466437922317402143><:7z:466437922279784469>",
    "chuuren": "Chuuren is a yakuman awarded for having 1112345678999 in a single suit, plus one of any other tile in that suit. Must be closed. If you're just waiting for the extra tile, it's a double yakuman on some rulesets, such as Majsoul's.\nExample: <:1p:466437920908378113><:1p:466437920908378113><:1p:466437920908378113><:2p:466437922669985823><:3p:466437922426716161><:4p:466437922401550337><:5p:466437922732769290><:6p:466437922393030657><:6p:466437922393030657><:7p:466437922980102144><:8p:466437922380316683><:9p:466437922854404106><:9p:466437922854404106><:9p:466437922854404106>",
    "tenhou": "Tenhou is a yakuman awarded for winning on your first draw as the dealer. It could also be referring to the online platform named Tenhou. `!platform Tenhou`",
    "chihou": "Chihou is a yakuman awarded for winning on your first draw as a non-dealer. If a call happens before you draw, you can't score this.",
    "renhou": "Renhou is a yaku or yakuman awarded for winning off a discard before you've drawn your first tile. Most rulesets have this being worth a mangan or not counting as a yaku at all. If a call happens before you win, you can't score this.",
    "suuankou": "Suuankou is a yakuman awarded for having four concealed triplets. If you have a shanpon wait, and win by ron, it doesn't count, as that final triplet technically counts as being open, even though your hand is closed. Lots of rules, huh? Here's another: if it's a tanki wait, then it counts as a double yakuman in some rulesets, such as on Majsoul.\nExample: <:2m:466437921550106627><:2m:466437921550106627><:2m:466437921550106627><:5m:466437922401419274><:5m:466437922401419274><:5m:466437922401419274><:4p:466437922401550337><:4p:466437922401550337><:6s:466437922586099723><:6s:466437922586099723><:6s:466437922586099723><:7s:466437922632105984><:7s:466437922632105984><:7s:466437922632105984>",
    "suukantsu": "Suukantsu is a yakuman awarded for having four kans. They can be open. The rarest of all yakuman.\nExample: <:4p:466437922401550337><:4p:466437922401550337><:tileBack:466437984216940544><:2m:466437921550106627><:2m:466437921550106627><:tileBack:466437984216940544><:tileBack:466437984216940544><:5m:466437922401419274><:5m:466437922401419274><:tileBack:466437984216940544><:tileBack:466437984216940544><:6s:466437922586099723><:6s:466437922586099723><:tileBack:466437984216940544><:tileBack:466437984216940544><:7s:466437922632105984><:7s:466437922632105984><:tileBack:466437984216940544>",
    "ryuuiisou": "Ryuuiisou is a yakuman awarded for having a hand that consists only of <:2s:466437921663352842><:3s:466437922258681869><:4s:466437922527248384><:6s:466437922586099723><:8s:466437922380316673><:6z:466437922317402143>, the tiles with green and only green. Some rulesets require the hand to include <:6z:466437922317402143>, but Tenhou and Majsoul do not.\nExample: <:2s:466437921663352842><:2s:466437921663352842><:3s:466437922258681869><:3s:466437922258681869><:4s:466437922527248384><:4s:466437922527248384><:6s:466437922586099723><:6s:466437922586099723><:6s:466437922586099723><:8s:466437922380316673><:8s:466437922380316673><:6z:466437922317402143><:6z:466437922317402143><:6z:466437922317402143>",
    "chinroutou": "Chinroutou is a yakuman awarded for having a hand that consists of only terminals.\nExample: <:1m:466437920698531841><:1m:466437920698531841><:1m:466437920698531841><:9m:466437922430648330><:9m:466437922430648330><:9p:466437922854404106><:9p:466437922854404106><:9p:466437922854404106><:1s:466437921893908480><:1s:466437921893908480><:1s:466437921893908480><:9s:466437922850209792><:9s:466437922850209792><:9s:466437922850209792>",
    "tsuuiisou": "Tsuuiisou is a yakuman awarded for having a hand that consists of only honors.\nExample: <:1z:466437921688518656><:1z:466437921688518656><:1z:466437921688518656><:2z:466437922594226187><:2z:466437922594226187><:2z:466437922594226187><:3z:466437922560671744><:3z:466437922560671744><:3z:466437922560671744><:6z:466437922317402143><:6z:466437922317402143><:6z:466437922317402143><:7z:466437922279784469><:7z:466437922279784469>",
    "daisangen": "Daisangen is a yakuman awarded for having a triplet of every dragon.\nExample: <:4p:466437922401550337><:5p:466437922732769290><:6p:466437922393030657><:3s:466437922258681869><:3s:466437922258681869><:5z:466437921550106625><:5z:466437921550106625><:5z:466437921550106625><:6z:466437922317402143><:6z:466437922317402143><:6z:466437922317402143><:7z:466437922279784469><:7z:466437922279784469><:7z:466437922279784469>",
    "daisuushii": "Daisuushii is a yakuman awarded for having a triplet of every wind. In some rulesets, such as on Majsoul, this is a double yakuman.\nExample: <:6s:466437922586099723><:6s:466437922586099723><:1z:466437921688518656><:1z:466437921688518656><:1z:466437921688518656><:2z:466437922594226187><:2z:466437922594226187><:2z:466437922594226187><:3z:466437922560671744><:3z:466437922560671744><:3z:466437922560671744><:4z:466437922518728744><:4z:466437922518728744><:4z:466437922518728744>",
    "shousuushii": "Shousuushii is a yakuman awarded for having three wind triplets and a pair of the fourth wind.\nExample: <:6p:466437922393030657><:6p:466437922393030657><:6p:466437922393030657><:1z:466437921688518656><:1z:466437921688518656><:1z:466437921688518656><:2z:466437922594226187><:2z:466437922594226187><:2z:466437922594226187><:3z:466437922560671744><:3z:466437922560671744><:4z:466437922518728744><:4z:466437922518728744><:4z:466437922518728744>",
    "mawashi": "Mawashi is an advanced technique involving discarding fairly safe tiles while still trying to win the hand.",
    "betaori": "Betaori is when you're only focused on cutting the safest tiles possible, with no regard for winning the hand.",
    "zentsu": "Zentsu is when you're pushing every tile with no regard for how dangerous it is.",
    "oya": "The oya is the dealer.",
    "noten": "Not tenpai.",
    "yamagoshi": "Yamagoshi is when you pass up a win from one player in order to ron on a different player, or tsumo.",
    "tonpu": "Tonpu is the Japanese word for East-only games.",
    "hanchan": "A hanchan is one standard game, with both an East and South round.",
    "sanma": "Sanma is the three-player variant of Riichi Mahjong.",
    "pao": "Sekinin barai, or pao, is a rule where the player who makes a yakuman apparent is responsible for that yakuman. For example, if player A has pons of two dragons, and player B discards the third, and that gets ponned as well, player B is responsible for the daisangen. If player A then tsumos, player B has to pay it all themself, as if they had dealt in. If player A rons a different player, that player and player B split the payment. If multiple yakuman are scored (eg daisangen + tsuuiisou), player B only has to pay for the daisangen, and the other yakuman are paid for as normal. Pao usually only applies for daisangen and daisuushii, though it can sometimes apply for suukantsu and even rinshan kaihou.",
    "sekinin": "Sekinin barai, or pao, is a rule where the player who makes a yakuman apparent is responsible for that yakuman. For example, if player A has pons of two dragons, and player B discards the third, and that gets ponned as well, player B is responsible for the daisangen. If player A then tsumos, player B has to pay it all themself, as if they had dealt in. If player A rons a different player, that player and player B split the payment. If multiple yakuman are scored (eg daisangen + tsuuiisou), player B only has to pay for the daisangen, and the other yakuman are paid for as normal. Pao usually only applies for daisangen and daisuushii, though it can sometimes apply for suukantsu and even rinshan kaihou.",
    "kuikae": "Kuikae in English is usually translated as swap calling. For example, calling chii on a <:2s:466437921663352842> with <:3s:466437922258681869><:4s:466437922527248384><:5s:466437922258812929> in your hand. With this rule, you are not allowed to discard <:5s:466437922258812929>. An easy way to remember it is that you can't discard a tile that would have completed the set you just called. Often, you also cannot cut the same tile that you called. This rule prevents people from avoiding drawing unsafe tiles, and makes yaku like sanshoku or itsu a bit harder.",
    "houou": "Houou is the top room of Tenhou, where the best players play. It's around the top 1% of Tenhou players. To play in this room, you need to be 7dan or above with over 2000R.",
    "tokujou": "Tokujou is the second highest room of Tenhou. Players at this level usually have very solid efficiency and defense. To play in this room, you need to be 4dan or above with over 1800R.",
    "joukyuu": "Joukyuu is the second room on Tenhou. Most Tenhou players are at this level. To play in this room, you need to be 1kyu or above, or pay for a few months of premium.",
    "ippan": "Ippan is the first room on Tenhou.",
    "agari": "Agari means win. Your agari rate is your win rate, in other words, the number of hands you've won divided by the number of hands you've played.",
    "rentai": "Rentai is the percentage of times you come in either first or second.",
    "tobi": "Tobi means bankruptcy. Your tobi rate is the percentage of games you've ended at below zero points.",
    "keishiki": "*sigh* Keishiki tenpai is when you're tenpai, but you cannot win, due to having no yaku. This is usually done to acquire tenpai payments at the end of the game.",
    "keiten": "Keiten is short for keishiki tenpai, a tenpai hand without the ability to win.",
    "kabe": "A kabe, or a wall, is when you can see all four of a tile. This can be used in defense. If you can see all four <:7p:466437922980102144>, you know they don't have a <:7p:466437922980102144><:8p:466437922380316683> shape, and thus, a <:9p:466437922854404106> could only deal into a tanki or shanpon wait, making it safer.",
    "genbutsu": "A tile that is genbutsu is 100% safe. The most obvious example is the tile your kamicha just discarded, as everyone is furiten on that during your turn.",
    "shimocha": "Your shimocha is the player to your right.",
    "kamicha": "Your kamicha is the player to your left.",
    "toimen": "Your toimen is the player across from you.",
    "0": "When 0 appears in a hand, it means a red five. 0m is <:0m:466442879880134657>, 0s is <:0s:466441485542359042>, and 0p is <:0p:466442879930466316>.",
    "ryankan": "A ryankan shape is two (ryan) kanchans stuck together, like <:4s:466437922527248384><:6s:466437922586099723><:8s:466437922380316673>. This shape accepts eight tiles, same as a ryanmen, but takes up three tiles in the hand instead of two. It's pretty strong, and is usually kept around until all the other blocks in the hand are better.",
    "blocks": "A block in a hand is either a completed set, or a potential set. You usually want five, as a hand needs four sets and a pair to be complete. Check `!link block` for an introduction to five block theory.",
    "karagiri": "Karagiri is when you cut a tile from your hand that you just drew. This can add a bit of mindgames if players are watching where you discard from, but low level players usually won't be doing that.",
    "dama": "Dama is when you're tenpai, and fully closed, but don't call riichi. This increases your winrate, as people won't know to fold, but can decrease your value. See `!link dama` for some guidelines.",
    "damaten": "Dama is when you're tenpai, and fully closed, but don't call riichi. This increases your winrate, as people won't know to fold, but can decrease your value. See `!link dama` for some guidelines.",
    "takame": "When your hand has multiple outs that give different values, like a <:7p:466437922980102144><:8p:466437922380316683> shape getting tanyao on <:6p:466437922393030657> but not <:9p:466437922854404106>, the takame is the most valuable out.",
    "yasume": "When your hand has multiple outs that give different values, like a <:7p:466437922980102144><:8p:466437922380316683> shape getting tanyao on <:6p:466437922393030657> but not <:9p:466437922854404106>, the yasume is the least valuable out.",
    "sashikomi": "Sashikomi is when you intentionally try to deal into an opponent. For example, if it's South 4, and you're ahead by 25k points, you might want to deal into 3rd's riichi to end the game before 2nd can catch up with dealer repeats.",
    "ankan": "An ankan is a closed kan.",
    "kannya": "Kannya is what you say when you declare a kan and are also a cat.",
    "ryuukyoku": "Ryuukyoku is an exhaustive draw. When all the tiles are drawn from the wall, and nobody has won.",
    "kyuushuu": "Kyuushuu kyuuhai is an abortive draw that a player can opt to call if their starting hand has nine or more unique terminals and honors. It must be weighed against the chance of going for kokushi, but kyuushuu is usually the better option if you have less than 11.",
    "aotenjou": "Aotenjou, or skyrocketing, is a ruleset wherein scores are not capped with things like mangan or yakuman. The scores get extremely high, and it's basically never played outside of manga or Touhou games.",
    "wareme": "Wareme is a special rule where the player who has their section of the wall broken has to pay double, the same as the dealer does. This stacks with the dealer's doubled payment. One of the Yakuza games uses this, I think, but it's mostly only a gambling rule.",
    "manzu": "Manzu is the characters suit. You might see tiles written as 1-man <:1m:466437920698531841>.",
    "souzu": "Souzu is the bamboo suit. You might see tiles written as 1-sou <:1s:466437921893908480>.",
    "pinzu": "Pinzu is the circles or dots suit. You might see tiles written as 1-pin <:1p:466437920908378113>.",
    "honba": "Honba are sticks added to the pot after an exhaustive draw or a dealer win. Each one increases the value of a won hand by 300.",
    "efficiency": "Efficiency means focusing on winning the hand as fast as possible, instead of aiming for value. Ukeire, shanten, and upgrades are tools for measuring efficiency, but the hand's shape matters a lot too.",
    "hms": "Hittori Mahjong Simulator is a tool for checking the expected value and speed of a hand, in a tsumo-only environment. Check `!link hms` for more info.",
    "mentsu": "A mentsu is a completed shape in a hand.",
    "toitsu": "A toitsu is a pair.",
    "koutsu": "A koutsu is a triplet.",
    "shuntsu": "A shuntsu is a run.",
    "jantou": "A jantou is a pair, specifically the one you need to complete your hand.",
    "jansou": "A jansou is a Mahjong parlour, where people usually play for money.",
    "shuugi": "A shuugi is a payment that happens between players at a parlour. Generally, each aka dora or ura dora will be a shuugi, but different parlours will have more or less ways to obtain them. When a player tsumos, everyone pays for the shuugi (for example, 500 yen each), while if the player rons, only the ronned player pays (only 500 yen).",
    "love": "I'll hurt you.",
    "<:pyong:274070288474439681>": "A fox-like creature used as Kyuu's avatar. Often used to denote that a statement is intentionally silly. <:pyong:274070288474439681>",
    "<:baka:368258220164251649>": "In the manual for the Touhou game Phantasmagoria of Flower View, the character Cirno is labeled with <:baka:368258220164251649>, and in the notes, it says '<:baka:368258220164251649>: Idiot'. I don't want to make any implications about why people are using it, but you can connect the dots.",
    "doratanki": "A tanki wait on a dora tile.",
    "kuisagari": "Kuisagari is the property of some yaku wherein they lose a han if you score them while open. For example, sanshoku doujun and chanta.",
    "fu": "Fu are minipoints. Your hand gains them for various things, and starts with 20 fu. A triplet gives you 2, times two if it's closed, and times two if it's a terminal or honor, and times four if it's a quad. So, <:tileBack:466437984216940544><:6z:466437922317402143><:6z:466437922317402143><:tileBack:466437984216940544> would give you 32 fu. Additionally, you get two fu if you have a single wait (a tanki, kanchan, or penchan). You also get two fu if your pair is yakuhai, or four fu if it's a double wind. Finally, you get 2 fu if you tsumo, and 10 fu if you win by ron with a closed hand. This is rounded up to the nearest 10, so a 32 fu hand would become a 40 fu hand. The exception to all this is chiitoitsu, which is always 25 fu. Also, if you score pinfu and tsumo, you only get 20 fu. Also also, if a hand scores 20 fu but is open, it goes up to 30 fu due to the open pinfu rule. Phew. Ask something simpler next time.",
    "akagi": "Akagi is a manga/anime/drama about a genius Mahjong player. The anime focuses heavily on the mindgames between players, and the climactic match is played with 3/4 of the tiles being transparent to assist with this theme.",
    "saki": "Saki is a manga/anime about high school girls playing in a Mahjong tournament. It has more of a superpower feel, with each character having unique abilities that influence the game, such as the protagonist, Saki, being able to score rinshan kaihou almost at will.",
    "tetsuya": "Tetsuya is a manga/anime mainly focused on cheating tactics in Mahjong. From wall stacking to teamplay to marked tiles, various characters have different ways of cheating at the game, and they have to try to work around each others' cheats.",
    "tohai": "Tohai is a manga/live action series about a young boy playing Mahjong. The theme is fairly dark, with much of the Mahjong taking place for and around illegal activities.",
    "kirinji": "Tetsunaki no Kirinji is a manga about a high ranked Tenhou player playing in various Mahjong parlours to make a living. The Mahjong in this manga is usually pretty solid, so if you really need to learn Mahjong from a translated manga, this might be your best bet.",
    "koizumi": "Koizumi is a ridiculous Mahjong manga about world leaders playing Mahjong with insane luck. If you want to see the Pope, George Bush, and Putin playing Mahjong, you're in luck.",
    "ten": "Ten could refer to the points in a Mahjong game, or it could be the manga Ten - The Nice Guy on the Path of Tenhou. The manga takes place in the same universe as Akagi, set in the future by a few decades. It has a similar theme as Akagi, but with more cheating.",
    "tenbo": "Tenbo are the point sticks.",
    "uma": "The uma is the point spread. At the end of the game, each player has their score increased or decreased by some amount. For example, on Tenhou, it's +20/+10/-10/-20, which means first place gets an extra 20k points, second gets an extra 10k points, and so on.",
    "oka": "The oka is the difference between the starting score and the target score. On Tenhou, the starting score is 25k, and the target score is 30k. The total difference is 20k (5k per player), and this is granted to first place at the end of the game if oka is used.",
    "yakitori": "Yakitori is a grilled chicken skewer. In Mahjong, it's used to describe a game in which the player never won a hand.",
    "washizu": "Washizu Mahjong is a variant from the manga/anime Akagi. It uses normal Riichi rules, but 3/4 of the tiles are transparent, and tiles are drawn from a bag instead of a wall. It's often played as a 2v2 game.",
    "kuinobashi": "Kuinobashi is when you call a tile to turn a kanchan into a ryanmen. For example, with a 23457 shape, you can call 1 or 4 and discard 7 to end up with a 45 ryanmen. When someone calls, then discards a suji of the called tile, this could be likely.",
    "sakigiri": "Sakigiri is when you cut a tile earlier than efficiency would normally dictate. For example, you might cut a 7 from a 677 shape early on to hide your matagi suji or because you expect the 7 to be dangerous later.",
    "matagi": "Matagi suji refers to tiles within two steps of a tile. It arises from shapes like 677. It's a strong shape, so you'd keep it for later, then when you call riichi, discard the 7 for a 5-8 wait. If it was 778, your wait would be 6-9. So, 5689 are matagi suji. This usually applies to the riichi tile and the last tedashi of an efficient player.",
    "sotogawa": "Sotogawa refers to tiles outside of those discarded early by a player. For example, if they discarded a 3s early on, they likely aren't waiting on 12s. This is because a 233s or 334s shape is pretty strong and would likely be kept.",
    "oikake": "An oikake riichi is a chasing riichi, in other words, one declared after another player has already declared riichi.",
    "zawa": "Zawa is an onomatopoeia in Japanese for getting a chill, often used in Mahjong manga during a tense situation.",
    "pocchi": "Haku pocchi is a special haku that, when drawn while in riichi, counts as a wildcard. Usually only seen in jansou environments."
};

const aliases = {
    "kyuushu": "kyuushuu",
    "block": "blocks",
    "kan-nya": "kannya",
    "damaten": "dama",
    "ittsu": "itsu",
    "ittsuu": "itsu",
    "dokou": "sanshokudokou",
    "hittori": "hms"
}