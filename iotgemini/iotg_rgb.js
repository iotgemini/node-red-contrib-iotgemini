module.exports = function(RED) 
{
    function iotg_rgb(config) 
	{
        RED.nodes.createNode(this,config);
		this.address = config.address;
        var node = this;
        node.on('input', function(msg) 
		{
			var tag0 = "DATA  RF ";
			var tag1 = (msg.hasOwnProperty("address") ? msg.address  :  node.address) + " ";
			var tag2 = "52426F00FF18";
			var tag3 = msg.payload + "00000000000000 " ;
			
			var cmd = tag0 + tag1 + tag2 + tag3 ;
			var msg1 = { payload: cmd };
			
			const fs = require('fs')
				const path = '/etc/rfpi/fifo/nodered.txt'
				try 
				{
				  if (fs.existsSync(path)) 
				  {
					//file exists
					fs.writeFile('/etc/rfpi/fifo/fifoguicmd', cmd, (err) => 
					{ 
		  
					// In case of a error throw err. 
						//if (err) throw err; 
						if (err)
						{ 
							msg1 = { payload: "ERROR" };
						}
						else
						{
							msg1 = { payload: "OK" };
						}
					}) 
				  }
				} 
				catch(err) 
				{
				  console.error(err)
				}
				
			node.send(msg1);
        });
    }
    RED.nodes.registerType("iotg_rgb",iotg_rgb);
}
