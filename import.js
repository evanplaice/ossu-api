'use strict';

// load env variables
require('dotenv').load();

// load deps
var https = require('https');
var fs = require('fs');

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
  let req = https.get(options, function (res) {
    let data = '';
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
  let output = '';
  JSON.parse(data).forEach((k, v) => {
    if (k.body !== '') {
      output += k.body;
    }
  });
  callback(output, options, callback);
};

// prepare, extracts the user data and prepares it for import
filters.prepare = (data, options, callback) => {
  let output = [];
  let count = 0;
  JSON.parse(data).forEach((k, v) => {
    // only parse the issue body
    if (k.body !== '') {
      let profile = extractDetails(k.body);
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
  let profile = {};
  profile.fullname = body.match(/\*\*Name\*\*: (.+)/im);
  if (!profile.fullname) {
    return null;
  }
  profile.fullname = profile.fullname[1];
  let github = body.match(/\*\*GitHub\*\*: \[(.+)\]\((.+)\)/im);
  if (github) {
    profile.github = {};
    let name = github[1].match(/@.+/i);
    if (name) {
      profile.github.name = name[0];
    }
    let link = github[2].match(/(http:\/\/|https:\/\/).+/i);
    if (link) {
      profile.github.link = link[0];
    }
  }
  let twitter = body.match(/\*\*Twitter\*\*: \[(.+)\]\((.+)\)/im);
  if (twitter) {
    profile.twitter = {};
    let name = twitter[1].match(/@.+/i);
    if (name) {
      profile.twitter.name = name[0];
    }
    let link = twitter[2].match(/(http:\/\/|https:\/\/).+/i);
    if (link) {
      profile.twitter.link = link[0];
    }
  }
  let linkedin = body.match(/\*\*LinkedIn\*\*: \[(.+)\]\((.+)\)/im);
  if (linkedin) {
    profile.linkedin = {};
    let name = linkedin[1].match(/@.+/i);
    if (name) {
      profile.linkedin.name = name[0];
    }
    let link = linkedin[2].match(/(http:\/\/|https:\/\/).+/i);
    if (link) {
      profile.linkedin.link = link[0];
    }
  }
  let website = body.match(/\*\*Website\*\*: \[(.+)\]\((.+)\)/im);
  if (website) {
    profile.website = {};
    let name = website[1].match(/@.+/i);
    if (name) {
      profile.website.name = name[0];
    }
    let link = website[2].match(/(http:\/\/|https:\/\/).+/i);
    if (link) {
      profile.website.link = link[0];
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

var method = methods.scrape;
var filter = filters.prepare;
var output = outputs.print;
var inputPath = '/repos/open-source-society/computer-science/issues/31/comments?per_page=700';
// var inputPath = '/repos/open-source-society/computer-science/issues/109/comments';
// var inputPath = './data/issues.json';
var outputPath = './data/profiles.txt';

var options = {
  host: 'api.github.com',
  port: 443,
  path: inputPath,
  method: 'GET',
  headers: {
    'Authorization': 'token ' + process.env.GHTOKEN,
    'Content-Type': 'application/json',
    'User-Agent': 'node.js'
  },
  filter: filter,
  output: outputPath
};

method(options, output);
