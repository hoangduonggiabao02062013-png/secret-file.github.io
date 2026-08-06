"use strict";



/*====================================================

    THE COSMIC ENTITY BURGER

    BOSS FIGHT

====================================================*/



/*====================================================

DOM

====================================================*/ 
const player = document.getElementById("player");
player.style.bottom = "auto";
const boss = document.getElementById("boss");
const bossSprite =document.getElementById("bossSprite");
const BOSS_IMAGES = {
    phase1: "https://static.wikia.nocookie.net/find-the-burgers/images/8/8c/Inverted_Burger.png/revision/latest?cb=20250610082643",
    phase2: "https://static.wikia.nocookie.net/find-the-burgers/images/2/2b/Astral-Plane-Burger.png/revision/latest?cb=20250902145129",
    phase3: "https://static.wikia.nocookie.net/find-the-burgers/images/e/e8/Cosmic_Entity_Burger.png/revision/latest?cb=20250512115558"
};

const TRUE_FORM_IMAGE ="https://static.wikia.nocookie.net/find-the-burgers/images/c/cd/Multiverse_Burger.png/revision/latest?cb=20260621214850";
const bossEye = document.getElementById("bossEye");
const bossPupil = document.getElementById("bossPupil");
const bossHpFill = document.getElementById("bossHpFill");
const bossHpText = document.getElementById("bossHpText");
const phaseText = document.getElementById("phaseText");
const dialogue = document.getElementById("dialogue");
const damageText = document.getElementById("damageText");
const shakeContainer = document.getElementById("shakeContainer");
const trophyScreen = document.getElementById("trophyScreen");
const goldenLight = document.getElementById("goldenLight");
const phaseFlash = document.getElementById("phaseFlash");
const bgm = document.getElementById("bgm");
const laserSound = document.getElementById("laserSound");
const hitSound = document.getElementById("hitSound");
const joystickBase = document.getElementById("joystickBase");
const joystickStick = document.getElementById("joystickStick");
/*====================================================
ACTIVE ATTACK LIST
====================================================*/

const activeAttacks = [];

function addAttack(name, duration){

    if(!activeAttacks.includes(name)){

        activeAttacks.push(name);

    }

    dialogue.innerText = activeAttacks.join(" | ");

    setTimeout(()=>{

        const index = activeAttacks.indexOf(name);

        if(index !== -1){

            activeAttacks.splice(index,1);

        }

        if(activeAttacks.length){

            dialogue.innerText = activeAttacks.join(" | ");

        }else{

            dialogue.innerText = "\"The stars are watching...\"";

        }

    }, duration);

}


/*====================================================

GAME STATE

====================================================*/



const GAME = {
    running: true,
    phase: 1,
    bossHP: 100,
    bossMaxHP: 100,
    playerHP: 3,
    invincible: false,
    mobile: false,
    victory: false,
    attackRunning: false,
    bossFrozen:false,
    bossCharge:false,
    attackCount: 0,
    nextWeakAttack: Math.floor(Math.random()*4)+2,
    secretBoss:false,
    weakMiss:0
    
};
/*====================================================

PLAYER

====================================================*/



const PLAYER = {



    x: window.innerWidth / 2,



    y: window.innerHeight - 140,



    width: 24,



    height: 24,



    speed: 6,



    vx: 0,



    vy: 0



};





/*====================================================

KEYBOARD

====================================================*/



const KEY = {



    w:false,

    a:false,

    s:false,

    d:false



};



window.addEventListener("keydown",(e)=>{



    switch(e.key.toLowerCase()){



        case "w":

            KEY.w=true;

        break;



        case "a":

            KEY.a=true;

        break;



        case "s":

            KEY.s=true;

        break;



        case "d":

            KEY.d=true;

        break;



    }



});



window.addEventListener("keyup",(e)=>{



    switch(e.key.toLowerCase()){



        case "w":

            KEY.w=false;

        break;



        case "a":

            KEY.a=false;

        break;



        case "s":

            KEY.s=false;

        break;



        case "d":

            KEY.d=false;

        break;



    }



});





/*====================================================

MOBILE DETECT

====================================================*/



GAME.mobile =

/Android|iPhone|iPad|iPod|Mobile/i

.test(navigator.userAgent);





/*====================================================

PLAYER MOVEMENT

====================================================*/



function updatePlayer(){



    PLAYER.vx = 0;

    PLAYER.vy = 0;



    if(KEY.a) PLAYER.vx -= PLAYER.speed;

    if(KEY.d) PLAYER.vx += PLAYER.speed;



    if(KEY.w) PLAYER.vy -= PLAYER.speed;

    if(KEY.s) PLAYER.vy += PLAYER.speed;



    PLAYER.x += PLAYER.vx;

    PLAYER.y += PLAYER.vy;



    PLAYER.x = Math.max(

        0,

        Math.min(

            window.innerWidth - PLAYER.width,

            PLAYER.x

        )

    );



    PLAYER.y = Math.max(

        0,

        Math.min(

            window.innerHeight - PLAYER.height,

            PLAYER.y

        )

    );



    player.style.left = PLAYER.x + "px";

    player.style.top = PLAYER.y + "px";



}





/*====================================================

BOSS EYE TRACK

====================================================*/



function updateBossEye(){

    const bossRect = boss.getBoundingClientRect();

    const eyeX = bossRect.left + 130;
    const eyeY = bossRect.top + 96;

    const playerX = PLAYER.x + PLAYER.width / 2;
    const playerY = PLAYER.y + PLAYER.height / 2;

    const dx = playerX - eyeX;
    const dy = playerY - eyeY;

    const angle = Math.atan2(dy,dx);

    const distance = 6;

    bossPupil.style.left =(50+Math.cos(angle)*18)+"%";
    bossPupil.style.top =(50+Math.sin(angle)*18)+"%";

    if(WEAK.active){

    	bossEye.style.background = "gold";

    	bossEye.style.boxShadow =
    	"0 0 20px gold,0 0 60px yellow";

    	bossPupil.style.background = "#111";

    }else{

    	bossEye.style.background = "white";

    	bossEye.style.boxShadow =
    	"0 0 20px white,0 0 60px cyan";

    	bossPupil.style.background = "#111";

    }

}
/*====================================================

HP

====================================================*/



