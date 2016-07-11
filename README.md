# praesto

Praesto is a tool for presenting [slideshows](https://github.com/ducksoupdev/sample-fullscreen-slideshow-1), [presentations](https://github.com/ducksoupdev/sample-presentation-1), videos and more on multiple clients.

It allows you to manage assets both locally and remote and push them to clients for display in a browser. Each connected client browser registers
with the server ready to display assets. Assets can be pushed to individual or all clients.

## Features

* Admin page
* Unlimited clients
* Add local or remote assets
* Demo assets included
* Push assets to individual or all clients
* Remove assets from clients

## Requirements

* NodeJS/NPM
* Gulp (for development only)

## Installation

1. `git clone https://github.com/ducksoupdev/praesto.git` or [download the project as a zip](https://github.com/ducksoupdev/praesto/archive/master.zip)
2. Run `npm install` from the project directory

## Getting started

### Start the server

1. Run `NODE_ENV=production node bin/www`
2. Browse to the admin page [http://localhost:3000/admin](http://localhost:3000/admin) (change `localhost` to your server hostname or IP address)

### Connecting clients

1. Browse to the home page [http://localhost:3000](http://localhost:3000) (change `localhost` to your server hostname or IP address)
2. Register the client

## Raspberry PI

Praesto is ideal for running on one or more Raspberry PIs. You can run the server on one and then have multiple clients connected to
TVs or monitors.

### Running the server

Make sure you have internet connection then open up the terminal on the PI.

Installing an ARM-version of Node has become easy:

	wget http://node-arm.herokuapp.com/node_latest_armhf.deb
	sudo dpkg -i node_latest_armhf.deb

**Please note** If you have an existing version of node installed, this will need to be removed first `sudo apt-get remove nodejs npm`

You may have to create a symlink to node in `/usr/bin/node` if `node -v` doesn't work:

	sudo ln -s /usr/local/bin/node /usr/bin/node

Install dependencies and update node permissions:

	sudo npm update -g
	sudo npm install -g bower
	sudo chown -R pi:pi /usr/local/lib/node_modules
	npm update -g

Start the server:

	NODE_ENV=production node bin/www

### Make it run on boot

You can define things to run on boot in /etc/rc.local. In that script, you don't have the same $PATH as when you log in,
so just running `node bin/www` won't work.

What you need to do is run the command as the default pi user:

	su pi -c 'NODE_ENV=production node /home/pi/PATH_TO_PRAESTO/bin/www < /dev/null &'

## Assets

Assets are static websites and can be local or remote URLs. The following are some examples:

* Presentations - create your presentations using [Reveal.js](http://lab.hakim.se/reveal-js/) or at [slides.com](https://slides.com)
* Play YouTube videos full screen - `http://www.youtube.com/embed/<vidcode>?autoplay=1` where <vidcode> is the video code on YouTube
* Play Vimeo videos full screen - `http://player.vimeo.com/video/<vidnum>?autoplay=1` where <vidnum> is the video number on Vimeo
* Slide-shows - create your slide-shows using [Cycle2](http://jquery.malsup.com/cycle2/) or other tools
* Static website - create content for display using a static generator

[Check out StaticGen](https://www.staticgen.com) for top open-source static site generators.

### Adding local assets

Local assets must be added to the `src/public/assets` directory. Create a directory for your asset and ensure it has a default `index.html` page.
Local assets are static websites containing any type of resource - images, animations, video or HTML content. You can create it in any way
you like as long as the links within it are relative and there is an index.html page.

Once you have added your files, you can open the admin page and it will detect new local assets and allow you to add them ready for pushing to clients.

### Sample assets

There are two demo assets provided. You can download and use them as blueprints for your own assets.

* [Sample full-screen slide-show](https://github.com/ducksoupdev/sample-fullscreen-slideshow-1)
* [Sample presentation](https://github.com/ducksoupdev/sample-presentation-1)

## Coming soon

[See the TODO](docs/todo.md) for features coming soon.

## Further information

If you encounter any issues or have any feedback, please [send me a tweet](http://twitter.com/ducksoupdev) or raise a bug on the issue tracker.
