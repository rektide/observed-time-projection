var tape= require("tape"),
  obsProj= require("..")

tape("add-1", function(t){
	var
	  o= {},
	  projection= obsProj(o, function( v){ console.log("+", v); return v+1})
	o["a"]= 2
	setTimeout(function(){
		t.deepEqual(projection("a"), [3])
		t.end()
	}, 0)
})

tape("add-2", function(t){
	var
	  o= {},
	  projection= obsProj(o, function( v){ console.log("+", v); return v+1})
	o["a"]= 2
	setTimeout(function(){
		t.deepEqual(projection("a"), [3])
		t.end()
	}, 0)
})
