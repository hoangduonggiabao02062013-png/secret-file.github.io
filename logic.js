const ANSWER_STAGE_1 = "celestial";
const ANSWER_STAGE_2 = ["T", "H", "R", "O", "Z", "Y", "C", "K", "D"];
const ANSWER_STAGE_3 = ["snowflake", "snowflakes"];
const ANSWER_STAGE_5 = "the challenge puzzels"; 
const ANSWER_STAGE_6 = "vocational"; // Đồng bộ mã Base64 mới trên màn hình của bạn

let currentSequence = [];
let hasClickedPortalLink = false;
let countdownTimer;
let timeLeft = 30;

// STAGE 1
function kiemTraKieu() {
    var chuoiNhap = document.getElementById("oNhapLieu").value;
    var thongBao = document.getElementById("thongBao");
    var inputField = document.getElementById("oNhapLieu");

    if (chuoiNhap.trim().toLowerCase() === ANSWER_STAGE_1) {
        thongBao.innerHTML = "<span style='color:#00ffcc;'>Exactly! Stage 1 Passed. Loaded Stage 2...</span>";
        inputField.style.borderColor = "#00ffcc";
        
        setTimeout(function() {
            document.getElementById("mainGuide").style.display = "none";
            document.getElementById("stage1").style.display = "none";
            document.getElementById("stage2").style.display = "block";
            thongBao.innerHTML = "";
        }, 1500);
    } else {
        thongBao.innerHTML = "<span style='color:#ff3366;'>That's incorrect! Give it another try.</span>";
        inputField.style.borderColor = "#ff3366";
        setTimeout(function() { thongBao.innerHTML = ""; inputField.value = ""; inputField.style.borderColor = "#45f3ff"; }, 2000);
    }
}

// STAGE 2
function pressKey(key) {
    var thongBao = document.getElementById("thongBao");
    var display = document.getElementById("sequenceDisplay");
    
    currentSequence.push(key);
    display.innerText = currentSequence.join(" ➔ ");
    const currentIndex = currentSequence.length - 1;
    
    if (currentSequence[currentIndex] !== ANSWER_STAGE_2[currentIndex]) {
        thongBao.innerHTML = "<span style='color:#ff3366;'>SEQUENCE BROKEN! RESETTING...</span>";
        currentSequence = [];
        setTimeout(function() { display.innerText = ""; thongBao.innerHTML = ""; }, 1200);
        return;
    }

    if (currentSequence.length === ANSWER_STAGE_2.length) {
        thongBao.innerHTML = "<span style='color:#00ffcc;'>Sequence accepted! Loaded Stage 3...</span>";
        
        setTimeout(function() {
            document.getElementById("mainGuide").style.display = "none";
            document.getElementById("stage2").style.display = "none";
            document.getElementById("stage3").style.display = "block";
            thongBao.innerHTML = "";
        }, 1500);
    }
}

// STAGE 3
function checkRiddle() {
    var rInput = document.getElementById("riddleInput").value;
    var thongBao = document.getElementById("thongBao");
    var rField = document.getElementById("riddleInput");

    if (ANSWER_STAGE_3.includes(rInput.trim().toLowerCase())) {
        thongBao.innerHTML = "<span style='color:#00ffcc; font-size: 18px;'>🎉 COGNITIVE VERIFICATION SUCCESSFUL!</span>";
        
        setTimeout(function() {
            document.getElementById("mainGuide").style.display = "none";
            document.getElementById("stage3").style.display = "none";
            document.getElementById("victoryReward").style.display = "block";
            thongBao.innerHTML = "";
        }, 1200);
    } else {
        thongBao.innerHTML = "<span style='color:#ff3366;'>INCORRECT ANSWER! THE GRID REFUSES ACCESS.</span>";
        rField.style.borderColor = "#ff3366";
        setTimeout(function() { thongBao.innerHTML = ""; rField.value = ""; rField.style.borderColor = "#45f3ff"; }, 2000);
    }
}

function toggleHintModal(show) {
    const modal = document.getElementById("hintModal");
    if (show) modal.classList.add("active");
    else modal.classList.remove("active");
}

// STAGE 4
function triggerLink() { 
    hasClickedPortalLink = true; 
}

