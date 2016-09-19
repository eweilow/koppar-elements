![Build Status](https://api.travis-ci.org/eweilow/koppar-elements.svg)
![Build Status](https://saucelabs.com/buildstatus/eweilow_oss)

![Build Status](https://saucelabs.com/browser-matrix/eweilow_oss.svg)

# koppar-elements
A collection of web components for quickly making web apps.

## Demo
The demo requires the following to be installed:
- [caddy](https://caddyserver.com/)
- [bower](https://bower.io/)

After installing the dependencies, run the following commands in your commandline in the root directory of this repository:
```bash
bower install
caddy
```

You can then go to [http://localhost:8080](localhost:8080) in your browser to check out the elements.

## Testing
To unit test the elements locally, you will need the following to be installed:
- Firefox
- Chrome
- [node](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [gulp](http://gulpjs.com/)
- [bower](https://bower.io/)
- [web-component-tester](https://github.com/Polymer/web-component-tester)

After that, you can run
```
npm test
```