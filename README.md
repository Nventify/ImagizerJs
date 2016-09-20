# ImagizerJs

The official Javascript client of the Imagizer Media Engine

The Imagizer Media Engine accelerates media delivery to your mobile Apps or Web pages by dynamically rescaling, cropping, and compressing images in real time. See all Imagizer features in our [Doc](demo.imagizercdn.com/doc).

## Installation
```
bower install --save imagizer-js
```

Include Imagizer
```html
<script src="dist/imagizer.min.js"></script>
```

## Configure
```html
<script>
    // Since we are using Imagizer Engine Demo Service
    // we'll need to specify our Image storage origin
    // Imagizer will fetch your images from this endpoint
    // http://demo.imagizercdn.com/doc/#hostname
    imagizerClient.config.originImageHost = "demo-images.imagizercdn.com";

    // Optionally enable Auto device pixel ratio setting.
    // Device pixel ratio will now be detected
    // and automatically applied to image urls
    // http://demo.imagizercdn.com/doc/#dpr-device-pixel-ratio
    imagizerClient.config.autoDpr = true;

    // Optionally compress our images by setting the global quality
    // http://demo.imagizercdn.com/doc/#quality
    imagizerClient.config.quality = 60;

    // Load images from specified selector
    //  use "img" for all img tags
    imagizerClient.loadImages("img");
</script>
```

## Usage

Basic usage
```html
<!-- Scale image to 300px wide -->
<img data-src="/img911/zPCsEi.jpg?width=300">

<!-- Scale and crop image to 300px by 300px -->
<img data-src="/img673/JrvDWd.jpg?width=300&amp;height=300&amp;crop=fit">

<!-- Crop image around detected face and scale to 300px wide -->
<img data-src="img673/DCxTh3.jpg?crop=face&amp;width=300">
```
Responsive Images

```html
<!-- Scales and crops image automatically to fit "sizes" attribute -->
<img data-src="/img673/JrvDWd.jpg" data-res="true" sizes="45vw">
<img data-src="/img911/zPCsEi.jpg" data-res="true" sizes="45vw">
<img data-src="/img538/AUodLs.jpg" data-res="true" sizes="45vw">
<img data-src="/img538/m18Hha.jpg" data-res="true" sizes="45vw">
```
## Demos
- [Basic Usage](http://demo.imagizercdn.com/javascript-demo/resize_images.html)
- [Responsive Images](http://demo.imagizercdn.com/javascript-demo/responsive_images.html)
