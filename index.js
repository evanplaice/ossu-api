'use strict';

// load deps
let app = require('./helpers/server');

app.listen(process.env.PORT || 8080, () => {
  console.log('Server listening on port', process.env.PORT);
});
