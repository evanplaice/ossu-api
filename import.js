var https = require('https');
var fs = require('fs');
// var credentials = require('./credentials.json');
// var authorization = new Buffer(credentials.username + ":" + credentials.password, 'ascii').toString('base64');
var authorization = require('./credentials.json').token;

// --------------------------------

var methods = {};

// load data from file
methods.offline = (options, callback) => {
  fs.readFile(options.path, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (filter !== false) {
      options.filter(data, options, callback);
    } else {
      callback(data, options, callback);
    }
  });
};

// scrape data from github issues
methods.scrape = (options, callback) => {
  var req = https.get(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      console.log('Scrape successful...');
      if (filter !== false) {
        options.filter(data, options, callback);
      } else {
        callback(data, options, callback);
      }
    });
  });
  req.on('error', function (e) {
    console.log(e.message);
  });
};

// --------------------------------

var filters = {};

filters.none = (output, options, callback) => {
  callback(output, options, callback);
};

// prettify json, for human-readable data
filters.prettify = (output, options, callback) => {
  output = JSON.parse(output);
  output = JSON.stringify(output, null, 4);
  callback(output, options, callback);
};

// plaintext, extracts and flattens the profiles as plaintext
filters.plaintext = (data, options, callback) => {
  var output = '';
  JSON.parse(data).forEach((k, v) => {
    if (k.body !== '') {
      output += k.body;
    }
  });
  callback(output, options, callback);
};

// prepare, extracts the user data and prepares it for import
filters.prepare = (data, options, callback) => {
  var output = [];
  var count = 0;
  JSON.parse(data).forEach((k, v) => {
    // only parse the issue body
    if (k.body !== '') {
      var profile = extractDetails(k.body);
      if (profile !== null) {
        count++;
        output.push(profile);
      }
    }
  });
  output = JSON.stringify(output, null, 4);
  console.log(count + ' records processed');
  callback(output, options, callback);
};

// extract profile data, regex match and extract data
function extractDetails (body) {
  var profile = {};
  profile.fullname = body.match(/\*\*Name\*\*: (.+)/im);
  if (!profile.fullname) {
    return null;
  }
  profile.fullname = profile.fullname[1];
  var github = body.match(/\*\*GitHub\*\*: \[(.+)\]\((.+)\)/im);
  if (github) {
    profile.github = {};
    var gname = github[1].match(/@.+/i);
    if (gname) {
      profile.github.name = gname[0];
    }
    var glink = github[2].match(/(http:\/\/|https:\/\/).+/i);
    if (glink) {
      profile.github.link = glink[0];
    }
  }
  var twitter = body.match(/\*\*Twitter\*\*: \[(.+)\]\((.+)\)/im);
  if (twitter) {
    profile.twitter = {};
    var tname = twitter[1].match(/@.+/i);
    if (tname) {
      profile.twitter.name = tname[0];
    }
    var tlink = twitter[2].match(/(http:\/\/|https:\/\/).+/i);
    if (tlink) {
      profile.twitter.link = tlink[0];
    }
  }
  var linkedin = body.match(/\*\*LinkedIn\*\*: \[(.+)\]\((.+)\)/im);
  if (linkedin) {
    profile.linkedin = {};
    var lname = linkedin[1].match(/@.+/i);
    if (lname) {
      profile.linkedin.name = lname[0];
    }
    var llink = linkedin[2].match(/(http:\/\/|https:\/\/).+/i);
    if (llink) {
      profile.linkedin.link = llink[0];
    }
  }
  var website = body.match(/\*\*Website\*\*: \[(.+)\]\((.+)\)/im);
  if (website) {
    profile.website = {};
    var wname = website[1].match(/@.+/i);
    if (wname) {
      profile.website.name = wname[0];
    }
    var wlink = website[2].match(/(http:\/\/|https:\/\/).+/i);
    if (wlink) {
      profile.website.link = wlink[0];
    }
  }
  return profile;
}

// --------------------------------

var outputs = {};

// no output - used for debugging
outputs.silent = (data, options, callback) => {
  return;
};

// print - prints the output to the command line
outputs.print = (data, options, callback) => {
  console.log(data);
};

// save - saves the output to a file
outputs.save = (data, options, callback) => {
  fs.writeFile(options.output, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Import saved as ' + options.output);
  });
};

// --------------------------------

var method = methods.offline;
var filter = filters.prepare;
var output = outputs.save;
// var inputPath = '/repos/open-source-society/computer-science/issues/31/comments?per_page=700';
// var inputPath = '/repos/open-source-society/computer-science/issues/109/comments';
var inputPath = './data/issues.json';
var outputPath = './data/profiles.json';

var options = {
  host: 'api.github.com',
  port: 443,
  path: inputPath,
  method: 'GET',
  headers: {
    'Authorization': 'token ' + authorization,
//    'Authorization': 'Basic ' + authorization,
    'Content-Type': 'application/json',
    'User-Agent': 'node.js'
  },
  filter: filter,
  output: outputPath
};

method(options, output);
