# node-red-contrib-iotgemini

These simple nodes help to control an IOTGEMINI network of peripherals through Node-Red!
For more instruction visit:

[Official Website](http://www.iotgemini.com)


## Install

On the terminal run the following command to install IOTGEMINI nodes:
```
npm install node-red-contrib-iotgemini
```

now you need also the RFPI service (this get the commands from the nodes and apply it), so go ahead with these commands:

```
git clone git://github.com/iotgemini/rfpi.git
```
then
```
cd ./rfpi
sudo bash install.sh
```

Follow the instruction!
The install.sh will also install a WEB GUI, that allow the user to install easily a new peripheral into the IOT network!

## Usage
As soon you have installed a peripherals you are now able to control it with these nodes!

iotg_out:
 Name: any name that you want!
 Address: you should see into the WEB GUI the address of the peripheral that you want control. Example: 0001
 ID Output: the peripheral you installed probably has more than one output, thus just state the ID of the output you want control, strating from 0
 Input msg.payload = TRUE or FALSE 
	
iotg_in: 
 This node return a json containing all status and descriptions of all pheriperals linked to the network!
 Input msg.payload = TRUE (it return in output the json with all peripherals linked)
 Output msg.payload = json with all data
	
iotg_dcmd:
 Name: any name that you want!
 Address: give an address if you use command like REFRESH. 
 Command: choose the command you want run!
   FIND: it start to search if there is a new periperal to install
   REFRESH: it refresh all status of the peripheral specified by address.
   DELETE: it delete a peripheral specified by the field Address.
 Input msg.payload = TRUE
	
iotg_rgb:
 Name: any name that you want!
 Address: give the address of the peripheral that has the RGB shield.
 Input msg.payload = Red_hex_byte Green_hex_byte Blue_hex_byte. Example: FF00FF (that turn on red and blue and green is off)
