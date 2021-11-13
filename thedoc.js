const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client()

client.login("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

//Using https://www.weatherbit.io/api + https://ow-api.com/


client.on('ready', () => {

	client.user.setActivity("Being the Two Times");
    console.log("The Doc is Ready!")

})



client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the Champions Club, ${member}`);
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }


    var messageRecu = receivedMessage;
    messageRecu = messageRecu.toString();

    if (messageRecu.includes("gwa") === true){
    	receivedMessage.react("648370811601813524");
    } else if(messageRecu.includes("black") === true || messageRecu.includes("noir") === true ){
    	receivedMessage.react("648376044197249054");	
    }

    if (receivedMessage.content.includes(client.user.toString())) {
        receivedMessage.channel.send("What do you want?");
    }

})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the !
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("------------------------------------")
    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments



    switch(primaryCommand){
    	case "help":
    		helpCommand(arguments, receivedMessage);
    		break;
    	case "multiply":
    		multiplyCommand(arguments, receivedMessage);
    		break;
    	case "twotimes":
    		twoTimesCommand(arguments, receivedMessage);
    		break;
    	case "avatar":
    		avatarCommand(arguments, receivedMessage);
    		break;
    	case "music":
    		musicCommand(receivedMessage);
    		break;
    	case "thedoc":
    		thedocCommand(arguments, receivedMessage);
    		break;
    	case "leave":
    		leaveCommand(receivedMessage);
    		break;
    	case "dice":
    		diceCommand2(receivedMessage);
    		break;
        case "rank":
            rankCommand(arguments, receivedMessage);
            break;
        case "weather":
            meteoCommand(arguments, receivedMessage);
            break;
        case "test":
            testCommand(arguments, receivedMessage);
            break;
    	default:
    		receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
    }
}


function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {

        //receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }// Help command not finished
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 3) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())//Simple multiplication
    
}

function twoTimesCommand(arguments, receivedMessage){
	const webAttachment = new Discord.Attachment('https://i.imgur.com/1Wvkx7W.png')
    receivedMessage.channel.send(webAttachment)//Simple Doc Image Post
}

function avatarCommand(arguments, receivedMessage){

	receivedMessage.reply(receivedMessage.author.avatarURL);//Post User Avatar
}

function musicCommand(receivedMessage){

    if (receivedMessage.member.voiceChannel) {
      receivedMessage.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
                   
          receivedMessage.reply('I have successfully connected to the channel!');  
          const dispatcher = connection.playStream('C:/Users/Alex/Desktop/Discord Bot/sound/music.mp3'); 
        })  
        .catch(console.log);
        
    } else {
      receivedMessage.reply('You need to join a voice channel first!');
    
    }
}


function thedocCommand(arguments, receivedMessage){

	if (receivedMessage.member.voiceChannel) {
      receivedMessage.member.voiceChannel.join()
        .then(connection => { 

            var sound = 0

            switch(arguments.toString()){
                case "teampepeja":
                        sound = 1;
                        console.log("Son choisi: Team Pepeja (1)")
                        break;
                case "raul":
                        sound = 2;
                        console.log("Son choisi: Raul (2)")
                        break;
                case "wasteoftime":
                        sound = 3;
                        console.log("Son choisi: Team Waste of Time (3)")
                        break;
                case "forsenCD":
                        sound = 4;
                        console.log("Son choisi: forsenCD (4)")
                        break;
                case "pepega":
                        sound = 5;
                        console.log("Son choisi: Pepega (5)")
                        break;
                case "bbtv":
                        sound = 6;
                        console.log("Son choisi: BBTV (6)")
                        break;
                default: 
                        sound = Math.floor(Math.random() * 6) + 1;
                        console.log("Aucun argument ou argument invalide, son aléatoire.");
                        console.log("Playing sound " + sound)
            }

             //GInit la var pour le random
           
            const dispatcher = connection.playFile('C:/Users/Alex/Desktop/Discord Bot/sound/doc/sound-'+sound+'.mp3'); 
            
         	dispatcher.on('end', () => {
         		 receivedMessage.member.voiceChannel.leave()
			}); 
         
        })  
        .catch(console.log);
        
    } else {
      receivedMessage.reply('You need to join a voice channel first!');
    }

}

function leaveCommand(receivedMessage){

	receivedMessage.member.voiceChannel.leave()//Makes the bot leave the VC
	
}

function diceCommand2(receivedMessage){
	var randomDice = Math.floor(Math.random() * (6 - 1)) + 1;

	webAttachment = new Discord.Attachment('http://dobbelsteen.virtuworld.net/img/'+randomDice+'c.gif')
	receivedMessage.channel.send(webAttachment)
	console.log("Dice:" + randomDice);
}

async function rankCommand(arguments,receivedMessage){

try{
    var battlenet = arguments;
    battlenet = battlenet.toString().replace("#","-");

    let getProfile = async () =>{
    let texturl = await axios.get("https://ow-api.com/v1/stats/pc/us/"+battlenet+"/profile")
    let owProfile = texturl.data;
    return owProfile;
    }

    let profile = await getProfile()
    console.log("Receiving Profile Data Ok...")

     var srRole = profile.ratings;

     var srDps = "Unranked";
     var srTank = "Unranked";
     var srSupport = "Unranked";

try{
     for(var role = 0; role < 3; role++){

        //If the player placed in the 3 roles, the order is [0] Tank - [1] Damage [2] Support, else the object takes the first role placed at by starting at [0] 

        var rankIcon = "";

        if(srRole[Object.keys(srRole)[role]].role === "damage"){ 
                    checkRank(srRole[Object.keys(srRole)[role]].level);  
                    srDps = srRole[Object.keys(srRole)[role]].level+"<:sr:658535971025059843>"+rankIcon;               
        }else if(srRole[Object.keys(srRole)[role]].role === "support"){  
                    checkRank(srRole[Object.keys(srRole)[role]].level) ;    
                    srSupport = srRole[Object.keys(srRole)[role]].level+"<:sr:658535971025059843>"+rankIcon;
        }else{   
                    checkRank(srRole[Object.keys(srRole)[role]].level);   
                    srTank = srRole[Object.keys(srRole)[role]].level+"<:sr:658535971025059843>"+rankIcon;
                }
        }
    }catch(err){
        console.log("No such role at role value "+ role);
    }

    function checkRank(rank){


    if(rank < 1500){
        rankIcon = "<:bronze:659258345991176213>";
    }else if(rank >= 1500 && rank < 2000){
        rankIcon ="<:silver:659258328190550016>";
    }else if(rank >= 2000 && rank < 2500){
        rankIcon="<:gold:659258309660114975>";
    }else if(rank >= 2500 && rank < 3000){
        rankIcon="<:platinum:659264819488358430>";
    }else if(rank >= 3000 && rank < 3500){
        rankIcon="<:diamond:659258287119925261>";
    }else if(rank >= 3500 && rank < 4000){
        rankIcon="<:master:659258409627156480>";
    }else if(rank >= 4000 && rank < 4300){
        rankIcon="<:grandmaster:659258301082632202>";
    }else{
        rankIcon="<:top500:659258374860439553>";
    }

    return rankIcon;
}   
  
     if(profile.ratings === null){
        var private = true;
    }else{var private = false;}

    console.log("Profile is private: " + private);

     
    if(private === false){
     //receivedMessage.channel.send(">>> **"+profile.name+"**\n"+"<:tank:658536102474547200> "+srTank+"\n"+"<:dps:658536007737540618> "+srDps+"\n"+"<:support:658536056047796235> "+srSupport+"\n");
     const embed = new Discord.RichEmbed()
        .setTitle("**"+profile.name+"**")
        .setColor("#710003")
        .setDescription("<:tank:658536102474547200> "+srTank+"\n"+"<:dps:658536007737540618> "+srDps+"\n"+"<:support:658536056047796235> "+srSupport+"\n")
        .setThumbnail(profile.icon)
        receivedMessage.channel.send({embed})
    }else{
        receivedMessage.channel.send("> The Profile is Private <:lock_1f512:659192319462866955>");
    }


    }catch(err){
        console.log("Error at BattleNet Id PainChamp")
        receivedMessage.channel.send("> Invalid BattleNet Id, please try again <:45:659194544109125653>");
    }
}


async function meteoCommand(arguments, receivedMessage){

    try{
    var cityWeather = arguments;

    let getWeather = async () =>{
    let texturl = await axios.get("https://api.weatherbit.io/v2.0/current?city="+cityWeather+"&key=22a69c021071495283361861982829a4");
    let weatherData = texturl.data;
    return weatherData;
    }

    let dataTemp = await getWeather();
    console.log("Receiving Profile Data Ok...");
    var dataW = dataTemp.data[Object.keys(dataTemp.data)[0]];

     const embed = new Discord.RichEmbed()
        .setTitle(dataW.city_name)
        .setColor("#710003")
        .setDescription("It is currently "+ dataW.temp+"°C in "+dataW.city_name)
        .setThumbnail("https://www.weatherbit.io/static/img/icons/"+dataW.weather.icon+".png")
        receivedMessage.channel.send({embed})
    }
    catch(err){
        receivedMessage.channel.send("Invalid City name, please try again.")
    }

}


function testCommand(arguments, receivedMessage){

    console.log(receivedMessage.member.id);

}