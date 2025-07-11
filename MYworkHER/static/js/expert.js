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
    

     const experts = [
        {
            nickname: "전문가 닉네임",
            introduce: "한줄소개 한줄소개 한줄소개",
            description: "업무설명 업무설명업무설명 업무설명업무설명 업무설명...",
            hasBadge: true
        },
        {
            nickname: "홍길동 전문가",
            introduce: "10년차 운동전문가",
            description: "헬스트레이닝, 요가, 필라테스, 운동 루틴 설계 및 식단 코칭",
            hasBadge: false
        },
        {
            nickname: "김영희 전문가",
            introduce: "가전 수리 경력 15년",
            description: "에어컨, 세탁기, 냉장고 수리 전문. 친절한 서비스 제공.",
            hasBadge: true
        },
        {
            nickname: "이지은 전문가",
            introduce: "마케팅 컨설턴트",
            description: "SNS 마케팅 전략 및 브랜드 컨설팅",
            hasBadge: true
        },
        {
            nickname: "최윤아 전문가",
            introduce: "요가 강사",
            description: "오프라인/온라인 요가 수업 가능",
            hasBadge: false
        },
        {
            nickname: "강다혜 전문가",
            introduce: "헬스 PT 전문가",
            description: "체형 분석과 맞춤 운동 코칭 전문",
            hasBadge: false
        }
    
    ];


   
    
 
   

    const regionBtn = document.querySelector(".Region");
    const regionCheck = document.querySelector(".Regioncheck");

    regionBtn.addEventListener("click",()=>{
        if(regionCheck.style.display==="none"||regionCheck.style.display===""){
            regionCheck.style.display = "block";
        }else{
            regionCheck.style.display = "none";
        }
    })

    

    const workBtn = document.querySelector(".Work");
    const workCheck = document.querySelector(".WorkCheck");

    workBtn.addEventListener("click", ()=>{
        if(workCheck.style.display==="none"||workCheck.style.display===""){
            workCheck.style.display = "flex";
        }else{
            workCheck.style.display="none";
        }

    });


    

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

    const searchResultContainer = document.getElementById("Result");
    const searchInput = document.querySelector(".Search");
    const resultText = document.querySelector(".ResultText");

    let filtered=[];

    searchInput.addEventListener("keydown",(e)=>{
        
        if(e.key==="Enter"){
            const recommend=document.getElementById("Recommend");
            const reText = document.querySelector(".ReText");

            if(recommend){
                recommend.style.display="none";
            }
            if(reText){
                    reText.style.display="none";
            }


            const keyword = searchInput.value.toLowerCase();
            filtered = experts.filter((expert)=>
                expert.nickname.toLowerCase().includes(keyword)||
                expert.introduce.toLowerCase().includes(keyword)||
                expert.description.toLowerCase().includes(keyword)
            );

            makeExperts(filtered, searchResultContainer, false, 5);

            if(resultText){
            resultText.innerHTML=`
                <span class="BlueText">${searchInput.value}</span>
                <span class="BlackText"> 키워드에 해당하는 </span>
                <span class="BlueText">${filtered.length}</span>
                <span class="BlackText">명의 전문가가 있습니다.</span>
                `;
            }

            const filter = document.querySelector(".ResultFilter");
            if(filter) filter.style.display="flex";

            const count = document.querySelector(".Count");
            count.textContent=`${filtered.length}`;
            showAllBtn.style.display="block";
        }
                
    });

    const showAllBtn = document.querySelector(".ShowAllBtn");
        showAllBtn.addEventListener("click",()=>{
            makeExperts(filtered,searchResultContainer,true);
            showAllBtn.style.display="none";
    });


    
        
});