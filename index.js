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

  open("http://" + github + "/pull/new/" + branch.name)
})
