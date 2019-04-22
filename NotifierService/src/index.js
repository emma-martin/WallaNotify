// npm install -g localtunnel && lt --port 3000
import 'dotenv/config';
import Telegraf from 'telegraf';
import request from 'request';
import cron from 'node-cron';

const bot = new Telegraf(process.env.BOT_TOKEN);
const endpoint = process.env.ENDPOINT;
bot.command('get_chatid', (ctx) => ctx.reply(ctx.update.message.chat.id));
cron.schedule('1 * * * *', () => {
    request.get({ url: `http://${endpoint}:3000/searches`, json: true }, function (error, response) {
        error ? console.log('ERROR: ', error) :
            response.body.map(item => {
                callWallapop(item);
            })
    })
});

const callWallapop = (item) => {
    const options = {
        url: 'https://es.wallapop.com/rest/items',
        qs:
        {
            dist: item.dist.toString(),
            publishDate: item.publishDate.toString(),
            kws: item.kws,
            order: item.order,
            searchNextPage: '',
            catIds: '',
            maxPrice: item.maxPrice.toString(),
            minPrice: item.minPrice.toString(),
            markAsIds: '',
            filters_source: 'quick_filters'
        },
        headers:
        {
            'User-Agent': 'request',
            'cache-control': 'no-cache'
        },
        json: true
    };

    request.get(options, function (error, response) {
        error ? console.log('ERROR: ', error) :
            response.body.items.map(item => {
                isNewItem(item.publishDate, Date.now()) ? sendAlert(item) : null;
            });
    })
}

const isNewItem = (itemPublishDate) => {
    const oneHour = 60 * 60 * 1000;
    return (Date.now() - itemPublishDate) < oneHour;
}

const sendAlert = (item) => {
    const url = `https://es.wallapop.com/item/${item.url}`;
    const message = `<a href="${url}">${item.title}</a><b> ${item.price}</b>`;
    !item.reserved && !item.sold ?
        bot.telegram.sendMessage(process.env.CHAT_ID, message, { parse_mode: "HTML" }) : null;
}
