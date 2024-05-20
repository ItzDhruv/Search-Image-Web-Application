const accesskey="FMSYTyF28KakkIDkDvb_qJajMILVaZzKgPK0oNYlaSI";
const form = document.querySelector("form");
const input=document.getElementById("search-img");
const showMore=document.getElementById("show-more");
const searchResults=document.querySelector(".search-results");

let inputData = ""
let page =1;

async function searchImages(){
    inputData=input.value;
    inputData = input.value.trim(); // Trim any leading/trailing whitespace from input
    if (!inputData) { // Check if input is empty
        inputData = "beautiful"; // Set default search term to "beautiful" if input is empty
    }
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const deta = await response.json();
    const results = deta.results;
        if(page === 1){
            searchResults.innerHTML=""
        }
        results.map((result)=>{
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src=result.urls.small;
            image.alt=result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href=result.links.html;
            imageLink.target="_blank";
            imageLink.textContent=result.alt_description;
            
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        })
        page++;
        if(page>1){
            showMore.style.display="block";
        }
}

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    page=1
    searchImages()
})

showMore.addEventListener("click",()=>{
    searchImages()
})