function updateBossHP(){



    const percent =

    (GAME.bossHP/GAME.bossMaxHP)*100;



    bossHpFill.style.width =

    percent+"%";



    if(GAME.secretBoss){

    	bossHpText.innerText =
    	GAME.bossHP+" / "+GAME.bossMaxHP;

    }else{

    	bossHpText.innerText =
    	GAME.bossHP+" / "+GAME.bossMaxHP;

    }
    if(GAME.bossHP<=0 && !GAME.victory){

    	GAME.bossHP=0;

    	bossDeath();

    }
}

function checkPhase(){
    if(GAME.secretBoss){

        phaseText.innerText="PHASE ???";
	phaseText.style.color="#d000ff";
	phaseText.style.textShadow=
	"0 0 25px #ff00ff";
        return;
    }
    let oldPhase = GAME.phase;

    if(GAME.bossHP <= 40){
        GAME.phase = 3;
    }
    else if(GAME.bossHP <= 70){
        GAME.phase = 2;
    }
    else{
        GAME.phase = 1;
    }

    if(oldPhase != GAME.phase){
	phaseTransform();
        AI.timer = 0;
        GAME.attackRunning = false;
        GAME.bossFrozen = false;

        // Reset Weak Ball
        WEAKBALL.active = false;
        WEAKBALL.timer = 0;
        WEAKBALL.cooldown = 600;
        goldenLight.style.display = "none";

        switch(GAME.phase){

            case 1:
                bossSprite.src = BOSS_IMAGES.phase1;
                break;

            case 2:
                bossSprite.src = BOSS_IMAGES.phase2;
                break;

            case 3:
                bossSprite.src = BOSS_IMAGES.phase3;
                break;
        }
    }

    phaseText.innerText = "PHASE " + GAME.phase;
}


/*====================================================

CAMERA SHAKE

====================================================*/



function cameraShake(power=12,time=260){



    const start = performance.now();



    function frame(now){



        const t = now-start;



        if(t>=time){



            shakeContainer.style.transform="";



            return;



        }



        const x =

        (Math.random()-0.5)*power;



        const y =

        (Math.random()-0.5)*power;



        shakeContainer.style.transform =

        `translate(${x}px,${y}px)`;



        requestAnimationFrame(frame);



    }



    requestAnimationFrame(frame);



}
/*====================================================
PHASE TRANSFORM EFFECT
====================================================*/

function phaseTransform(){

    cameraShake(35,800);

    boss.style.transition = "0.6s";
    bossSprite.style.transition =
    "transform .6s, filter .6s, opacity .6s";

    bossSprite.style.transform = "scale(1.45) rotate(360deg)";
    bossSprite.style.opacity = "0";

    bossSprite.style.filter =
    "brightness(6) drop-shadow(0 0 80px white)";

    // Nổ hạt
    const rect = boss.getBoundingClientRect();

    createHitParticles(
        rect.left + rect.width/2,
        rect.top + rect.height/2
    );

    setTimeout(()=>{

        bossSprite.style.transform =
        "scale(1) rotate(0deg)";

        bossSprite.style.opacity = "1";

        if(GAME.phase==1){

            bossSprite.style.filter =
            "drop-shadow(0 0 30px cyan)";

        }
        else if(GAME.phase==2){

            bossSprite.style.filter =
            "drop-shadow(0 0 45px cyan) drop-shadow(0 0 120px white)";

        }
        else{

            bossSprite.style.filter =
            "drop-shadow(0 0 45px red) drop-shadow(0 0 120px purple)";

        }

    },300);
    phaseFlash.style.transition = "none";
    phaseFlash.style.opacity = "1";

    setTimeout(()=>{
        phaseFlash.style.transition = "opacity .6s";
        phaseFlash.style.opacity = "0";
    },30);

}

/*====================================================

COLLECTIONS

====================================================*/



const enemyBullets = [];

const particles = [];

const lasers = [];

const rains = [];



/*====================================================

RECT COLLISION

====================================================*/



function rectCollision(a, b) {



    return (



        a.x < b.x + b.width &&



        a.x + a.width > b.x &&



        a.y < b.y + b.height &&



        a.y + a.height > b.y



    );



}



/*====================================================

PLAYER HITBOX

====================================================*/



function getPlayerHitbox() {



    const size = 12;



    return {



        x: PLAYER.x + (PLAYER.width - size) / 2,

        y: PLAYER.y + (PLAYER.height - size) / 2,



        width: size,

        height: size



    };



}



/*====================================================

CREATE BULLET

====================================================*/



function spawnBullet(

    x,

    y,

    vx,

    vy,

    size = 18,

    damage = 1

) {



    const bullet = document.createElement("div");



    bullet.className = "enemyBullet";



    bullet.style.width = size + "px";

    bullet.style.height = size + "px";

    shakeContainer.appendChild(bullet);

    if(GAME.secretBoss){
    	vx *= 1.2;
    	vy *= 1.2;
    }

enemyBullets.push({

    element: bullet,

    x,
    y,

    vx,
    vy,

    angle: Math.atan2(vy, vx),

    width: size,

    height: size,

    damage,

    homing: false,

    turnRate: 0,

    homingTime: 0

});



}



/*====================================================

UPDATE BULLETS

====================================================*/



function updateBullets() {



    const hitbox = getPlayerHitbox();



    for (let i = enemyBullets.length - 1; i >= 0; i--) {



        const b = enemyBullets[i];
	if(b.homing && b.homingTime > 0){

    	    b.homingTime--;

    	    const target = Math.atan2(
        	PLAYER.y + PLAYER.height/2 - b.y,
        	PLAYER.x + PLAYER.width/2 - b.x
    	    );

    	    let current = Math.atan2(b.vy,b.vx);

    	    let diff = target-current;

    	    while(diff > Math.PI) diff -= Math.PI*2;
    	    while(diff < -Math.PI) diff += Math.PI*2;

    	    current += diff * b.turnRate;

    	    const speed = Math.hypot(b.vx,b.vy);

    	    b.vx = Math.cos(current)*speed;
    	    b.vy = Math.sin(current)*speed;
	    b.angle = current;
    	    if(b.homingTime <= 0){

        	b.homing = false;

    	    }

	}


	b.x += b.vx;

	b.y += b.vy;



        b.element.style.left = b.x + "px";
	b.element.style.transform =`rotate(${b.angle}rad)`;

        b.element.style.top = b.y + "px";



        if (



            b.x < -100 ||



            b.x > window.innerWidth + 100 ||



            b.y < -100 ||



            b.y > window.innerHeight + 100



        ) {



            b.element.remove();



            enemyBullets.splice(i, 1);



            continue;



        }



        if (



            !GAME.invincible &&



            rectCollision(hitbox, b)



        ) {



            damagePlayer(b.damage);



            b.element.remove();



            enemyBullets.splice(i, 1);



        }



    }



}



