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
	var tts = ""; var saut = "\r\n";
	// Commandes pour ampli pioneer
	var commands = {
		'power_on'              : { key : 'PO',     tts : 'j\'allume l\'ampli'},
		'power_off'             : { key : 'PF',     tts : 'j\'éteind l\'ampli'},
		'volume_up'             : { key : 'VU',     tts : ''},
		'volume_down'           : { key : 'VD',     tts : ''},
		'set_volume_to_30db'    : { key : '101VL',  tts : ''},
		'set_volume_to_40db'    : { key : '081VL',  tts : ''},
		'set_volume_to_50db'    : { key : '061VL',  tts : ''},
		'mute_on'               : { key : 'MO',     tts : ''},
		'mute_off'              : { key : 'MF',     tts : ''},
		'input_BD'              : { key : '25FN',   tts : ''},
		'input_video1'          : { key : '10FN',   tts : ''},
		'input_video2'          : { key : '14FN',   tts : ''},
		'input_DVD'             : { key : '04FN',   tts : ''},
		'input_tuner'           : { key : '02FN',   tts : ''},
		'listening_DPLII_MOVIE' : { key : '0010SR', tts : ''},
		'listening_FSRWIDE'     : { key : '0100SR', tts : ''},
	};
	
	if(commands[data.val]) {
		var net = require('net');
		var client = new net.Socket();
		client.connect(config.port_ampli, config.ip_ampli, function() {
			console.log('Connected');
     		console.log(commands[data.val]["key"]);
			client.write(commands[data.val]["key"]+saut);
		});
		client.on('data', function(data) {
			console.log('Received: ' + data);
			client.destroy();
		});
		client.on('close', function() {
			console.log('Connection closed');
		});
	}
	else {
		tts = "Erreur de commande";
	}
	console.log(tts);
	callback({'tts': tts});
	return;
}