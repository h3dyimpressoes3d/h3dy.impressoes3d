(()=>{const d=document,q=s=>[...d.querySelectorAll(s)];
const bar=d.createElement('div');bar.id='prog';d.body.prepend(bar);
const hd=d.querySelector('.site-header');
addEventListener('scroll',()=>{const h=d.documentElement;bar.style.width=scrollY/(h.scrollHeight-h.clientHeight)*100+'%';hd&&hd.classList.toggle('min',scrollY>40)},{passive:true});
addEventListener('pointermove',e=>{d.body.style.setProperty('--mx',e.clientX+'px');d.body.style.setProperty('--my',e.clientY+'px')});
if(!d.querySelector('.footer')){const f=d.createElement('footer');f.className='footer';f.innerHTML='<div class="container">Feito camada por camada com <b>H3dy_lab</b> · impressão 3D que vira presente</div>';d.body.append(f)}
q('.produto-card,.catalogo-botao,.sec>*,.cta,.catalogo-grid>*').forEach(e=>e.classList.add('rv'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});
q('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%3)*90+'ms';io.observe(e)});
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&matchMedia('(hover:hover)').matches)
q('.produto-card,.catalogo-botao').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
c.style.setProperty('--px',x*100+'%');c.style.setProperty('--py',y*100+'%');c.style.transitionDelay='0ms';c.style.transform=`perspective(800px) rotateY(${(x-.5)*14}deg) rotateX(${(.5-y)*14}deg) translateY(-6px)`});
c.addEventListener('pointerleave',()=>c.style.transform='')});
q('[data-n]').forEach(e=>{const t=+e.dataset.n;let n=0;const s=()=>{n+=Math.ceil(t/40);e.textContent=Math.min(n,t)+(e.dataset.s||'');n<t&&requestAnimationFrame(s)};s()});
const mf=d.getElementById('mailForm');mf&&mf.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(mf);
location.href='mailto:'+mf.dataset.email+'?subject='+encodeURIComponent('Pedido H3dy_lab — '+f.get('nome'))+'&body='+encodeURIComponent(f.get('msg')+'\n\nContato: '+f.get('nome')+' <'+f.get('email')+'>')});
})();