/*====================================================

PLAYER DAMAGE

====================================================*/



function damagePlayer(amount = 1) {



    if (GAME.invincible) return;



    GAME.playerHP -= amount;



    GAME.invincible = true;



    cameraShake(18, 250);



    hitSound.currentTime = 0;

    hitSound.play();



    flashPlayer();



    updateHeartDisplay();



    createHitParticles(

        PLAYER.x + 12,

        PLAYER.y + 12

    );



    if (GAME.playerHP <= 0) {



        gameOver();



        return;



    }



    setTimeout(() => {



        GAME.invincible = false;



    }, 900);



}



/*====================================================

FLASH

====================================================*/



function flashPlayer() {



    let count = 0;



    const timer = setInterval(() => {



        player.style.opacity =

            player.style.opacity == "0.2"

                ? "1"

                : "0.2";



        count++;



        if (count > 8) {



            clearInterval(timer);



            player.style.opacity = "1";



        }



    }, 90);



}



/*====================================================

HEART UI

====================================================*/



function updateHeartDisplay() {



    const hearts =

        document.querySelectorAll(".heart");



    hearts.forEach((h, i) => {



        h.style.opacity =

            i < GAME.playerHP

                ? "1"

                : ".15";



    });



}



/*====================================================

PARTICLES

====================================================*/



function createHitParticles(x, y) {



    for (let i = 0; i < 15; i++) {



        const p = document.createElement("div");



        p.className = "goldParticle";



        document.body.appendChild(p);



        particles.push({



            element: p,



            x,

            y,



            vx: (Math.random() - .5) * 10,



            vy: (Math.random() - .5) * 10,



            life: 40



        });



    }



}



/*====================================================

UPDATE PARTICLES

====================================================*/



function updateParticles() {



    for (let i = particles.length - 1; i >= 0; i--) {



        const p = particles[i];



        p.x += p.vx;



        p.y += p.vy;



        p.vy += .18;



        p.life--;



        p.element.style.left = p.x + "px";

        p.element.style.top = p.y + "px";



        p.element.style.opacity =

            p.life / 40;



        if (p.life <= 0) {



            p.element.remove();



            particles.splice(i, 1);



        }



    }



}



/*====================================================

GAME OVER

====================================================*/



function gameOver() {



    GAME.running = false;



    dialogue.innerText =

        "THE COSMOS HAS CONSUMED YOU...";



    cameraShake(30, 1000);



    player.style.transition =

        "1.2s";



    player.style.transform =

        "scale(0) rotate(720deg)";



}
/*====================================================
TYPEWRITER
====================================================*/

let typing = false;

function typeDialogue(text, speed = 35){

    return new Promise(resolve=>{

        typing = true;

        dialogue.textContent = "";

        let i = 0;

        const timer = setInterval(()=>{

            dialogue.textContent = text.substring(0, i + 1);

            i++;

            if(i >= text.length){

                clearInterval(timer);

                typing = false;

                resolve();

            }

        }, speed);

    });

}
function clearAllAttacks(){
    enemyBullets.forEach(b=>b.element.remove());
    enemyBullets.length=0;
    lasers.forEach(l=>l.element.remove());
    lasers.length=0;
    rains.forEach(r=>r.element.remove());
    rains.length=0;
    document.querySelectorAll(".laserWarning")
    .forEach(e=>e.remove());
    document.querySelectorAll(".rainWarning")
    .forEach(e=>e.remove());
    document.querySelectorAll(".black-hole")
    .forEach(e=>e.remove());
    document.querySelectorAll(".black-hole-particle")
    .forEach(e=>e.remove());
}
function moveBossToCenter(){

    return new Promise(resolve=>{

        const targetX =
            window.innerWidth / 2 - boss.offsetWidth / 2;

        const targetY =
            window.innerHeight / 2 - boss.offsetHeight / 2;

        boss.style.transition = "1.8s ease-in-out";
        bossSprite.style.transition =
            "1.8s ease-in-out";

        boss.style.left = targetX + "px";
        boss.style.top = targetY + "px";

        // Thêm hiệu ứng phát sáng
        bossSprite.style.filter =
            "brightness(2) drop-shadow(0 0 60px white)";
        bossSprite.style.transform = "scale(1.15)";

        setTimeout(()=>{

            boss.style.transition = "";
            bossSprite.style.transition = "";

            resolve();

        },1800);

    });

}
/*====================================================
BOSS DEATH
====================================================*/

async function bossDeath(){
    GAME.running = false;
    GAME.victory = true;
    GAME.bossFrozen = true;
    clearAllAttacks();
    await moveBossToCenter();
    const lines = [

        "...So... you finally reached me.",
        "I was never your true enemy.",
        "I was only the final seal.",
        "What lies beyond me...",
        "...should never awaken.",
        "But destiny has already chosen you.",
        "Go.",
        "...And don't look back.",
        "Farewell..."

    ];

    for(const line of lines){

        await typeDialogue(line,35);

        await new Promise(r=>setTimeout(r,900));

    }

    startDeathAnimation();

}
async function activateSecretBoss(){

    if(GAME.secretBoss) return;

    GAME.secretBoss = true;

    GAME.bossFrozen = true;

    clearAllAttacks();

    await typeDialogue(
        "...You had five chances.",
        40
    );

    await new Promise(r=>setTimeout(r,1200));

    await typeDialogue(
        "And you wasted every one of them.",
        40
    );

    await new Promise(r=>setTimeout(r,1200));

    await typeDialogue(
        "Witness my TRUE form.",
        45
    );

    cameraShake(70,2500);

    phaseFlash.style.opacity="1";

    setTimeout(()=>{

        phaseFlash.style.opacity="0";

    },1200);
    bossSprite.src = TRUE_FORM_IMAGE;
    GAME.phase = 4;

    GAME.bossHP = 369;
    GAME.bossMaxHP = 369;

    updateBossHP();

    GAME.bossFrozen = false;

}
/*====================================================
BOSS SHATTER
====================================================*/

