    function shownav(){
        const menuitem = document.getElementById("menu-item");
        const menubtn = document.getElementById("nav-button");
        const menubtnimg = document.getElementById("nav-button-img");
        menuitem.classList.toggle("show");
        if(menuitem.classList.contains("show")){
            menubtnimg.src="images/nav-buttonf2.png";
        }else{
            menubtnimg.src="images/nav-button.png";
            }
    }