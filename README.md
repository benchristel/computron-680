# Computron 680

The Computron 680 is a virtual machine that runs as a Chrome app.

![Screenshot of a Computron 680 editing this readme file](https://cdn.rawgit.com/benchristel/computron-680/22b593cf/screenshot.png)

Its features include:

- An intuitive, text-based display that allows you to view information using the Latin alphabet you already know and love.
- Integration with modern input devices such as the QWERTY keyboard.
- Native execution of the JavaScript instruction set.
- Full support for any supported host operating system.

## What? How is this different from a webpage?

It's *very* close to just being a webpage.
But because it's a Chrome app,
it can access the filesystem on the host machine,
which webpages can't do.
This means that it can read and write code and documents stored on your
computer,
and you can program it to do just about anything.

## Usage

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

## Boot Directories

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
