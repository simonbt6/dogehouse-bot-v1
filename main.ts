
require('dotenv').config()

const {
	/**
	 * Client and Base Client
	 */
	 Client,

	 /**
	  * Classes
	  */
	 API,
	 BotUser,
	 Chat,
	 rooms,
	 Telemetry,
	 Users,

	 /**
	  * Controllers
	  */
	 MessageController,
	 RoomController,
	 UserController,

	 /**
	  * Miscellaneous
	  */
	 EVENT,
	 utils

} = require('dogehouse.js')

// Create dogehouse client
const app = new Client()
const config = require('./config.json')

let botAPI = null
let _bot

const musicQueue = new Map()

// Connect client to server api.
app.connect(process.env.DOGEHOUSE_TOKEN, process.env.DOGEHOUSE_REFRESH_TOKEN).then(async () => {

	console.log('Bot connected')
	app.rooms.join('6eecbf3a-3ec5-4220-a504-2834272d1cd5')
	botAPI = app.bot._client.api

	_bot = new BOT(app.bot)
})
.catch((e) => console.error(e))

app.on('ready', () => {
	console.log('Bot ready.')
})

// Triggered on received message.
app.on('newChatMessage', msg => {

	// Keep bot from spamming chat.
	if (msg.author.id == app.bot.id) return

	// Commands
	if (msg.content == config.prefix + 'join') return join(msg)
	if (msg.content == config.prefix + 'mute') return _bot.mute()
	if (msg.content == config.prefix + 'unmute') return botAPI.send('mute', { value: false }, null)
	if (msg.content.split(' ')[0] == config.prefix + 'play') return _bot.play(msg)

	msg.reply('Hello stranger.')
	
	//app.bot.sendMessage(msg.content)
})

/**
 * Triggered on user join room.
*/
app.on('userJoinedRoom', user =>{
	//console.log(user);
	app.bot.sendMessage('Welcome ' + user.username + ' !')

})

function play(msg){

	

	
	
	
}

/**
 * Make bot join voice channel and ask for audio permissions.
 * @param msg 
 */
function join(msg){
	app.bot.askToSpeak()
	msg.reply('Joining voice chat.')
}