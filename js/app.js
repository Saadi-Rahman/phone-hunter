const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.textContent = "";
    // display 12 phones only
    const showAll = document.getElementById("show-all");
    if(dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAll.classList.remove("d-none");
    }
    else {
        showAll.classList.add("d-none");
    }
    
    // display no phone found
    const noPhone = document.getElementById("alert-text");
    if(phones.length === 0){
        noPhone.classList.remove("d-none");
    }
    else {
        noPhone.classList.add("d-none");
    }
    // display all phones
    phones.forEach(phone =>{
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card h-100 p-2">
        <img src="${phone.image}" class="card-img-top px-3 pt-3" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop spinner
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// handle search button click
document.getElementById("btn-search").addEventListener("click", function(){
    // start spinner
    processSearch(12);
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none");
    }
}

// not the best way to show all phones
document.getElementById("btn-show-all").addEventListener("click", function(){
    console.log("btn clicked");
    processSearch();
})


loadPhones("a");