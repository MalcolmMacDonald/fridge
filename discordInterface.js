import './discord.11.6.4.min.js';
const client = new Discord.Client();

GetFridgeImageURLs(new URLSearchParams(window.location.search).get('key'));

async function GetFridgeImageURLs(BOT_TOKEN) {
    return new Promise(resolve => {
            client.login(BOT_TOKEN).then(() => {

                var fridgeChannel = client.channels.get('814021494069395466');

                fridgeChannel.fetchMessages().then(messages => {
                    var imageAttachments = messages.filter(message => message.attachments.array().length > 0).map(message => message.attachments.map(attachment => attachment.url)[0]);
                    console.log(imageAttachments);
                    resolve(imageAttachments);
                });
            });
        }
    );

}