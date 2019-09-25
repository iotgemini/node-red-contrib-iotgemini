module.exports = function(RED) 
{
    function iotg_dcmd(config) 
	{
        RED.nodes.createNode(this,config);
		this.address = config.address;
		this.id_position = config.id_position;
        var node = this;
        node.on('input', function(msg) 
		{
			var tag0 = " ";
			var tag1 = " ";
			var tag2 = " ";
			var tag3 = " ";	
			var typeCmd= parseInt((msg.hasOwnProperty("command")? msg.command  :  config.command));
			var cmd = "";
			var msg1 = { payload: cmd };
			console.log(typeCmd);
			
			msg1 = { payload: typeCmd };
			node.send(msg1);
			switch (typeCmd)
			{
			case 0:
			 tag0 = "FIND ";
			 tag1 = "NEW ";
			 tag2 = "PERI ";
			 tag3 = " ";
			 this.status({fill:"green",shape:"dot",text:"Type ok"});			 
			 break;			 
			case 1:
			 tag0 = "REFRESH ";
			 tag1 = "PERI ";
			 tag2 = "STATUS ";
			 tag3 = (msg.hasOwnProperty("address")? msg.address : config.address) + " ";
			this.status({fill:"green",shape:"dot",text:"Type ok"});			 
			 break;	
			 
			case 2:
			 tag0 = "DELETE ";
			 tag1 = "ADDRESS ";
			 tag2 = (msg.hasOwnProperty("address")? msg.address : config.address) + " ";
			 tag3 = " "; 
			 this.status({fill:"green",shape:"dot",text:"Type ok"});		
			 break;	
			case undefined:
			 this.status({fill:"red",shape:"dot",text:"Type undefined"});
			 break;
			}				
						
			cmd = tag0 + tag1 + tag2 + tag3;
			
			if(msg.payload == 'true' || msg.payload == 'TRUE' || msg.payload == '1')
			{
				msg1 = { payload: cmd };
			}
			else
			{
				msg1 = { payload: "ERROR" };
			}

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
						this.status({fill:"red",shape:"dot",text:"Write error"});
					}
					else
					{
						msg1 = { payload: "OK" };
						this.status({fill:"green",shape:"dot",text:"Successful"});
					}
				}) 
				}
			} 
			catch(err) 
			{
				console.error(err);
			}
				
			node.send(msg1);
        });
    }
    RED.nodes.registerType("iotg_dcmd",iotg_dcmd);
}
