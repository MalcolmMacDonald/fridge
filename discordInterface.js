import './discord.11.6.4.min.js';
const client = new Discord.Client();


export async function GetFridgeImageFileNames(BOT_TOKEN) {
    return new Promise(resolve => {
            client.login(BOT_TOKEN).then(() => {

                var fridgeChannel = client.channels.get('790124464254877706');

                fridgeChannel.fetchMessages().then(messages => {
                    var imageAttachments = messages.filter(message => message.attachments.array().length > 0).map(message => message.attachments.map(attachment => attachment.url)[0]);
                    imageAttachments = imageAttachments.map(url => url.split('/').slice(4).join('/'));
                    console.log(imageAttachments);
                    resolve(imageAttachments);
                });
            });
        }
    );

}