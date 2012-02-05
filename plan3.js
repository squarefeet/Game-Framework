/**
	create game state
	create camera
	add objects to game state
	create renderer, using gamestate and camera as arguments.
	renderer loops through objects in gamestate and calls:
		obj.update(time, xScroll, yScroll, renderer)
		obj.render(time, xScroll, yScroll, renderer)
	
	
	Utils
		string
		number
		inheritance
			ctor
			extend

	events
		pub,sub,unsub
	
	inputhandler
		extends events
	
	keyhandler
		inherits from new inputhandler
	
	mousehandler
		inherits from new inputhandler
	
	Vector
		2d & 3d
		math functions
	
	gameobject
		object's canvas
		position
		velocity
		rotation
		update/render
		
	sprite gameobject
		inherit from gameobject
		framewidth, frameheight,
		animations: { x, y, frames: number }
		
	camera
		position
		velocity
		rotation
		
	gamestate
		keyhandler
		mousehandler
		object store
		
	renderer
		main canvas
		integration
		
		
	
*/

(function() {
	
	var GameFramework = {};
	
	/**
	*	Utility functions, split into categories
	*/
	GameFramework.utils = {
		
		/**
		*	String utility functions
		*/
		string: {
			/**
			*	Capitalize the first character in a string.
			*	@param {String} string The string to capitalize.
			*	@returns {String} string The capitalized string.
			*/
			capitalize: function(string) {
				return string.charAt(0).toUpperCase + string.slice(1);
			}
		}
	};
	
	/**
	*	A simple events model. Based around Pub/Sub methodology.
	*	Used by most objects in the framework.
	*/
	GameFramework.Events = {
		
		/**
		*	The 'internal' events store. Structure is:
		*	myEvent: [
		*		{ name: 'myFunctionName', fn: Function }
		*	]
		*/
		_events: {},
		
		/**
		*	Bind a function to an event.
		*	@param {String} id Event's ID attribute
		*	@param {Function} fn The function to bind
		*	@param {String} name A name to attach to the function
		*/
		bind: function(id, fn, name) {
			if(!id || !fn || !name) return;
			
			// Create the event holder if not already there.
			if(!this._events[id]) {
				this._events[id] = [];
			}

			// Push the function/name into the event store
			this._events[id].push({
				name: name,
				fn: fn
			});
		},
		
		/**
		*	Unbind a function from an event, using the function's name to
		*	identify it.
		*	@param {String} id Event's ID attribute
		*	@param {String} name Function's name attribute
		*/
		unbind: function(id, name) {
			if(!id || !name || !this._events[id]) return;
			
			var ev = this._events[id],
				len = ev.length,
				i = 0;
				
			for(i; i < len; ++i) {
				if(ev[i].name === name) {
					ev.splice(i, 1);
					break;
				}
			}
		},
		
		/**
		*	Remove an entire event from the store
		*	@param {String} id The Event ID attribute to remove.
		*/
		unbindAll: function(id) {
			if(!id || !this._events[id]) return;
			else delete this._events[id];
		},
		
		/**
		*	Trigger an event that's been created via .bind()
		*	@param {String} id The Event's ID attribute
		*	@param {Object|undefined} scope Optional scope to call the functions with.
		*	@param {Array|undefined} args Optional Array of arguments to apply to each function.
		*/
		trigger: function(id, scope, args) {
			if(!id || !this._events[id]) return;
			
			if(scope && !args) {
				if(scope.constructor === Array) {
					args = scope;
					scope = this;
				}
				else {
					args = [];
				}
			}
			else if(!scope && !args) {
				scope = this;
				args = [];
			}
			
			var ev = this._events[id],
				len = ev.length,
				i = 0;
			
			for(i; i < len; ++i) {
				ev[i].fn.apply(scope, args);
			}
		}
	};
	
	
	GameFramework.Renderer = function(options) {
		
		// Cache options
		this.options = {};
		
		// Create the canvas element or use one provided by the `options` argument.
		this.element = options.element || document.createElement('canvas');
		this.element.width = options.width || 320;
		this.element.height = options.height || 480;
		
		// Canvas clear property
		this.clear = typeof options.clear === 'boolean' ? options.clear : true;
		
		this.clearCanvas = function() {
			
		};
		
		
		this.setOptions = function(o) {
			for(var i in o) {
				if(o.hasOwnProperty(i)) {
					this.options[i] = o[i];
				}
			}
		};
		
		this.render = function(state, camera) {
			
		};	
		
		
		var contextKeys = {
			'opacity': 1, 
			'blending': 1, 
			'lineWidth': 1, 
			'lineCap': 1, 
			'lineJoin': 1, 
			'strokeStyle': 1,
			'fillStyle': 1
		};
		
		// Context helper functions
		this.setCtxValue = function(key, value) {
			if(contextKeys[key]) {
				key = GameFramework.utils.string.capitalize(key);
				this['set' + key](value);
			}
		};
		
		this.setOpacity = function(value) {
			
		};
		
		this.setBlending = function(value) {
			
		};
		
		this.setLineWidth = function(value) {
			
		};
		
		this.setLineCap = function(value) {
			
		};
		
		this.setLineJoin = function(value) {
			
		};
		
		this.setStrokeStyle = function(value) {
			
		};
		
		this.setFillStyle = function(value) {
			
		};
	};
	
	
	GameFramework.Camera = function() {
		
	};
	
	
	GameFramework.State = function() {
		
	};
	
	
	// Expose GameFramework to the window
	this.GameFramework = GameFramework;
	
}).call(this);