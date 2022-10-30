const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particalsArray = [];
let hue = 0;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Partical {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${hue} , 100% , 50%)`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        //SHRINK PARTICALS
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.addEventListener('click', (event) => {
    for (let i = 0; i < 5; i++) {
        particalsArray.push(new Partical(event.x, event.y));
    }
});

window.addEventListener('mousemove', (event) => {
    for (let i = 0; i < 5; i++) {
        particalsArray.push(new Partical(event.x, event.y));
    }
});


const handleParticals = () => {
    for (let i = 0; i < particalsArray.length; i++) {
        particalsArray[i].update();
        particalsArray[i].draw();

        //JOIN TWO PARTICALS WITH LINE
        for (let j = i; j < particalsArray.length; j++) {
            const dx = particalsArray[i].x - particalsArray[j].x;

            const dy = particalsArray[i].y - particalsArray[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particalsArray[i].color;
                ctx.lineWidth = particalsArray[i].size / 10;
                ctx.lineWidth = 0.1;
                ctx.moveTo(particalsArray[i].x, particalsArray[i].y);
                ctx.lineTo(particalsArray[j].x, particalsArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
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
    // ctx.fillStyle = `rgba(0,0,0,0.2)`
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticals();
    hue += 2;
    requestAnimationFrame(animate);
}
animate();