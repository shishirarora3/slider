var myList = document.querySelector('ul');
fetch(myRequest).then(function(response) {
    return response.json().then(function(json) {
        for(i = 0; i < json.products.length; i++) {
            var listItem = document.createElement('li');
            listItem.innerHTML = '<strong>' + json.products[i].Name + '</strong> can be found in ' + json.products[i].Location + '. Cost: <strong>£' + json.products[i].Price + '</strong>';
            myList.appendChild(listItem);
        }
    });
});



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
