



var imageFactory = {
    counter:0,
    request:'',
    next: function(noOfSlides,source,cb){
        imageFactory.request = imageFactory.request || new Request(source);
        fetch(imageFactory.request).then(function(response) {
            return response.json();
        }).then((json)=>{
            noOfSlides = noOfSlides || 1;
            noOfSlides = json.length<noOfSlides?json.length:noOfSlides;
            imageFactory.counter+= noOfSlides;
            cb(Array.apply(0,new Array(noOfSlides)).map(function(x,y){return json[y].image.medium}));
        });
    }
};
        export default imageFactory;
