var tape= require("tape"),
  obsProj= require("..")

tape("primed-1", function(t){
	var
	  o= {a: 42},
	  projection= obsProj(o)
	t.deepEqual(projection("a"), [42])
	t.end()
})

tape("primed-2", function(t){
	var
	  o= {
		a: 42,
		b: 43},
	  projection= obsProj(o)
	t.deepEqual(projection("a"), [42])
	t.deepEqual(projection("b"), [43])
	t.end()
})
