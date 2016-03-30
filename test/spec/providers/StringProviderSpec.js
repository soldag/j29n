var StringProvider = requireSrc('providers/StringProvider');

describe('A StringProvider instance', function() {
    beforeAll(function() {
        this.parserResult = 'foobar';
        this.parserSpy = jasmine.createSpyObj('PoParser', ['parse']);
        this.parserSpy.parse.and.returnValue(this.parserResult);

        this.defaultDomain = 'foobar';
        this.provider = new StringProvider(this.defaultDomain, this.parserSpy);
    });

    it('can load valid options', function() {
        var options = {
            mode: 'string',
            data: 'foobar'
        };
        expect(this.provider.canLoadFromOptions(options)).toBe(true);
    });

    it('cannot load options without data attribute', function() {
        var options = {
            mode: 'string',
            text: 'foobar'
        };
        expect(this.provider.canLoadFromOptions(options)).toBe(false);
    });

    it('cannot load options with wrong mode attribute', function() {
        var options = {
            mode: 'text',
            data: 'foobar'
        };
        expect(this.provider.canLoadFromOptions(options)).toBe(false);
    });

    it('loads bare domain and data correctly', function(done) {
        var _this = this;

        this.provider.load('foo', 'bar', function(result) {
            expect(result).toBe(_this.parserResult);
            expect(_this.parserSpy.parse).toHaveBeenCalledWith('foo', 'bar');
            done();
        });
    });

    it('extracts required properties from options with specific domain', function() {
        var options = {
            mode: 'string',
            domain: 'foo',
            data: 'bar'
        };
        var callback = 'foobar';

        spyOn(this.provider, 'load');
        this.provider.loadFromOptions(options, callback);
        expect(this.provider.load).toHaveBeenCalledWith(options.domain, options.data, callback);
    });

    it('extracts required properties from options without specific domain', function() {
        var options = {
            mode: 'string',
            data: 'bar'
        };
        var callback = 'foobar';

        spyOn(this.provider, 'load');
        this.provider.loadFromOptions(options, callback);
        expect(this.provider.load).toHaveBeenCalledWith(this.defaultDomain, options.data, callback);
    });
});