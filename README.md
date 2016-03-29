# Smart - String

Install with [npm](https://www.npmjs.com/package/smart-string)
```sh
$ npm install smart-string
```

Or download from [github](https://github.com/gormat/smart-string)

## Usage

### Create Instance
```smart-string``` is using Factory design pattern, so you cant use new method.
For creating new instance use ```SS( str )``` function.
```sh
var SS = require('smart-string');
var myString = SS( "This is my first string" );
```

For creating empty string just call function without parameters
```sh
var emptyString = SS();
```
This return Object of type SmartString

For Getting value use ```value``` method
```sh
var v = myString.value();
```

### Substitite

SS can substitute string. ```substitute``` method takes options and replaces all substitutable
parameters in string. For making substitutable word use ```{{``` and ```}}``` symbols.

For example
```sh
var myString = SS( "My name is {{name}}, I love {{thing}}" );
var options = {
    name: "John",
    thing: "Node.JS"
};
var x = mystring.value();
// x is "My name is {{name}}, I love {{thing}}"

myString.substitute( options );
// now value method will return new string.
x = mystring.value();
// x now is "My name is John, I love Node.JS"
```

NOTE: if some data cant be found in options object, method will just erase scopes.

There is also a method that substitute string, but does not change value, just return new string
```sh
var myString = SS( "My name is {{name}}, I love {{thing}}" );
var options = {
    name: "John",
    thing: "Node.JS"
};
var x = mystring.value();
// x is "My name is {{name}}, I love {{thing}}"

var y = myString.returnSubstitute( options );
// y is "My name is John, I love Node.JS"
// but value of string is not changed.
x = mystring.value();
// x is still "My name is {{name}}, I love {{thing}}"
```

### Compare

Three are few method for comparing.

#### equalToString

This method takes argument string or SmartString and return true only if strings are exactly the same.
```sh
var x = SS("First String");
x.equalToString("First String") // return true
x.equalToString(" First String") // return false
x.equalToString( SS( "First String") ) // return true
x.equalToString( SS(" First String" )) // return false
```
#### relevance

Takes argument of type SmartString and returns integer in range 0-1 and shows how relevant are strings.
```sh
var x = SS("Hi John Smith");
var y = SS("Hi Smith john");
x.relevance( y ); // returns 1
var z = SS("Hello John Smith");
x.relevance( y ); // returns 0.666 ...
var k = SS("Hello Jack Smith");
x.relevance( y ); // returns 0.333 ...
```

#### search

this method is full text search. takes argument of type SmartString and returns integer in range 0-1. And shows
how is string relevant to our parameter.
```sh
var x = SS("Hi John Smith. My Name is Gor. Nice to meet you");
var y = SS("Hi John Smith");
console.log( x.search( y ));
//returns 1 because x contains on y
console.log( y.search( x ));
// returns 0.2727272727272727 because only part of y contains on x

y = SS("Hi John smith");
console.log( y.search( x ));
//returns 1. For search "Smith" and "smith" are same

y = SS("Hi smith John");
console.log( y.search( x ));
//returns 1. For search "John Smith" and "smith John" are same

var k = SS("Hi Jack Smith");
console.log( x.search( k ));
//returns 0.6666666666666666. Only two word from k contains on y
```

If you want to get all terms on string, just use ```terms``` method. It will return all terms in lowercase.
```sh
var x = SS("Hi John Smith. My Name is Gor. Nice to meet you");
console.log( x.terms() );
// returns [ 'hi', 'john', 'smith', 'my', 'name', 'is', 'gor', 'nice', 'to', 'meet', 'you' ]
```

