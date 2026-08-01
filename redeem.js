// ==========================================
// DANH SÁCH MÃ MA TRẬN CHỮ RƠI VŨ TRỤ
// ==========================================
const cosmicPhrases = [
    "FETCHING_COSMIC_BURGER_ASSETS...",
    "ENTITY_STATE: CORRUPTED",
    "OVERRIDING_ROBLOX_DATA_STREAMS...",
    "FIND_THE_BURGERS_ARCHIVE_LOADED",
    "CRITICAL_ERROR: SYSTEM_NOT_READY",
    "THE_VOID_IS_WATCHING_YOU",
    "DIMENSIONAL_SHIFT_DETECTION: 99.4%",
    "COSMIC_ENTITY_MAPPING_ERROR...",
    "BURGER_CORE_OVERLOAD_2026",
    "PARSING_FORGOTTEN_PARAMETERS...",
    "ACCESS_DENIED_BY_THE_CREATOR",
    "GLITCH_LOOP_INITIALIZED",
    "WARNING: REALITY_MATRIX_BROKEN"
];

// ==========================================
// CẤU HÌNH 5 CÂU ĐỐ COSMIC ENTITY BURGER
// ==========================================
const COSMIC_RIDDLES = [
    {
        q: "Layer 1: 'I have a cosmic bun on top and a cosmic bun on the bottom. In the center, I hold the weight of an entire collapsing star, yet I can be eaten in one bite. What cosmic ingredient am I?'",
        a: ["patty", "cosmic patty", "star patty"]
    },
    {
        q: "Layer 2: 'Born in the gas clouds of Jupiter, I am neon green, sliced thin, and I bring a sour, reality-bending crunch to the cosmic entity layers. What ingredient am I?'",
        a: ["pickle", "pickles", "cosmic pickle", "cosmic pickles"]
    },
    {
        q: "Layer 3: 'Melted across the celestial patty, I hold the layers together like gravitational pull. I am golden like the sun but colder than interstellar space. What ingredient am I?'",
        a: ["cheese", "cosmic cheese", "space cheese"]
    },
    {
        q: "Layer 4: 'I pour out of a supernova nebula like liquid plasma. I am a deep space fluid that adds a spicy, dimensional heat flavor to the matrix. What ingredient am I?'",
        a: ["sauce", "cosmic sauce", "space sauce", "secret sauce"]
    },
    {
        q: "Layer 5: 'Racked with asteroid sesame seeds, I am the top dome that seals the entire archive structure from the vacuum of space. What final ingredient am I?'",
        a: ["bun", "cosmic bun", "top bun", "space bun"]
    }
];

let matrixInterval;
let currentCosmicLayer = 0; 

// ==========================================
// LOGIC KHỞI CHẠY ĐỔI MÃ PHẦN THƯỞNG
// ==========================================
function processRedeem() {
    const input = document.getElementById("codeInput").value.trim();
    const output = document.getElementById("outputMsg");
    const box = document.getElementById("redeemBox");
    const targetCode = "SECURE_UNIVERSE_PASSED_2026"; 

    if (input === targetCode) {
        output.innerHTML = "<span style='color: #ff3366; text-shadow: 0 0 15px #ff3366;'>\"It's not time yet...\"</span>";
        box.classList.add("corrupted");
        document.getElementById("codeInput").disabled = true;
        document.getElementById("exchangeBtn").disabled = true;
        
        if (!matrixInterval) {
            matrixInterval = setInterval(createCosmicRain, 50); 
        }

        // Tự động chuyển hướng mượt mà sang tệp domain.html sau 5 giây ma trận [INDEX]
        setTimeout(() => {
            clearInterval(matrixInterval); 
            document.getElementById("redeemInputStage").style.display = "none";
            output.innerHTML = "";
            box.classList.remove("corrupted");
            box.style.borderColor = "#00ffcc";
            box.style.boxShadow = "0 0 25px rgba(0, 255, 204, 0.4)";
            
            document.getElementById("cosmicPuzzleArea").style.display = "block";
            loadCosmicRiddle();
        }, 5000);

    } else {
        output.innerHTML = "<span style='color: #ff3366;'>INVALID CORE KEY. ACCESS REFUSED.</span>";
        document.getElementById("codeInput").value = "";
        setTimeout(() => { output.innerHTML = ""; }, 2500);
    }
}

