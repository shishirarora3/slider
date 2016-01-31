
	
var ImageFactory = {
	baseURL : 'http://placehold.it/120x120&text=image',
	counter:0,
	
	next: function(noOfSlides){
			noOfSlides = noOfSlides || 1;
			ImageFactory.counter+= noOfSlides;
			return Array.apply(0,new Array(noOfSlides)).map(function(x,y){return ImageFactory.baseURL + (y + 1);});
	}
};
	

		