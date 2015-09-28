var tape= require( "tape"),
  obsProj= require( "..")

tape( "array-1", function(t){
	var a= [{ i: 2}, { i: 3}],
	  projection= obsProj(a, null, function( v){return v.i})
	a.push({ i: 4})
	setTimeout(function(){
		t.deepEqual(projection( 2), [ {i: 2}])
		t.end()
	}, 0)
})
