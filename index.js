#!/usr/bin/env node

var pkg = require("package")
var open = require("open")
var git = require("gift")

var repository = pkg("./").repository

if (!repository || !repository.url) {
  console.error("Invalid package.json repository. http://package.json.nodejitsu.com/")
  process.exit(1)
}

var url = repository.url

var github = url
  .replace("git://", "")
  .replace("git@", "")
  .replace("https://", "")
  .replace(":", "/")
  .replace(/\.git$/, "")

git("./").branch(function (err, branch) {
  if (err) {
    console.error("Git error: " + err)
    process.exit(1)
  }

  var destinationBranch = null
  var sourceBranch = branch.name

  if (process.argv[2] === "to") {
    destinationBranch = process.argv[3]
  }

  if (destinationBranch) {
    open("http://" + github + "/pull/new/" + destinationBranch + "..." + sourceBranch)
  }
  else {
    open("http://" + github + "/pull/new/" + sourceBranch)
  }
})
