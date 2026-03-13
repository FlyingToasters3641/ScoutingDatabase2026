# Installing sqlite3 if failing during npm install

## Windows

If `npm install` fails when installing `sqlite3`, follow these steps. Common causes are:
- Using a Node.js version with no prebuilt sqlite3 binary (e.g. very new Node releases)
- Missing Visual Studio C++ build tools (MSBuild) or Python required by `node-gyp`

Steps to fix:

- **1) Install Visual Studio Build Tools (Desktop development with C++)**
	- Download "Build Tools for Visual Studio 2022" from https://visualstudio.microsoft.com/downloads/ and select the "Desktop development with C++" workload.  Use the "Install Additioanl Tools for Node.js" in the Windows Start Menu.  Make sure the latest Windows 11 SDK is installed.

- **2) Configure npm/node-gyp (optional)**
	- `npm install -g node-gyp`
	- `npm config set msvs_version 2022` (Maybe)

- **3) Build sqlite3 locally (if needed)**
	- From `server/` run:

```bash
npm install sqlite3 --build-from-source --verbose
```

- **6) Then install remaining dependencies**

```bash
npm install --verbose
```

Verification commands:

- `node -v` (should show an LTS version like `v20.x`)
- `python --version`
- `where msbuild` (should find MSBuild.exe when Visual Studio Build Tools installed)

Notes:
- Do not rely on the deprecated `windows-build-tools` npm package; use the official Visual Studio Build Tools installer instead.
- If you cannot change Node version system-wide, use `nvm-windows` to switch for this project.
- If installation still fails, paste the full `npm install` error output (especially any `node-gyp`/`MSBUILD` lines) and I can help interpret them.

winget install -e --id Python.Python.3.12
winget install -e --id Microsoft.VisualStudio.2022.BuildTools --override "--wait --passive --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"

Use env vars in cmd:
set GYP_MSVS_VERSION=2022 && set npm_config_msvs_version=2022




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