/*  +++Official frediezra tech info base vision 3.0.0 npm +++ */
// Facebook @frediezra
// Instagram @FrediEzra
// Threads @FrediEzra
// X (tweeter) @FrediEzra
// LinkedIn @FrediEzra
// YouTube @freeonlinetvT1
// github @Fred1e, @mr-X-force, @devfreetec
// WhatsApp @255752593977
// telegram t.me/FrediEzraTechInfo 
// WhatsApp channel 
// Website fredietech-website.vercel.com
// Enjoy Movies update fredi-movies-library.vercel.app
// WE AVAILABLE ALL TIME TO RECEIVE YOU REQUEST FOR ANY DEV OR UPCOMING DEV IN WHATSAPP BOTS
// **bot start npm read fredi.server.com root @Lucky-md-xforce : "^3.0.0" ***//
// prepare everything pass lucky
// frediete loaded updates 
// bot name is VIPER MD


"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
//import chalk from 'chalk'
const { verifierEtatJid, recupererActionJid } = require("./lib/antilien");
const { atbverifierEtatJid, atbrecupererActionJid } = require("./lib/antibot");
let evt = require(__dirname + "/fredi/ezra");
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("./lib/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("./lib/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("./lib/onlyAdmin");
//const //{loadCmd}=require("/fredi/mesfonctions")
let { reagir } = require(__dirname + "/fredi/app");
var session = conf.session.replace(/LUCKY-XFORCE%>/g, "");
const prefixe = conf.PREFIXE;
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const BaseUrl = process.env.GITHUB_GIT;
const ezraapikey = process.env.BOT_OWNER;

async function authentification() {
    try {
        //console.log("le data "+data)
        if (!fs.existsSync(__dirname + "/scan/creds.json")) {
            console.log("connexion en cour ...");
            await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
            //console.log(session)
        }
        else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
            await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
        }
    }
    catch (e) {
        console.log("Session Invalid " + e);
        return;
    }
}
authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});
setTimeout(() => {
    authentification();
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/scan");
        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['Lucky-Xforce', "safari", "1.0.0"],
            printQRInTerminal: true,
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: false,
            keepAliveIntervalMs: 30_000,
            /* auth: state*/ auth: {
                creds: state.creds,
                /** caching makes the store faster to send/recv messages */
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            //////////
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                    return msg.message || undefined;
                }
                return {
                    conversation: 'An Error Occurred, Repeat Command!'
                };
            }
        };


        const zk = (0, baileys_1.default)(sockOptions);
        store.bind(zk.ev);


        // Function to get the current date and time in Tanzania
        function getCurrentDateTime() {
            const options = {
                timeZone: 'Africa/Nairobi', // Tanzania time zone
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            };
            const dateTime = new Intl.DateTimeFormat('en-KE', options).format(new Date());
            return dateTime;
        }

        const emojiMap = {
            "what": ["❓", "🤷‍♂️", "🤷‍♀️", "😕", "😲"],
            "where": ["❓", "🌍", "🗺️", "🏙️", "🌎"],

            // Social Interactions
            "party": ["🎉", "🥳", "🍾", "🍻", "🎤", "💃", "🕺"],
            "fun": ["🤣", "😂", "🥳", "🎉", "🎮", "🎲"],
            "hangout": ["🍕", "🍔", "🍻", "🎮", "🍿", "😆"],

            // Positive Words
            "good": ["👍", "👌", "😊", "💯", "🌟"],
            "awesome": ["🔥", "🚀", "🤩", "👏", "💥"],
            "cool": ["😎", "👌", "🎮", "🎸", "💥"],

            // Negative Words
            "boring": ["😴", "🥱", "🙄", "😑", "🤐"],
            "tired": ["😴", "🥱", "😌", "💤", "🛌"],

            // Random / Fun Words
            "bot": ["🤖", "💻", "⚙️", "🧠", "🔧"],
            "robot": ["🤖", "⚙️", "💻", "🔋", "🤓"],
            "cool bot": ["🤖", "😎", "🤘", "💥", "🎮"],

            // Miscellaneous
            "love you": ["❤️", "💖", "😘", "💋", "💑"],
            "thank you bot": ["🙏", "🤖", "😊", "💖", "💐"],
            "good night bot": ["🌙", "🌛", "⭐", "💤", "😴"],

            // Words Based on Emotions
            "laughter": ["😂", "🤣", "😆", "😄", "🤪"],
            "crying": ["😢", "😭", "😿", "😓", "💔"],

            // Names & Nicknames
            "john": ["👑", "🔥", "💥", "😎", "💯"],
            "mike": ["💪", "🏆", "🔥", "💥", "🚀"],
            "lisa": ["💖", "👑", "🌸", "😍", "🌺"],
            "emily": ["💖", "💃", "👑", "🎉", "🎀"],

            "happy": ["😁", "😄", "😊", "🙌", "🎉", "🥳", "💃", "🕺", "🔥"],
            "excited": ["🤩", "🎉", "🥳", "🎊", "😆", "🤗", "💥", "🚀"],
            "love": ["❤️", "💖", "💘", "💝", "😍", "😘", "💍", "💑", "🌹"],
            "grateful": ["🙏", "💐", "🥰", "❤️", "😊"],
            "thankful": ["🙏", "💖", "💐", "🤗", "😇"],

            // Negative emotions
            "sad": ["😢", "😭", "😞", "💔", "😔", "😓", "😖"],
            "angry": ["😡", "😠", "🤬", "💢", "👊", "💥", "⚡"],
            "frustrated": ["😤", "😩", "🤯", "😑", "🌀"],
            "bored": ["😴", "🥱", "🙄", "😑", "😒"],

            // Expressions of surprise
            "surprised": ["😲", "😳", "😮", "😯", "😲", "🙀"],
            "shocked": ["😱", "😳", "😯", "💥", "🤯"],
            "wow": ["😲", "😱", "🤩", "🤯", "💥", "🚀"],

            // Emotions of sadness or loss
            "crying": ["😭", "😢", "💔", "😞", "😓"],
            "miss you": ["😭", "💔", "😔", "😢", "❤️"],
            "lonely": ["😔", "😭", "😢", "💔", "🙁"],

            // Asking for help
            "help": ["🆘", "❓", "🤔", "🙋‍♂️", "🙋‍♀️", "💡"],
            "need assistance": ["🆘", "💁‍♂️", "💁‍♀️", "❓", "🙏"],

            // Apologies
            "sorry": ["😔", "🙏", "💔", "😓", "🥺", "🙇‍♂️", "🙇‍♀️"],
            "apology": ["😔", "😞", "🙏", "💔", "🙇‍♂️", "🙇‍♀️"],

            // Motivation and encouragement
            "good job": ["👏", "💯", "🎉", "🌟", "👍", "👏"],
            "well done": ["👏", "🎉", "🎖️", "💪", "🔥", "🏆"],
            "you can do it": ["💪", "🔥", "💯", "🚀", "🌟"],

            // Celebrations
            "congratulations": ["🎉", "🏆", "🎊", "🎁", "👏", "🍾"],
            "cheers": ["🥂", "🍻", "🍾", "🍷", "🥳", "🎉"],

            // Casual goodbyes
            "goodbye": ["👋", "😢", "💔", "👋🏻", "🚶‍♂️", "🚶‍♀️"],
            "bye": ["👋", "👋🏻", "🥲", "🚶‍♂️", "🚶‍♀️"],
            "see you": ["👋", "👋🏻", "🤗", "✌️", "🙋‍♂️", "🙋‍♀️"],

            // Greetings and hellos
            "hello": ["👋", "🙂", "😊", "🙋‍♂️", "🙋‍♀️"],
            "hi": ["👋", "🙂", "😁", "🙋‍♂️", "🙋‍♀️"],

            // Fun and games
            "party": ["🎉", "🥳", "🎤", "💃", "🕺", "🍻", "🎶"],
            "fun": ["🎮", "🎲", "🤣", "🎉", "🃏"],
            "play": ["🎮", "🏀", "⚽", "🎾", "🎱", "🎲", "🏆"],

            // Daily life
            "work": ["💻", "🖥️", "💼", "📅", "📝"],
            "school": ["📚", "🏫", "🎒", "👨‍🏫", "👩‍🏫"],
            "study": ["📖", "📝", "💡", "📚", "🎓"],

            // Seasons & Nature
            "summer": ["🌞", "🏖️", "🌴", "🍉", "🌻"],
            "winter": ["❄️", "☃️", "🎿", "🔥", "⛄"],
            "autumn": ["🍁", "🍂", "🎃", "🍂", "🍁"],
            "spring": ["🌸", "🌼", "🌷", "🌱", "🌺"],

            // Special Days
            "birthday": ["🎂", "🎉", "🎁", "🎈", "🎊"],
            "anniversary": ["💍", "🎉", "🎁", "🎈", "💑"],

            // Miscellaneous
            "robot": ["🤖", "⚙️", "🔧", "🤖", "🧠"],
            "bot": ["🤖", "🧠", "⚙️", "💻", "🖥️"],
            "thanks": ["🙏", "💖", "😊", "❤️", "💐"],
            "good luck": ["🍀", "🍀", "💯", "🍀", "🎯"],

            // Greetings by names
            "john": ["👑", "🔥", "💥", "😎", "💯"],
            "mike": ["💪", "🏆", "🔥", "💥", "🚀"],
            "lisa": ["💖", "👑", "🌸", "😍", "🌺"],
            "emily": ["💖", "💃", "👑", "🎉", "🎀"],

            // Others
            "food": ["🍕", "🍔", "🍟", "🍲", "🍣", "🍩"],
            "drink": ["🍺", "🍷", "🥂", "🍾", "🥤"],
            "coffee": ["☕", "🥤", "🍵", "🥶"],
            "tea": ["🍵", "🫖", "🍂", "🍃"],


            // Emotions and Moods
            "excited": ["🤩", "🎉", "🥳", "💥", "🚀", "😆", "😜"],
            "nervous": ["😬", "😰", "🤞", "🧠", "👐"],
            "confused": ["🤔", "😕", "🧐", "😵", "🤷‍♂️", "🤷‍♀️"],
            "embarrassed": ["😳", "😳", "🙈", "😳", "😬", "😅"],
            "hopeful": ["🤞", "🌠", "🙏", "🌈", "💫"],
            "shy": ["😊", "😳", "🙈", "🫣", "🫶"],

            // People and Relationships
            "family": ["👨‍👩‍👧‍👦", "👩‍👧", "👩‍👧‍👦", "👨‍👩‍👧", "💏", "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦"],
            "friends": ["👯‍♂️", "👯‍♀️", "🤗", "🫶", "💫", "🤝"],
            "relationship": ["💑", "❤️", "💍", "🥰", "💏", "💌"],
            "couple": ["👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", "💍", "💑", "💏"],
            "best friend": ["🤗", "💖", "👯‍♀️", "👯‍♂️", "🙌"],
            "love you": ["❤️", "😘", "💖", "💘", "💓", "💗"],

            // Travel and Adventure
            "vacation": ["🏖️", "🌴", "✈️", "🌊", "🛳️", "🏞️", "🏕️"],
            "beach": ["🏖️", "🌊", "🏄‍♀️", "🩴", "🏖️", "🌴", "🦀"],
            "road trip": ["🚗", "🚙", "🛣️", "🌄", "🌟"],
            "mountain": ["🏞️", "⛰️", "🏔️", "🌄", "🏕️", "🌲"],
            "city": ["🏙️", "🌆", "🗽", "🌇", "🚖", "🏙️"],
            "exploration": ["🌍", "🧭", "🌎", "🌍", "🧳", "📍", "⛵"],

            // Time and Date
            "morning": ["🌅", "☀️", "🌞", "🌄", "🌻", "🕶️"],
            "afternoon": ["🌞", "🌤️", "⛅", "🌻", "🌇"],
            "night": ["🌙", "🌛", "🌜", "⭐", "🌚", "💫"],
            "evening": ["🌙", "🌛", "🌇", "🌓", "💫"],
            "goodnight": ["🌙", "😴", "💤", "🌜", "🛌", "🌛", "✨"],

            // Work and Productivity
            "productivity": ["💻", "📊", "📝", "💼", "📅", "📈"],
            "office": ["🖥️", "💼", "🗂️", "📅", "🖋️"],
            "workout": ["🏋️‍♀️", "💪", "🏃‍♂️", "🏃‍♀️", "🤸‍♀️", "🚴‍♀️", "🏋️‍♂️"],
            "study hard": ["📚", "📝", "📖", "💡", "💼"],
            "focus": ["🔍", "🎯", "💻", "🧠", "🤓"],

            // Food and Drinks
            "food": ["🍕", "🍔", "🍟", "🍖", "🍖", "🥗", "🍣", "🍲"],
            "drink": ["🍹", "🥤", "🍷", "🍾", "🍸", "🍺", "🥂", "☕"],
            "coffee": ["☕", "🧃", "🍵", "🥤", "🍫"],
            "cake": ["🍰", "🎂", "🍩", "🍪", "🍫", "🧁"],
            "ice cream": ["🍦", "🍧", "🍨", "🍪"],

            // Animals
            "cat": ["🐱", "😺", "🐈", "🐾"],
            "dog": ["🐶", "🐕", "🐩", "🐕‍🦺", "🐾"],
            "bird": ["🐦", "🦉", "🦅", "🐦"],
            "fish": ["🐟", "🐠", "🐡", "🐡", "🐙"],
            "rabbit": ["🐰", "🐇", "🐹", "🐾"],
            "lion": ["🦁", "🐯", "🐅", "🐆"],
            "bear": ["🐻", "🐨", "🐼", "🐻‍❄️"],
            "elephant": ["🐘", "🐘"],

            // Nature and Outdoors
            "sun": ["☀️", "🌞", "🌄", "🌅", "🌞"],
            "rain": ["🌧️", "☔", "🌈", "🌦️", "🌧️"],
            "snow": ["❄️", "⛄", "🌨️", "🌬️", "❄️"],
            "wind": ["💨", "🌬️", "🌪️", "🌬️"],
            "earth": ["🌍", "🌏", "🌎", "🌍", "🌱", "🌳"],

            // Technology
            "phone": ["📱", "☎️", "📞", "📲", "📡"],
            "computer": ["💻", "🖥️", "⌨️", "🖱️", "🖥️"],
            "internet": ["🌐", "💻", "📶", "📡", "🔌"],
            "software": ["💻", "🖥️", "🧑‍💻", "🖱️", "💡"],

            // Miscellaneous
            "star": ["⭐", "🌟", "✨", "🌠", "💫"],
            "light": ["💡", "🔦", "✨", "🌟", "🔆"],
            "money": ["💵", "💰", "💸", "💳", "💶"],
            "victory": ["✌️", "🏆", "🎉", "🎖️", "🎊"],
            "gift": ["🎁", "🎀", "🎉", "🎁"],
            "fire": ["🔥", "💥", "🌋", "🔥", "💣"],

            // Hobbies and Interests
            "music": ["🎵", "🎶", "🎧", "🎤", "🎸", "🎹"],
            "sports": ["⚽", "🏀", "🏈", "🎾", "🏋️‍♂️", "🏃‍♀️", "🏆", "🥇"],
            "games": ["🎮", "🕹️", "🎲", "🎯", "🧩"],
            "art": ["🎨", "🖌️", "🖼️", "🎭", "🖍️"],
            "photography": ["📷", "📸", "📸", "🖼️", "🎥"],
            "reading": ["📚", "📖", "📚", "📰"],
            "craft": ["🧵", "🪡", "✂️", "🪢", "🧶"],

            "hello": ["👋", "🙂", "😊"],
            "hey": ["👋", "🙂", "😊"],
            "hi": ["👋", "🙂", "😊"],
            "bye": ["👋", "😢", "👋"],
            "goodbye": ["👋", "😢", "🙋‍♂️"],
            "thanks": ["🙏", "😊", "🌹"],
            "thank you": ["🙏", "😊", "🌸"],
            "welcome": ["😊", "😄", "🌷"],
            "congrats": ["🎉", "👏", "🥳"],
            "congratulations": ["🎉", "👏", "🥳"],
            "good job": ["👏", "👍", "🙌"],
            "great": ["👍", "💪", "😄"],
            "cool": ["😎", "🤙", "🔥"],
            "ok": ["👌", "👍", "✅"],

            // Emotions
            "love": ["❤️", "💕", "💖"],
            "like": ["👍", "❤️", "👌"],
            "happy": ["😊", "😁", "🙂"],
            "joy": ["😁", "😆", "😂"],
            "laugh": ["😂", "🤣", "😁"],
            "sad": ["😢", "😭", "☹️"],
            "cry": ["😭", "😢", "😿"],
            "angry": ["😡", "😠", "💢"],
            "mad": ["😠", "😡", "😤"],
            "shocked": ["😲", "😱", "😮"],
            "scared": ["😱", "😨", "😧"],
            "sleep": ["😴", "💤", "😌"],
            "bored": ["😐", "😑", "🙄"],
            "excited": ["🤩", "🥳", "🎉"],
            "party": ["🥳", "🎉", "🍾"],
            "kiss": ["😘", "💋", "😍"],
            "hug": ["🤗", "❤️", "💕"],
            "peace": ["✌️", "🕊️", "✌️"],

            // Food and Drinks (and so on for other categories)
            "pizza": ["🍕", "🥖", "🍟"],
            "coffee": ["☕", "🥤", "🍵"],
            "water": ["💧", "💦", "🌊"],
            "wine": ["🍷", "🍸", "🍾"],
            // Utility function for delay

            // Greetings and Social Expressions
            "hello": ["👋", "🙂", "😊", "😃", "😄"],
            "hey": ["👋", "😊", "🙋", "😄", "😁"],
            "hi": ["👋", "😀", "😁", "😃", "🙂"],
            "bye": ["👋", "😢", "🙋‍♂️", "😞", "😔"],
            "goodbye": ["👋", "😢", "🙋‍♀️", "😔", "😭"],
            "thanks": ["🙏", "😊", "🌹", "🤲", "🤗"],
            "thank you": ["🙏", "💐", "🤲", "🥰", "😌"],
            "welcome": ["😊", "😄", "🌸", "🙂", "💖"],
            "congrats": ["🎉", "👏", "🥳", "💐", "🎊"],
            "congratulations": ["🎉", "👏", "🥳", "🎊", "🍾"],
            "good job": ["👏", "👍", "🙌", "💪", "🤩"],
            "great": ["👍", "💪", "😄", "🔥", "✨"],
            "cool": ["😎", "🤙", "🔥", "👌", "🆒"],
            "ok": ["👌", "👍", "✅", "😌", "🤞"],

            // Emotions
            "love": ["❤️", "💕", "💖", "💗", "😍"],
            "like": ["👍", "❤️", "👌", "😌", "💓"],
            "happy": ["😊", "😁", "🙂", "😃", "😄"],
            "joy": ["😁", "😆", "😂", "😊", "🤗"],
            "laugh": ["😂", "🤣", "😁", "😹", "😄"],
            "sad": ["😢", "😭", "☹️", "😞", "😔"],
            "cry": ["😭", "😢", "😿", "💧", "😩"],
            "angry": ["😡", "😠", "💢", "😤", "🤬"],
            "mad": ["😠", "😡", "😤", "💢", "😒"],
            "shocked": ["😲", "😱", "😮", "😯", "😧"],
            "scared": ["😱", "😨", "😧", "😰", "😳"],
            "sleep": ["😴", "💤", "😌", "😪", "🛌"],
            "bored": ["😐", "😑", "🙄", "😒", "🤦"],
            "excited": ["🤩", "🥳", "🎉", "😄", "✨"],
            "party": ["🥳", "🎉", "🎊", "🍾", "🎈"],
            "kiss": ["😘", "💋", "😍", "💖", "💏"],
            "hug": ["🤗", "❤️", "💕", "💞", "😊"],
            "peace": ["✌️", "🕊️", "🤞", "💫", "☮️"],

            // Food and Drinks
            "pizza": ["🍕", "🥖", "🍟", "🍔", "🍝"],
            "burger": ["🍔", "🍟", "🥓", "🥪", "🌭"],
            "fries": ["🍟", "🍔", "🥤", "🍿", "🧂"],
            "coffee": ["☕", "🥤", "🍵", "🫖", "🥄"],
            "tea": ["🍵", "☕", "🫖", "🥄", "🍪"],
            "cake": ["🍰", "🎂", "🧁", "🍩", "🍫"],
            "donut": ["🍩", "🍪", "🍰", "🧁", "🍫"],
            "ice cream": ["🍦", "🍨", "🍧", "🍧", "🍫"],
            "cookie": ["🍪", "🍩", "🍰", "🧁", "🍫"],
            "chocolate": ["🍫", "🍬", "🍰", "🍦", "🍭"],
            "popcorn": ["🍿", "🥤", "🍫", "🎬", "🍩"],
            "soda": ["🥤", "🍾", "🍹", "🍷", "🍸"],
            "water": ["💧", "💦", "🌊", "🚰", "🥤"],
            "wine": ["🍷", "🍾", "🥂", "🍹", "🍸"],
            "beer": ["🍺", "🍻", "🥂", "🍹", "🍾"],
            "cheers": ["🥂", "🍻", "🍾", "🎉", "🎊"],

            // Nature and Weather
            "sun": ["🌞", "☀️", "🌅", "🌄", "🌻"],
            "moon": ["🌜", "🌙", "🌚", "🌝", "🌛"],
            "star": ["🌟", "⭐", "✨", "💫", "🌠"],
            "cloud": ["☁️", "🌥️", "🌤️", "⛅", "🌧️"],
            "rain": ["🌧️", "☔", "💧", "💦", "🌂"],
            "thunder": ["⚡", "⛈️", "🌩️", "🌪️", "⚠️"],
            "fire": ["🔥", "⚡", "🌋", "🔥", "💥"],
            "flower": ["🌸", "🌺", "🌷", "💐", "🌹"],
            "tree": ["🌳", "🌲", "🌴", "🎄", "🌱"],
            "leaves": ["🍃", "🍂", "🍁", "🌿", "🌾"],
            "snow": ["❄️", "⛄", "🌨️", "🌬️", "☃️"],
            "wind": ["💨", "🌬️", "🍃", "⛅", "🌪️"],
            "rainbow": ["🌈", "🌤️", "☀️", "✨", "💧"],
            "ocean": ["🌊", "💦", "🚤", "⛵", "🏄‍♂️"],

            // Animals
            "dog": ["🐶", "🐕", "🐾", "🐩", "🦮"],
            "cat": ["🐱", "😺", "😸", "🐾", "🦁"],
            "lion": ["🦁", "🐯", "🐱", "🐾", "🐅"],
            "tiger": ["🐯", "🐅", "🦁", "🐆", "🐾"],
            "bear": ["🐻", "🐨", "🐼", "🧸", "🐾"],
            "rabbit": ["🐰", "🐇", "🐾", "🐹", "🐭"],
            "panda": ["🐼", "🐻", "🐾", "🐨", "🍃"],
            "monkey": ["🐒", "🐵", "🙊", "🙉", "🙈"],
            "fox": ["🦊", "🐺", "🐾", "🐶", "🦮"],
            "bird": ["🐦", "🐧", "🦅", "🦢", "🦜"],
            "fish": ["🐟", "🐠", "🐡", "🐬", "🐳"],
            "whale": ["🐋", "🐳", "🌊", "🐟", "🐠"],
            "dolphin": ["🐬", "🐟", "🐠", "🐳", "🌊"],
            "unicorn": ["🦄", "✨", "🌈", "🌸", "💫"],
            "bee": ["🐝", "🍯", "🌻", "💐", "🐞"],
            "butterfly": ["🦋", "🌸", "💐", "🌷", "🌼"],
            "phoenix": ["🦅", "🔥", "✨", "🌄", "🔥"],
            "wolf": ["🐺", "🌕", "🐾", "🌲", "🌌"],
            "mouse": ["🐭", "🐁", "🧀", "🐾", "🐀"],
            "cow": ["🐮", "🐄", "🐂", "🌾", "🍀"],
            "pig": ["🐷", "🐽", "🐖", "🐾", "🐗"],
            "horse": ["🐴", "🏇", "🐎", "🌄", "🏞️"],
            "sheep": ["🐑", "🐏", "🌾", "🐾", "🐐"],

            // Sports and Activities
            "soccer": ["⚽", "🥅", "🏟️", "🎉", "👏"],
            "basketball": ["🏀", "⛹️‍♂️", "🏆", "🎉", "🥇"],
            "tennis": ["🎾", "🏸", "🥇", "🏅", "💪"],
            "baseball": ["⚾", "🏟️", "🏆", "🎉", "👏"],
            "football": ["🏈", "🎉", "🏟️", "🏆", "🥅"],
            "golf": ["⛳", "🏌️‍♂️", "🏌️‍♀️", "🎉", "🏆"],
            "bowling": ["🎳", "🏅", "🎉", "🏆", "👏"],
            "running": ["🏃‍♂️", "🏃‍♀️", "👟", "🏅", "🔥"],
            "swimming": ["🏊‍♂️", "🏊‍♀️", "🌊", "🏆", "👏"],
            "cycling": ["🚴‍♂️", "🚴‍♀️", "🏅", "🔥", "🏞️"],
            "yoga": ["🧘", "🌸", "💪", "✨", "😌"],
            "dancing": ["💃", "🕺", "🎶", "🥳", "🎉"],
            "singing": ["🎤", "🎶", "🎙️", "🎉", "🎵"],
            "guitar": ["🎸", "🎶", "🎼", "🎵", "🎉"],
            "piano": ["🎹", "🎶", "🎼", "🎵", "🎉"],

            // Objects and Symbols
            "money": ["💸", "💰", "💵", "💳", "🤑"],
            "fire": ["🔥", "💥", "⚡", "🎇", "✨"],
            "rocket": ["🚀", "🌌", "🛸", "🛰️", "✨"],
            "bomb": ["💣", "🔥", "⚡", "😱", "💥"],
            "computer": ["💻", "🖥️", "📱", "⌨️", "🖱️"],
            "phone": ["📱", "📲", "☎️", "📞", "📳"],
            "camera": ["📷", "📸", "🎥", "📹", "🎞️"],
            "book": ["📚", "📖", "✏️", "📘", "📕"],
            "light": ["💡", "✨", "🔦", "🌟", "🌞"],
            "music": ["🎶", "🎵", "🎼", "🎸", "🎧"],
            "star": ["🌟", "⭐", "✨", "🌠", "💫"],
            "gift": ["🎁", "💝", "🎉", "🎊", "🎈"],

            // Travel and Places
            "car": ["🚗", "🚘", "🚙", "🚕", "🛣️"],
            "train": ["🚆", "🚄", "🚅", "🚞", "🚂"],
            "plane": ["✈️", "🛫", "🛬", "🛩️", "🚁"],
            "boat": ["⛵", "🛥️", "🚤", "🚢", "🌊"],
            "city": ["🏙️", "🌆", "🌇", "🏢", "🌃"],
            "beach": ["🏖️", "🌴", "🌊", "☀️", "🏄‍♂️"],
            "mountain": ["🏔️", "⛰️", "🗻", "🌄", "🌞"],
            "forest": ["🌲", "🌳", "🍃", "🏞️", "🐾"],
            "desert": ["🏜️", "🌵", "🐪", "🌞", "🏖️"],
            "hotel": ["🏨", "🏩", "🛏️", "🛎️", "🏢"],
            "restaurant": ["🍽️", "🍴", "🥂", "🍷", "🍾"],

            // Other Emotions
            "brave": ["🦸‍♂️", "🦸‍♀️", "💪", "🔥", "👊"],
            "shy": ["😳", "☺️", "🙈", "😊", "😌"],
            "surprised": ["😲", "😮", "😧", "😯", "🤯"],
            "bored": ["😐", "😑", "😶", "🙄", "😒"],
            "sleepy": ["😴", "💤", "😪", "😌", "🛌"],
            "determined": ["💪", "🔥", "😤", "👊", "🏆"],

            // Celebrations and Holidays
            "birthday": ["🎂", "🎉", "🎈", "🎊", "🍰"],
            "christmas": ["🎄", "🎅", "🤶", "🎁", "⛄"],
            "new year": ["🎉", "🎊", "🎇", "🍾", "✨"],
            "easter": ["🐰", "🐣", "🌷", "🥚", "🌸"],
            "halloween": ["🎃", "👻", "🕸️", "🕷️", "👹"],
            "valentine": ["💘", "❤️", "💌", "💕", "🌹"],
            "wedding": ["💍", "👰", "🤵", "🎩", "💒"]

        };

        // Array of fallback emojis for random reactions
        const fallbackEmojis = [
            "😎", "🔥", "💥", "💯", "✨", "🌟", "🌈", "⚡", "💎", "🌀",
            "👑", "🎉", "🎊", "🦄", "👽", "🛸", "🚀", "🦋", "💫", "🍀",
            "🎶", "🎧", "🎸", "🎤", "🏆", "🏅", "🌍", "🌎", "🌏", "🎮",
            "🎲", "💪", "🏋️", "🥇", "👟", "🏃", "🚴", "🚶", "🏄", "⛷️",
            "🕶️", "🧳", "🍿", "🍿", "🥂", "🍻", "🍷", "🍸", "🥃", "🍾",
            "🎯", "⏳", "🎁", "🎈", "🎨", "🌻", "🌸", "🌺", "🌹", "🌼",
            "🌞", "🌝", "🌜", "🌙", "🌚", "🍀", "🌱", "🍃", "🍂", "🌾",
            "🐉", "🐍", "🦓", "🦄", "🦋", "🦧", "🦘", "🦨", "🦡", "🐉", "🐅",
            "🐆", "🐓", "🐢", "🐊", "🐠", "🐟", "🐡", "🦑", "🐙", "🦀", "🐬",
            "🦕", "🦖", "🐾", "🐕", "🐈", "🐇", "🐾", "🐁", "🐀", "🐿️"
        ];

        // Utility function to find a random emoji reaction based on keyword
        const getEmojiForSentence = (sentence) => {
            const words = sentence.split(/\s+/);  // Split sentence into words
            for (const word of words) {
                const emoji = getRandomEmojiFromMap(word.toLowerCase());  // Check each word in sentence
                if (emoji) {
                    return emoji;  // Return first matched emoji
                }
            }
            // If no match is found, return a random emoji from the fallback list
            return getRandomFallbackEmoji();
        };

        // Utility function to find a random emoji from the emoji map based on a keyword
        const getRandomEmojiFromMap = (keyword) => {
            const emojis = emojiMap[keyword.toLowerCase()];  // Match keyword in lowercase
            if (emojis && emojis.length > 0) {
                return emojis[Math.floor(Math.random() * emojis.length)];
            }
            // If no match is found, return null (no reaction)
            return null;
        };

        // Utility function to get a random emoji from the fallback emojis list
        const getRandomFallbackEmoji = () => {
            return fallbackEmojis[Math.floor(Math.random() * fallbackEmojis.length)];
        };

        // Auto-react to status updates if AUTO_REACT_STATUS is enabled
        if (conf.AUTO_REACT_STATUS === "yes") {
            console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");

            zk.ev.on("messages.upsert", async (m) => {
                const { messages } = m;

                for (const message of messages) {
                    if (message.key && message.key.remoteJid === "status@broadcast") {
                        console.log("Detected status update from:", message.key.remoteJid);

                        const now = Date.now();
                        if (now - lastReactionTime < 5000) {
                            console.log("Throttling reactions to prevent overflow.");
                            continue;
                        }

                        const ezra = zk.user && zk.user.id ? zk.user.id.split(":")[0] + "@s.whatsapp.net" : null;
                        if (!ezra) {
                            console.log("Bot's user ID not available. Skipping reaction.");
                            continue;
                        }

                        // Check for conversation text and apply emoji based on keywords in the sentence
                        const keyword = message?.message?.conversation || "";
                        const randomReaction = getEmojiForSentence(keyword) || getRandomFallbackEmoji();

                        if (randomReaction) {
                            await zk.sendMessage(message.key.remoteJid, {
                                react: {
                                    key: message.key,
                                    text: randomReaction,
                                },
                            }, {
                                statusJidList: [message.key.participant, ezra],
                            });

                            lastReactionTime = Date.now();
                            console.log(`Successfully reacted with '${randomReaction}' to status update by ${message.key.remoteJid}`);
                        }

                        await delay(2000);
                    }
                }
            });
        }

        // Auto-react to regular messages if AUTO_REACT is enabled
        if (conf.AUTO_REACT === "yes") {
            console.log("AUTO_REACT is enabled. Listening for regular messages...");

            zk.ev.on("messages.upsert", async (m) => {
                const { messages } = m;

                for (const message of messages) {
                    if (message.key && message.key.remoteJid) {
                        const now = Date.now();
                        if (now - lastReactionTime < 5000) {
                            console.log("Throttling reactions to prevent overflow.");
                            continue;
                        }

                        // Check for conversation text and apply emoji based on keywords in the sentence
                        const conversationText = message?.message?.conversation || "";
                        const randomEmoji = getEmojiForSentence(conversationText) || getRandomFallbackEmoji();

                        if (randomEmoji) {
                            await zk.sendMessage(message.key.remoteJid, {
                                react: {
                                    text: randomEmoji,
                                    key: message.key
                                }
                            }).then(() => {
                                lastReactionTime = Date.now();
                                console.log(`Successfully reacted with '${randomEmoji}' to message by ${message.key.remoteJid}`);
                            }).catch(err => {
                                console.error("Failed to send reaction:", err);
                            });
                        }

                        await delay(2000);
                    }
                }
            });
        }

        // Function to create and send vCard for a new contact with incremented numbering
        async function sendVCard(jid, baseName) {
            try {
                // Extract phone number from JID
                const phoneNumber = jid.split('@')[0];

                // Generate unique name with incremented number
                let counter = 1;
                let name = `${baseName} ${counter}`;

                // Check existing contacts to find the next available number
                while (Object.values(store.contacts).some(contact => contact.name === name)) {
                    counter++;
                    name = `${baseName} ${counter}`;
                }

                // Manually construct vCard content
                const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}\nEND:VCARD\n`;

                // Define the path and file name for the vCard file
                const vCardPath = `./${name}.vcf`;

                // Write the vCard content to a .vcf file
                fs.writeFileSync(vCardPath, vCardContent);

                // Send the vCard to yourself (the bot owner) for easy importing
                await zk.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
                    document: { url: vCardPath },
                    mimetype: 'text/vcard',
                    fileName: `${name}.vcf`,
                    caption: `Contact saved as ${name}. Please import this vCard to add the number to your contacts.\n\n LUCKY MD XFORCE👊`
                });

                console.log(`vCard created and sent for: ${name} (${jid})`);

                // Delete the vCard file after sending
                fs.unlinkSync(vCardPath);

                return name;  // Return the assigned name to use in the notification
            } catch (error) {
                console.error(`Error creating or sending vCard for ${name}:`, error.message);
            }
        }
        // New Contact Handler
        zk.ev.on("messages.upsert", async (m) => {
            // Check if AUTO_SAVE_CONTACTS is enabled
            if (conf.AUTO_SAVE_CONTACTS !== "yes") return;

            const { messages } = m;
            const ms = messages[0];

            if (!ms.message) return;

            const origineMessage = ms.key.remoteJid;
            const baseName = "Lucky-Md-Xforce";

            // Check if the message is from an individual and if contact is not saved
            if (origineMessage.endsWith("@s.whatsapp.net") && (!store.contacts[origineMessage] || !store.contacts[origineMessage].name)) {
                // Generate and save contact with incremented name
                const assignedName = await sendVCard(origineMessage, baseName);

                // Update contact in store to avoid duplicate saving
                store.contacts[origineMessage] = { name: assignedName };

                // Send additional message to inform the contact of their new saved name
                await zk.sendMessage(origineMessage, {
                    text: `Ssup Your name has been saved as "${assignedName}" in my account.\n\nLUCKY-MD-XFORCE`
                });

                console.log(`Contact ${assignedName} has been saved and notified.`);
            }

            // Further message handling for saved contacts can be added here...
        });


        // Default auto-reply message
        let auto_reply_message = "Hello,its Lucky Md Xforce on board. My owner is currently unavailable. Please leave a message, and we will get back to you as soon as possible.";

        // Track contacts that have already received the auto-reply
        let repliedContacts = new Set();

        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message) return;

            const messageText = ms.message.conversation || ms.message.extendedTextMessage?.text;
            const remoteJid = ms.key.remoteJid;

            // Check if the message exists and is a command to set a new auto-reply message with any prefix
            if (messageText && messageText.match(/^[^\w\s]/) && ms.key.fromMe) {
                const prefix = messageText[0]; // Detect the prefix
                const command = messageText.slice(1).split(" ")[0]; // Command after prefix
                const newMessage = messageText.slice(prefix.length + command.length).trim(); // New message content

                // Update the auto-reply message if the command is 'setautoreply'
                if (command === "setautoreply" && newMessage) {
                    auto_reply_message = newMessage;
                    await zk.sendMessage(remoteJid, {
                        text: `Auto-reply message has been updated to:\n"${auto_reply_message}"`,
                    });
                    return;
                }
            }

            // Check if auto-reply is enabled, contact hasn't received a reply, and it's a private chat
            if (conf.AUTO_REPLY === "yes" && !repliedContacts.has(remoteJid) && !ms.key.fromMe && !remoteJid.includes("@g.us")) {
                await zk.sendMessage(remoteJid, {
                    text: auto_reply_message,
                });

                // Add contact to replied set to prevent repeat replies
                repliedContacts.add(remoteJid);
            }
        });



        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message)
                return;
            const decodeJid = (jid) => {
                if (!jid)
                    return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = (0, baileys_1.jidDecode)(jid) || {};
                    return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                }
                else
                    return jid;
            };
            var mtype = (0, baileys_1.getContentType)(ms.message);
            var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttonsResponseMessage" ?
                ms?.message?.buttonsResponseMessage?.selectedButtonId : mtype == "listResponseMessage" ?
                    ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId : mtype == "messageContextInfo" ?
                        (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text) : "";
            var origineMessage = ms.key.remoteJid;
            var idBot = decodeJid(zk.user.id);
            var servBot = idBot.split('@')[0];
            const verifGroupe = origineMessage?.endsWith("@g.us");
            var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
            var nomGroupe = verifGroupe ? infosGroupe.subject : "";
            var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
            var mr = ms.Message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
            // anti-group-mention enforcement: delete messages containing mentions when enabled for this group
            try {
                if (verifGroupe && ms.message && ms.message[mtype] && ms.message[mtype].contextInfo && ms.message[mtype].contextInfo.mentionedJid && ms.message[mtype].contextInfo.mentionedJid.length > 0) {
                    const { getAntimention } = require('./lib/antimention');
                    const enabled = await getAntimention(origineMessage);
                    if (enabled) {
                        // Don't act on admins or owner
                        const author = ms.key.participant || ms.key.remoteJid;
                        const meta = await zk.groupMetadata(origineMessage);
                        const member = meta.participants.find(p => p.id === author) || {};
                        const isAdmin = member.admin || member.isAdmin || false;
                        const ownerJid = (conf.NUMERO_OWNER || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                        if (!isAdmin && author !== ownerJid) {
                            try {
                                // delete the offending message
                                await zk.sendMessage(origineMessage, { delete: ms.key });
                                // send a polite warning message
                                const senderShort = author.split('@')[0];
                                await zk.sendMessage(origineMessage, { text: `@${senderShort} Please avoid mentioning members or statuses in this group. Message removed.`, mentions: [author] });
                            } catch (e) { console.error('Failed to delete mention message', e); }
                            // stop further processing of this message
                            return;
                        }
                    }
                }
            } catch (e) { console.error('antimention enforcement error', e); }
            var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
            if (ms.key.fromMe) {
                auteurMessage = idBot;
            }

            var membreGroupe = verifGroupe ? ms.key.participant : '';
            const { getAllSudoNumbers } = require("./lib/sudo");
            const nomAuteurMessage = ms.pushName;
            const fredi = '255627417402';
            const ezra = '255620814108';
            const sudo = await getAllSudoNumbers();
            const superUserNumbers = [servBot, fredi, ezra, conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
            const allAllowedNumbers = superUserNumbers.concat(sudo);
            const superUser = allAllowedNumbers.includes(auteurMessage);

            var dev = [fredi, ezra,].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
            function repondre(mes) { zk.sendMessage(origineMessage, { text: mes }, { quoted: ms }); }
            console.log("\tVIPER MD MESSAGES");
            console.log("=========== NEW CONVERSATION ===========");
            if (verifGroupe) {
                console.log("MESSAGE FROM GROUP : " + nomGroupe);
            }
            console.log("MESSAGE SENT BY : " + "[" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
            console.log("MESSAGE TYPE : " + mtype);
            console.log("==================TEXT==================");
            console.log(texte);
            /**  */
            function groupeAdmin(membreGroupe) {
                let admin = [];
                for (m of membreGroupe) {
                    if (m.admin == null)
                        continue;
                    admin.push(m.id);
                }
                // else{admin= false;}
                return admin;
            }



            var etat = conf.ETAT;
            // Presence update logic based on etat value
            if (etat == 1) {
                await zk.sendPresenceUpdate("available", origineMessage);
            } else if (etat == 2) {
                await zk.sendPresenceUpdate("composing", origineMessage);
            } else if (etat == 3) {
                await zk.sendPresenceUpdate("recording", origineMessage);
            } else {
                await zk.sendPresenceUpdate("unavailable", origineMessage);
            }

            const mbre = verifGroupe ? await infosGroupe.participants : '';
            let admins = verifGroupe ? groupeAdmin(mbre) : '';
            const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
            var verifEzraAdmin = verifGroupe ? admins.includes(idBot) : false;

            // if user recently viewed menu2, allow plain numeric replies to select category
            try {
                const menu2State = require('./lib/menu2State');
                if (texte && !texte.startsWith(prefixe)) {
                    const maybe = texte.toString().trim();
                    if (/^\d{1,3}$/.test(maybe)) {
                        const pending = await menu2State.getPending(origineMessage);
                        if (pending) {
                            // transform into a menu2 command invocation
                            texte = `${prefixe}menu2 ${maybe}`;
                        }
                    }
                }
            } catch (e) { /* ignore */ }

            const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
            const verifCom = texte ? texte.startsWith(prefixe) : false;
            const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;

            // Auto-reply to common texts — load mapping from data/auto_replies.json (fallback to builtin)
            try {
                if (texte && !verifCom && !ms.key.fromMe) {
                    const lower = texte.toString().toLowerCase().trim();

                    // load replies from file if available
                    let autoReplies = {};
                    try {
                        const arPath = path.join(__dirname, 'data', 'auto_replies.json');
                        if (fs.existsSync(arPath)) {
                            const raw = fs.readFileSync(arPath, 'utf8');
                            autoReplies = JSON.parse(raw || '{}');
                        } else {
                            // create default file if missing
                            autoReplies = {
                                'hello': `Hello! I'm VIPER MD Bot. Type ${prefixe}menu to see commands.`,
                                'hi': `Hi! I'm VIPER MD. Type ${prefixe}menu to see commands.`,
                                'who are you': "I'm VIPER MD, created by T20_STARBOY.",
                                'what is your name': "I'm VIPER MD Bot.",
                                'thanks': "You're welcome! 😊",
                                'thank you': "You're welcome! 😊",
                                'good morning': "Good morning! ☀️",
                                'good night': "Good night! 🌙",
                                'help': `Need help? Type ${prefixe}menu or ${prefixe}help.`
                            };
                            try { fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true }); fs.writeFileSync(arPath, JSON.stringify(autoReplies, null, 2), 'utf8'); } catch (e) { }
                        }
                    } catch (e) {
                        console.warn('Failed to load auto_replies.json, using defaults', e?.message || e);
                        autoReplies = {
                            'hello': `Hello! I'm VIPER MD Bot. Type ${prefixe}menu to see commands.`,
                            'hi': `Hi! I'm VIPER MD. Type ${prefixe}menu to see commands.`,
                            'who are you': "I'm VIPER MD, created by T20_STARBOY.",
                            'what is your name': "I'm VIPER MD Bot.",
                            'thanks': "You're welcome! 😊",
                            'thank you': "You're welcome! 😊",
                            'good morning': "Good morning! ☀️",
                            'good night': "Good night! 🌙",
                            'help': `Need help? Type ${prefixe}menu or ${prefixe}help.`
                        };
                    }

                    // respond on exact keys or startsWith in both private and group chats
                    const respond = (msg) => { if (msg) repondre(msg); };

                    if (autoReplies[lower]) {
                        respond(autoReplies[lower]);
                    } else {
                        for (const key of Object.keys(autoReplies)) {
                            if (lower.startsWith(key)) {
                                respond(autoReplies[key]);
                                break;
                            }
                        }
                    }
                }
            } catch (err) {
                console.log('auto-reply error', err);
            }

            const lien = conf.URL.split(',');


            // Utiliser une boucle for...of pour parcourir les liens
            function mybotpic() {
                // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
                // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
                const indiceAleatoire = Math.floor(Math.random() * lien.length);
                // Récupérer le lien correspondant à l'indice aléatoire
                const lienAleatoire = lien[indiceAleatoire];
                return lienAleatoire;
            }

            // Define command options object for reusability
            var commandeOptions = {
                superUser, dev,
                verifGroupe,
                mbre,
                membreGroupe,
                verifAdmin,
                infosGroupe,
                nomGroupe,
                auteurMessage,
                nomAuteurMessage,
                idBot,
                verifEzraAdmin,
                prefixe,
                arg,
                repondre,
                mtype,
                groupeAdmin,
                msgRepondu,
                auteurMsgRepondu,
                ms,
                mybotpic
            };


            // Auto read messages (Existing code, optional)
            if (conf.AUTO_READ === 'yes') {
                zk.ev.on('messages.upsert', async (m) => {
                    const { messages } = m;
                    for (const message of messages) {
                        if (!message.key.fromMe) {
                            await zk.readMessages([message.key]);
                        }
                    }
                });
            }


            /** ****** gestion auto-status  */
            if (ms.key && ms.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
                await zk.readMessages([ms.key]);
            }
            if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === "yes") {
                /* await zk.readMessages([ms.key]);*/
                if (ms.message.extendedTextMessage) {
                    var stTxt = ms.message.extendedTextMessage.text;
                    await zk.sendMessage(idBot, { text: stTxt }, { quoted: ms });
                }
                else if (ms.message.imageMessage) {
                    var stMsg = ms.message.imageMessage.caption;
                    var stImg = await zk.downloadAndSaveMediaMessage(ms.message.imageMessage);
                    await zk.sendMessage(idBot, { image: { url: stImg }, caption: stMsg }, { quoted: ms });
                }
                else if (ms.message.videoMessage) {
                    var stMsg = ms.message.videoMessage.caption;
                    var stVideo = await zk.downloadAndSaveMediaMessage(ms.message.videoMessage);
                    await zk.sendMessage(idBot, {
                        video: { url: stVideo }, caption: stMsg
                    }, { quoted: ms });
                }
                /** *************** */
                // console.log("*nouveau status* ");
            }
            /** ******fin auto-status */
            if (!dev && origineMessage == "120363158701337904@g.us") {
                return;
            }

            //---------------------------------------rang-count--------------------------------
            if (texte && auteurMessage.endsWith("s.whatsapp.net")) {
                const { ajouterOuMettreAJourUserData } = require("./lib/level");
                try {
                    await ajouterOuMettreAJourUserData(auteurMessage);
                } catch (e) {
                    console.error(e);
                }
            }

            /////////////////////////////   Mentions /////////////////////////////////////////

            try {

                if (ms.message[mtype].contextInfo.mentionedJid && (ms.message[mtype].contextInfo.mentionedJid.includes(idBot) || ms.message[mtype].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))    /*texte.includes(idBot.split('@')[0]) || texte.includes(conf.NUMERO_OWNER)*/) {

                    if (origineMessage == "120363158701337904@g.us") {
                        return;
                    };

                    if (superUser) { console.log('hummm'); return; }

                    let mbd = require('./lib/mention');

                    let alldata = await mbd.recupererToutesLesValeurs();

                    let data = alldata[0];

                    if (data.status === 'non') { console.log('mention pas actifs'); return; }

                    let msg;

                    if (data.type.toLocaleLowerCase() === 'image') {

                        msg = {
                            image: { url: data.url },
                            caption: data.message
                        }
                    } else if (data.type.toLocaleLowerCase() === 'video') {

                        msg = {
                            video: { url: data.url },
                            caption: data.message
                        }

                    } else if (data.type.toLocaleLowerCase() === 'sticker') {

                        let stickerMess = new Sticker(data.url, {
                            pack: conf.NOM_OWNER,
                            type: StickerTypes.FULL,
                            categories: ["🤩", "🎉"],
                            id: "12345",
                            quality: 70,
                            background: "transparent",
                        });

                        const stickerBuffer2 = await stickerMess.toBuffer();

                        msg = {
                            sticker: stickerBuffer2
                        }

                    } else if (data.type.toLocaleLowerCase() === 'audio') {

                        msg = {

                            audio: { url: data.url },
                            mimetype: 'audio/mp4',
                        }

                    }

                    zk.sendMessage(origineMessage, msg, { quoted: ms })

                }
            } catch (error) {

            }



            // anti-link: delete links posted by non-admins, warn and kick after limit
            try {
                const yes = await verifierEtatJid(origineMessage);
                const textExists = typeof texte === 'string' && texte.length > 0;
                const containsLink = textExists && (texte.includes('https://') || texte.includes('http://') || texte.includes('chat.whatsapp.com') || texte.includes('wa.me'));

                if (containsLink && verifGroupe && yes) {
                    console.log("link detected");
                    var verifZokAdmin = verifGroupe ? admins.includes(idBot) : false;
                    if (superUser || verifAdmin || !verifZokAdmin) {
                        console.log('skip antilink for admin/superuser or bot not admin');
                        return;
                    }

                    const key = {
                        remoteJid: origineMessage,
                        fromMe: false,
                        id: ms.key.id,
                        participant: auteurMessage,
                    };

                    // Always attempt to delete the offending message
                    try {
                        await zk.sendMessage(origineMessage, { delete: key });
                    } catch (delErr) {
                        console.log('failed to delete message', delErr);
                    }

                    const action = await recupererActionJid(origineMessage);
                    const warnlib = require('./lib/warn');
                    let warn = await warnlib.getWarnCountByJID(auteurMessage);
                    const warnlimit = parseInt(conf.WARN_COUNT || '5', 10);

                    if (action === 'remove') {
                        // remove member and notify
                        var txt = `Link detected. Message removed and @${auteurMessage.split('@')[0]} removed from group.`;
                        await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                        try {
                            await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], 'remove');
                        } catch (e) {
                            console.log('failed to remove member', e);
                        }
                        return;
                    }

                    // For 'delete' and default behavior: send warning message and increment warn if configured
                    if (action === 'delete' || action === 'warn' || !action) {
                        // increment warn if action is warn or default to warn behavior
                        if (action === 'warn' || !action) {
                            await warnlib.ajouterUtilisateurAvecWarnCount(auteurMessage);
                            warn = await warnlib.getWarnCountByJID(auteurMessage);
                        }

                        if (warn >= warnlimit) {
                            const kikmsg = `Link detected. ${auteurMessage.split('@')[0]} reached warn limit and will be removed.`;
                            await zk.sendMessage(origineMessage, { text: kikmsg, mentions: [auteurMessage] }, { quoted: ms });
                            try {
                                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], 'remove');
                            } catch (e) { console.log('failed to kick after warn limit', e); }
                            return;
                        } else {
                            const rest = warnlimit - warn;
                            const msg = `Link detected. You received a warning. Remaining before kick: ${rest}`;
                            await zk.sendMessage(origineMessage, { text: msg, mentions: [auteurMessage] }, { quoted: ms });
                            return;
                        }
                    }
                }

            } catch (e) {
                console.log('antilink err ' + e);
            }



            /** *************************anti-bot******************************************** */
            try {
                const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
                const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
                if (botMsg || baileysMsg) {

                    if (mtype === 'reactionMessage') { console.log('Je ne reagis pas au reactions'); return };
                    const antibotactiver = await atbverifierEtatJid(origineMessage);
                    if (!antibotactiver) { return };

                    if (verifAdmin || auteurMessage === idBot) { console.log('je fais rien'); return };

                    const key = {
                        remoteJid: origineMessage,
                        fromMe: false,
                        id: ms.key.id,
                        participant: auteurMessage
                    };
                    var txt = "bot detected, \n";
                    // txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;
                    const gifLink = "https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif";
                    var sticker = new Sticker(gifLink, {
                        pack: 'VIPER AI',
                        author: conf.OWNER_NAME,
                        type: StickerTypes.FULL,
                        categories: ['🤩', '🎉'],
                        id: '12345',
                        quality: 50,
                        background: '#000000'
                    });
                    await sticker.toFile("st1.webp");
                    // var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
                    var action = await atbrecupererActionJid(origineMessage);

                    if (action === 'remove') {

                        txt += `message deleted \n @${auteurMessage.split("@")[0]} removed from group.`;

                        await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") });
                        (0, baileys_1.delay)(800);
                        await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                        try {
                            await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                        }
                        catch (e) {
                            console.log("antibot ") + e;
                        }
                        await zk.sendMessage(origineMessage, { delete: key });
                        await fs.unlink("st1.webp");
                    }

                    else if (action === 'delete') {
                        txt += `message delete \n @${auteurMessage.split("@")[0]} Avoid sending link.`;
                        //await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
                        await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                        await zk.sendMessage(origineMessage, { delete: key });
                        await fs.unlink("st1.webp");

                    } else if (action === 'warn') {
                        const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require('./lib/warn');

                        let warn = await getWarnCountByJID(auteurMessage);
                        let warnlimit = conf.WARN_COUNT
                        if (warn >= warnlimit) {
                            var kikmsg = `bot detected ;you will be remove because of reaching warn-limit`;

                            await zk.sendMessage(origineMessage, { text: kikmsg, mentions: [auteurMessage] }, { quoted: ms });


                            await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                            await zk.sendMessage(origineMessage, { delete: key });


                        } else {
                            var rest = warnlimit - warn;
                            var msg = `bot detected , your warn_count was upgrade ;\n rest : ${rest} `;

                            await ajouterUtilisateurAvecWarnCount(auteurMessage)

                            await zk.sendMessage(origineMessage, { text: msg, mentions: [auteurMessage] }, { quoted: ms });
                            await zk.sendMessage(origineMessage, { delete: key });

                        }
                    }
                }
            }
            catch (er) {
                console.log('.... ' + er);
            }


            /////////////////////////

            // Anti-delete: when a message is deleted, retrieve original and send to owner
            zk.ev.on('messages.upsert', async (up) => {
                try {
                    const { messages } = up;
                    for (const mmsg of messages) {
                        if (!mmsg.message) continue;
                        // protocolMessage type 0 indicates deletion (message revoke)
                        const proto = mmsg.message.protocolMessage;
                        if (proto && proto.type === 0) {
                            // check global flag or per-chat toggle file
                            let enabledGlob = ((conf.ANTI_DELETE_MESSAGE || '').toString()).toLowerCase() === 'yes';
                            let enabledPerChat = false;
                            try {
                                const adPath = path.join(__dirname, 'data', 'anti_delete.json');
                                if (fs.existsSync(adPath)) {
                                    const raw = fs.readFileSync(adPath, 'utf8') || '{}';
                                    const ad = JSON.parse(raw);
                                    const remote = proto.key ? proto.key.remoteJid : null;
                                    if (remote && ad && ad[remote]) enabledPerChat = true;
                                }
                            } catch (e) { enabledPerChat = false; }
                            if (!enabledGlob && !enabledPerChat) continue;
                            const key = proto.key;
                            if (!key) continue;
                            const remote = key.remoteJid;
                            const id = key.id;
                            // try to load original message from in-memory store
                            let original = null;
                            try {
                                original = await store.loadMessage(remote, id);
                            } catch (e) { original = null; }

                            const sender = (key.participant || mmsg.key.participant || '').split('@')[0];
                            const caption = `⚠️ Deleted message in ${remote}\nFrom: @${sender}`;
                            // send caption to owner
                            try {
                                await zk.sendMessage(conf.NUMERO_OWNER + '@s.whatsapp.net', { text: caption, mentions: [key.participant] });
                                if (original) {
                                    await zk.sendMessage(conf.NUMERO_OWNER + '@s.whatsapp.net', { forward: original });
                                }
                            } catch (e) {
                                console.log('anti-delete send error', e);
                            }
                        }
                    }
                } catch (err) { console.log('anti-delete handler err', err); }
            });

            //execution des plugins   
            if (verifCom) {
                //await await zk.readMessages(ms.key);
                const cd = evt.cm.find((ezra) => ezra.nomCom === (com));
                if (cd) {
                    try {

                        if ((conf.MODE).toLocaleLowerCase() != 'yes' && !superUser) {
                            return;
                        }

                        /******************* PM_PERMT***************/

                        if (!superUser && origineMessage === auteurMessage && conf.PM_PERMIT === "yes") {
                            repondre("You don't have acces to commands here"); return
                        }
                        ///////////////////////////////


                        /*****************************banGroup  */
                        if (!superUser && verifGroupe) {

                            let req = await isGroupBanned(origineMessage);

                            if (req) { return }
                        }

                        /***************************  ONLY-ADMIN  */

                        if (!verifAdmin && verifGroupe) {
                            let req = await isGroupOnlyAdmin(origineMessage);

                            if (req) { return }
                        }

                        /**********************banuser */


                        if (!superUser) {
                            let req = await isUserBanned(auteurMessage);

                            if (req) { repondre("You are banned from bot commands"); return }


                        }

                        reagir(origineMessage, zk, ms, cd.reaction);
                        cd.fonction(origineMessage, zk, commandeOptions);
                    }
                    catch (e) {
                        console.log("😡😡 " + e);
                        zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                    }
                }
            }
            //fin exécution plugins
        });
        //fin événement message

        /******** evenement groupe update ****************/
        const { recupevents } = require('./lib/welcome');

        zk.ev.on('group-participants.update', async (group) => {
            console.log(group);

            let ppgroup;
            try {
                ppgroup = await zk.profilePictureUrl(group.id, 'image');
            } catch {
                ppgroup = 'https://files.catbox.moe/1q3yrw.jpg';
            }

            try {
                const metadata = await zk.groupMetadata(group.id);

                if (group.action == 'add' && (await recupevents(group.id, "welcome") == 'on')) {
                    try {
                        const membres = group.participants;
                        const meta = await zk.groupMetadata(group.id);
                        const subject = meta.subject || 'this group';
                        const owner = (meta.owner || '').split('@')[0] || 'owner';
                        const total = meta.participants ? meta.participants.length : membres.length;

                        for (let membre of membres) {
                            // try fetch member profile pic
                            let ppic = ppgroup;
                            try { ppic = await zk.profilePictureUrl(membre, 'image'); } catch (e) { ppic = ppgroup; }

                            const name = membre.split('@')[0];
                            const captionLines = [];
                            captionLines.push('╔════════════════════════╗');
                            captionLines.push('║      ☢️ VIPER WELCOME ☢️   ║');
                            captionLines.push('╠════════════════════════╣');
                            captionLines.push(`║ Hi  •  *@${name}*`);
                            captionLines.push('╠════════════════════════╣');
                            captionLines.push(`║ Group : ${subject}`);
                            captionLines.push(`║ Owner : @${owner}`);
                            captionLines.push(`║ Members: ${total}`);
                            if (meta.desc) captionLines.push('╠════════════════════════╣');
                            if (meta.desc) captionLines.push(`║ ${meta.desc.substring(0, 120)}`);
                            captionLines.push('╠════════════════════════╣');
                            captionLines.push('║ Read the rules and enjoy! ║');
                            captionLines.push('╚════════════════════════╝');

                            await zk.sendMessage(group.id, { image: { url: ppic }, caption: captionLines.join('\n'), mentions: [membre] });
                        }
                    } catch (e) {
                        console.error('Welcome message error', e);
                    }
                } else if (group.action == 'remove' && (await recupevents(group.id, "goodbye") == 'on')) {
                    try {
                        const membres = group.participants;
                        const meta = await zk.groupMetadata(group.id);
                        const subject = meta.subject || 'this group';
                        const total = meta.participants ? meta.participants.length : (meta.size || 0);

                        for (let membre of membres) {
                            const name = membre.split('@')[0];
                            const lines = [];
                            lines.push('╔════════════════════════╗');
                            lines.push('║      🕊️ VIPER GOODBYE 🕊️    ║');
                            lines.push('╠════════════════════════╣');
                            lines.push(`║ Goodbye *@${name}*`);
                            lines.push('╠════════════════════════╣');
                            lines.push(`║ Group : ${subject}`);
                            lines.push(`║ Members now: ${total}`);
                            lines.push('╠════════════════════════╣');
                            lines.push('║ We will miss you. Bye!   ║');
                            lines.push('╚════════════════════════╝');

                            await zk.sendMessage(group.id, { image: { url: ppgroup }, caption: lines.join('\n'), mentions: [membre] });
                        }
                    } catch (e) {
                        console.error('Goodbye message error', e);
                    }

                } else if (group.action == 'promote' && (await recupevents(group.id, "antipromote") == 'on')) {
                    //  console.log(zk.user.id)
                    if (group.author == metadata.owner || group.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) { console.log('Cas de superUser je fais rien'); return; };


                    await zk.groupParticipantsUpdate(group.id, [group.author, group.participants[0]], "demote");

                    zk.sendMessage(
                        group.id,
                        {
                            text: `@${(group.author).split("@")[0]} has violated the anti-promotion rule, therefore both ${group.author.split("@")[0]} and @${(group.participants[0]).split("@")[0]} have been removed from administrative rights.`,
                            mentions: [group.author, group.participants[0]]
                        }
                    )

                } else if (group.action == 'demote' && (await recupevents(group.id, "antidemote") == 'on')) {

                    if (group.author == metadata.owner || group.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) { console.log('Cas de superUser je fais rien'); return; };


                    await zk.groupParticipantsUpdate(group.id, [group.author], "demote");
                    await zk.groupParticipantsUpdate(group.id, [group.participants[0]], "promote")

                    zk.sendMessage(
                        group.id,
                        {
                            text: `@${(group.author).split("@")[0]} has violated the anti-demotion rule by removing @${(group.participants[0]).split("@")[0]}. Consequently, he has been stripped of administrative rights.`,
                            mentions: [group.author, group.participants[0]]
                        }
                    )

                }

            } catch (e) {
                console.error(e);
            }
        });

        /******** fin d'evenement groupe update *************************/




        /*****************************Cron setup */


        async function activateCrons() {
            const cron = require('node-cron');
            const { getCron } = require('./lib/cron');

            let crons = await getCron();
            console.log(crons);
            if (crons.length > 0) {

                for (let i = 0; i < crons.length; i++) {

                    if (crons[i].mute_at != null) {
                        let set = crons[i].mute_at.split(':');

                        console.log(`etablissement d'un automute pour ${crons[i].group_id} a ${set[0]} H ${set[1]}`)

                        cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                            await zk.groupSettingUpdate(crons[i].group_id, 'announcement');
                            zk.sendMessage(crons[i].group_id, { image: { url: './media/chrono.webp' }, caption: "Hello, it's time to close the group; sayonara." });

                        }, {
                            timezone: "Africa/Nairobi"
                        });
                    }

                    if (crons[i].unmute_at != null) {
                        let set = crons[i].unmute_at.split(':');

                        console.log(`etablissement d'un autounmute pour ${set[0]} H ${set[1]} `)

                        cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {

                            await zk.groupSettingUpdate(crons[i].group_id, 'not_announcement');

                            zk.sendMessage(crons[i].group_id, { image: { url: './media/chrono.webp' }, caption: "Good morning; It's time to open the group." });


                        }, {
                            timezone: "Africa/Nairobi"
                        });
                    }

                }
            } else {
                console.log('Les crons n\'ont pas été activés');
            }

            return
        }


        //événement contact
        zk.ev.on("connection.update", async (con) => {
            const { lastDisconnect, connection } = con;
            if (connection === "connecting") {
                console.log("ℹ️ lucky is connecting...");
            }
            else if (connection === 'open') {
                console.log("✅ VIPER Connected to WhatsApp! ☺️");
                console.log("--");
                await (0, baileys_1.delay)(200);
                console.log("------");
                await (0, baileys_1.delay)(300);
                console.log("------------------/-----");
                console.log("VIPER is Online 🕸\n\n");
                //chargement des plugins 
                console.log("Loading Lucky Commands ...\n");
                fs.readdirSync(__dirname + "/plugins").forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == (".js")) {
                        try {
                            require(__dirname + "/plugins/" + fichier);
                            console.log(fichier + " Installed Successfully✔️");
                        }
                        catch (e) {
                            console.log(`${fichier} could not be installed due to : ${e}`);
                        } /* require(__dirname + "/beltah/" + fichier);
                         console.log(fichier + " Installed ✔️")*/
                        (0, baileys_1.delay)(300);
                    }
                });
                (0, baileys_1.delay)(700);
                var md;
                if ((conf.MODE).toLocaleLowerCase() === "yes") {
                    md = "public";
                }
                else if ((conf.MODE).toLocaleLowerCase() === "no") {
                    md = "private";
                }
                else {
                    md = "undefined";
                }
                console.log("Commands Installation Completed ✅");

                await activateCrons();

                if ((conf.DP).toLowerCase() === 'yes') {

                    let cmsg = ` ⁠⁠⁠⁠

   _BOT🦚CONNECTED_

║ Prefix: [ ${prefixe} ]
║ Mode: ${md}
║ Model: V 5.0.9
║ Bot Name: VIPER-Md-Bot 
║ Owner: T20_STARBOY
║ Users: ${store.users.length}
║ Groups: ${store.groups.length}
║ Commands: ${evt.cm.length}
╚═════ ❖ •✦
-_-<-<-<-<-<-<-<--<-<-<-<-<-<

*🪀Follow my channel for updates and free hacks🙃*
 
> https://whatsapp.com/channel/0029Vb6HjF9hXEzZFlD6F3d
                
                 `;

                    await zk.sendMessage(zk.user.id, { text: cmsg });
                }
            }
            else if (connection == "close") {
                let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                    console.log('Session id error, rescan again...');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
                    console.log('!!! connexion fermée, reconnexion en cours ...');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                    console.log('connection error 😞 ,,, trying to reconnect... ');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                    console.log('connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                    console.log('vous êtes déconnecté,,, veuillez rescanner le code qr svp');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                    console.log('redémarrage en cours ▶️');
                    main();
                } else {

                    console.log('redemarrage sur le coup de l\'erreur  ', raisonDeconnexion);
                    //repondre("* Redémarrage du bot en cour ...*");

                    const { exec } = require("child_process");

                    exec("pm2 restart all");
                }
                // sleep(50000)
                console.log("hum " + connection);
                main(); //console.log(session)
            }
        });
        //fin événement connexion
        //événement authentification 
        zk.ev.on("creds.update", saveCreds);
        //fin événement authentification 
        //
        /** ************* */
        //fonctions utiles
        zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
            let quoted = message.msg ? message.msg : message;
            let mime = (message.msg || message).mimetype || '';
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await (0, baileys_1.downloadContentFromMessage)(quoted, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            let type = await FileType.fromBuffer(buffer);
            let trueFileName = './' + filename + '.' + type.ext;
            // save to file
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        };


        zk.awaitForMessage = async (options = {}) => {
            return new Promise((resolve, reject) => {
                if (typeof options !== 'object') reject(new Error('Options must be an object'));
                if (typeof options.sender !== 'string') reject(new Error('Sender must be a string'));
                if (typeof options.chatJid !== 'string') reject(new Error('ChatJid must be a string'));
                if (options.timeout && typeof options.timeout !== 'number') reject(new Error('Timeout must be a number'));
                if (options.filter && typeof options.filter !== 'function') reject(new Error('Filter must be a function'));

                const timeout = options?.timeout || undefined;
                const filter = options?.filter || (() => true);
                let interval = undefined

                /**
                 * 
                 * @param {{messages: Baileys.proto.IWebMessageInfo[], type: Baileys.MessageUpsertType}} data 
                 */
                let listener = (data) => {
                    let { type, messages } = data;
                    if (type == "notify") {
                        for (let message of messages) {
                            const fromMe = message.key.fromMe;
                            const chatId = message.key.remoteJid;
                            const isGroup = chatId.endsWith('@g.us');
                            const isStatus = chatId == 'status@broadcast';

                            const sender = fromMe ? zk.user.id.replace(/:.*@/g, '@') : (isGroup || isStatus) ? message.key.participant.replace(/:.*@/g, '@') : chatId;
                            if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                                zk.ev.off('messages.upsert', listener);
                                clearTimeout(interval);
                                resolve(message);
                            }
                        }
                    }
                }
                zk.ev.on('messages.upsert', listener);
                if (timeout) {
                    interval = setTimeout(() => {
                        zk.ev.off('messages.upsert', listener);
                        reject(new Error('Timeout'));
                    }, timeout);
                }
            });
        }



        // fin fonctions utiles
        /** ************* */
        return zk;
    }
    let fichier = require.resolve(__filename);
    fs.watchFile(fichier, () => {
        fs.unwatchFile(fichier);
        console.log(`mise à jour ${__filename}`);
        delete require.cache[fichier];
        require(fichier);
    });
    main();
}, 5000);
