module.exports = function(RED) {
    function iotg_out(config) {
        RED.nodes.createNode(this,config);
		this.address = config.address;
		this.id_output = config.id_output;
        var node = this;
        node.on('input', function(msg) {
			var tag0 = "SETOUT ";
			var tag1 = (msg.hasOwnProperty("address") ? msg.address  :  node.address) + " ";
			var tag2 = (msg.hasOwnProperty("id_output") ? msg.id_output  :  node.id_output) + " ";
			var tag3 = "1 ";
			var cmd = tag0 + tag1 + tag2 + tag3;
			var msg1 = { payload: cmd };
			if(msg.payload == 'true' || msg.payload == 'TRUE' || msg.payload == '1'){
				var msg1 = { payload: cmd };
			}else if(msg.payload == 'false' || msg.payload == 'FALSE' || msg.payload == '0'){
				var tag3 = "0 ";
				var cmd = tag0 + tag1 + tag2 + tag3;
				var msg1 = { payload: cmd };
			}else{
				msg1 = { payload: "ERROR" };
			}

			const fs = require('fs')
				const path = '/etc/rfpi/fifo/nodered.txt'
				try {
				  if (fs.existsSync(path)) {
					//file exists
					fs.writeFile('/etc/rfpi/fifo/fifoguicmd', cmd, (err) => { 
		  
					// In case of a error throw err. 
						//if (err) throw err; 
						if (err){ 
							msg1 = { payload: "ERROR" };
						}else{
							msg1 = { payload: "OK" };
						}
					}) 
				  }
				} catch(err) {
				  console.error(err)
			}
				
			node.send(msg1);
        });
    }
    RED.nodes.registerType("iotg_out",iotg_out);
}
