var MODES= {
	array: Symbol(),
	single: Symbol()
}

module.exports= function( o, valMap, keyMap, mode, _map){
	if( mode){
		var symbolMode= MODES[ mode]
		if( !mode){
			throw new Error("Unknown mode '"+ mode+ "'")
		}
		mode= symbolMode
	}
	mode= MODES.array

	valMap= valMap|| function( v){ return v}
	keyMap= keyMap|| function( v, k){ return k}
	_map= _map|| new Map()
	_map.tick= _map.tick|| 0
	var
	  insert,
	  remove
	if( mode=== MODES.array){
		insert= function( key, val){
			var cursor= _map.get( key)
			if( cursor){
				if(cursor.indexOf( val)=== -1){
					cursor.push( val)
				}
			}else{
				_map.set( key, [val])
			}
		}
		remove= function( key, val){
			var cursor= _map.get( key)
			if( cursor){
				var index= cursor.indexOf( val)
				if( index === -1){
					return false
				}else if( cursor.length> 1){
					cursor.splice( index, 1)
				}else{
					_map.delete( key)
				}
				return true
			}
			return false
		}
	}else{
		insert= function( key, val){
			_map.set( key, val)
		}
		remove= function( key, val){
			_map.delete( key, val)
		}
	}

	for(var _k in o){
		var
		  _v= o[ _k],
		  key= keyMap( _v, _k)
		  val= valMap( _v, _k)
		insert( key, val)
	}

	Object.observe( o, function( changes){
		++_map.tick
		for( var i= 0; i< changes.length; ++i){
			var
			  change= changes[ i],
			  notDelete= change.type!== 'delete',
			  _val= notDelete&& change.object[change.name],
			  key= notDelete&& keyMap( _val, change.name),
			  val= notDelete&& valMap( _val, change.name)
			  notAdd= change.type!== 'add',
			  oldKey= notAdd&& keyMap( change.oldValue, change.name),
			  oldVal= notAdd&& valMap( change.oldValue, change.name)
			if( change.type=== "add"){
				insert( key, val)
			}else if( change.type=== "update"){
				if( key!== oldKey|| val!== oldVal){
					remove( oldKey, oldVal)
					insert( key, val)
				}
			}else if( change.type=== "delete"){
				remove( oldKey, oldVal)
			}
		}
	}, [ 'add', 'update', 'delete'])
	function get( key){
		return _map.get( key)
	}
	Object.defineProperty(get, "tick", {
		get: function(){
			return _map.tick
		},
		enumerable: true
	})
	return get
}
