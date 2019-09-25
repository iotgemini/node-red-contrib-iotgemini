module.exports = function(RED) {
	try
	{
    function iotg_in(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
			var msg1 = { payload: "" };
						
			const fs = require('fs');
			
				const path = '/etc/rfpi/fifo/fifoperipheraljson';
				
				
				try 
				{
					let jsonData = JSON.parse(fs.readFileSync('/etc/rfpi/fifo/fifoperipheraljson', 'utf-8'));
					msg1.payload=jsonData
					this.status({fill:"green",shape:"dot",text:"OK"});
					node.send(msg1);
				} 
				
				catch(err) 
				{
					this.status({fill:"red",shape:"dot",text:"json not correct"});	
									
				}
					
        });
    }
    RED.nodes.registerType("iotg_in",iotg_in);
	}
	catch
	
	{
		console.error("I am crashed");
	}	
}