function shatterBoss(){

    const rect = bossSprite.getBoundingClientRect();

    const cols = 12;
    const rows = 12;

    const pw = rect.width/cols;
    const ph = rect.height/rows;

    boss.style.display = "none";

    for(let y=0;y<rows;y++){

        for(let x=0;x<cols;x++){

            const piece=document.createElement("div");

            piece.className="bossShard";

            piece.style.width=pw+"px";
            piece.style.height=ph+"px";

            piece.style.left=(rect.left+x*pw)+"px";
            piece.style.top=(rect.top+y*ph)+"px";

            piece.style.backgroundImage=`url(${bossSprite.src})`;

            piece.style.backgroundSize=
            rect.width+"px "+rect.height+"px";

            piece.style.backgroundPosition=
            `${-x*pw}px ${-y*ph}px`;

            document.body.appendChild(piece);

            let px=rect.left+x*pw;
            let py=rect.top+y*ph;

            let vx=(Math.random()-0.5)*20;
            let vy=(Math.random()-0.5)*18-10;

            let rot=Math.random()*360;
            let life=90;

            function update(){

                if(life<=0){

                    piece.remove();
                    return;

                }

                life--;

                vy+=0.25;

                px+=vx;
                py+=vy;

                rot+=8;

                piece.style.left=px+"px";
                piece.style.top=py+"px";

                piece.style.transform=
                `rotate(${rot}deg)`;

                piece.style.opacity=life/90;

                requestAnimationFrame(update);

            }

            update();

        }

    }

}
function massiveExplosion(){

    cameraShake(100,2500);

    boss.style.filter = "brightness(10)";

    bossSprite.style.filter =
    "brightness(20) drop-shadow(0 0 350px white)";


    const rect = boss.getBoundingClientRect();


    let timer = setInterval(()=>{

        createHitParticles(
            rect.left + rect.width/2,
            rect.top + rect.height/2
        );

    },20);



    setTimeout(()=>{

        clearInterval(timer);

        explodeBoss();


    },1000);


}
function explodeBoss(){

    cameraShake(120,2500);

    phaseFlash.style.transition = "none";
    phaseFlash.style.opacity = "1";

    setTimeout(()=>{
        phaseFlash.style.transition="opacity 1.4s";
        phaseFlash.style.opacity="0";
    },40);

    // Nổ cực mạnh
    for(let i=0;i<350;i++){

        createHitParticles(

            window.innerWidth/2,
            window.innerHeight/2

        );

    }

    setTimeout(()=>{

        shatterBoss();

    },250);

    setTimeout(()=>{

        trophyScreen.style.display="flex";

    },2500);

}
/*====================================================
DEATH ANIMATION
====================================================*/

function startDeathAnimation(){

    // Nếu là Secret Boss
    if(GAME.secretBoss){

        bossSprite.src = TRUE_FORM_IMAGE;

        bossSprite.style.transform = "scale(1.35)";
        bossSprite.style.filter =
        "brightness(3) drop-shadow(0 0 120px red) drop-shadow(0 0 220px purple)";

        dialogue.innerText =
        "...You have awakened my TRUE FORM.";

    }

    enemyBullets.forEach(b=>b.element.remove());
    enemyBullets.length=0;

    lasers.forEach(l=>l.element.remove());
    lasers.length=0;

    rains.forEach(r=>r.element.remove());
    rains.length=0;

    GAME.attackRunning=false;
    GAME.bossFrozen=true;

    boss.style.transition=
    "left 2.2s ease, top 2.2s ease, transform 2.2s ease";

    boss.style.left=
    (window.innerWidth/2-boss.offsetWidth/2)+"px";

    boss.style.top=
    (window.innerHeight/2-boss.offsetHeight/2)+"px";

    boss.style.transform="scale(1.15)";

    setTimeout(()=>{

        createBlackHole(true);

        bossSprite.style.transition="1.8s";
        bossSprite.style.filter=
        "brightness(20) drop-shadow(0 0 350px white)";

    },2200);

    setTimeout(()=>{

        massiveExplosion();

    },4200);

}

/*====================================================
FIXED RADIAL ATTACK
====================================================*/

function radialAttack(){

    const bossRect = boss.getBoundingClientRect();

    const cx = bossRect.left + bossRect.width / 2;
    const cy = bossRect.top + bossRect.height / 2;

    let count = 12;
    let speed = 3;

    if(GAME.phase==2){

        count = 20;
        speed = 4.5;

    }

    if(GAME.phase==3){

        count = 30;
        speed = 6;

    }
    if(GAME.secretBoss){

    	count = 40;

    	speed = 7;

    }
    for(let i=0;i<count;i++){

        const angle = (Math.PI*2/count)*i;

        spawnBullet(

            cx,

            cy,

            Math.cos(angle)*speed,

            Math.sin(angle)*speed,

            18,

            1

        );


    }

}
/*====================================================
COSMIC SPIRAL ATTACK V2
====================================================*/

let spiralAngle = 0;

function spiralAttack(){

    let fired = 0;

    let bulletCount = 24;
    let speed = 4;
    let arms = 2;

    if(GAME.phase==2){

        bulletCount = 32;
        speed = 5;
        arms = 3;

    }

    if(GAME.phase==3){

        bulletCount = 40;
        speed = 6;
        arms = 3;

    }
    if(GAME.secretBoss){

    	bulletCount = 50;

    	speed = 7;
	
    	arms = 4;

    }
    const timer = setInterval(()=>{

        const bossRect = boss.getBoundingClientRect();

        const cx = bossRect.left + bossRect.width/2;
        const cy = bossRect.top + bossRect.height/2;

        for(let i=0;i<arms;i++){

            const angle =
                spiralAngle +
                i * (Math.PI*2/arms);

            spawnBullet(

                cx,

                cy,

                Math.cos(angle)*speed,

                Math.sin(angle)*speed,

                16,

                1

            );

        }

        spiralAngle += 0.18;

        fired++;

        if(fired>=bulletCount){

            clearInterval(timer);

        }

    },40);

}
/*====================================================
COSMIC SHOT
====================================================*/

