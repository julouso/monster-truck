// copier/coller de
//          https://siongui.github.io/2012/06/25/javascript-keyboard-event-arrow-key-example/

var Key1 = {
  GAUCHE:   37, // gauche
  HAUT:     38, // haut
  DROITE:  39,  // droite
  BAS:   40     // bas
};


var Key2 = {
  GAUCHE:   65,  //  a 
  HAUT:     87,  //  w
  DROITE:  68,   //  d
  BAS:   83      //  s
};






class Monster {
	constructor(id,key,image,init_position){

            // control keys 
            this.Key = {
				  _pressed: {},

				//  LEFT: ,
				  UP: key.UP,
				  RIGHT: key.RIGHT,
				  DOWN: key.DOWN,
				  
				  isDown: function(keyCode) {
				    return this._pressed[keyCode];
				  },
				  
				  onKeydown: function(event) {
				    this._pressed[event.keyCode] = true;
				  },
				  
				  onKeyup: function(event) {
				    delete this._pressed[event.keyCode];
				  }

			};
			this.Key.LEFT=key.GAUCHE;
			this.Key.RIGHT=key.DROITE;
			this.Key.DOWN=key.BAS;
			this.Key.UP=key.HAUT;

			this.speed={
				max:100,
				min:0
			};



            // html anchor
			this.id=id;
	        this.joueur1 = document.getElementById(id);

            // Valeurs par défaut

            // mouvement
            this.move={x:0,y:0};
            this.direction={direction:"d",x:1,y:1};

            // style
            this.joueur1.style.height='100px'
            this.joueur1.style.width='100px';
            this.joueur1.style.backgroundImage='url("'+image+'")';
            this.joueur1.style.backgroundSize='100% 100%';
            this.joueur1.style.backgroundRepeat='no-repeat';
            this.joueur1.style.position='absolute';
            this.joueur1.style.bottom=0;
            this.joueur1.style.left=init_position;
            this.joueur1.style.border="solid 1px black";

            var me=document.getElementById(this.id).getBoundingClientRect();

            this.position={};
            this.position.x=me.x;
            this.position.y=me.y;
            


	  };




    acceleration(){return .5};
    decceleration(){ return .5};

    tourne_droite(){
		  if(this.direction.direction==="g"){
		    this.direction.direction="d";
		    this.joueur1.style.transform+='scale(-1,1)';
		    this.direction.x=1;
		  };
		};
  tourne_gauche(){
	  if(this.direction.direction==="d"){
	    this.direction.direction="g";
	    this.joueur1.style.transform+='scale(-1,1)';
	     this.direction.x=-1;
	  }
	};

  reverse(){
    if(this.direction.direction === "g") {
      this.tourne_droite()
    } else {
      this.tourne_gauche()
    }
  }
   draw(){
        this.joueur1.style.left=this.position.x+'px';

   };


    update(){
            if (this.Key.isDown(this.Key.UP)){ 
                 if(this.move.x>this.speed.max){
                 	this.move.x=this.speed.max;
                 }else if(this.move.x<this.speed.min){
                 	this.move.x=this.speed.min;
                 }else{
                 	this.move.x+=this.acceleration();
                 }
             };
			if (this.Key.isDown(this.Key.LEFT)) this.tourne_gauche();
			if (this.Key.isDown(this.Key.DOWN)) { 
                  if(this.move.x>this.speed.max){
                 	this.move.x=this.speed.max;
                 }else if(this.move.x<this.speed.min){
                 	this.move.x=this.speed.min;
                 }else{
                 	this.move.x+=-this.decceleration();
                 }
             };
			if (this.Key.isDown(this.Key.RIGHT)) this.tourne_droite();


           var me=document.getElementById(this.id).getBoundingClientRect();
           var world=document.getElementById('zoneDeJeu').getBoundingClientRect();

             if(world.left>(this.position.x+100)){ // gauche
             	this.position.x=world.right;
             }
	         if(world.right<this.position.x){ // à droite
             	this.position.x=world.left-100;
	             }



       this.position.x+=this.direction.x*this.move.x;
  // this.joueur1.style.transform +='translate('+(this.direction.x*this.move.x)+'px,'+(-this.direction.y*this.move.y)+'px)';


      

    };



};


function detectCollision(truck1, truck2){

  const dist =Math.abs(truck1.position.x - truck2.position.x);
   console.log("dist: ", dist)
  
  if( dist <= 100 ) {
    return true
  }
  return false


}


var Monster1 = new Monster("joueur1",Key1,"ressources/truck_bleu.png",'10%');
 window.addEventListener('keyup', function(event) { Monster1.Key.onKeyup(event); }, false);
 window.addEventListener('keydown', function(event) { Monster1.Key.onKeydown(event); }, false);

var Monster2 = new Monster("joueur2",Key2,"ressources/truck_rouge.png",'20%');
 window.addEventListener('keyup', function(event) { Monster2.Key.onKeyup(event); }, false);
 window.addEventListener('keydown', function(event) { Monster2.Key.onKeydown(event); }, false);





/**
 * Firefox, Chrome, or modern browsers: addEventListener
 */

/*
  function _addEventListener(evt, element, fn) {
  if (window.addEventListener) {
    element.addEventListener(evt, fn, false);
  }
  else {
    element.attachEvent('on'+evt, fn);
  }
};


  function handleKeyboardEvent(evt) {
  if (!evt) {evt = window.event;} // for old IE compatible
  var keycode = evt.keyCode || evt.which; // also for cross-browser compatible
  
  switch (keycode) {
    case Key.GAUCHE:
      Monster1.tourne_gauche();
      break;
    case Key.HAUT:
      Monster1.avance();
      break;
    case Key.DROITE:
      Monster1.tourne_droite();
      break;
    case Key.BAS:
      Monster1.recule();
      break;
    //default:
        //info.value += "SOMEKEY ";
  }
};

_addEventListener('keydown', document, handleKeyboardEvent);
*/







// GAME LOOP   
//  https://developer.mozilla.org/en-US/docs/Games/Anatomy

;(function () {
  function main() {
    window.requestAnimationFrame( main );
    // Your main loop contents.
    
    if( detectCollision(Monster1,Monster2) ){

      Monster1.reverse()
      Monster1.update();
      Monster1.move.x = Math.floor(Monster1.move.x/2)

      Monster2.reverse()
    Monster1.update();
      Monster2.move.x = Math.floor(Monster2.move.x/2)
    }
    
    
      Monster1.update();
      Monster1.draw();

     Monster2.update();
     Monster2.draw();
  }
  
  main(); // Start the cycle
})();





