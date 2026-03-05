

const { Client, GatewayIntentBits } = require("discord.js")
const fs = require("fs")

const TOKEN = process.env.TOKEN

const client = new Client({
 intents:[
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
 ]
})

const FILE = "./keys.json"

function loadKeys(){
 return JSON.parse(fs.readFileSync(FILE))
}

function saveKeys(data){
 fs.writeFileSync(FILE, JSON.stringify(data,null,2))
}

client.on("ready",()=>{
 console.log("Bot online")
})

client.on("messageCreate", msg=>{

 if(msg.author.bot) return
 if(!msg.content.startsWith("!")) return

 const args = msg.content.split(" ")
 const cmd = args[0]

 let data = loadKeys()

 if(cmd==="!addkey"){

  const key=args[1]
  const hwid=args[2]

  data[key]=hwid

  saveKeys(data)

  msg.reply("Key added")
 }

 if(cmd==="!delkey"){

  const key=args[1]

  delete data[key]

  saveKeys(data)

  msg.reply("Key removed")
 }

 if(cmd==="!viewkey"){

  const key=args[1]

  msg.reply(data[key] || "Key not found")
 }

})

client.login(TOKEN)

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

