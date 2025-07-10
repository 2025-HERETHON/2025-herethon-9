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

    const seoulDistricts = [
        "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", 
        "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구",
        "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
    ];

    const regionList = document.getElementById("RegionList");

    if(regionList){
        const regionTop = document.createElement("div");
        regionTop.className="RegionTop";

        const allLabel = document.createElement("label");
        allLabel.classList.add("custom-checkbox");

        const allInput = document.createElement("input");
        allInput.className="checkbox";
        allInput.type="checkbox";
        allInput.id = "checkAll";

        const allSpan = document.createElement("span");
        allSpan.className="checkmark";
        
        const allText = document.createElement("span");
        allText.className="checkbox-label";
        allText.textContent="서울시 전체";

        allLabel.appendChild(allInput);
        allLabel.appendChild(allSpan);
        allLabel.appendChild(allText);

        regionTop.appendChild(allLabel);

        const line = document.createElement("div");
        line.className="RegionLine";
        

        const regionGrid = document.createElement("div");
        regionGrid.className="RegionGrid";

        seoulDistricts.forEach((district)=> {
            const label = document.createElement("label");
            label.className="custom-checkbox";

            const input = document.createElement("input");
            input.className = "checkbox";
            input.type = "checkbox";
            input. value = district;

            const span = document.createElement("span");
            span.className = "checkmark";

            const textSpan = document.createElement("span");
            textSpan.className="checkbox-label";
            textSpan.textContent = district;

            input.addEventListener("change", ()=> {
                textSpan.style.color = input.checked ? "#0D5BDA" : "#000";
                textSpan.style.fontWeight = input.checked ? "600" : "400";

                updateRegionButtonStyle();
            })

            label.appendChild(input);
            label.appendChild(span);
            label.appendChild(textSpan);

            regionGrid.appendChild(label);
        });

        regionList.appendChild(regionTop);
        regionList.appendChild(line);
        regionList.appendChild(regionGrid);

        allInput.addEventListener("change", ()=> {
            const checkboxes = regionList.querySelectorAll(`input[type="checkbox"]:not(#checkAll)`);
            checkboxes.forEach((cb)=>
                cb.checked=allInput.checked
            );
            
            const labels = document.querySelectorAll(".custom-checkbox");
            labels.forEach((label)=>{
                const input = label.querySelector(`input[type=checkbox]`);
                const labelText = label.querySelector(".checkbox-label");
                if(labelText){
                    labelText.style.color = allInput.checked ? "#0D5BDA" : "#000";
                    labelText.style.fontWeight = allInput.checked ? "600" : "400";
                }

            });

            const allText = allLabel.querySelector(".checkbox-label");
            if(allText){
                allText.style.color = allInput.checked  ? "#0D5BDA" : "#000";
                allText.style.fontWeight = allInput.checked  ? "600" : "400";

                updateRegionButtonStyle();
             }

        });
        
    }

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

    const workChoice=["1년 이하", "1년~3년", "3년~5년", "5년 이상"];
    const workList = document.querySelector(".WorkCheck");

    if(workList){
        const workTop = document.createElement("div");
        workTop.className = "WorkTop";

        const topLabel = document.createElement("label");
        topLabel.className = "custom-checkbox";

        const topInput = document.createElement("input");
        topInput.className = "checkbox";
        topInput.type="checkbox";

        const topCheckmark = document.createElement("span");
        topCheckmark.className = "checkmark";

        const topText = document.createElement("span");
        topText.className = "checkbox-label";
        topText.textContent="경력 무관";
        
        topInput.addEventListener("change", () => {
            topText.style.color = topInput.checked ? "#0D5BDA" : "#000";
            topText.style.fontWeight = topInput.checked ? "600" : "400";

            updateWorkButtonStyle();
        })

        topLabel.appendChild(topInput);
        topLabel.appendChild(topCheckmark);
        topLabel.appendChild(topText);
        workTop.appendChild(topLabel);
        workList.appendChild(workTop);

        const workLine = document.createElement("div");
        workLine.className = "WorkLine";
        workList.appendChild(workLine);

        workChoice.forEach((choice) => {
            const label = document.createElement("label");
            label.className = "custom-checkbox";

            const input = document.createElement("input");
            input.className = "checkbox";
            input.type="checkbox";
            input.value = choice;

            const checkmark = document.createElement("span");
            checkmark.className = "checkmark";

            const textSpan = document.createElement("span");
            textSpan.className="checkbox-label";
            textSpan.textContent = choice;

            input.addEventListener("change", () => {
                textSpan.style.color = input.checked ? "#0D5BDA" : "#000";
                textSpan.style.fontWeight = input.checked ? "600" : "400";
                updateWorkButtonStyle();
            })

            label.appendChild(input);
            label.appendChild(checkmark);
            label.appendChild(textSpan);

            workList.appendChild(label);
        });
    }

    const workBtn = document.querySelector(".Work");
    const workCheck = document.querySelector(".WorkCheck");

    workBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        if(workCheck.style.display==="none"||workCheck.style.display===""){
            workCheck.style.display = "flex";
        }else{
            workCheck.style.display="none";
        }

    });


    const badgeList = document.querySelector(".BadgeCheck");

    if(badgeList){
        const badgeTop = document.createElement("div");
        badgeTop.className = "BadgeTop";

        const topLabel = document.createElement("label");
        topLabel.className = "custom-checkbox";

        const topInput = document.createElement("input");
        topInput.className = "checkbox";
        topInput.type="checkbox";

        const topCheckmark = document.createElement("span");
        topCheckmark.className = "checkmark";

        const topText = document.createElement("span");
        topText.className = "checkbox-label";
        topText.textContent="전체";

        topLabel.appendChild(topInput);
        topLabel.appendChild(topCheckmark);
        topLabel.appendChild(topText);
        badgeTop.appendChild(topLabel);
        badgeList.appendChild(badgeTop);

        const badgeLine = document.createElement("div");
        badgeLine.className="BadgeLine";
        badgeList.appendChild(badgeLine);

        const label = document.createElement("label");
        label.className = "custom-checkbox";

        const input = document.createElement("input");
        input.className = "checkbox";
        input.type = "checkbox";
        
        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";
    
        const textSpan = document.createElement("span");
        textSpan.className="checkbox-label";
        textSpan.textContent = "인증배지 보유";

        input.addEventListener("change", ()=> {
            textSpan.style.color = input.checked ? "#0D5BDA" : "#000";
            textSpan.style.fontWeight = input.checked ? "600" : "400";

            updateBadgeButtonStyle();
        });

        label.appendChild(input);
        label.appendChild(checkmark);
        label.appendChild(textSpan);
        badgeList.appendChild(label);

        const badgeBtn = document.querySelector(".Badge");
        const badgeCheck = document.querySelector(".BadgeCheck");

        badgeBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            if(badgeCheck.style.display==="none"||badgeCheck.style.display===""){
                badgeCheck.style.display = "block";
            }else{
                badgeCheck.style.display = "none";
            }
        })
    }

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

   
}); 