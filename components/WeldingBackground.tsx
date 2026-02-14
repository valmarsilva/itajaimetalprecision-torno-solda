
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
        this.vx = (Math.random() - 0.5) * 8; 
        this.vy = (Math.random() - 0.8) * 12;
        this.maxLife = Math.random() * 60 + 20;
        this.life = this.maxLife;
        this.size = Math.random() * 2 + 1;
        
        const colors = ['#3b82f6', '#60a5fa', '#ffffff', '#fbbf24', '#f59e0b'];
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
        ctx.globalAlpha = opacity * 0.6; // Opacidade controlada
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        if (this.life > this.maxLife * 0.8) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Faíscas ocasionais simulando solda
      if (Math.random() > 0.95) {
        const spawnX = width * 0.8;
        const spawnY = height * 0.3;
        for(let i = 0; i < 5; i++) particles.push(new Particle(spawnX, spawnY));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(i, 1);
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
      className="absolute inset-0 pointer-events-none z-0 opacity-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default WeldingBackground;
