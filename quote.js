

const quotesContainer=document.getElementById("quotes-container");

const getQuotes=async ()=>{

    try{
        const response=await fetch("https://dummyjson.com/quotes?limit=10000",{
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

    container.appendChild(words);
    container.appendChild(author);

    words.textContent=`${item.quote}`;
    author.textContent=`Author:${item.author}`;

    words.style.fontWeight="Bold";
    words.style.color="Maroon";
    words.style.paddingTop="40px";
    words.style.paddingLeft="40px";
    words.style.fontSize="22px"
    
    author.style.paddingLeft="40px";
    author.style.paddingBottom="40px";

    container.setAttribute("class","quotes-carp")
    quotesContainer.appendChild(container);
    });

}

dailyQuotes();


