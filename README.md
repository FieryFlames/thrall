# thrall

Odin protocol implemented with WebUSB in JavaScript

I am not liable in any way if your phone turns into a spicy pillow, decides to turn itself into a paperweight, or anything else.

# status

Right now, thrall is EXTREMELY basic, and can only connect, begin a session, and end a session.

a lot of stuff is missing and some other stuff is hardcoded (like the endpoints to send stuff to)

# testing

If you'd really like to try thrall in it's current state, you'll need a WebUSB capable browser (basically anything chromium), and node.js

  - go to edge://flags/#unsafely-treat-insecure-origin-as-secure (the exact url may differ based on your browser, mine is edge as I use edge to test this)
  - enable the flag and add http://127.0.0.1:8080 to the list, then restart your browser
  - clone this repo
  - cd into the cloned repo
  - run npx http-server
  - go to http://127.0.0.1:8080/src/index.html
  - make sure your device is in download mode
  - now you can click connect, begin session, and end session. they should all do the right things.

# thanks to

kdrag0n for fastboot.js (some of the code from fastboot.js is used in thrall)

Benjamin-Dobell / Glass enchinda for Heimdall (used the source to figure out how odin protocol works)

# license

Pretty sure it's MIT, I still need to sort out the licensing as I'm not sure if i use heimdalls, fastboot.js, both, or my own.