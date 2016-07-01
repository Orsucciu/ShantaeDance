/** This is a messy program, as all the functions are in the same file **/
(function() {  
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {
			
	var shantae,  //here are declared the variables
		shantaeImage,
		canvas;					

	function gameLoop () { //the gameloop, updating and rendering the sprite forever
	
	  window.requestAnimationFrame(gameLoop);
	  
	  
	// Handle keyboard controls
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	  shantae.update();  //jumps to the "update" function
	  shantae.render();
	}
	
	function sprite (options) {  //sprite constructor - where the magic happens -
		var position = [16, 58, 104, 154, 202, 259, 321, 376, 437, 492, 555, 632, 710, 777, 858, 916]; //this is the x positions of our sprite (as the y is supposed to always be the same)
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		//below is the update function
		that.update = function () { //update function of the sprite object
									//keep up the "frames" count, to know where we are
            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () { //render function
		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);
		  
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    //frameIndex * that.width / numberOfFrames,
			//0 + frameIndex * 25,
			position[frameIndex],
		    218,
		    //that.width / numberOfFrames, //the length of the square
			30,
			//that.height,
			40,
		    0,
		    0,
		    30,
		    40
			);
			/** **/
			line.draw();
			/** 
			console.log("that.width : " + that.width);
			console.log("frame index : " + frameIndex );
			console.log("image : " + that.image + " position : " + position[frameIndex]);
			**/ //uncomment these to have a log useful to debug animation
			
		};
		return that; //return "that" when a new sprite is created
	}
	
	// Get canvas
	canvas = document.getElementById("shantae_main");
	canvas.width = 100;
	canvas.height = 100;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.mozImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;
	/**  here, i create a red line, that will be used to check the correct alignement **/
	var ctx = canvas.getContext('2d');
	var line = new Line(ctx);
	ctx.strokeStyle = '#D32F2F';
	
function Line(ctx) { //this allow the creation of "Line" objects
    
    var me = this;
    
    this.x1 = 10;
    this.x2 = 10;
    this.y1 = 0;
    this.y2 = canvas.height;
    
    
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(me.x1, me.y1);
        ctx.lineTo(me.x2, me.y2);
        ctx.stroke();
    }
}	

	// Create sprite sheet
	shantaeImage = new Image();	
	
	// Create sprite
	shantae = sprite({  //sprite creation, new "sprite" object
		context: canvas.getContext("2d"),
		width: 928, //this is the TOTAL lenght of your sprites
		height: 42,
		image: shantaeImage,
		numberOfFrames: 16,
		ticksPerFrame: 4
	});
	
	// Load sprite sheet
	shantaeImage.addEventListener("load", gameLoop); //this calls gameLoop when the image is loaded, making the whole thing loop forever
	shantaeImage.src = "res/shantae.png";
} ());

