var tape= require("tape"),
  obsProj= require("..")

tape("delete-1", function(t){
	var
	  o= {
		a: 2,
		b: 3},
	  projection= obsProj(o, function( v){ return v+1})
	o["c"]= 4
	o["d"]= 5
	setTimeout(function(){
		t.deepEqual(projection("a"), [3])
		t.deepEqual(projection("c"), [5])
		delete o.a
		delete o.c
		setTimeout(function(){
			t.equal(projection("a"), undefined)
			t.deepEqual(projection("b"), [4])
			t.equal(projection("c"), undefined)
			t.deepEqual(projection("d"), [6])
			t.end()
		}, 0)
	}, 0)
})
