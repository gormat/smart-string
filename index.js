var relevance = require('./logic/relevance');

function SmartString( string )
{
    var str = string || "";
    var terms = [];

    var initTerms = () => {
        str = str.replace(/[^\w\s_]/gi, '')
        terms = str.split(' ');
        terms = terms.map( term => term.trim().toLowerCase() );
        terms = terms.filter( term => term != "" );
    };
    initTerms();

    this.value = () => {
        return str;
    };

    this.terms = () => {
        return terms;
    };

    this.substitute = ( data ) => {
        str = str.replace(/{{\w+}}/g, function(all) {
            all = all.substring(2, all.length - 2 );
            return data[all] || all;
        });
        initTerms();
        return this;
    };

    this.returnSubstitute = ( data ) => {
        var tmp = str;
        tmp = tmp.replace(/{{\w+}}/g, function(all) {
            all = all.substring(2, all.length - 2 );
            return data[all] || all;
        });
        return tmp;
    };

    this.compare = _str =>
    {
        if( _str instanceof SmartString ) {
            return _str.value() == str;
        }
        return _str == str;
    };

    this.relevance = ss => relevance.relevance( this, ss );
    this.search = ss => relevance.search( this, ss );
}

module.exports = ( str ) => {
    return new SmartString( str );
};
