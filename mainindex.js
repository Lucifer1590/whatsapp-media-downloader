const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    },
    authStrategy: new LocalAuth({ clientId: "client-one", dataPath: './session' })
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});
    
client.on('message', async (msg) => {
    const time = new Date(msg.timestamp * 1000)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
        .split(' ')[1]
        .replace(/:/g, '-');

    const date = new Date(msg.timestamp * 1000 + 30 * 60000 + 15 * 1000).toISOString().substring(0, 23);
    const person = msg._data.notifyName;
    const phoneNumber = msg.from.replace('@c.us', '');
    const folder = path.join(process.cwd(), 'media');

    if (msg.hasMedia) {
        try {
            const media = await msg.downloadMedia();
            fs.mkdirSync(folder, { recursive: true });
            
            let originalFilename = media.filename || 'file';
            const extension = path.extname(originalFilename);
            const filenameWithoutExtension = originalFilename.slice(0, -extension.length);
            
            let filename;
            
            if (media.mimetype === 'application/pdf') {
                filename = path.join(folder, originalFilename);
            } else if (media.mimetype.startsWith('image/') || media.mimetype.startsWith('audio/') || media.mimetype.startsWith('video/')) {
                filename = path.join(folder, date + '.' + media.mimetype.split('/')[1]);
            } else if (media.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                filename = path.join(folder, filenameWithoutExtension + '.xlsx');
            } else if (media.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                filename = path.join(folder, filenameWithoutExtension + '.xls');    
            } else if (media.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                filename = path.join(folder, filenameWithoutExtension + '.docx');
            } else if (media.mimetype === 'application/msword') {
                filename = path.join(folder, filenameWithoutExtension + '.doc');
            } else if (media.mimetype === 'application/vnd.ms-powerpoint') {
                filename = path.join(folder, filenameWithoutExtension + '.ppt');
            } else if (media.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                filename = path.join(folder, filenameWithoutExtension + '.pptx');
            } else {
                filename = path.join(folder, originalFilename + '.file');
            }
            
            fs.writeFileSync(filename, Buffer.from(media.data, 'base64').toString('binary'), 'binary');
            console.log('File saved successfully:', filename);
        } catch (error) {
            console.error('Error while processing the message:', error);
        }
    }
});

client.initialize();
