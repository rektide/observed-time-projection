var
  fs= require( "fs")

var tests= fs.readdirSync( __dirname)
for(var i= 0; i< tests.length; ++i){
	var test= tests[ i]
	if( test=== __filename|| !test.endsWith( ".js")){
		continue
	}
	require( "./"+ test)
}
