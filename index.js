#!/usr/bin/env node

var open = require("open")
var gift = require("gift")
var _pick = require("lodash.pick")

var repo = gift("./")

function fatalError (err) {
  console.error(err)
  process.exit(1)
}

function gitError (err) {
  fatalError("Git error: " + err)
}

function normalizeRepoUrl (url) {
  var stripped = url
    .replace("git://", "")
    .replace("git@", "")
    .replace("https://", "")
    .replace(":", "/")
    .replace(/\.git$/, "")
  return "http://" + stripped
}

function listRemotes (cb) {
  repo.config(function (err, config) {
    if (err) return cb(err)

    var urlConfigs = _pick(config.items, function (value, key) {
      return key.match(/remote\.\w+\.url/)
    })

    var urls = {}
    for (var key in urlConfigs) {
      urls[key.split(".")[1]] = urlConfigs[key]
    }

    cb(null, urls)
  })
}

function preferredUrl (remotes) {
  var remote
  if (remotes["pullrequest"]) {
    remote = "pullrequest"
  }
  else if (remotes["origin"]) {
    remote = "origin"
  }

  if (!remote) {
    return fatalError("No 'pullrequest' or 'origin' remote found, please add an origin. 'git remote add origin git@github.com:me/myrepo.git'")
  }

  return remotes[remote]
}


listRemotes(function (err, remotes) {
  if (err) return gitError(err)

  var gitUrl = preferredUrl(remotes)
  var repoUrl = normalizeRepoUrl(gitUrl)

  repo.branch(function (err, branch) {
    if (err) return gitError(err)

    var sourceBranch = branch.name
    var destinationBranch

    if (process.argv[2] === "to") {
      destinationBranch = process.argv[3]
    }

    if (destinationBranch) {
      open(repoUrl + "/pull/new/" + destinationBranch + "..." + sourceBranch)
    }
    else {
      open(repoUrl + "/pull/new/" + sourceBranch)
    }
  })
})
