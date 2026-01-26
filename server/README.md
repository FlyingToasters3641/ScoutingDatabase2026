# Installing sqlite3 if failing during npm install


## Ubuntu:
Need to install missing required build tools and an older version of Python -- 3.11.x.  Python 3.12+ removed tools to build the sqlite3 packages. NOTE: Do not need to remove the newer version, just need to add 3.11

### 1. Install System Build Tools and Dependencies

The node-gyp tool, which is used to compile native add-ons, requires specific build tools. Install these on your Ubuntu system using apt: 

```
sudo apt update
sudo apt install build-essential gcc g++ make libsqlite3-0 libsqlite3-dev
```

### 2. Update system packages and install prerequisites:

```
sudo apt update
sudo apt install software-properties-common -y
```

### 3. Add the deadsnakes PPA repository:
Preparing to install older verion of Python
```
sudo add-apt-repository ppa:deadsnakes/ppa
```
Press Enter when prompted.

###  4. Update your package list again:
```
sudo apt update
```

###  5. Install Python 3.11:
```
sudo apt install python3.11
```
This command installs the latest available 3.11 point release (which supersedes 3.11.9).

###  6. Verify the installation:
```
python3.11 –version
```
###  7. Force npm to use older version of pyhton for instlling sqlite3
```
npm install sqlite3 –python=python3.11
```
###  8. Ok to install all other npm packages the normal way
```
npm install
```