// ==========================================
// HÀM TẢI CÂU ĐỐ COSMIC THEO LAYER
// ==========================================
function loadCosmicRiddle() {
    document.getElementById("currentLayerNum").innerText = currentCosmicLayer + 1;
    document.getElementById("cosmicRiddleText").innerHTML = COSMIC_RIDDLES[currentCosmicLayer].q;
    document.getElementById("cosmicAnswerInput").value = "";
    document.getElementById("cosmicAnswerInput").style.borderColor = "#00ffcc";
}

// ==========================================
// HÀM KIỂM TRA ĐÁP ÁN CÂU ĐỐ VŨ TRỤ
// ==========================================
function checkCosmicAnswer() {
    const playerAns = document.getElementById("cosmicAnswerInput").value.trim().toLowerCase();
    const output = document.getElementById("outputMsg");
    const inputField = document.getElementById("cosmicAnswerInput");

    if (COSMIC_RIDDLES[currentCosmicLayer].a.includes(playerAns)) {
        currentCosmicLayer++;
        
        if (currentCosmicLayer < COSMIC_RIDDLES.length) {
            output.innerHTML = "<span style='color: #00ffcc;'>LAYER INTEGRITY COMPATIBLE! LOADING NEXT LAYER...</span>";
            setTimeout(() => {
                output.innerHTML = "";
                loadCosmicRiddle();
            }, 1200);
        } else {
            // TỰ ĐỘNG CHUYỂN TRANG: Giải xong câu đố thứ 5 tự nhảy sang miền không gian domain.html [INDEX]
            document.getElementById("cosmicPuzzleArea").style.display = "none";
            output.innerHTML = "<span style='color: #00ffcc;'>OMNIPOTENT MATRIX DETECTED! TRANSFERRING TO DOMAIN...</span>";
            
            setTimeout(() => {
                window.location.href = "domain.html";
            }, 2000);
        }
    } else {
        output.innerHTML = "<span style='color: #ff3366;'>PARITY MISMATCH! COSMIC MATRIX COLLAPSED. REBOOTING TO LAYER 1...</span>";
        inputField.style.borderColor = "#ff3366";
        currentCosmicLayer = 0;
        
        setTimeout(() => {
            output.innerHTML = "";
            loadCosmicRiddle();
        }, 2500);
    }
}

// ==========================================
// HÀM SINH CHỮ MA TRẬN RƠI TỰ DO
// ==========================================
function createCosmicRain() {
    const textElement = document.createElement("div");
    textElement.classList.add("cosmic-text");
    const randomPhrase = cosmicPhrases[Math.floor(Math.random() * cosmicPhrases.length)];
    textElement.innerText = randomPhrase;
    textElement.style.left = Math.random() * 100 + "vw";
    const duration = Math.random() * 2 + 2;
    textElement.style.animationDuration = duration + "s";
    textElement.style.fontSize = Math.floor(Math.random() * 6) + 10 + "px";
    
    if (Math.random() > 0.7) {
        textElement.style.color = "rgba(0, 255, 204, 0.25)";
    }
    if (currentCosmicLayer >= 5) {
        textElement.style.color = Math.random() > 0.5 ? "rgba(188, 19, 254, 0.4)" : "rgba(0, 255, 204, 0.4)";
    }
    
    document.body.appendChild(textElement);
    setTimeout(() => { textElement.remove(); }, duration * 1000);
}

// BẮT SỰ KIỆN GÕ PHÍM ENTER TỰ ĐỘNG NỘP MÃ
document.getElementById("codeInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") processRedeem();
});

// Bắt sự kiện gõ phím Enter cho ô nhập câu hỏi vũ trụ
setTimeout(function() {
    var el = document.getElementById("cosmicAnswerInput");
    if(el) {
        el.addEventListener("keypress", function(event) {
            if (event.key === "Enter") checkCosmicAnswer();
        });
    }
}, 1000);
