



var imageFactory = {
    counter:0,
    request:'',
    next: function(noOfSlides,source){
        imageFactory.request = imageFactory.request || new Request(source);
        fetch(imageFactory.request).then(function(response) {
            return response.json();
        }).then((json)=>{
            noOfSlides = noOfSlides || 1;
            imageFactory.counter+= noOfSlides;
            return Array.apply(0,new Array(noOfSlides)).map(function(x,y){return json[y + 1];});
        });
    }
};
        export default imageFactory;
