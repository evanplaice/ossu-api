# OSSU API

**Open Source Society University API server**

# Installation

### 1. Clone the repository

  ```bash
  git clone git@github.com:open-source-society/ossu-api.git
  ```

### 2. Load the dependencies (via NPM)

```bash
npm install
```

### 3a. Install MongoDB (via homebrew)

```bash
brew update && brew install mongodb
```

### 3b. Install MongoDB (manual)

Download the binaries
```bash
curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.0.6.tgz
```

Extract the binaries
```bash
tar -zxvf mongodb-osx-x86_64-3.0.6.tgz
```

Copy the extracted files to the target directory
```bash
mkdir /opt/mondodb
cp -R -n mongodb-osx-x86_64-3.0.<6 class="tgz"></6>
```

Add MongoDB to the **PATH** variable
```bash
export PATH=/opt/mongodb/bin:$PATH
```

*Note: To permanently update PATH add the install directory to ~/.bashrc.*

###4. Create the data folder
```bash
mkdir data
```

###5. Startup up MongoDB
```bash
mongod --dbpath ./data
```

# Dependencies

- MongoDB