function cosmicShot(){

    const shots =
        GAME.phase==1 ? 4 :
        GAME.phase==2 ? 7 : 10;

    let fired = 0;

    const timer = setInterval(()=>{

        const bossRect =
            boss.getBoundingClientRect();

        const cx =
            bossRect.left +
            bossRect.width/2;

        const cy =
            bossRect.top +
            bossRect.height/2;

        const playerX =
            PLAYER.x + PLAYER.width/2;

        const playerY =
            PLAYER.y + PLAYER.height/2;

        const angle =
            Math.atan2(
                playerY-cy,
                playerX-cx
            );

        const speed =
            GAME.phase==3 ? 8 : 6;

        spawnBullet(

    	    cx,

    	    cy,
	
    	    Math.cos(angle)*speed,

    	    Math.sin(angle)*speed,

    	    18,

    	    1

	);

	const bullet =enemyBullets[enemyBullets.length-1];

	bullet.homing = true;

	bullet.turnRate =
    	    GAME.phase==1 ? 0.02 :
    	    GAME.phase==2 ? 0.03 :
    	    0.04;
	bullet.homingTime = 20;

        fired++;

        if(fired>=shots){

            clearInterval(timer);

        }
	if(GAME.secretBoss){

    	    shots = 20;

	}

    },180);

}
/*====================================================
BURGER STAR BLAST
====================================================*/

function burgerStarBlast(){

    const bossRect = boss.getBoundingClientRect();

    const cx = bossRect.left + bossRect.width/2;
    const cy = bossRect.top + bossRect.height/2;

    bossSprite.style.filter ="drop-shadow(0 0 120px magenta)";
	
    dialogue.innerText =
        "COSMIC STAR BLAST";

    setTimeout(()=>{

        bossSprite.style.filter="";

        let count =
            GAME.phase==1 ? 5 :
            GAME.phase==2 ? 7 : 9;

        for(let i=0;i<count;i++){

            const spread =
                (i-(count-1)/2)*0.12;

            const angle =
                Math.atan2(

                    PLAYER.y-cy,

                    PLAYER.x-cx

                ) + spread;

            spawnBullet(

                cx,

                cy,

                Math.cos(angle)*8,

                Math.sin(angle)*8,

                28,

                1

            );

        }

    },800);

}

/*====================================================

BOSS AI

====================================================*/



const AI = {



    timer: 0,



    cooldown: 180,



    attack: ""



};



/*====================================================
HORIZONTAL COSMIC LASER V2
====================================================*/

function fireLaser() {

    let topLimit = 120;
    let bottomLimit = window.innerHeight - 120;

    if (GAME.phase === 3) {
        topLimit = 60;
        bottomLimit = window.innerHeight - 60;
    }

    const laserY =
        Math.random() * (bottomLimit - topLimit) + topLimit;

    if (typeof fireLaser.lastY === "undefined") {

        fireLaser.lastY = laserY;

    }

    let finalY = laserY;

    while (Math.abs(finalY - fireLaser.lastY) < 80) {

        finalY =
            Math.random() *
            (bottomLimit - topLimit) +
            topLimit;

    }

    fireLaser.lastY = finalY;

    const warning =
        document.createElement("div");

    warning.className = "laserWarning";

    warning.style.left = "0px";
    warning.style.top = (finalY - 4) + "px";
    warning.style.width = window.innerWidth + "px";

    shakeContainer.appendChild(warning);

    bossEye.style.background = "#ff2020";
    bossEye.style.transform = "scale(1.5)";

    laserSound.currentTime = 0;
    laserSound.play();

    setTimeout(() => {

        warning.remove();

        const beam =
            document.createElement("div");

        beam.className = "laserBeam";

        if (GAME.phase === 2){
    	    beam.classList.add("phase2");
	}

	if (GAME.phase === 3){
    	    beam.classList.add("phase3");
	}

        beam.style.left = "0px";
        beam.style.top = (finalY - 13) + "px";
        beam.style.width =
            window.innerWidth + "px";

        shakeContainer.appendChild(beam);

        cameraShake(20,350);

        lasers.push({

            element: beam,

            y: finalY,

            height:
                GAME.phase === 3 ? 40 : 26,

            timer: 45

        });

        bossEye.style.background = "white";
        bossEye.style.transform = "";

    },800);

}
/*====================================================
MULTIVERSE LASER
====================================================*/

function multiverseLaser(){
    if(GAME.secretBoss){
    	multiverseLaser();
    	setTimeout(multiverseLaser,1000);
    }
    addAttack("MULTIVERSE LASER",2500);

    // laser ngang cũ
    fireLaser();

    // laser dọc
    const x =
    Math.random()*(window.innerWidth-200)+100;

    const warning=document.createElement("div");

    warning.className="laserWarning";

    warning.style.width="8px";
    warning.style.height=window.innerHeight+"px";

    warning.style.left=(x-4)+"px";
    warning.style.top="0px";

    shakeContainer.appendChild(warning);

    laserSound.currentTime=0;
    laserSound.play();

    setTimeout(()=>{

        warning.remove();

        const beam=document.createElement("div");

        beam.className="laserBeam";

        beam.style.width="40px";
        beam.style.height=window.innerHeight+"px";

        beam.style.left=(x-20)+"px";
        beam.style.top="0px";

        shakeContainer.appendChild(beam);

        lasers.push({

            element:beam,

            vertical:true,

            x:x,

            width:40,

            timer:45

        });

    },800);

}
/*====================================================
UPDATE HORIZONTAL LASER
====================================================*/

