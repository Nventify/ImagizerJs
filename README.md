# ImagizerJs

The official Javascript client of the Imagizer Media Engine

The Imagizer Media Engine accelerates media delivery to your mobile Apps or Web pages by dynamically rescaling, cropping, and compressing images in real time. See all Imagizer features in our [Doc](demo.imagizercdn.com/doc).

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

### Using the free to test Imagizer Demo Service

```html
<script src="dist/imagizer.min.js"></script>
<script>
    // Optionally, enable Auto device pixel ratio setting.
    // Device pixel ratio will now be detected
    // and automatically applied to image urls
    // http://demo.imagizercdn.com/doc/#dpr-device-pixel-ratio
    imagizerClient.config.autoDpr = true;

    // Optionally, compress our images by setting the global quality
    // http://demo.imagizercdn.com/doc/#quality
    imagizerClient.config.quality = 60;

    // Load images from specified selector
    //  use "img" for all img tags
    imagizerClient.loadImages("img");
</script>
```

### Using your own Imagizer Instance
```html
<script src="dist/imagizer.min.js"></script>
<script>
    // Specify your imagizer hostname 
    imagizerClient.config.imagizerHost = "example.com";

    // Optionally, enable Auto device pixel ratio setting.
    // Device pixel ratio will now be detected
    // and automatically applied to image urls
    // http://demo.imagizercdn.com/doc/#dpr-device-pixel-ratio
    imagizerClient.config.autoDpr = true;

    // Optionally, compress our images by setting the global quality
    // http://demo.imagizercdn.com/doc/#quality
    imagizerClient.config.quality = 60;

    // Load images from specified selector
    //  use "img" for all img tags
    imagizerClient.loadImages("img");
</script>
```

## Usage

### Using the free to test Imagizer Demo Service
#### Basic Usage

```html
<!-- Scale image to 300px wide -->
<img data-src="http://demo-images.imagizercdn.com/img911/zPCsEi.jpg?width=300">

<!-- Scale and crop image to 300px by 300px -->
<img data-src="http://demo-images.imagizercdn.com/img673/JrvDWd.jpg?width=300&amp;height=300&amp;crop=fit">

<!-- Crop image around detected face and scale to 300px wide -->
<img data-src="http://demo-images.imagizercdn.com/img673/DCxTh3.jpg?crop=face&amp;width=300">
```
#### Responsive Images

```html
<!-- Scales and crops image automatically to fit "sizes" attribute -->
<img data-src="http://demo-images.imagizercdn.com/img673/JrvDWd.jpg" data-res="true" sizes="45vw">
<img data-src="http://demo-images.imagizercdn.com/img911/zPCsEi.jpg" data-res="true" sizes="45vw">
<img data-src="http://demo-images.imagizercdn.com/img538/AUodLs.jpg" data-res="true" sizes="45vw">
<img data-src="http://demo-images.imagizercdn.com/img538/m18Hha.jpg" data-res="true" sizes="45vw">
```

### Using your own Imagizer Instance
#### Basic Usage

Notice there is no need to specify the image origin host in the data-src attribute.
Assuming you instance has been configured with a backend 

```html
<!-- Scale image to 300px wide -->
<img data-src="/img911/zPCsEi.jpg?width=300">

<!-- Scale and crop image to 300px by 300px -->
<img data-src="/img673/JrvDWd.jpg?width=300&amp;height=300&amp;crop=fit">

<!-- Crop image around detected face and scale to 300px wide -->
<img data-src="/img673/DCxTh3.jpg?crop=face&amp;width=300">
```
#### Responsive Images

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
