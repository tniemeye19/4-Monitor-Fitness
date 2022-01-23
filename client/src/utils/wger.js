function exerciseSearch(equipment){
    

    const api = "https://wger.de/api/v2/exercise/?equipment=7&language=2";

    fetch(api, {
        "method": "GET"
    })
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                data.results.forEach(result => console.log(result.name + " - " + result.description));
            })
        }
        else{
            console.log("error");
        }
    })
};

module.exports = exerciseSearch;