module.exports.relevance = ( ss1, ss2 ) => {
    var terms1 = ss1.terms().concat([]).sort().filter( (item, pos, self ) => { return self.indexOf( item ) == pos });
    var terms2 = ss2.terms().concat([]).sort().filter( (item, pos, self ) => { return self.indexOf( item ) == pos });
    var total = Math.max( terms1.length, terms2.length );

    var t = 0;

    for( var i = 0; i < terms1.length; i ++ ) {
        var term = terms1[i];
        if( terms2.indexOf( term ) != -1 ) {
            t ++;
            terms1.splice( i, 1 );
            terms2.splice( terms2.indexOf( term ), 1 );
            --i;
        }
    }

    for( var i = 0; i < terms2.length; i ++ ) {
        var term = terms2[i];
        if( terms1.indexOf( term ) != -1 ) {
            t ++;
            terms2.splice( i, 1 );
            terms1.splice( terms1.indexOf( term ), 1 );
            --i;
        }
    }

    return t / total;
};

module.exports.search = ( ss1, ss2 ) => {
    var terms1 = ss1.terms().concat([]).sort().filter( (item, pos, self ) => { return self.indexOf( item ) == pos });
    var terms2 = ss2.terms().concat([]).sort().filter( (item, pos, self ) => { return self.indexOf( item ) == pos });
    var total = terms2.length;
    var t = 0;

    for( var i = 0; i < terms1.length; i ++ ) {
        var term = terms1[i];
        if( terms2.indexOf( term ) != -1 ) {
            t ++;
            terms1.splice( i, 1 );
            terms2.splice( terms2.indexOf( term ), 1 );
            --i;
        }
    }

    return t / total;
};