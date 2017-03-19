# CardCast

> A simple chromecast tool for collaborative presentations.

## Team

  - __Product Owner__: David Pollan
  - __Scrum Master__: Jerry Krusinski
  - __Development Team Member__: Jin Chung

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

To start using CardCast, simply go to the site and create an account. You start with an empty deck, but creating cards is easy, just click on the yellow plus button in the lower rigth corner. Give your new card a title and start typing your markdown. The blue preview shows an exact replica of how your card appears once cast to the screen. If you're unfamiliar with markdown, you can visit the link to see some of the powerful formatting opitons available to you. Once you're satisfied with your first card, clicking on the yellow 'create card' button will save it to your deck. Now, when it's your turn to cast in a presentation, simply click the 'cast' button and watch your card come to life.

## Requirements

- [Node JS](http://nodejs.org) 5.0.0
- [NPM](http://npmjs.com) 3.3.6
- [Bower](http://bower.io) 1.8.0
- [MongoDB](http://mongodb.com) 3.4.2
- [Chromecast](https://www.google.com/intl/en_us/chromecast/)
- [Chrome Browser](https://www.google.com/chrome/)

## Development

### Set Up A Developer Chromecast

Register your Chromecast device to allow developer capabilities. Sign in to the [Google Cast Developer Console](https://cast.google.com/publish/#/overview) and click __Add New Device__. Enter your Chromecast's serial number. Make sure to restart your device at least 15 minutes after registering to apply the changes.

### Register Receiver App URL

Whenever an application is initialized on a Chromecast, it goes to the Google Cast Application Registry to look up the url of the single-page receiver app. During development, this is hosted on your local computer. App registration takes a while to propagate, so make sure your development device has a reserved Local Area Network (LAN) IP Address. Look up how to do this on your router with DHCP Reservations. This ensures that the app registration only has to happen one time.

To register an app, sign in to the [Google Cast Developer Console](https://cast.google.com/publish/#/overview) and click __Add New Application__. Select __Custom Receiver__ as the next option, and proceed to fill out the information. Your receiver application url should use the format `http://<YOUR RESERVED IP>:8000/receiver` and will end up looking something like `http://192.168.1.123:8000/receiver`. The __APP ID__ you receive will be what the sender app will use to initialize the receiver app on the Chromecast. It takes about 30 minutes for registration to completely propagate.

### Set Up Config

Add the __APP ID__ you received from the application registration to a file called `config.js` that lives in your `clients/assets/config/` directory. This file is included in the `.gitignore` file and should remain that way. A template for the config file is included in `clients/assets/config/config.example.js`.

### Installing Dependencies

In a separate terminal window, start MongoDB with the command `mongod`. This process should remain open during development.

From within the root directory:

```sh
npm install
bower install
nodemon server/server.js --ignore clients/
```

Ignoring the clients folder ensures server sessions aren't destroyed every time you make a change on the front end.

### Developing On Chromecast

Now you should be able to access the sender application from your browser at `http://localhost:8000`. To cast the receiver application, go to the __Chrome Browser Menu__ and select __Cast__. A window should appear listing all of the Chromecasts available on your LAN. Select the Chromecast you registered on the Google Cast Developer Console. The Chromecast should load the __Receiver URL__ that's associated with the __APP ID__ in the sender application. If the setup was done correctly, this should be pointing to the server you have just set up on port 8000 on your local machine.

To access the __Chromecast Debugger Window__, go to `chrome://inspect` in your browser _while the application is casting_. You should see your developer Chromecast listed on the page. Click the `inspect` link to open up the Chromecast debugger. This is where you can access the console and all of the other development tools for the receiver side application. You can also access the debugger window by finding your Chromecast's LAN IP and going to `http://<YOUR_CHROMECAST_IP>:9222` in your browser. 

### Roadmap

View the project roadmap [here](https://github.com/pegatech/cardcast/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