window.onfocus = function() {
    if (hasClickedPortalLink) {
        document.getElementById("mainGuide").style.display = "none";
        document.getElementById("victoryReward").style.display = "none";
        document.getElementById("stage4").style.display = "block";
        
        var hiddenBtn = document.getElementById("hiddenButton");
        var randomTop = Math.floor(Math.random() * 75) + 10;  
        var randomLeft = Math.floor(Math.random() * 75) + 10; 
        
        hiddenBtn.style.top = randomTop + "%";
        hiddenBtn.style.left = randomLeft + "%";
        hiddenBtn.style.display = "block";
        hasClickedPortalLink = false;
    }
};

function clickHiddenButton() {
    document.getElementById("stage4").style.display = "none";
    document.getElementById("hiddenButton").style.display = "none";
    document.getElementById("stage5").style.display = "block";
    document.body.classList.add("alarm-active");
    startCountdown();
}

// STAGE 5
function startCountdown() {
    timeLeft = 30;
    document.getElementById("timerDisplay").innerText = timeLeft;
    document.getElementById("stage5Hint").innerHTML = "🔍 Hint: Code structure consists of 3 English words [The _ _ _ _ _ _ _ _ _ _  _ _ _ _ _ _ _ ]";
    
    countdownTimer = setInterval(function() {
        timeLeft--;
        document.getElementById("timerDisplay").innerText = timeLeft;
        if (timeLeft === 15) {
            document.getElementById("stage5Hint").innerHTML = "🚨 EMERGENCY HINT: 'The challenge and the riddles' (Note typo in the last word: puzzels)";
            document.getElementById("stage5Hint").style.color = "#ff3366";
        }
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            currentSequence = []; hasClickedPortalLink = false; 
            document.getElementById("oNhapLieu").value = "";
            document.getElementById("riddleInput").value = "";
            document.getElementById("defuseInput").value = "";
            document.getElementById("sequenceDisplay").innerText = "";
            document.getElementById("oNhapLieu").style.borderColor = "#45f3ff";
            document.getElementById("riddleInput").style.borderColor = "#45f3ff";
            document.body.classList.remove("alarm-active");
            document.getElementById("stage5").style.display = "none";
            document.getElementById("mainGuide").style.display = "block";
            document.getElementById("stage1").style.display = "block";
            document.getElementById("thongBao").innerHTML = "<span style='color:#ff3333;'>CORE DETONATED! ALL GAME DATA RESET TO STAGE 1...</span>";
            setTimeout(function() { document.getElementById("thongBao").innerHTML = ""; }, 4000);
        }
    }, 1000);
}

function checkDefuse() {
    if (document.getElementById("defuseInput").value.trim().toLowerCase() === ANSWER_STAGE_5) {
        clearInterval(countdownTimer);
        document.body.classList.remove("alarm-active");
        document.getElementById("stage5").style.display = "none";
        document.getElementById("stage6").style.display = "block";
        document.getElementById("thongBao").innerHTML = "Core Stabilized. Intercepting hacker signal...";
        setTimeout(function() { thongBao.innerHTML = ""; }, 2000);
    } else {
        document.getElementById("thongBao").innerHTML = "ACCESS DENIED! WRONG OVERRIDE CODE.";
        document.getElementById("defuseInput").value = "";
        setTimeout(function() { document.getElementById("thongBao").innerHTML = ""; }, 2000);
    }
}

// STAGE 6
function checkHackerIdentity() {
    var identity = document.getElementById("hackerInput").value.trim().toLowerCase();
    var thongBao = document.getElementById("thongBao");
    var hField = document.getElementById("hackerInput");

    if (identity === ANSWER_STAGE_6) {
        document.getElementById("stage6").style.display = "none";
        document.getElementById("gameConsole").style.borderColor = "#00ffcc";
        document.getElementById("gameConsole").style.boxShadow = "0 0 25px #00ffcc";
        document.getElementById("finalVictory").style.display = "block";
        thongBao.innerHTML = "";
    } else {
        thongBao.innerHTML = "ID VERIFICATION FAILED! SIGNAL LOST.";
        hField.style.borderColor = "#ff3366";
        setTimeout(function() { thongBao.innerHTML = ""; hField.value = ""; hField.style.borderColor = "#45f3ff"; }, 2000);
    }
}

function closeAndRedeem() {
    window.open("redeem.html", "_blank");
    window.open('', '_self', '').close(); 
}
