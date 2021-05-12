/*
 * Bradley Seyler
 * 12/9/2017
 * JQueryUIScripts.js
 * This file contains all functions that assign click handlers
 * and JQuery UI widgets to their respective parts.
*/

var lang = ""; //This variable determines the language which the audio samples are from

$("#tabs").tabs(); //This line creates the tabs used on the page
			
$( function() {$( ".radio" ).checkboxradio();} );	//This line creates the checkboxradio on the "	
			
$("#radio-1").on('click', function(){ //This assigns the click handler for radio box 1
	beginMessageCall = true; //This enables the begin message call in SpeechFiles.js
	endMessageCall = true;
	
	lang = ""; //G06 is the base language, and thus has no extension after the sample files
	
	$("#lang-location1").text("The current language is G06"); //This sets the language text on the
	
	$("#astrict-slash-text").text("In G06, * will say \"Achtung\"(ready in German), and / will say \"trennung\" (A slash in German)"); //The text for the astrict and slash description section is set
	
	$('#btn-achtung').removeAttr('disabled'); //And the disable on the achtung button is disabled
	
	$('#btn-trennung').removeAttr('disabled'); //Same as above with the trennung button
});
			
$("#radio-2").on('click', function(){ //This function is the same as the above one, and thus doesn't really need to be explained,
	lang = "E01";
	beginMessageCall = false;
	endMessageCall = false;
	$("#lang-location1").text("The current language is E07");
	$("#astrict-slash-text").text("In E07, * and / are disabled.");
	$('#btn-achtung').attr('disabled','disabled'); //Except that in these two lines achtung and trennung are disabled
	$('#btn-trennung').attr('disabled','disabled');
});

$('.button').on('click', function() { //This assigns the click handler to each button in the sound board
	var id = $(this).attr('id'); //The id of the button is got here
	
	setTimeout(function(){ //This timeout is to check to make sure the button doesn't fire too many times
		id = id.replace(/btn-/gi, ''); //button removes all characters from the id except the sound
		
		src = "sounds/" + id + lang + ".wav"; //And then this is appended to a audio source,
		
		$('#audio').attr('src', src); //The audio source is changed on the audio tag
				
		var audio = $('#audio')[0]; //And the audio tag is retrieved,

		audio.play(); //and then played
	},100);
});	

$('#btn-read').on('click', function(){ //This is the click handler for the read button
	$('#btn-read').attr('disabled','disabled'); //For consistency, the read button is disabled
	$('#radio-1').attr('disabled','disabled'); //Along with both the radios
	$('#radio-2').attr('disabled','disabled');
	
	var callsign = $("#call-sign").val(); //The value of the callsign is gotten
	
	if(callsign == "" || callsign == null) //However if the callsign is null or empty
	{
		callsign = "000"; //A null callsign is defaulted to
	}
	
	var fullMessage = $("#message").val();	//The message is recieved here
	
	if(fullMessage == "" || fullMessage == null) //If the fullMessage is empty or null,
	{
		fullMessage = "00000 00000"; //A default null format message is said
	}				
	
	numCallsignRepeats = $("#call-sign-nums").val();
	
	if(numCallsignRepeats == "" || numCallsignRepeats == null) //If the number of callsigns is empty or null,
	{
		numCallsignRepeats = 1; //It defaults to 1
	}
	
	var message = fullMessage.split(" "); //The fullMessage is split on the empty space
	
	for(var test = 0; test < message.length; test++) //This loop check to see if any of the groups are more than 5 numbers long
	{
		if(message[test].length > 5) 
		{
			alert("Error: Group entered that is greater than 5 numbers. Please re-enter your numbers."); //When it is,
			return;
		}
	}
	
	playCallsign(callsign, message); //And the callsign is played, starting the message
});