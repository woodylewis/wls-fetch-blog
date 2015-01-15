# Minimal version of angular-seed project
This project shows a simple application that uses a service to retrieve blog posts.

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

The project uses a number of node.js tools to initialize and test angular-seed. You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone angular-seed

Clone the angular-seed repository using [git]:

```
git clone https://github.com/angular/angular-seed.git
cd angular-seed
```

If you just want to start a new project without the angular-seed commit history then you can do:

```bash
git clone --depth=1 https://github.com/angular/angular-seed.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

Project is preconfigured `npm` to automatically run `bower` so simply do:

```
npm install
```

This project also uses angular-bootstrap
```
bower install angular-bootstrap
```


Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes it easier to serve the files by a webserver.*

### Run the Application

The project is preconfigured  with a simple development web server.  The simplest way to start this server is:

```
npm start
```