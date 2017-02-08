(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory()

    } else if (typeof define === 'function' && define.amd) {
        define(factory)

    } else {
        global.ImagizerClient = factory();
        global.imagizerClient = global.ImagizerClient;
    }

}(this, (function () {

    var DEFAULT_QUALITY = 90;
    var DEFAULT_DPR = 1;
    var DEFAULT_IMAGIZER_HOST = "demo.imagizercdn.com";
    var DEFAULT_RESPONSIVE_SIZE = "100vw";

    var ATTRIBUTE_NAMES = {
        datasrc: "data-src",
        datares: "data-res",
        src: 'src',
        srcset: 'srcset',
        sizes: 'sizes'
    };

    var config = {
        imagizerHost: DEFAULT_IMAGIZER_HOST,
        autoDpr: false,
        format: null,
        quality: DEFAULT_QUALITY,
        dpr: DEFAULT_DPR,
        useHttps: false,
        originImageHost: null,
        attributeNames: ATTRIBUTE_NAMES
    };

    function loadImages(selector) {
        var imageTags = document.querySelectorAll(selector);

        for (var i = 0; i < imageTags.length; i++) {
            if (imageTags[i]) {
                var image = imageTags[i];
                var path = image.getAttribute(ATTRIBUTE_NAMES.datasrc);

                if (path) {
                    var urlPaths = parseUrl(path);

                    // setup the hostname path to point to the origin server
                    if (!config.originImageHost && urlPaths.hostname && urlPaths.hostname != DEFAULT_IMAGIZER_HOST) {
                        urlPaths.params.hostname = urlPaths.hostname;
                    } else if (config.originImageHost) {
                        urlPaths.params.hostname = config.originImageHost;
                    }

                    if (image.getAttribute(ATTRIBUTE_NAMES.datares)) {
                        loadResponsiveImage(image, urlPaths.path, urlPaths.params);

                    } else {
                        loadImage(image, urlPaths.path, urlPaths.params);
                    }
                }
            }
        }

        return this;
    }

    function parseUrl(url) {
        var parser = document.createElement('a');
        parser.href = url;

        return {
            scheme: parser.protocol,
            hostname: parser.host,
            path: parser.pathname,
            params: getParams(parser.search)
        };
    }

    function getParams(str) {
        var query = str.split("?");
        str = query[1];

        return (!str && {}) || str.replace(/(^\?)/, '').split("&").map(function (n) {
                return n = n.split("="), this[n[0]] = n[1], this
            }.bind({}))[0];
    }

    function loadResponsiveImage(image, path, params) {
        delete params.width;

        var images = [];
        for (var i = 100; i < 3000; i += 100) {
            params.width = i;
            params.dpr = 1;

            images.push(buildUrl(path, params) + " " + params.width + "w");
        }

        image.setAttribute(ATTRIBUTE_NAMES.srcset, images);

        if (!image.getAttribute(ATTRIBUTE_NAMES.sizes)) {
            image.setAttribute(ATTRIBUTE_NAMES.sizes, DEFAULT_RESPONSIVE_SIZE);
        }

        // set fallback tag for browsers that do not support srcset
        image.setAttribute(ATTRIBUTE_NAMES.src, buildUrl(path));
    }

    function loadImage(image, path, params) {
        if (!image) {
            return false;
        }

        var url = buildUrl(path, params);

        var downloadingImage = new Image();
        downloadingImage.onload = function () {
            image.src = this.src;

            if (params.width) {
                image.width = params.width;

            } else if (params.height) {
                image.height = params.height;
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
        var url = scheme + "://" + config.imagizerHost + path;

        if (!params.dpr) {
            if (config.autoDpr) {
                params.dpr = getDpr();
            } else {
                params.dpr = config.dpr;
            }
        }

        // no need to send default dpr
        // that will be assumed on the backend
        if (params.dpr == DEFAULT_DPR) {
            delete params.dpr;
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

})));

