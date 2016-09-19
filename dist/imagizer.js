var DEFAULT_QUALITY = 90;
var DEFAULT_DPR = 1.0;
var DEFAULT_IMAGIZER_HOST = "demo.imagizercdn.com";

var imagizerClient = (function () {

    var config = {
        imagizerHost: DEFAULT_IMAGIZER_HOST,
        autoDpr: false,
        format: null,
        quality: DEFAULT_QUALITY,
        dpr: DEFAULT_DPR,
        useHttps: false,
        originImageHost: null
    };

    function loadImages(selector) {
        var imageTags = document.querySelectorAll(selector);

        for (var i = 0; i < imageTags.length; i++) {
            if (imageTags[i]) {
                var image = imageTags[i];
                var path = image.getAttribute("data-src");

                if (path) {
                    var params = getParams(path);

                    if (image.getAttribute("data-res")) {
                        loadResponsiveImage(image, path, params);

                    } else {
                        loadImage(image, path, params);
                    }
                }
            }
        }

        return this;
    }

    function getParams(str) {
        var query = str.split("?");
        str = query[1];

        return (!str && {}) || str.replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
    }

    function loadResponsiveImage(image, path, params) {
        delete params.width;
        delete params.height;
        params.dpr = 1;

        var images = [];
        for(var i = 10; i < 300; i++) {
            params.width = i * 10;
            images.push(buildUrl(path, params) + " " + params.width + "w");
        }

        image.setAttribute("srcset", images);

        if (!image.getAttribute("srcset")) {
            image.setAttribute("srcset", "100vw");
        }
    }

    function loadImage(image, path, params) {
        if (!image) {
            return false;
        }

        var url = buildUrl(path);

        var downloadingImage = new Image();
        downloadingImage.onload = function(){
            image.src = this.src;

            if (params.width) {
                image.width = params.width;
            }

            if (params.height && params.crop == "fit") {
                image.height = params.height;
            }
        };

        downloadingImage.src = url;
    }

    function encodeQueryData(data) {
        var ret = [];
        for (var d in data) {
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        }
        return ret.join("&");
    }

    function getDpr() {
        var dpr = 1;

        if (window != undefined) {
            dpr = window.devicePixelRatio ? window.devicePixelRatio : 1
        }

        return dpr;
    }

    function buildUrl(path, params) {
        if (params == undefined) {
            params = {};
        }

        if (!path.match(/^\//)) {
            path += "/" + path;
        }

        var scheme = config.useHttps ? "https" : "http";
        var url = scheme + "://" +  config.imagizerHost + path;

        if (config.originImageHost) {
            params.hostname = config.originImageHost;
        }

        if (!params.dpr) {
            if (config.dpr != DEFAULT_DPR || !config.autoDpr) {
                params.dpr = config.dpr;
            } else {
                params.dpr = getDpr();
            }
        }

        if (config.quality != DEFAULT_QUALITY) {
            params.quality = config.quality;
        }

        if (config.format) {
            params.format = config.format;
        }

        if (!path.match(/\?/)) {
            url += "?";
        } else {
            url += "&"
        }

        url += encodeQueryData(params);

        return url;
    }

    function fitInDiv(path, element) {
        var width = element.offsetWidth;
        var height = element.offsetHeight;

        return buildUrl(path, {
                "width": width,
                "height": height,
                "crop": "fit"
            }
        );
    }

    return {
        loadImages: loadImages,
        config: config,
        buildUrl: buildUrl
    }
}());