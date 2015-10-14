'use strict';

// load env variables
require('dotenv').load();

// load deps
var https = require('https');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

// --------------------------------

// scrape profiles
if (argv.s || argv.scrape) {
  var inputPath = '/repos/open-source-society/computer-science/issues/31/comments?per_page=700';
  var outputPath = './data/profiles.json';

  var Profiles = new Profiles();
  var options = {
    host: 'api.github.com',
    port: 443,
    path: argv._ || inputPath,
    method: 'GET',
    headers: {
      'Authorization': 'token ' + process.env.GHTOKEN,
      'Content-Type': 'application/json',
      'User-Agent': 'node.js'
    },
    input: Profiles.inputs.scrape,
    // if --filter isn't set use filters.prepare
    filter: (argv.filter ? Profiles.filters[argv.filter] : Profiles.filters.prepare),
    // if --output isn't set use outputs.print
    output: (argv.output ? Profiles.outputs.save : Profiles.outputs.print),
    save: argv.output || outputPath
  };
  Profiles.run(options);
}
function Profiles(options) {

  // methods for processing profile data
  //   scrape - scrapes content directly from GitHub
  //  offline - loads data from an offline dump
  // --------------------------------
  this.inputs = {};

  // load data from file
  this.inputs.offline = (options, callback) => {
    fs.readFile(options, (err, data) => {
      if (err) {
        console.log(err);
      }
      options.filter(data, options, callback);
    });
  };

  // scrape data from github issues
  this.inputs.scrape = (options, callback) => {
    let req = https.get(options, function (res) {
      let data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        options.filter(data, options, callback);
      });
    });
    req.on('error', function (e) {
      console.log(e.message);
    });
  };

  // methods for filtering profile data
  //  none - doesn't process the data
  //  prettify - makes json human-readable
  //  plaintext - extracts and saves profiles as plaintext
  //  prepare - extracts and saves profiles as json
  // --------------------------------

  this.filters = {};

  this.filters.none = (output, options, callback) => {
    options.output(output, options, callback);
  };

  // prettify json, for human-readable data
  this.filters.prettify = (output, options, callback) => {
    output = JSON.parse(output);
    output = JSON.stringify(output, null, 4);
    /// pass to options.output
    options.output(output, options, callback);
  };

  // plaintext, extracts and flattens the profiles as plaintext
  this.filters.plaintext = (data, options, callback) => {
    let output = '';
    JSON.parse(data).forEach((k, v) => {
      if (k.body !== '') {
        output += k.body;
      }
    });
    // pass to options.output
    options.output(output, options, callback);
  };

  // prepare, extracts the user data and prepares it for import
  this.filters.prepare = (data, options, callback) => {
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
    // make the output .json human-readable
    output = JSON.stringify(output, null, 4);
    console.log(count + ' records processed');
    // pass to options.output
    options.output(output, options, callback);
  };

  // extract profile helper method, regex matches, verifies and extracts data
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

  // methods for outputting profile data
  //  slient - outputs nothing (for debugging)
  //  print - prints the output to the console
  //  save - saves the output as a file
  // --------------------------------

  this.outputs = {};

  // no output - used for debugging
  this.outputs.silent = (data, options, callback) => {
    return;
  };

  // print - prints the output to the command line
  this.outputs.print = (data, options, callback) => {
    console.log(data);
  };

  // save - saves the output to a file
  this.outputs.save = (data, options, callback) => {
    fs.writeFile(options.save, data, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('Saved as ' + options.save);
    });
  };

  // --------------------------------

  this.run = (options) => {
    //console.log(options);
    options.input(options, options.output);
  };
}

// --------------------------------


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
