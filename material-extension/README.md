# Materialize CSS Chrome extension template
Materialize CSS Chrome extension template library powered template for creating your own chrome extension! I was inspired by the Google Chromecast extension

* * *

## About
In this repository you can find a new fresh Chrome Extension KIT to create your own material design extension with Materialize CSS & integrated jQuery support!

#### Screenshot: popup.html
![](https://raw.githubusercontent.com/onigetoc/Materialize-CSS-Chrome-Extension-template/gh-pages/img/screenshot1.png)

#### Screenshot: options.html
![](https://raw.githubusercontent.com/onigetoc/Materialize-CSS-Chrome-Extension-template/gh-pages/img/screenshot2.png)


## Installation
Download ZIP, unzip and then go to <pre><code>chrome://extensions</code></pre> then switch the "Developer mode" on and then click on "load unpacked extension" and find your extension
## Installation (packed version)
Download ZIP, unzip and then go to "/demo" folder drag'n drop the package file (.crx) into the chrome window, thats it!
## Usage
1. Go to manifest.json and change the properties (optional) options.html page & permission: : activeTab / storage
2. Go to popup.html and popup.js to change markup and script
3. (optional) change style in style.css ( I did some custom css and some custom css to overwrite Materialize css )
4. (optional) change icons in "/img" folder  

Icons are from: https://www.iconfinder.com

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :)

## Used librarys

<a href="http://materializecss.com">MDL (Materialize CSS)</a><br>
<a href="http://jquery.com">jQuery</a> <br>
<a href="https://fonts.googleapis.com/icon?family=Material+Icons">Material Design Icons by Google</a>
<br>
## License

The MIT License (MIT)

Copyright (c) 2016 Gino Côté

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Files/Folders tree
<pre>
|   LICENSE
|   manifest.json
|   popup.html
|   options.html
|   README.md
|
+---css
|       materialize.min.css
|       options.css
|       style.css
|
+---demo
|       1.0_0.crx
|
+---img
|       icon-16.png
|       icon-48.png
|       icon-128.png
|
+---js
|       jquery.min.js
|       materialize.min.js
|       options.js
|       popup.js
|
</pre>
