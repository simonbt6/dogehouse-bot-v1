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

const musicQueue = new Map()

// Connect client to server api.
app.connect(process.env.DOGEHOUSE_TOKEN, process.env.DOGEHOUSE_REFRESH_TOKEN).then(async () => {

	console.log('Bot connected')
	app.rooms.join('b71c023b-d325-4890-be23-05862746c3bd')
	botAPI = app.bot._client.api
})
.catch((e) => console.error(e))

app.on('ready', () => {
	console.log('Bot ready.')
	app.bot.displayName = 'BOTjs'
})
.catch((e) => console.error(e))

// Triggered on received message.
app.on('newChatMessage', msg => {

	// Keep bot from spamming chat.
	if (msg.author.id == app.bot.id) return

	// Commands
	if (msg.content == config.prefix + 'join') return join(msg)
	if (msg.content == config.prefix + 'mute') return botAPI.send('mute', { value: true }, null)
	if (msg.content == config.prefix + 'unmute') return botAPI.send('mute', { value: false }, null)
	if (msg.content.split(' ')[0] == config.prefix + 'play') return play(msg)

	msg.reply('Hello stranger.')
	
	//app.bot.sendMessage(msg.content)
})
.catch((e) => console.error(e))

/**
 * Triggered on user join room.
*/
app.on('userJoinedRoom', user =>{
	//console.log(user);
	app.bot.sendMessage('Welcome ' + user.username + ' !')

})
.catch((e) => console.error(e))

/**
 * Add a song to the music queue.
 * @param msg 
 * @returns 
 */
function play(msg){

	const msgContent = msg.content.split(' ')

	if (!(msgContent.length > 1)) return msg.reply('Please provide a valid url to add to the play queue.')

	if (app.bot.muted)
		app.bot.unmute()
	
	musicQueue.set(msg.author.id, msgContent[1])

	console.log(app.rooms.current)

	console.log(musicQueue)

	
	
	
}

/**
 * Make bot join voice channel and ask for audio permissions.
 * @param msg 
 */
function join(msg){
	app.bot.askToSpeak()
	msg.reply('Joining voice chat.')
}