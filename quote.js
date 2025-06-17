

const quotesContainer=document.getElementById("quotes-container");
const getQuotes=async ()=>{
    try{
        const response=await fetch("https://dummyjson.com/quotes?limit=20",{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        });
        const result=await response.json();
        return result;
    }catch{
        return new error(error.message);
    }
}
const dailyQuotes=async () =>{
    const quotes= await getQuotes();
    console.log({quotes});
    const quotesDaily=Array.isArray(quotes?.quotes)?quotes?.quotes:[];
    console.log({quotesDaily});
    quotesDaily.forEach(item => {
        
    const words=document.createElement("p");
    const author=document.createElement("p");
    const container=document.createElement("div");
    const icon = document.createElement("button")

    container.appendChild(words);
    container.appendChild(author);
    container.appendChild(icon)

    words.textContent=`${item.quote}`;
    author.textContent=`Author:${item.author}`;
    icon.textContent = "Add To Favorites"

    words.style.fontWeight="Bold";
    words.style.color="rgb(43, 7, 24)";
    words.style.paddingTop="40px";
    words.style.paddingLeft="40px";
    words.style.fontSize="22px"
    
    author.style.paddingLeft="40px";
    author.style.paddingBottom="40px";
    icon.style.width = "20%"
    icon.style.color = "white"
    icon.style.marginBottom = "20px"

    container.setAttribute("class","quotes-carp")
    quotesContainer.appendChild(container);
    });

}

dailyQuotes();
const searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', () => {
  const filter = searchInput.value.toLowerCase();
  const items = quotesDaily.querySelectorAll('p');

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(filter)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});


