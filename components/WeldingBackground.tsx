
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
      speed: 0.25, // Rotação visual do fuso
      offset: 0,
      nutX: Math.random() * window.innerWidth, // Posição inicial aleatória
      nutDir: 1,
      nutSpeed: 0.6 // Velocidade ligeiramente reduzida para elegância
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
        this.vx = (Math.random() - 1.1) * 8; 
        this.vy = (Math.random() - 0.5) * 12;
        this.maxLife = Math.random() * 60 + 20;
        this.life = this.maxLife;
        this.size = Math.random() * 2.5 + 0.5;
        
        const colors = ['#ff9d00', '#ff5e00', '#fff000', '#ffffff', '#00e5ff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2;
        this.life--;
        this.size *= 0.98; 
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = this.life / this.maxLife;
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.color;
        ctx.stroke();
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
      }
    }

    const drawStainlessAxis = (ctx: CanvasRenderingContext2D, yPos: number, xOffset: number) => {
      const axisHeight = 24; // Ligeiramente maior para acompanhar a porca
      const threadSpacing = 18;
      const threadAngle = 0.4;
      
      ctx.save();
      ctx.globalAlpha = 0.75;
      
      // Efeito Inox (Aço Inoxidável Polido de Alto Contraste)
      const inoxGrad = ctx.createLinearGradient(0, yPos - axisHeight/2, 0, yPos + axisHeight/2);
      inoxGrad.addColorStop(0, '#0f172a');   
      inoxGrad.addColorStop(0.15, '#334155'); 
      inoxGrad.addColorStop(0.4, '#ffffff'); // Brilho intenso no topo
      inoxGrad.addColorStop(0.5, '#f8fafc'); 
      inoxGrad.addColorStop(0.85, '#334155');
      inoxGrad.addColorStop(1, '#020617');   
      
      ctx.fillStyle = inoxGrad;
      ctx.fillRect(0, yPos - axisHeight/2, width, axisHeight);

      // Roscas do Fuso com maior definição
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
      const size = 72; // Tamanho substancialmente aumentado para impacto visual
      ctx.save();
      
      // Glow exterior dourado intenso
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(251, 191, 36, 0.7)';

      // Bronze Quadrado - Gradiente de Luxo e Alta Precisão
      const bronzeGrad = ctx.createLinearGradient(x - size/2, y - size/2, x + size/2, y + size/2);
      bronzeGrad.addColorStop(0, '#451a03'); // Sombra Profunda
      bronzeGrad.addColorStop(0.1, '#78350f'); 
      bronzeGrad.addColorStop(0.4, '#fde047'); // Centro Vibrante
      bronzeGrad.addColorStop(0.5, '#ffffff'); // Reflexo Especular Puro
      bronzeGrad.addColorStop(0.6, '#fde047'); 
      bronzeGrad.addColorStop(0.9, '#b45309'); 
      bronzeGrad.addColorStop(1, '#451a03');

      ctx.fillStyle = bronzeGrad;
      
      // Corpo da Porca Quadrada
      ctx.fillRect(x - size/2, y - size/2, size, size);
      
      // Chanfros duplos para estética de engenharia premium
      ctx.shadowBlur = 0; 
      
      // Contorno de Brilho Externo
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - size/2, y - size/2, size, size);

      // Contorno Interno de Profundidade
      ctx.strokeStyle = 'rgba(69, 26, 3, 0.5)';
      ctx.lineWidth = 4;
      ctx.strokeRect(x - size/2 + 3, y - size/2 + 3, size - 6, size - 6);

      // Furo central de precisão
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
      
      // Brilho da rosca interna
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.9)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.stroke();

      // Cruz de centragem (opcional, para look técnico)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - size/2, y); ctx.lineTo(x + size/2, y);
      ctx.moveTo(x, y - size/2); ctx.lineTo(x, y + size/2);
      ctx.stroke();

      ctx.restore();
    };

    let flashIntensity = 0;
    let flashTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Desenhar Fuso de Inox
      axis.offset += axis.speed;
      drawStainlessAxis(ctx, height * axis.y, axis.offset);

      // 2. Desenhar Porca de Bronze (Movimento Loop)
      axis.nutX += axis.nutSpeed * axis.nutDir;
      
      // Limites do loop ajustados para o novo tamanho
      if (axis.nutX > width + 50) {
        axis.nutDir = -1;
      } else if (axis.nutX < -50) {
        axis.nutDir = 1;
      }
      
      drawBronzeNut(ctx, axis.nutX, height * axis.y);

      // 3. Efeitos de Soldagem
      if (flashTimer <= 0 && Math.random() > 0.97) {
        flashIntensity = Math.random() * 0.7;
        flashTimer = Math.random() * 20 + 5;
        
        const spawnX = width * (0.6 + Math.random() * 0.4); 
        const spawnY = height * (0.15 + Math.random() * 0.4);
        
        for(let i = 0; i < 35; i++) {
          particles.push(new Particle(spawnX, spawnY));
        }
      }

      if (flashIntensity > 0) {
        const blueFlash = ctx.createRadialGradient(
          width * 0.8, height * 0.4, 0,
          width * 0.8, height * 0.4, width * 0.5
        );
        blueFlash.addColorStop(0, `rgba(14, 165, 233, ${flashIntensity})`);
        blueFlash.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = blueFlash;
        ctx.globalAlpha = 1.0;
        ctx.fillRect(0, 0, width, height);
        
        flashIntensity *= 0.94;
        flashTimer--;
      }

      // 4. Faíscas
      if (Math.random() > 0.4) {
        const spawnX = width * (0.6 + Math.random() * 0.4);
        const spawnY = Math.random() * height * 0.4; 
        particles.push(new Particle(spawnX, spawnY));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.y > height || p.x < 0) {
          particles.splice(i, 1);
        }
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
