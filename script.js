const container = document.querySelector(".container");
const cars = [];
alert('welcome');

// this is data
alert('we have a comments')
const carsData = {
    car_1:{
        img:"./carImgs/car1.jpg",
        deltX: 100
    },
    car_2:{
        img:"./carImgs/car2.jpg",
        deltX: 100
    },
    car_3:{
        img:"./carImgs/car3.jpeg",
        deltX: 100
    }
};
let template = `
<div class="car car/*car-i*/" >
    <div>
        <input class="input/*input-i*/" placeholder="write speed" type="number" onchange="changeSpeed(/*changeSpeed-i*/)"/>
        <button class="go" onclick="go(/*go-i*/)">go...</button>
        <button class="stop" onclick="stop(/*stop-i*/)">stop...</button>
        <button class="finish" onclick="finish(/*finish-i*/)">finish</button>
    </div>
    <img src=/*src*/ class=img/*img-i*/>
</div>
`;
class Section {
    constructor(i){
        this.index = i;
        this.chooseCarLocation = "go";
        this.isActiveButtonGo = 0;
        this.isActiveButtonFinish = 0;
        this.x = carsData[ Object.keys(carsData)[this.index] ].deltX;
    }
    painted(){
        document.querySelector(`.img${this.index}`).style.left = this.x + "px";
    }
    spped(){
        this.numberSpeed = Number(document.querySelector(`.input${this.index}`).value) <= 500 ? 
                           Number(document.querySelector(`.input${this.index}`).value) : 500;
    }
    go(){
        this.isActiveButtonFinish = 0;
        clearInterval(this.timerIdStop);
        clearInterval(this.timerIdFinish);
        if( !this.isActiveButtonGo ){
            this.timerIdGo = setInterval(() => {
                if( this.x === window.innerWidth - 135 ){
                    this.chooseCarLocation = "back";
                };
                if( this.x === 100 ){
                    this.chooseCarLocation = "go";
                };
                if( this.chooseCarLocation === "back" ){
                    if( (this.x - this.numberSpeed) < 100 ){
                        this.x = 100;
                    }else{
                        this.x -= this.numberSpeed ? this.numberSpeed / 10: 0.5;
                    }
                    this.painted();
                };
                if( this.chooseCarLocation === "go" ){
                    if( (this.x + this.numberSpeed) > (window.innerWidth - 135) ){
                        this.x = window.innerWidth - 135;
                    } else {
                        this.x += this.numberSpeed ? this.numberSpeed / 10: 0.5;
                    }
                    this.painted(); 
                };
            });
        }
        this.isActiveButtonGo = 1;
    }
    stop(){
        this.isActiveButtonGo = 0;
        this.isActiveButtonFinish = 0;
        clearInterval(this.timerIdGo);
        clearInterval(this.timerIdFinish);
        this.timerIdStop = setInterval(() => {
            this.x = this.x;
            this.painted();
        });
    };
    finish(){
        if( !this.isActiveButtonFinish ){
            this.isActiveButtonGo = 0;
            clearInterval(this.timerIdGo);
            clearInterval(this.timerIdStop);
            this.timerIdFinish = setInterval(() => {
                this.x = 100;
                this.painted();
            });
            this.chooseCarLocation = "go";
        };
        this.isActiveButtonFinish = 1;
    };
};

for (let i = 0; i < 3; i++) {
    let section = template
        .replace("/*car-i*/", i)
        .replace("/*src*/", carsData[ Object.keys(carsData)[i] ].img)
        .replace("/*go-i*/", i)
        .replace("/*stop-i*/", i)
        .replace("/*finish-i*/", i)
        .replace("/*img-i*/", i)
        .replace("/*changeSpeed-i*/", i)
        .replace("/*input-i*/", i);

    container.insertAdjacentHTML('beforeend', section);
    cars.push( new Section(i) );
    document.querySelector(`.img${i}`).addEventListener("click", () => onClcik(i));
};

const go = (i) => cars[i].go();
const stop = (i) => cars[i].stop();
const finish = (i) => cars[i].finish();
const changeSpeed = (i) => cars[i].spped();

function onClcik(i){
    document.querySelector(`.img${i}`).style.border = "2px dotted black";
    document.querySelector(`.img${i}`).style.padding = "2px";

    window.addEventListener("keyup", (e) => {
        if(e.code === "ArrowRight"){
            go(i);
        } else if(e.code === "ArrowLeft"){
            finish(i);
        } else if (e.code === "Space"){
            stop(i);
        };
    });
};


// input.addEventListener("keyup", (e) => {
// 	e.target.value;
// })



// function loop(){
//     requestAnimationFrame(loop);
//     render()
// }
// loop();
// // window.innerWidth - 135;






























/*
    for (let i = 0; i < COMPUTERS_COUNT; i++){
        let section = template
            .replace('/computerNumber/', i+1)
            .replace('/inTimeBtn/', `inTimeBtn${i}`)
            .replace('/inTime/', `inTime${i}`)
            .replace('/select/', `select${i}`)
            .replace('/input/', `input${i}`)
            .replace('/hours/', `hours${i}`)
            .replace('/minutes/', `minutes${i}`)
            .replace('/balance/', `balance${i}`)
            .replace('/start/', `start${i}`)
            .replace('/stop/', `stop${i}`)
            .replace('/settings/', `settings${i}`)
            .replace('/select-i/', i)
            .replace('/inTimeBtn-i/', i)
            .replace('/input-i/', i)
            .replace('/start-i/', i)
            .replace('/stop-i/', i);

        container.insertAdjacentHTML('beforeend', section);
        sections.push(new Section(i));
    }
*/