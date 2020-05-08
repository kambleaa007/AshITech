<img src="https://raw.githubusercontent.com/kambleaa007/AshITech/master/json-server/assets/images/logo.png" align="right" />

# README [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome#readme) [![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://shields.io/) [![कुछ भी पूछो!](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/Naereen/ama) [![Github all releases](https://img.shields.io/github/downloads/Naereen/StrapDown.js/total.svg)](https://GitHub.com/Naereen/StrapDown.js/releases/)

## :point_right: Live at https://kambleaa007.github.io/AshITech/index

###### Warning As it is practice purposes {TypeScript is avoided for complexity}

# ReactJS

Project about platform for it services and eating menu listings

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

:writing_hand: What things you need to install the software and how to install them

node [![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()

npm [![NPM License](https://img.shields.io/npm/l/all-contributors.svg?style=flat)](https://github.com/tterb/hyde/blob/master/LICENSE)

heroku CLI, account [![Node](https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen)](https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen)

windows cmd powershell, linux terminal, mac terminal [![Platforms](https://img.shields.io/badge/platform-linux--64%20%7C%20win--32%20%7C%20osx--64%20%7C%20win--64-lightgrey)](https://img.shields.io/badge/platform-linux--64%20%7C%20win--32%20%7C%20osx--64%20%7C%20win--64-lightgrey)

chrome or any browser with react redux DevTools addOns plugins [![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

### Installing

:writing_hand: A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
git clone
cd project
npm i or yarn install
npm start
npm run deploy
heroku login
```

```
visit http://localhost:4200/
```

<!-- <p align="center">
  <img src="https://raw.githubusercontent.com/kambleaa007/AshITech/master/json-server/assets/images/logo.png" alt="logo" height="100" width="100"></br>
  <img src="https://raw.githubusercontent.com/kambleaa007/AshITech/master/json-server/assets/images/screenshots/1.JPG" alt="logo" height="100" width="200"></br>
  <img src="https://raw.githubusercontent.com/kambleaa007/AshITech/master/json-server/assets/images/screenshots/2.JPG" alt="logo" height="100" width="200"></br>
  <img src="https://raw.githubusercontent.com/kambleaa007/AshITech/master/json-server/assets/images/screenshots/3.JPG" alt="logo" height="100" width="200"></br>
  <img src="https://raw.githubusercontent.com/kambleaa007/AshITech/master/json-server/assets/images/screenshots/4.JPG" alt="logo" height="100" width="200"></br>
  <img src="https://raw.githubusercontent.com/kambleaa007/AshITech/master/json-server/assets/images/screenshots/5.JPG" alt="logo" height="100" width="200">
</p> -->

## Running the tests

jest karma jasmin

## Deployment

:writing_hand:
How to deploy this on a live system
use github pages gh-pages
npm run deploy
circle CI pipelines

## Built With

- [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [ReactJS](https://reactjs.org/) - UI javascript library
- [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps
- [JSON Server](https://github.com/typicode/json-server) - Get a full fake REST API with zero coding in less than 30 seconds (seriously)
- [Heroku](https://www.heroku.com/) - Cloud Application Platform

## Contributing

Please read [CONTRIBUTING.md](https://github.com/kambleaa007/AshITech/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
[![stackoverflow](https://img.shields.io/badge/stackoverflow%20reputation-1100-yellow)](https://img.shields.io/badge/stackoverflow%20reputation-1100-yellow)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

See also the list of [contributors](https://github.com/kambleaa007/AshITech/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/kambleaa007/AshITech/blob/master/LICENSE) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

:pencil2:

```
git clone https://github.com/kambleaa007/AshITech.git
npm i
node start
Just That Only
```

#This is Git Clone AshITech Repo

:pencil2:
You might need GitCloneJsonServer Repo

NOW Backend is at json-server folder
running of server is must

```
doTest>cd json-server
doTest\json-server>json-server --watch db.json -d 2000 -p 3001
```

#### Heroku learnings work

:pencil2:

```
open git check for json-server-heroku
clone it
cd into it
change db.json
keep package.json
add assets folder
```

```
> heroku login
> heroku create jsonserverashitech
> git init
> heroku git:remote -a jsonserverashitech
> git add .
> git commit -am "make it better"
> git push heroku master
```

#### Heroku

:pencil2:
After Heroku server code updation

```
> heroku login
> git pull
> git add .
> git commit -am "added"
> git push heroku master
```

```
After modification in the code
you might wonder the gh pages
you just need to run command
npm run deply
package.json have its brach
and command exposed
```

#### Now use json server auth

:pencil2:
new apis added are,

```
https://jsonserverashitech.herokuapp.com/login
https://jsonserverashitech.herokuapp.com/register
GET-
https://jsonserverashitech.herokuapp.com/users
POST-
https://jsonserverashitech.herokuapp.com/users
BODY- JSON
{
"email": "XYZ@XYZ.com",
"password": ""
}
> npm install -D json-server-auth
Create a db.json file with a users collection :
{
"users": []
}
```

then register users,
try login,
take access tokens,
store as cookie or add header "Authorization =xuhnkmkl"

json-server db.json -m ./node_modules/json-server-auth
==>with json-server installed globally and json-server-auth installed locally

json-server-auth db.json
==>with json-server-auth installed globally

to run, if not installed -> npm install -g json-server
now run,
npx json-server --watch db.json

#### GitHub Pages gh-pages branch

:pencil2:

```
1. need to add `homepage` in `package.json`
   e.g. "homepage": "link-to-your-repository"
   our case it is
   "homepage": "https://kambleaa007.github.io/AshITech"

2. need predeploy and deploy inside scripts of package.json

"predeploy": "yarn run build",
"deploy": "gh-pages -d build",

3. on terminal run
   npm run deploy
   yarn run deploy

this is gonna pushes your built file to `gh-pages` branch on your remote repo
```

### CircleCI

:pencil2:

```
create folder .circleci
add config.yml file
add content

version: 2
jobs:
build:
docker:

- image: circleci/ruby:2.4.1
  steps:
- checkout
- run: echo "A first hello"
```

# Git Learnings

:pencil2:

```
git clone
git add .
git add \*

git commit -m "MESSAGE_STRING_HERE"
git push

git pull

git checkout -b BRANCH_NAME
-- create and switch to branch
git checkout BRANCH_NAME
-- switch to branch

git status
git pull
git add .
git push --set-upstream origin BRANCH_NAME
-- Need, for first commit only
git push
-- Works, for next commits

git checkout master
-- switch back to master
git merge BRANCH_NAME
-- on master merge your branch now
-- now commits will be on master too

git branch -d BRANCH_NAME
-- delete branch locally only not on github

git push origin --delete BRANCH_NAME
-- delete branch on remote
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
