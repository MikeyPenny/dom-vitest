### Switch to DOM test environment

Deafult environment for vitest is node

But it's possible to set the environment to test the DOM with happy-dom in vitest

Go to package.json add the flag --environment happy-dom

This is a test runner behind the scenes emulating code running on the browser

JSDOM is another environment created by the test runner behind scenes emulating code running on a browser. Happy-DOM is a vitest option to swith the test environment from NodeJs to Happy-DOM you need to add another flag in the package.json file --environment and set it to happy-dom

### Open HTML and load it in the virtual DOM (happy-dom)

import fs from 'fs';
to load the fileSystem from node
import path from 'path'
to open a file and load a file

The node API's are still available even if you switch the environment

const htmlDocPath = path.join(process.cwd, 'index.html');
we use the join and pass the process current work directory and the name of the html file

const htmlDocContent = fs.readFileSync(htmlDocPath).toString();
readFileSync is to hold code execution until the file has been read and pass the htmlDocPath as an argument and convert the result to a string to read the content of the file and load it into the virtual DOM

The loaded into the DOM is then done by importing Window from happy-dom

import {Window} from 'happy-dom'

the creat a window object by instanctiating Window and then access the document with window.document, then create the write() method to write the htmlDocContent and renders the file virtually

Finally used the vi object from vitest to stubGlobal the document with the adjusted document

const window = new Window();

const document = window.document;
document.write(htmlDocContent);

vi.stubGlobal('document', document)

### Testing Library

In conjunction with vitest you can use testing library
[Testing Library](testing-library.com)

It has a lot of utilities and methods to work with the virtual DOM
