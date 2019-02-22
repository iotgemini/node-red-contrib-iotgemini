module.exports = function(RED) {
    function iotgeminiNode(config) {
        RED.nodes.createNode(this,config);
		this.address = config.address;
		this.id_output = config.id_output;
        var node = this;
        node.on('input', function(msg) {
			var tag0 = "SETOUT ";
			var tag1 = node.address + " ";
			var tag2 = node.id_output + " ";
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
			node.send(msg1);
        });
    }
    RED.nodes.registerType("iotgemini",iotgeminiNode);
}