function updateLasers(){

    const hit = getPlayerHitbox();

    for(let i=lasers.length-1;i>=0;i--){

        const laser = lasers[i];

        laser.timer--;

        if(laser.vertical){

            if(
                !GAME.invincible &&
                hit.x + hit.width/2 > laser.x-laser.width/2 &&
                hit.x + hit.width/2 < laser.x+laser.width/2
            ){
                damagePlayer(1);
            }

        }else{

            const playerCenter =
                hit.y + hit.height/2;

            if(
                !GAME.invincible &&
                playerCenter > laser.y-laser.height/2 &&
                playerCenter < laser.y+laser.height/2
            ){
                damagePlayer(1);
            }

        }

        if(laser.timer<=0){

            laser.element.remove();
            lasers.splice(i,1);

        }

    }

}
/*====================================================
COSMIC RAIN
====================================================*/

function cosmicRain(){

    let amount =
        GAME.phase==1 ? 10 :
        GAME.phase==2 ? 16 :
        24;
    if(GAME.secretBoss){

    	amount = 30;

    }
    for(let i=0;i<amount;i++){

        setTimeout(()=>{

            const x =
                Math.random()*window.innerWidth;

            const warning =
                document.createElement("div");

            warning.className="rainWarning";

            warning.style.left=(x-6)+"px";

            shakeContainer.appendChild(warning);

            setTimeout(()=>{

                warning.remove();

                const beam =document.createElement("div");
		const glow =document.createElement("div");

		glow.className = "rainImpact";

		glow.style.left = (x-40) + "px";

		glow.style.bottom = "0";

		shakeContainer.appendChild(glow);

		setTimeout(()=>{

   		    glow.remove();

		},500);

                beam.className="rainBeam";

                beam.style.left=(x-12)+"px";

                shakeContainer.appendChild(beam);

                rains.push({

                    element:beam,

                    x:x,

                    width:24,

                    timer:40

                });

            },700);

        },i*120);

    }

}
function updateRain(){

    const hit =
        getPlayerHitbox();

    for(let i=rains.length-1;i>=0;i--){

        const r=rains[i];

        r.timer--;

        if(

            !GAME.invincible &&

            hit.x+hit.width>r.x-r.width/2 &&

            hit.x<r.x+r.width/2

        ){

            damagePlayer(1);

        }

        if(r.timer<=0){

            r.element.remove();

            rains.splice(i,1);

        }

    }

}
/*====================================================
BLACK HOLE ATTACK
====================================================*/

function createBlackHole(){

    const blackHole = document.createElement("div");
    blackHole.className = "black-hole";

    shakeContainer.appendChild(blackHole);


    // random position quanh boss
    const bossRect = boss.getBoundingClientRect();

    const size = 280;

    // hố đen nằm sau boss
    blackHole.style.width = size + "px";
    blackHole.style.height = size + "px";
    if(GAME.secretBoss){

    	blackHole.style.left =
            Math.random()*(window.innerWidth-size)+"px";

    	blackHole.style.top =
            Math.random()*(window.innerHeight-size)+"px";
    }else{

    	blackHole.style.left =
    	(bossRect.left+bossRect.width/2-size/2)+"px";

    	blackHole.style.top =
    	(bossRect.top+bossRect.height/2-size/2)+"px";

    }


    let life = 0;
    const maxLife = GAME.phase==3 ? 9000 : 6000;


    let pullPower =
        GAME.phase==3 ? 3.5 :
    	GAME.phase==2 ? 1.5 :
    	0.5;
    let damageTimer = 0;


    const interval = setInterval(()=>{

        life += 50;


        if(life >= maxLife){

            blackHole.remove();
            clearInterval(interval);
            return;
        }


        const playerRect = player.getBoundingClientRect();
        const holeRect = blackHole.getBoundingClientRect();


        const playerX = playerRect.left + playerRect.width/2;
        const playerY = playerRect.top + playerRect.height/2;


        const holeX = holeRect.left + holeRect.width/2;
        const holeY = holeRect.top + holeRect.height/2;


        const dx = holeX - playerX;
        const dy = holeY - playerY;


        const distance = Math.sqrt(
            dx*dx + dy*dy
        );


        // hút người chơi
        if(distance < 350){

    	   PLAYER.x += dx*0.012*pullPower;
    	   PLAYER.y += dy*0.012*pullPower;

	}



        // damage vùng gần
        if(distance < 80){

            damageTimer += 50;


            if(damageTimer >= 500){

                damagePlayer(1);

                damageTimer = 0;

                createHitParticles(
                    playerX,
                    playerY
                );

            }
        }


        // particle xung quanh
        if(Math.random()<0.5){

            createBlackHoleParticle(
                holeX,
                holeY
            );

        }


    },50);



    // camera shake
    if(typeof cameraShake === "function"){
        cameraShake();
    }


    return blackHole;
}
/*====================================================
REALITY COLLAPSE
====================================================*/

function realityCollapse(){
    if(GAME.secretBoss){
    	pullPower = 5;

    	maxLife = 12000;
    }
    addAttack("REALITY COLLAPSE",7000);

    let amount = 6 + Math.floor(Math.random()*3); // 6-8 hố đen

    for(let i=0;i<amount;i++){

        setTimeout(()=>{

            createBlackHole();

        },i*350);

    }

}


/*====================================================
BLACK HOLE PARTICLES
====================================================*/

function createBlackHoleParticle(x,y){

    const p=document.createElement("div");

    p.className="black-hole-particle";

    shakeContainer.appendChild(p);


    p.style.left=x+"px";
    p.style.top=y+"px";


    const angle=Math.random()*Math.PI*2;
    const speed=30+Math.random()*80;


    setTimeout(()=>{

        p.style.transform =
        `
        translate(
        ${Math.cos(angle)*speed}px,
        ${Math.sin(angle)*speed}px
        )
        scale(0)
        `;


        p.style.opacity="0";


    },10);



    setTimeout(()=>{
        p.remove();
    },800);

}
/*====================================================
MULTIVERSE CHARGE
====================================================*/

