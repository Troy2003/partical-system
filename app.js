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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        //SHRINK PARTICALS
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.addEventListener('click', (event) => {
    for (let i = 0; i < 10; i++) {
        particalsArray.push(new Partical(event.x, event.y));
    }
});

window.addEventListener('mousemove', (event) => {
    for (let i = 0; i < 10; i++) {
        particalsArray.push(new Partical(event.x, event.y));
    }
});


const handleParticals = () => {
    for (let i = 0; i < particalsArray.length; i++) {
        particalsArray[i].update();
        particalsArray[i].draw();

        //HIDE A PARTICALS
        if (particalsArray[i].size <= 0.3) {
            particalsArray.splice(i, 1);
            i--;
        }
    }
}
const animate = () => {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticals();
    requestAnimationFrame(animate);
}
animate();