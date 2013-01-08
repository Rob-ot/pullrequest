var git = require("gift")

repo = git("./")

repo.remotes(function (err, remotes) {
  console.log(err, JSON.stringify(remotes))
})