document.addEventListener("DOMContentLoaded", ()=>{
    const loginSection = document.getElementById("loginSection");
    const alarm = document.querySelector(".Alarm");



    if(loginSection){
        if(isLogin) {
            const logoutDiv = document.createElement("div");
            logoutDiv.textContent="로그아웃";
            logoutDiv.className = "Logout";
            loginSection.replaceWith(logoutDiv);
        }
        else{
            loginSection.style.display = "inline-flex";
        }
    }

    if(alarm){
        alarm.style.display = isLogin&&unreadChat ? "block" : "none";
    }



    const categoryImages = document.querySelectorAll(".Category div");
    const subLists = document.querySelectorAll(".subcategory-list");

    const subsBox = document.querySelector(".Subs");
    
    /*function makeSubcategories(categoryClass){
        const subs = subCategoryData[categoryClass];
        subsBox.innerHTML="";

        subs.forEach((sub)=>{
            const subItem = document.createElement("div");
            subItem.className="SubItem";

            subItem.innerHTML = `
                <span class="name">${sub.name}</span>
                <span class="subCount">전문가 <span class="count">${sub.count}명</span></span>
            `;

            subItem.addEventListener("click", ()=>{
                const params = new URLSearchParams({
                category: categoryClass,
                name: sub.name,
                count: sub.count
            });
                window.location.href = `../pages/category_expert.html?${params.toString()}`
            })
            subsBox.appendChild(subItem);
        });
    
    }*/

    function categoryClick(category){
        categoryImages.forEach((el)=> el.classList.add("faded"));
        category.classList.remove("faded");

        const key = category.dataset.key;
        
        subLists.forEach(list => list.style.display = "none");

        const targetList = document.getElementById("sub-" + key);
        if (targetList) targetList.style.display = "grid";
    }

    categoryImages.forEach((categoryDiv) => {
        categoryDiv.addEventListener("click", () => {
            categoryClick(categoryDiv);
        });
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const selectCategory = urlParams.get("category")||"appliance";

    const targetCategory = Array.from(categoryImages).find(div=>div.dataset.key===selectCategory);
    categoryClick(targetCategory||categoryImages[0]);
  
});