# Computron 680

The Computron 680 is a really crappy virtual machine that runs as a Chrome app.

It `eval`s JavaScript that you feed into it, displays text on a terminal UI, and responds to keyboard input.

## What? How is this different from a webpage?

It's *very* close to just being a webpage. But because it's a Chrome app, it can access the filesystem on the host machine, which webpages can't do. This means that it can read and write code and documents stored on your computer, and you can program it to do just about anything.

## Usage

1. Clone this repo.
1. Install the Chrome app. Go to [chrome://extensions](chrome://extensions) and click `Load unpacked extension...`. Select the repo directory.
1. Run the Chrome app by clicking the `Launch` link.
1. The app will prompt for a directory. For best results, pick a directory containing a `boot.js` file—otherwise, your Computron's behavior will be quite uninteresting. This repo contains a sample `boot.js` file.
