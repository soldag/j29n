Parsers.Base = function() {};


Parsers.Base.prototype.parseHeaders = function(text) {
    var headers = {};
    var headerLines = text.split('\n');
    for(var i = 0; i < headerLines.length; i++) {
        var separatorIndex = headerLines[i].indexOf(':');
        if (separatorIndex > -1) {
            var key = headerLines[i].substring(0, separatorIndex).trim();
            headers[key] = headerLines[i].substring(separatorIndex + 1).trim();
        }
    }

    return headers;
};


Parsers.Base.prototype.createDomainCollection = function(domain, headers, translations) {
    var domainCollection = new DomainCollection();
    domainCollection.addDomain(domain, new TranslationCollection(headers, translations));

    return domainCollection;
};