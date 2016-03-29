var SS = require("./index");

var x = SS( "asd {{name}}" );
console.log( x.returnSubstitute({name: 'OBJ'}) );
x.substitute( {name: 'ASD'} );
console.log( x.value() );
console.log( x.terms() );
console.log( x.compare( SS("asd ASD") ) );
console.log( x.compare( "asd ASD" ) );
console.log( x.compare( "asd" ));

var x1 = SS("My name is John bla bla bla");
var x2 = SS("my name is Jack");
console.log( x1.relevance( x2 ) );
console.log( x1.search( x2 ) );

var x = SS("Hi John Smith. My Name is Gor. Nice to meet you");
var y = SS("Hi John Smith");
console.log( x.search( y ));
console.log( y.search( x ));
var k = SS("Hi Jack Smith");
console.log( x.search( k ));