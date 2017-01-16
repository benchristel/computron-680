# Computron 680

The Computron 680 is a virtual programmable computer, available as a Chrome App.

![Screenshot of a Computron 680 editing this readme file](https://cdn.rawgit.com/benchristel/computron-680/22b593cf/screenshot.png)

## Why?

There is no one big reason I'm working on this; rather, there are lots of little reasons that add up to a big reason.

- I'm a control freak and long for a programming environment whose every aspect is subject to my [steady needle](https://xkcd.com/378/) and scrutinous gaze.
- I want to write and run JavaScript on a Chromebook, and a working Computron 680 will make that dream possible. (Why a Chromebook? I'm too cheap to buy a real laptop, but I like the idea of carrying around a programming environment with me because then everyone around me can see how ridiculously productive and antisocial I am.)
- I'm some kind of [Retrofuturist](https://en.wikipedia.org/wiki/Retrofuturism). I fall asleep to the sound of HDDs seeking. I dream of owning a [Model M](https://en.wikipedia.org/wiki/Model_M_keyboard). And I miss those monochrome search terminals they used to have at the library! But at the same time, I want to expand on the promise of all of those cool things with, well, JavaScript.
- I dislike the proliferation of [the Internet](https://en.wikipedia.org/wiki/Internet) (though I like [The Internet](http://www.npr.org/2015/08/16/432216332/a-band-called-the-internet-preaching-ego-death)) and dream of a world in which I exchange computer programs with people by going to their house and swapping thumb drives or [other portable media](https://en.wikipedia.org/wiki/Floppy_disk).
- I object to the assumption that average consumers of technology must live near the (perpetually updating) bleeding edge as we technologists push the envelope of what's possible. I'd really prefer the software I rely on to be stable and well within the bounds of what we know how to do, and I suspect others do too.

## Do you actually expect people to use this?

No.

## Installation

1. Clone this repo.
1. Ensure you have [NodeJS](https://nodejs.org/) and [NPM](https://www.npmjs.com/) installed.
1. `cd` into the repo directory and run `./build.sh`.
1. Install the Computron 680 Chrome app.
   1. Go to [chrome://extensions](chrome://extensions).
   1. Enable developer mode.
   1. Click `Load unpacked extension...` and select the repo folder.
1. Run the Chrome app by clicking the `Launch` link next to the icon.
1. The app will prompt you to choose a folder.
   Choose the `computron-680` repo folder.
   (See the explanation of boot directories below to understand why.)

### Boot Directories

The whole point of a Computron is that you can program it to do anything.
The flip side of this is that when a Computron first starts up,
it has very little built-in knowledge of how to do things.
The only thing it knows how to do is look for code to run and then run it.
In a typical Computron setup, this "bootstrapping" process
loads an _operating system_--a program that lets you run other
programs, and provides basic services like reading and editing files.
From there, you can program the system to do whatever you require.

What this means for you is that when your Computron starts
you need to tell it where to look for its bootstrapping code.
By convention, bootstrapping code is always stored in
a file named `boot.js`.
If you point the Computron at a folder on your computer that
contains a `boot.js` file,
it will load that file and try to run it.

---

**WARNING: A boot.js file can potentially read, modify,**
**or delete any files within its containing folder.**
**It can also potentially send the contents of those files**
**to any third party over the Internet.**
**Do not use a boot.js file unless you trust its author**
**and have verified that it actually came from that author.**
**In other words, treat boot.js files with the same caution**
**you would any other program downloaded from the Internet.**

---

After bootstrapping, the Computron can create, read, edit,
and delete files within the folder you selected.
This allows you to keep your entire Computron system--
both the operating system and your files--
within one folder on your computer.
You can even put it on a USB thumb drive and carry
it around between physical computers!
