/*
 * Bradley Seyler,
 * 12/9/2017
 * SpeechFiles.js
 * This file contains all functions to run the
 * speech generator to generate the number file
*/

var numCallsignRepeats = 1; //This is the number of callsigns that the program will say
var beginMessageCall = true; //This variable will determine whether or not a verbal "begin" phrase is used.
							 //Many stations lack this and go from callsigns to message immediately

var endMessageCall = true; //Similar to above, some stations lack an ending phrase. This will disable the end phrase

function playCallsign(callsign, newMessage)
{
	var timesPlayed = 1; //This is how many times the message has been played. Used to keep track so they 
	
	var callWait = callsign.length*1300; //Count
	
	var waitTime = (numCallsignRepeats * callWait)+200; //This is the wait time before the callsign is done
	
	var messageWaitTime = waitTime + 3000; //This is the amount of time before the main message begins it is 3 seconds after the call-sign ends
	
	var wait = setInterval(function(){ //This interval will run how long it will take before "achtung" is said
		if(beginMessageCall == true) //However, achtung will only be said if the language supports it
		{
			playString("*"); //achtung is played once,
					
			var achtungWait = setInterval(function(){ //And then after 1.1 seconds,
				playString("*"); //And then achtung is played again,
				clearInterval(achtungWait); //and afterwards, the interval is cleared
			}, 1100);
		}
		
		clearInterval(wait); //and the main interval is cleared
	}, waitTime); //waitTime will always be determined by the number of callsigns, and how many digits are in the callsign
	
	var messageWait = setInterval(function(){ //This interval will run 3 seconds after achtung is said.
		playMessage(newMessage); //It will play the message, 
		clearInterval(messageWait); //And clear it's interval
	}, waitTime + 3000);
	
	playString(callsign); //This will the play the callsign,
	if(numCallsignRepeats > 1) //And if more than one callsign is meant to be played,
	{
		var callsignWait = setInterval(function(){ //And it is played on an interval based off of how long the callsign is
			if(timesPlayed == numCallsignRepeats) //If it has played the callsign numCallsignRepeats times,
			{
				clearInterval(callsignWait); //the interval is cleared.
			}
			else //Else,
			{
				playString(callsign); //The callsign is played
			}
			timesPlayed++; //timesplayed is incremented here
		}, callWait);
	}
}

function playMessage(newMessage) //This function plays the message array
{
	var mainTotal = 1; //This keeps track of how many groups have been played. Starts at 1, because one group has to be played at least
	
	playString(newMessage[0]); //The first message group is played,
	
	var groupInterval = setInterval(function(){ //And then the other groups are played 5 seconds apart, no matter how many numbers in each group, for consistency
		var audio = $('#audio')[0]; //The audio is retrieved and paused to make sure no audio overlaps
		audio.pause();
		audio.currentTime = 0;
		
		if(mainTotal >= newMessage.length) //This checks to see if the main total has reached the end of the message.
		{
			clearInterval(groupInterval); //If it has, the interval is cleared
			if(endMessageCall == true) //And if the endMessageCall is supported in the current language
			{
				playString("#"); //The end call is announced
			}
			
			$('#btn-read').removeAttr('disabled'); //All buttons disabled when the read message button was clicked are renabled
			$('#radio-1').removeAttr('disabled'); //Since they can't mess with anything now
			$('#radio-2').removeAttr('disabled');
		}
		else if(mainTotal < newMessage.length) //Else,
		{
			var tempArray = []; //A new array to store the broken down group is created
			
			for(var i = 0; i < newMessage[mainTotal].length; i++) //This breaks the group down into an array of numbers,
			{
				tempArray[i] = newMessage[mainTotal].substring(i, i+1); //By breaking down the substring
			}
			playString(tempArray); //And then the array is played
		}
		
		mainTotal++; //And the mainTotal is incremented
	}, 5300);
}

function playString(anArray) //This function plays a group of numbers
{
	var tempTotal = 0; //This variable is to be used to keep track of how many numbers have been playeds
	var audio = $('#audio')[0];
	
	var playInterval = setInterval(function(){ //This interval plays a number every 1.2 seconds
		if(tempTotal >= anArray.length && audio.ended == true) //If the audio has ended and the tempTotal is reaches the length of the group
		{
			clearInterval(playInterval); //The interval is cleared
		}
		else if(tempTotal < anArray.length) //Else,
		{
			if(anArray[tempTotal] == "*") //If the character is *,
			{
				src = "sounds/achtung" + lang + ".wav"; //Achtung is played
			}
			else if(anArray[tempTotal] == "/") //else if the character is /
			{
				src = "sounds/trennung" + lang + ".wav"; //Trennung is played
			}
			else if(anArray[tempTotal] == "#") //else if the character is #
			{
				src = "sounds/ende" + lang + ".wav"; //Ende is played
			}
			else if(!isNaN(anArray[tempTotal])) //And as long as the sound to be played is a number
			{
				src = "sounds/" + anArray[tempTotal] + lang + ".wav"; //The numbe ris played
			}
			else //This is my work around for if the user enters anything but numbers
			{
				src = "sounds/achtungE01.wav"; //This is the Windows XP Error Sound
			}
			
			audio.pause(); //And the audio is paused as a fail safe to make sure the src can be changed
			$('#audio').attr('src', src); //This changes the audio source
			
			audio.play(); //And the audio is played
		}
		tempTotal++; //And finally, tempTotal is incremented
	}, 1200);				
}