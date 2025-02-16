//fetch data from the json file
let travelData =[]
fetch("./data.json")
.then(response => response.json())
.then(data => {
    travelData =data;
    console.log("data loaded:", travelData);
}).catch(error => console.error("error fetching data:", error))

//function display search results
function searchRecommendations() {
    let searchQuery = document.getElementById("searchBox").value.toLowerCase();
    let contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ""; // Clear previous results

    if (!searchQuery) {
        contentDiv.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    let results = [];

    // Search for matching countries and cities
    travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchQuery)) {
            results.push({ name: country.name, description: "A beautiful country to visit!", imageUrl: "images/country.jpg" });
        }
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchQuery)) {
                results.push(city);
            }
        });
    });
        // Search for matching temple

    travelData.temples.forEach(temple =>{
        if (temple.name.toLowerCase().includes(searchQuery)){
            results.push(temple);
        }
    });
    //matching beaches
    travelData.beaches.forEach(beach =>{
        if (beach.name.toLowerCase().includes(searchQuery)){
            results.push(beach);
        }
    });
    //display result
    if (results.length>0){
        results.forEach(place => {
            let placeCard = document.createElement("div");
            placeCard.className ="card";
            placeCard.innerHTML=`
            <img src="${place.imageUrl}" alt ="${place.name}">
            <h2>${place.name}</h2>
            <p>${place.description}</p>
            `;
            contentDiv.appendChild(placeCard);

        });
     } else{
            contentDiv.innerHTML ="<p> no recommendations found.</p>"
        }
    }




function clearResults(){
    document.getElementById("searchBox").value ="";
    document.getElementById("content").innerHTML="";

}