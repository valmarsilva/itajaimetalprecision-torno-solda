
import React, { useEffect, useRef } from 'react';

const WeldingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuração do Eixo Único e da Porca
    const axis = { 
      y: 0.75, 
      speed: 0.2, // Rotação do fuso
      offset: 0,
      nutX: Math.random() * window.innerWidth,
      nutDir: 1,
      nutSpeed: 0.5 // Velocidade de precisão
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 1.2) * 10; 
        this.vy = (Math.random() - 0.5) * 15;
        this.maxLife = Math.random() * 50 + 20;
        this.life = this.maxLife;
        this.size = Math.random() * 3 + 0.5;
        
        const colors = ['#ff9d00', '#ff5e00', '#fff000', '#ffffff', '#00e5ff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.25;
        this.life--;
        this.size *= 0.97; 
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = this.life / this.maxLife;
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 1.5, this.y - this.vy * 1.5);
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.color;
        ctx.stroke();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    const drawStainlessAxis = (ctx: CanvasRenderingContext2D, yPos: number, xOffset: number) => {
      const axisHeight = 28; 
      const threadSpacing = 20;
      const threadAngle = 0.45;
      
      ctx.save();
      ctx.globalAlpha = 0.8;
      
      // Aço Inox Polido
      const inoxGrad = ctx.createLinearGradient(0, yPos - axisHeight/2, 0, yPos + axisHeight/2);
      inoxGrad.addColorStop(0, '#0f172a');   
      inoxGrad.addColorStop(0.2, '#475569'); 
      inoxGrad.addColorStop(0.45, '#ffffff'); // Brilho de metal limpo
      inoxGrad.addColorStop(0.55, '#e2e8f0'); 
      inoxGrad.addColorStop(0.8, '#475569');
      inoxGrad.addColorStop(1, '#020617');   
      
      ctx.fillStyle = inoxGrad;
      ctx.fillRect(0, yPos - axisHeight/2, width, axisHeight);

      // Roscas
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      const startX = -(xOffset % threadSpacing);
      for (let x = startX; x < width + threadSpacing; x += threadSpacing) {
        ctx.moveTo(x, yPos - axisHeight/2);
        ctx.lineTo(x + threadSpacing * threadAngle, yPos + axisHeight/2);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawBronzeNut = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      const size = 72; // TAMANHO AUMENTADO PARA VISIBILIDADE MÁXIMA
      ctx.save();
      
      // Brilho exterior (Glow) para destacar a porca do fundo
      ctx.shadowBlur = 35;
      ctx.shadowColor = 'rgba(217, 119, 6, 0.6)';

      // Bronze de Alta Visibilidade (Gradiente Metálico Intenso)
      const bronzeGrad = ctx.createLinearGradient(x - size/2, y - size/2, x + size/2, y + size/2);
      bronzeGrad.addColorStop(0, '#451a03'); // Bronze Escuro
      bronzeGrad.addColorStop(0.2, '#b45309'); 
      bronzeGrad.addColorStop(0.48, '#fde047'); // Brilho Central (Ouro/Bronze)
      bronzeGrad.addColorStop(0.52, '#ffffff'); // Reflexo de Luz Intenso no centro
      bronzeGrad.addColorStop(0.8, '#d97706'); 
      bronzeGrad.addColorStop(1, '#451a03');

      ctx.fillStyle = bronzeGrad;
      
      // Corpo Quadrado da Porca
      ctx.fillRect(x - size/2, y - size/2, size, size);
      
      // Bordas Chanfradas (Contorno de brilho)
      ctx.shadowBlur = 0; 
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x - size/2, y - size/2, size, size);

      // Furo central (Vazio para o fuso passar)
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      
      // Rosca interna da porca
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    let flashIntensity = 0;
    let flashTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Fuso
      axis.offset += axis.speed;
      drawStainlessAxis(ctx, height * axis.y, axis.offset);

      // 2. Porca de Bronze (Movimento Infinito)
      axis.nutX += axis.nutSpeed * axis.nutDir;
      if (axis.nutX > width + 100) axis.nutDir = -1;
      else if (axis.nutX < -100) axis.nutDir = 1;
      
      drawBronzeNut(ctx, axis.nutX, height * axis.y);

      // 3. Efeito de Solda
      if (flashTimer <= 0 && Math.random() > 0.98) {
        flashIntensity = Math.random() * 0.8;
        flashTimer = Math.random() * 15 + 5;
        const spawnX = width * (0.6 + Math.random() * 0.3); 
        const spawnY = height * (0.2 + Math.random() * 0.3);
        for(let i = 0; i < 40; i++) particles.push(new Particle(spawnX, spawnY));
      }

      if (flashIntensity > 0) {
        const blueFlash = ctx.createRadialGradient(width * 0.8, height * 0.4, 0, width * 0.8, height * 0.4, width * 0.6);
        blueFlash.addColorStop(0, `rgba(14, 165, 233, ${flashIntensity})`);
        blueFlash.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = blueFlash;
        ctx.globalAlpha = 1.0;
        ctx.fillRect(0, 0, width, height);
        flashIntensity *= 0.93;
        flashTimer--;
      }

      // 4. Faíscas
      if (Math.random() > 0.4) {
        particles.push(new Particle(width * (0.7 + Math.random() * 0.3), Math.random() * height * 0.4));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.y > height) particles.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-100"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default WeldingBackground;