function multiverseCharge(){

    GAME.bossCharge = true;

    const rect = boss.getBoundingClientRect();

    const startX =rect.left + rect.width/2;
    const startY =rect.top + rect.height/2;

    const targetX =
        Math.random()*(window.innerWidth-200)+100;

    const targetY =
        window.innerHeight+200;

    // Warning
    const warning=document.createElement("div");

    warning.className="chargeWarning";

    const angle=Math.atan2(
        targetY-startY,
        targetX-startX
    );

    const length=Math.hypot(
        targetX-startX,
        targetY-startY
    );

    warning.style.left=startX+"px";
    warning.style.top=startY+"px";

    warning.style.width=length+"px";

    warning.style.transform=
        `rotate(${angle}rad)`;

    shakeContainer.appendChild(warning);

    setTimeout(()=>{

        warning.remove();

        boss.style.transition="0.8s linear";

        boss.style.left=
            (targetX-boss.offsetWidth/2)+"px";

        boss.style.top=
            (targetY-boss.offsetHeight/2)+"px";

        // Trong lúc lao chỉ dùng skill lớn

        createBlackHole();

        setTimeout(cosmicRain,300);

        setTimeout(fireLaser,600);

        // Hitbox của boss

        let timer=setInterval(()=>{

            const b=boss.getBoundingClientRect();

            const hit=getPlayerHitbox();

            if(
                !GAME.invincible &&
                rectCollision(hit,{
                    x:b.left,
                    y:b.top,
                    width:b.width,
                    height:b.height
                })
            ){
                damagePlayer(2);
            }

        },16);

        setTimeout(()=>{

            clearInterval(timer);

            GAME.bossCharge=false;

            boss.style.transition="";

            boss.style.top="40px";
	    chooseBossPosition();
	    boss.style.top="40px";
        },800);

    },1000);

}
/*====================================================

CHOOSE ATTACK

====================================================*/



