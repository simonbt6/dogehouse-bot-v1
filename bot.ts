/**
 * Bot related functions.
 */
class BOT {
    /**
     * TODO: Add typescript types support.
     * - Waiting on dogehouse.js implementation.
     */
    bot
    
    constructor(bot){
        this.bot = bot
    }
    
    join(client, rooms){

    }

    /**
     * Add a song to the music queue.
     * @param msg 
     * @returns 
     */
    play(msg){
        const msgContent = msg.content.split(' ')
        const msgUrl = msgContent[1]
    
        if (!(msgContent.length > 1)) return msg.reply('Please provide a valid url to add to the play queue.')
    
        if (this.bot.muted)
            this.bot.unmute()
        
        musicQueue.set(msg.author.id, msgUrl)
    
        console.log(app.rooms.current)
    
        console.log(musicQueue)
    }

    mute(){
        botAPI.send('mute', { value: true }, null)
    }
}


module.exports = BOT