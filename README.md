# ChemicalPlant
Simulation of a chemical plant. TODO: Fill in a longer description

See the [wiki](https://github.com/1NTERRUPT/ChemicalPlant/wiki) for more information.

## Architecture
Our simulation is built upon the Purdue Model, which broadly consists of a corporate network (Levels 4-5), a DMZ, and an industrial network (Levels 0-3). This project is consists of Levels 0-2 of the Purdue Model:

- Level 2: A Debian Linux-based human machine interface (HMI)
  - This runs the operator interface to monitor and control the chemical mixing system;
- Level 1: An Arduino-based controller
  - The Arduino sketch here controls the on/off state of the pumps and duration of time they run based on input from the operator interface;
- Level 0: The pumping system
  - This consists of a 12-volt power supply, three DC pumps, and jars of colored water representing different chemicals.

### Level 2 - HMI
All of our testing so far has been either on Raspbian for the Raspberry Pi or Debian virtual machines. This should be doable on other flavors of Linux, but we haven't tested them. Our instructions here are based on Debian. Some of these steps will require you to run them as root (```sudo su```) and others as a user with ```sudo``` privileges; we'll go with 'marc' for illustrative purposes.

#### General Dependencies
You will need certain packages, which are not installed with the OS by default. We need to get dependencies for both the web interface and the Arduino installed.

As root, first make sure you're up to date:
```
apt-get update && apt-get upgrade -y
```
Next, install curl and nmp, which will allow you to install other required packages:
```
apt-get install curl -y && apt-get install npm -y
```
#### Web Services Dependencies
We use nodejs for our web services, but don't use the version installed by apt. Please run the following as root:
```
curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
apt-get install nodejs -y
```
Log out of root and login as 'marc' or whatever your non-root sudo-enabled user account is, move to the user's home directory (/home/marc/), and run the following:
```
git clone --recursive https://github.com/1NTERRUPT/ChemicalPlant
```
This should install a directory structure under /home/marc/ChemicalPlant/. Now we need to install some additional node packages to the webserver directory.
```
cd ~/ChemcialPlant/webserver
npm install express
npm install socket.io
npm install serialport
npm install ws
```
#### Arduino Dependencies
Login as root and execute the following commands:
```
cd /root
apt-get install arduino-mk -y
# download latest packages and install them
wget http://ftp.de.debian.org/debian/pool/main/a/arduino-mk/arduino-mk_1.5-2_all.deb
wget http://ftp.de.debian.org/debian/pool/main/a/arduino/arduino-core_1.0.5+dfsg2-4_all.deb
dpkg -i arduino*.deb
```
Login as marc and execute the following commands:
```
cd ~/ChemicalPlant/arduino
make
sudo make upload
```
Once the Arduino sketch is uploaded, it's time to fire up the web interface. To do so:
```
cd ~/ChemicalPlant/webserver
nodejs ./server.js /dev/ttyACM0
```
You should then be able to browse to this machine on port 8080.

## Todo
 - [ ] [Document project goals](../../issues/1)
 - [ ] Breakdown tasks as issues
 - [ ] Finalize Hardware
 - [ ] Finalize Software
 - [ ] Replicate hardware in US
 - [ ] End to end test complete
 - [ ] Running the lab documentation draft complete
