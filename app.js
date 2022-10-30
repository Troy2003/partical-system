const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particalsArray = [];

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Partical {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill();
    }
}

class Effect {
    constructor() {

    }

    draw() {

    }

    update() {

    }
}

window.addEventListener('mousemove', (event) => {})

const init = () => {
    for (let i = 0; i < 100; i++) {
        particalsArray.push(new Partical());
    }
}
init();

const handleParticals = () => {
    for (let i = 0; i < particalsArray.length; i++) {
        particalsArray[i].update();
        particalsArray[i].draw();
    }
}
const animate = () => {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticals();
    requestAnimationFrame(animate);
}
animate();