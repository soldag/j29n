Providers.Ajax = function(defaultDomain) {
    Providers.Base.call(this, defaultDomain);

    this.poParser = new Parsers.PoParser();
    this.moParser = new Parsers.MoParser();
};

Providers.Ajax.prototype = Object.create(Providers.Base.prototype);
Providers.Ajax.prototype.constructor = Providers.Ajax;

Providers.Ajax.PO_FILE_TYPE = 'po';
Providers.Ajax.MO_FILE_TYPE = 'mo';


Providers.Ajax.canLoad = function(options) {
    return options['type'] === 'ajax' && 'url' in options && 'fileType' in options;
};


Providers.Ajax.prototype.loadFromOptions = function(options, callback) {
    var domain = options['domain'] || this.defaultDomain;
    var url = options['url'];
    var fileType = options['fileType'];

    this.load(domain, url, fileType, callback);
};


Providers.Ajax.prototype.load = function(domain, url, fileType, callback) {
    this.addCallback(callback);

    var _this = this;
    var binarySource;
    fileType = fileType.toLowerCase();
    switch(fileType) {
        case Providers.Ajax.PO_FILE_TYPE:
            binarySource = false;
            break;

        case Providers.Ajax.MO_FILE_TYPE:
            binarySource = true;
            break;

        default:
            console.error('Invalid file type!');
            return;
    }
    this.doRequest(url, binarySource, function(data) {
        var parser = _this.poParser;
        if(fileType == Providers.Ajax.MO_FILE_TYPE) {
            parser = _this.moParser;
        }
        _this.triggerDone(parser.parse(domain, data));
    });
};


Providers.Ajax.prototype.doRequest = function(url, binarySource, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    if(binarySource) {
        request.responseType = "arraybuffer";
    }

    var _this = this;
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var responseData;
            if(binarySource) {
                var arrayBuffer = request.response;
                if (arrayBuffer) {
                    responseData = new Uint8Array(arrayBuffer);
                }
            }
            else {
                responseData = request.responseText;
            }
            callback(responseData);
        } else {
            console.error('Could not load translations from resource (' + _this.url + ')!');
        }
    };

    request.onerror = function() {
        console.error('Could not load translations from resource (' + _this.url + ')!');
    };

    request.send();
};