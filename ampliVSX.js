exports.action = function(data, callback, config, SARAH) {
 	// On récupère la config
	var config = config.modules.ampliVSX;
	if (!config.port_ampli && config.port_ampli != 'empty'){
		callback({ 'tts': 'Vous devez configurer le port de l\'ampli' });
		return;
	}
	if (!config.ip_ampli && config.port_ampli != 'empty'){
		callback({ 'tts': 'Vous devez configurer l\'adresse ip de l\'ampli' });
		return;
	}
	var tts = "";
	
	// Commandes 
	var command = 'empty';
	if( data.val ) {
		switch(data.val) {
			case "power_on" : command = 'PO'; break;
			case "power_off" : command = 'PF'; break;
			case "volume_up" : command = 'VU'; break;
			case "volume_down" : command = 'VD'; break;
			case "set_volume_to_30db" : command = '101VL'; break;
			case "set_volume_to_40db" : command = '081VL'; break;
			case "set_volume_to_50db" : command = '061VL'; break;
			case "mute_on" : command = 'MO'; break;
			case "mute_off" : command = 'MF'; break;
			case "input_BD" : command = '25FN'; break;
			case "input_video1" : command = '10FN'; break;
			case "input_video2" : command = '14FN'; break;
			case "input_DVD" : command = '04FN'; break;
			case "input_tuner" : command = '02FN'; break;
			case "listening_DPLII_MOVIE" : command = '0010SR'; break;		
			case "listening_FSRWIDE" : command = '0100SR'; break;
		}
	} 

	if(command != 'empty') {
		var net = require('net');
		var client = new net.Socket();
		client.connect(config.port_ampli, config.ip_ampli, function() {
			console.log('Connected');
     		console.log(command);
			client.write(command+'\r\n');
		});
		client.on('data', function(data) {
			console.log('Received: ' + data);
			client.destroy();
		});
		client.on('close', function() {
			console.log('Connection closed');
		});
		tts = "Ok";
	} else {
		tts = "Erreur de commande";
	}
	callback({'tts': tts});
	return;
}