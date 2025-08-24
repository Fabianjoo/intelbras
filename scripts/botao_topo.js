var botaotopo = document.getElementById("btntopo")

window.addEventListener("scroll", function(){
    if(document.documentElement.scrollTop > 300){
        botaotopo.style.display = "block";
    } else {
        botaotopo.style.display = "none";
    }
    })

botaotopo.addEventListener("click", function(){
    window.scrollTo({top: 0, behavior: "smooth"}); // objeto
})