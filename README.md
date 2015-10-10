# OSSU API

**Open Source Society University API server**

### Install the server
Take a look at `INSTALLING.md`

### Configure environment
Take a look at `.envsample` and rename it to `.env`. Edit the values acording to your environment (please do not bring `.env` into source control)

### Start the server
```
npm start
```

### Test an api route

`curl localhost:PORT/api/sample`


# Project Structure
* `/api/index.js` is the base api file, from here, we load models.
* `/auth/index.js` will be the authentication api file. Add auth strategies to files in thie `/auth` folder
* `/models` is the folder for individual model files