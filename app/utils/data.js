var imageFactory = {
    counter: 0,
    request: '',
    json: '',
    setSource(source){
        this.source = source;
        this.promise = fetch(new Request(this.source)).then((response) => response.json());
        return this;
    },
    next: function (noOfSlides, cb) {
        this.promise
            .then((json)=> {
                processResponse(json, noOfSlides, cb);
            });
        return this;
    }
};
var processResponse = (json, noOfSlides, cb)=> {
    let startIndex = imageFactory.counter;
    imageFactory.counter += noOfSlides;
    imageFactory.counter = json.length < imageFactory.counter ? json.length : imageFactory.counter;
    let endIndex = imageFactory.counter - 1;

    let images = json.filter((x, y)=>y >= startIndex && y <= endIndex).map((x)=>x.image.large);
    cb(images);
};
export default imageFactory;
