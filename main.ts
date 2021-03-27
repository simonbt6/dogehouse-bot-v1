require('dotenv').config()

const { MessageController } = require('dogehouse.js/src/controllers/MessageController')
const { Client, EVENT } = require('dogehouse.js')
const app = new Client()
const readline = require('readline')

let API = null

const musicQueue = new Map()

app.connect(process.env.DOGEHOUSE_TOKEN, process.env.DOGEHOUSE_REFRESH_TOKEN).then(async () => {

	console.log('Bot connected')
	app.rooms.join('b71c023b-d325-4890-be23-05862746c3bd')
	API = app.bot._client.api
})
.catch((e) => console.log(e))

app.on('ready', () => {
	console.log('Bot ready.')
	app.bot.displayName = 'BOTjs'
});


app.on('newChatMessage', msg => {

	// Keep bot from spamming chat.
	if (msg.author.username == app.bot.username) return

	// Commands
	if (msg.content == '!join') return join(msg)
	if (msg.content == '!mute') return API.send('mute', {value: true}, null)
	if (msg.content == '!unmute') return API.send('mute', {value: false}, null)
	if (msg.content.split(' ')[0] == '!play') return play(msg)

	msg.reply('Hello stranger.')
	
	//app.bot.sendMessage(msg.content)
});

app.on('userJoinedRoom', user =>{
	//console.log(user);
	app.bot.sendMessage('Welcome ' + user.username + ' !')

})

function play(msg){

	const msgContent = msg.content.split(' ')

	if (!(msgContent.length > 1)) return msg.reply('Please provide a valid url to add to the play queue.')

	if (app.bot.muted)
		app.bot.unmute()
	
	musicQueue.set(msg.author.id, msgContent[1])

	console.log(app.rooms.current)

	console.log(musicQueue)

	
	
	
}


function join(msg){
	app.bot.askToSpeak()
	msg.reply('Joining voice chat.')
}