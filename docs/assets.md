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

* Typescript for client
* Upgrade to Angular 2
* Ability to rotate multiple assets
* Sticky clients
  * Set default assets on connection
* Asset uploader

## Further information

If you encounter any issues or have any feedback, please [send me a tweet](http://twitter.com/ducksoupdev) or raise a bug on the issue tracker.
