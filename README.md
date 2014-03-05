pullrequest
===========

A simple command line tool to open your browser to a GitHub pullrequest page.

Install: `sudo npm install -g pullrequest`

Then run `pullrequest` to open your browser with the diff from your current branch to your GitHub default branch (master).

To change the target branch run `pullrequest to release3` to open your browser with a diff from your current branch to release3.

To use a github remote other than `origin` you can add a `pullrequest` origin like this: `git remote add pullrequest git@github.com:me/myrepo.git`.