function chooseAttack() {



    if (GAME.attackRunning)

        return;



    GAME.attackRunning = true;



    const attacks=[
    "RADIAL",
    "SPIRAL",
    "SHOT",
    "LASER",
    "RAIN",
    "STAR"
    ];
if(GAME.secretBoss){

    attacks.push("REALITY");
    attacks.push("MULTIVERSE LASER");
    attacks.push("CHARGE");
if(GAME.secretBoss){

    attacks.push(
        "BLACK HOLE",
        "LASER",
        "RAIN",
        "SPIRAL",
        "RADIAL",
        "STAR"
    );

}
if(GAME.phase == 3){

    attacks.push("BLACK HOLE");
    attacks.push("BLACK HOLE");
}



    if(GAME.phase == 2){

    	cosmicShot();

    }

    if(GAME.phase == 3){

    	cosmicShot();

    	setTimeout(cosmicShot,350);

    }



    if (GAME.phase == 3){

    	attacks.push("LASER");

    	attacks.push("SPIRAL");

    }



    const attack =

        attacks[

        Math.floor(Math.random() * attacks.length)

        ];



    AI.attack = attack;



    switch (attack) {



        case "RADIAL":

    	    addAttack("Cosmic Burst",1200);

    	    radialAttack();

    	    setTimeout(()=>{

        	if(GAME.phase >= 2){

            	    cosmicShot();

        	}

        	GAME.attackRunning = false;

        	GAME.attackCount++;

    	    },1200);

	break;

        case "LASER":

    	    addAttack("Judgement Laser",2200);

    	    fireLaser();

    	    setTimeout(()=>{

        	if(GAME.phase >= 2){

            	    cosmicShot();

        	}

        	GAME.attackRunning = false;

        	GAME.attackCount++;

    	    },2200);

	break;

	case "SPIRAL":

    	    addAttack("Cosmic Spiral",2200);

    	    spiralAttack();

    	    setTimeout(()=>{

        	if(GAME.phase >= 2){

            	    cosmicShot();

        	}

        	GAME.attackRunning = false;

        	GAME.attackCount++;

    	    },2200);

	break;
	case "SHOT":

    	    addAttack("Cosmic Shot",1800);

            cosmicShot();

    	    setTimeout(()=>{

        	GAME.attackRunning = false;
		GAME.attackCount++;
    	    },2200);

	    break;
	case "STAR":

    	    burgerStarBlast();

    	    setTimeout(()=>{

        	GAME.attackRunning=false;
		GAME.attackCount++;
    	    },1800);

	    break;
	case "RAIN":

    	    addAttack("Cosmic Rain",2600);

    	    cosmicRain();

    	    setTimeout(()=>{

        	if(GAME.phase >= 2){

            	    cosmicShot();

        	}

        	GAME.attackRunning = false;

        	GAME.attackCount++;

    	    },2600);

	    break;
	case "BLACK HOLE":

    	    addAttack("VOID COLLAPSE",6000);

    	    createBlackHole();

    	    setTimeout(()=>{

        	GAME.attackRunning=false;
        	GAME.attackCount++;

    	    },6000);

	    break;
	case "REALITY":

    	    realityCollapse();

    	    setTimeout(()=>{

        	GAME.attackRunning=false;

    	    },7000);

	    break;
	case "MULTIVERSE LASER":

    	    multiverseLaser();

    	    setTimeout(()=>{

        	GAME.attackRunning=false;

    	    },2500);

	    break;
	case "CHARGE":

       	    multiverseCharge();

    	    setTimeout(()=>{

        	GAME.attackRunning=false;

            },2500);

	    break;
    }

}

/*====================================================

AI UPDATE

====================================================*/



function updateAI() {
    if(GAME.bossFrozen) return;


    AI.timer++;



    let wait = 220;



    if (GAME.phase == 2)

        wait = 170;



    if (GAME.phase == 3)

        wait = 120;
    if(GAME.secretBoss)

    	wait = 75;
    if (AI.timer >= wait) {



        AI.timer = 0;



        chooseAttack();



    }



}
/*====================================================
BOSS MOVEMENT
====================================================*/

const BOSS = {

    x: window.innerWidth / 2,

    targetX: window.innerWidth / 2,

    speed: 2.2,

    moveTimer: 0

};
const WEAK = {

    active:false,

    timer:0,

    cooldown:0,

    hit:false

};
/*====================================================
WEAK BALL
====================================================*/

const WEAKBALL={

    active:false,

    x:0,

    y:0,

    timer:0,

    cooldown:600   // 600 frame ≈ 10 giây ở 60 FPS

};

function chooseBossPosition(){

    const margin = 180;

    BOSS.targetX =

        margin +

        Math.random() *

        (window.innerWidth - margin * 2);

}

function updateBossMovement(){
    if(GAME.bossFrozen) return;

    BOSS.moveTimer++;

    let interval = 260;

    if(GAME.phase==2)
        interval = 180;

    if(GAME.phase==3)
        interval = 120;

    if(BOSS.moveTimer>=interval){

        BOSS.moveTimer=0;

        chooseBossPosition();

    }

    BOSS.x +=

        (BOSS.targetX-BOSS.x)*0.045;

    boss.style.left =
    (BOSS.x - boss.offsetWidth/2) + "px";

}
/*====================================================
WEAK POINT
====================================================*/

function updateWeakPoint(){
    console.log(
    GAME.phase,
    WEAKBALL.cooldown,
    WEAKBALL.active
    );

    if(GAME.phase != 1){

        WEAK.active = false;

        WEAK.hit = false;

        WEAK.timer = 0;

        GAME.bossFrozen = false;

        return;

    }

    if(

        !WEAK.active &&

        GAME.attackCount >= GAME.nextWeakAttack

    ){

        GAME.attackCount = 0;

        GAME.nextWeakAttack =
            Math.floor(Math.random() * 4) + 2;

        WEAK.active = true;

        GAME.bossFrozen = true;

        WEAK.timer = 360;

        WEAK.hit = false;

        dialogue.innerText =
        "The eye is exposed...";

    }

    if(WEAK.active){

        WEAK.timer--;

        const eyeRect = bossEye.getBoundingClientRect();

        const hit = getPlayerHitbox();

        if(

            !WEAK.hit &&

            rectCollision(

                hit,

                {

                    x: eyeRect.left,

                    y: eyeRect.top,

                    width:22,

                    height:22

                }

            )

        ){

            WEAK.hit = true;

  	    GAME.weakMiss = 0;

            WEAK.active = false;

            GAME.bossFrozen = false;

            GAME.bossHP -= 5;

            cameraShake(15,250);

            createHitParticles(

                eyeRect.left,

                eyeRect.top

            );

            dialogue.innerText = "Critical Hit!";

        }

        if(WEAK.timer <= 0){

    	    WEAK.active = false;

    	    GAME.bossFrozen = false;

    	    GAME.weakMiss++;

    	    if(GAME.weakMiss >= 5){

        	activateSecretBoss();

    	    }

	}
    }

}
/*====================================================
WEAK BALL
====================================================*/

function spawnWeakBall(){
    console.log("Spawn");

    WEAKBALL.active=true;

    WEAKBALL.timer=900;

    WEAKBALL.x=
        Math.random()*(window.innerWidth-200)+100;

    WEAKBALL.y=
        Math.random()*(window.innerHeight-250)+120;

    goldenLight.style.display="block";

    goldenLight.style.left=
        (WEAKBALL.x-45)+"px";

    goldenLight.style.top=
        (WEAKBALL.y-45)+"px";

}

function updateWeakBall(){

    if(GAME.phase==1){

        goldenLight.style.display="none";

        WEAKBALL.active=false;

	WEAKBALL.cooldown=600;

        return;

    }

    if(!WEAKBALL.active){

   	WEAKBALL.cooldown--;

    	if(WEAKBALL.cooldown<=0){

            spawnWeakBall();

            WEAKBALL.cooldown=600;

        }

    	return;

    }

    WEAKBALL.timer--;

    goldenLight.style.left=
        (WEAKBALL.x-45)+"px";

    goldenLight.style.top=
        (WEAKBALL.y-45)+"px";

    const hit=getPlayerHitbox();

    if(

        rectCollision(

            hit,

            {

                x:WEAKBALL.x-12,

                y:WEAKBALL.y-12,

                width:24,

                height:24

            }

        )

    ){

        GAME.bossHP -= (GAME.phase==2 ? 6 : 8);

	if(GAME.bossHP < 0)
    	    GAME.bossHP = 0;

	updateBossHP();
	checkPhase();
	updateBossHP();
	checkPhase();

        createHitParticles(

            WEAKBALL.x,

            WEAKBALL.y

        );

        goldenLight.style.display="none";

        WEAKBALL.active=false;

    }

    if(WEAKBALL.timer<=0){

        goldenLight.style.display="none";

        WEAKBALL.active=false;

    }

}


/*====================================================

GAME LOOP

====================================================*/



function gameLoop() {



    if (!GAME.running)

        return;



    updatePlayer();

    updateBossMovement();

    updateWeakPoint();

    updateWeakBall();

    updateBossEye();

    updateBossHP();

    checkPhase();

    updateBullets();

    updateParticles();

    updateLasers();

    updateRain();

    updateAI();

    requestAnimationFrame(gameLoop);

}

/*====================================================
START
====================================================*/

player.style.bottom = "auto";

updateHeartDisplay();

updateBossHP();

bossSprite.src = BOSS_IMAGES.phase1;

chooseBossPosition();

gameLoop();
/*====================================================
DEBUG CHEAT
====================================================*/

window.addEventListener("keydown",(e)=>{

    switch(e.key.toLowerCase()){

        case "f":   // Full HP
            GAME.playerHP = 3;
            updateHeartDisplay();
        break;

        case "k":   // -5 HP boss
            GAME.bossHP -= 5;
            if(GAME.bossHP < 0) GAME.bossHP = 0;
            updateBossHP();
            checkPhase();
        break;

        case "2":   // Phase 2
            GAME.bossHP = 70;
            updateBossHP();
            checkPhase();
        break;

        case "3":   // Phase 3
            GAME.bossHP = 40;
            updateBossHP();
            checkPhase();
        break;
	case "4":

    	    GAME.secretBoss = true;

    	    GAME.phase = 4;

    	    GAME.bossHP = 367;
    	    GAME.bossMaxHP = 367;

    	    bossSprite.src = TRUE_FORM_IMAGE;

    	    document.getElementById("bossName").innerText =
    	    "Multiverse Burger";

    	    phaseText.innerText = "PHASE ???";
    	    phaseText.style.color = "#d000ff";
    	    phaseText.style.textShadow =
    	    "0 0 25px #ff00ff";

    	    updateBossHP();

	break;

    }

});
window.onload = () => {
    document.documentElement.translate = false;
    document.body.translate = false;
};