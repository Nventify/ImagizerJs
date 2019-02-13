# ImagizerJs

The official Javascript client of the Imagizer Media Engine

The Imagizer Media Engine accelerates media delivery to your mobile Apps or Web pages by dynamically rescaling, cropping, and compressing images in real time.

Sign up for the service at [http://cloud.imagizer.com](https://cloud.imagizer.com) or launch and manage your own instance on [AWS](https://aws.amazon.com/marketplace/pp/B019YEIK7M)

See all Imagizer features in our [Doc](https://docs.imagizer.com)

## Installation
Bower
```
bower install --save imagizer-js
```
npm
```bash
npm install --save imagizer-js
```

## Configure

### Using your own Imagizer Instance or source from https://cloud.imagizer.com
```html
<script src="dist/imagizer.js"></script>
<script>
    // Specify your Imagizer source endpoint
    ImagizerClient.config.imagizerHost = "examples.cloud.imagizer.com";

    // Optionally, use https for secured websites
    ImagizerClient.config.useHttps = true;

    // Optionally, enable Auto device pixel ratio setting.
    // Device pixel ratio will now be detected
    // and automatically applied to image urls
    // https://docs.imagizer.com/api_reference/#dpr
    ImagizerClient.config.autoDpr = true;

    // Optionally, compress our images by setting the global quality
    // https://docs.imagizer.com/api_reference/#quality
    ImagizerClient.config.quality = 60;
 
    // Optionally, use best format that's supported by the browser
    // (webp, jpg, png)
    // https://docs.imagizer.com/api_reference/#auto
     ImagizerClient.config.format = "auto";

    // Load images from specified selector
    //  use "img" for all img tags
    ImagizerClient.loadImages("img");
</script>
```

## Usage

### Using your own Imagizer Instance or source from https://cloud.imagizer.com
#### Basic Usage

Notice there is no need to specify the image origin host in the data-src attribute.
Assuming your instance has been configured with a backend

```html
<!-- Scale image to 300px wide -->
<img data-src="/bmw.jpg?width=300">

<!-- Scale and crop image to 300px by 300px -->
<img data-src="/kayak.jpg?width=300&height=300&crop=fit">

<!-- Crop image around detected faces and scale to 300px wide -->
<img data-src="/faces.jpg?crop=face&width=300">
```
#### Responsive Images

```html
<!-- Scales and crops image automatically to fit "sizes" attribute -->
<img data-src="/pantheon.jpg" data-res="true" sizes="45vw">
<img data-src="/ocean.jpg" data-res="true" sizes="45vw">
<img data-src="/vernazza.jpg" data-res="true" sizes="45vw">
<img data-src="/vatican.jpg" data-res="true" sizes="45vw">
```

## Demos
- [Basic Usage](http://nventify.github.io/ImagizerJs/demo/resize_images.html)	
- [Responsive Images](http://nventify.github.io/ImagizerJs/demo/responsive_images.html)