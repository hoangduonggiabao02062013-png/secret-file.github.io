const FINAL_UNVEIL_CODE = "void"; 
const HINT_TARGET_URL = "hint.html"; 

document.addEventListener("DOMContentLoaded", function() {
    var orb = document.getElementById("cosmicOrb");
    if (orb) {
        orb.onclick = startOrbSequence; 
    }

    var hintBtn = document.getElementById("systemHintBtn");
    if (hintBtn) {
        hintBtn.onclick = function() {
            window.open(HINT_TARGET_URL, "_blank"); 
        };
    }

    var inputField = document.getElementById("finalCodeInput");
    if (inputField) {
        inputField.onkeypress = function(event) {
            if (event.key === "Enter") checkFinalCode();
        };
    }
});

function startOrbSequence() {
    document.getElementById("cosmicOrb").style.display = "none";
    document.getElementById("colorPuzzleArea").style.display = "block"; 
    
    setTimeout(function() {
        document.getElementById("finalCodeInput").focus();
    }, 500);
}

function checkFinalCode() {
    var input = document.getElementById("finalCodeInput").value.trim().toLowerCase();
    var output = document.getElementById("outputMsg");

    if (input === FINAL_UNVEIL_CODE) {
        output.innerHTML = "<span style='color: #00ffcc; font-size: 16px; text-shadow: 0 0 12px #00ffcc;'>👑 ACCESS GRANTED: THE VOID IS FULLY UNVEILED! SUCCESS!</span>";
        document.getElementById("finalCodeInput").disabled = true;
        document.getElementById("finalCodeInput").style.borderColor = "#00ffcc";
    } else {
        output.innerHTML = "<span style='color: #ff3366;'>INCORRECT MATRIX CODE. ACCESS REFUSED.</span>";
        document.getElementById("finalCodeInput").value = "";
        setTimeout(function() { output.innerHTML = ""; }, 2500);
    }
}
