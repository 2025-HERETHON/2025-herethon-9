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
    const urlParams = new URLSearchParams(window.location.search);
    const categoryKey = urlParams.get("category");
    const categoryMap ={
        appliance: "가전/수리",
        health: "헬스/스포츠",
        consulting: "컨설팅/비지니스",
        life: "생활/라이프",
    };
    const category = categoryMap[categoryKey];
    const name = urlParams.get("name");
    const count = urlParams.get("count");
    
    const categoryImages = document.querySelectorAll(".Category div");

    categoryImages.forEach((el)=> {
        const key = el.getAttribute("data-key");
        if(key !== categoryKey){
            el.classList.add("faded");
        }else{
            el.classList.remove("faded");
        }
    });

    

    const regionBtn = document.querySelector(".Region");
    const regionCheck = document.querySelector(".Regioncheck");

    regionBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        
        if(regionCheck.style.display==="none"||regionCheck.style.display===""){
            regionCheck.style.display = "block";
        }else{
            regionCheck.style.display = "none";
        }
    })

    

    const workBtn = document.querySelector(".Work");
    const workCheck = document.querySelector(".WorkCheck");

    workBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        closeAllFilters(".WorkCheck");
        if(workCheck.style.display==="none"||workCheck.style.display===""){
            workCheck.style.display = "flex";
        }else{
            workCheck.style.display="none";
        }

    });

        const badgeBtn = document.querySelector(".Badge");
        const badgeCheck = document.querySelector(".BadgeCheck");

        badgeBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            closeAllFilters(".BadgeCheck");
            if(badgeCheck.style.display==="none"||badgeCheck.style.display===""){
                badgeCheck.style.display = "block";
            }else{
                badgeCheck.style.display = "none";
            }
        })
    

    function updateRegionButtonStyle() {
        const regionBtn = document.querySelector(".Region");
        const checkedBoxes = document.querySelectorAll(`#RegionList input[type="checkbox"]:checked`);

        if(checkedBoxes.length>0){
            regionBtn.style.color="#0D5BDA";
        }else{
            regionBtn.style.color = "#000";
        }
    }

    function updateWorkButtonStyle() {
        const workBtn = document.querySelector(".Work");
        const checkedBoxes = document.querySelectorAll(`.WorkCheck input[type=checkbox]:checked`);

        if(checkedBoxes.length>0){
            workBtn.style.color="#0D5BDA";
        }else{
            workBtn.style.color="#000";
        }
    }

    function updateBadgeButtonStyle(){
        const badgeBtn = document.querySelector(".Badge");
        const checkedBoxes = document.querySelectorAll(`.BadgeCheck input[type=checkbox]:checked`);

        if(checkedBoxes.length>0){
            badgeBtn.style.color="#0D5BDA";
        }else{
            badgeBtn.style.color="#000";
        }
        
    }

    const showCount = document.querySelector(".Count");
    showCount.textContent=count;

    function closeAllFilters(exceptClass) {
    const filterSections = [
        { btn: ".Region", check: ".Regioncheck" },
        { btn: ".Work", check: ".WorkCheck" },
        { btn: ".Badge", check: ".BadgeCheck" },
    ];

    filterSections.forEach(({ check }) => {
        if (!check.includes(exceptClass)) {
            const el = document.querySelector(check);
            if (el) el.style.display = "none";
        }
    });
}

   
}); 