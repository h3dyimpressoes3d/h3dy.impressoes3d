(()=>{const d=document,q=s=>[...d.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* progresso + header */
const bar=d.createElement('div');bar.id='prog';d.body.prepend(bar);const hd=d.querySelector('.site-header');
addEventListener('scroll',()=>{const h=d.documentElement;bar.style.width=scrollY/(h.scrollHeight-h.clientHeight)*100+'%';hd&&hd.classList.toggle('min',scrollY>40)},{passive:true});
/* menu mobile */
const bg=d.querySelector('.burger'),nv=d.getElementById('barraNav');bg&&bg.addEventListener('click',()=>{const o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)});nv&&nv.addEventListener('click',e=>e.target.tagName==='A'&&nv.classList.remove('open'));
/* titulo palavra por palavra */
q('[data-split]').forEach(h=>{let i=0;const w=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=d.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim())return f.append(t);const s=d.createElement('span');s.className='w';s.innerHTML='<i style="animation-delay:'+(.15+i++*.09)+'s">'+t+'</i>';f.append(s)});c.replaceWith(f)}else w(c)})};w(h)});
/* reveal */
q('.produto-card,.tile,.step,.cards3>div,.cta,.mail-form,.sh,.sobre>div,.mat').forEach(e=>e.classList.add('rv'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.1});
q('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%3)*80+'ms';io.observe(e)});
/* contadores */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const t=+e.target.dataset.n;let n=0;const s=()=>{n+=Math.ceil(t/40);e.target.textContent=Math.min(n,t)+(e.target.dataset.s||'');n<t&&requestAnimationFrame(s)};s()}));q('[data-n]').forEach(e=>co.observe(e));
/* cartoes: tilt + brilho */
if(!RM&&matchMedia('(hover:hover)').matches){q('.produto-card').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--px',x*100+'%');c.style.setProperty('--py',y*100+'%');c.style.transitionDelay='0ms';c.style.transform=`perspective(900px) rotateY(${(x-.5)*8}deg) rotateX(${(.5-y)*8}deg) translateY(-6px)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
/* botoes magneticos */
q('.primary-button,.botao-1').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')})}
/* cursor */
if(!RM&&matchMedia('(hover:hover) and (pointer:fine)').matches){const c=d.createElement('div');c.className='cur';d.body.append(c);d.body.classList.add('cc');let x=0,y=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});(function l(){x+=(tx-x)*.2;y+=(ty-y)*.2;c.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(l)})();d.addEventListener('pointerover',e=>c.classList.toggle('h',!!e.target.closest('a,button,.pimg,input,textarea')))}
/* lightbox */
const lb=d.createElement('div');lb.className='lb';lb.innerHTML='<img alt="">';d.body.append(lb);
q('.pimg').forEach(p=>p.addEventListener('click',()=>{const i=p.querySelector('img');lb.firstChild.src=i.src;lb.firstChild.alt=i.alt;lb.classList.add('on')}));lb.addEventListener('click',()=>lb.classList.remove('on'));addEventListener('keydown',e=>e.key==='Escape'&&lb.classList.remove('on'));
/* e-mail */
const mf=d.getElementById('mailForm');mf&&mf.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(mf);location.href='mailto:'+mf.dataset.email+'?subject='+encodeURIComponent('Pedido H3dy_lab — '+f.get('nome'))+'&body='+encodeURIComponent(f.get('msg')+'\n\nContato: '+f.get('nome')+' <'+f.get('email')+'>')});
/* ===== CENAS 3D: pecas sendo impressas camada por camada ===== */
if(!window.THREE||RM)return;
const T=THREE,SC=[],cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),P=(f,n=48,h=2)=>Array.from({length:n+1},(_,i)=>{const t=i/n;return new T.Vector2(Math.max(.03,f(t)),(t-.5)*h)});
const vase=()=>new T.LatheGeometry(P(t=>.55+.5*Math.sin(t*Math.PI*.9+.3)*(1-t*.25)+.12*Math.sin(t*18)),72);
const tower=()=>new T.LatheGeometry(P(t=>.5+.38*Math.sin(t*Math.PI*2.4)*(1-t*.35)+.06*Math.sin(t*46),90,3),96);
const gear=()=>{const s=new T.Shape(),N=12;for(let i=0;i<N*4;i++){const a=i/(N*4)*6.2832,k=i%4,r=(k==1||k==2)?1.25:1,x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y)}const h=new T.Path();h.absarc(0,0,.38,0,6.2832,true);s.holes.push(h);const g=new T.ExtrudeGeometry(s,{depth:1.5,bevelEnabled:false});g.rotateX(-Math.PI/2);return g};
const mk=(box,geo,o={})=>{if(!box)return;let R;try{R=new T.WebGLRenderer({antialias:true,alpha:true})}catch(e){return}
box.append(R.domElement);box.parentElement.querySelector('.fb')?.remove();geo.center();geo.computeBoundingBox();const z=new T.Vector3();geo.boundingBox.getSize(z);
const S=(o.size||2.7)/Math.max(z.x,z.y,z.z),H=z.y*S/2,RR=Math.max(z.x,z.z)*S/2*1.2,sc=new T.Scene(),cam=new T.PerspectiveCamera(38,1,.1,50);cam.position.set(0,.5,o.z||6.2);
R.setPixelRatio(Math.min(devicePixelRatio,2));R.localClippingEnabled=true;
const pl=new T.Plane(new T.Vector3(0,-1,0),0),m=new T.MeshStandardMaterial({color:o.color||0x723bfa,metalness:.35,roughness:.32,flatShading:!!o.flat,clippingPlanes:[pl],side:T.DoubleSide});
m.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace(/void main\(\s*\)\s*\{/,'varying float vY;\nvoid main(){').replace('#include <begin_vertex>','#include <begin_vertex>\nvY=(modelMatrix*vec4(transformed,1.)).y;');s.fragmentShader=s.fragmentShader.replace(/void main\(\s*\)\s*\{/,'varying float vY;\nvoid main(){').replace('#include <dithering_fragment>','gl_FragColor.rgb*=.72+.28*step(.5,fract(vY*34.));\n#include <dithering_fragment>')};
const wm=new T.MeshBasicMaterial({color:0x9b72ff,wireframe:true,transparent:true,opacity:.14}),grp=new T.Group();grp.add(new T.Mesh(geo,m),new T.Mesh(geo,wm));grp.scale.setScalar(S);
const ring=new T.Mesh(new T.TorusGeometry(RR,.012,8,100),new T.MeshBasicMaterial({color:0xb9f500})),glow=new T.Mesh(new T.CircleGeometry(RR,64),new T.MeshBasicMaterial({color:0xb9f500,transparent:true,opacity:.07,side:T.DoubleSide}));ring.rotation.x=glow.rotation.x=Math.PI/2;
sc.add(grp,ring,glow,new T.AmbientLight(0xffffff,.55));const k=new T.DirectionalLight(0xffffff,1.6);k.position.set(3,4,5);const a=new T.PointLight(0xb9f500,2.4,12);a.position.set(-3.5,1,-2);const b=new T.PointLight(o.rim||0x9b72ff,3,12);b.position.set(3,-2,-3);sc.add(k,a,b);
const s={box,R,sc,cam,grp,pl,ring,glow,wm,H,o,vis:true,ph:o.ph||0};const fit=()=>{const w=box.clientWidth,h=box.clientHeight;R.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix()};fit();addEventListener('resize',fit);new IntersectionObserver(e=>s.vis=e[0].isIntersecting).observe(box);SC.push(s)};
mk(d.getElementById('scene'),new T.TorusKnotGeometry(1.05,.34,240,36,2,3),{size:3.1,onP(f){const l=d.getElementById('lay'),p=d.querySelector('.hero-art .bar i');l&&(l.textContent=String(Math.round(f*300)).padStart(3,'0')+' / 300');p&&(p.style.width=f*100+'%')}});
[['m1',vase(),0x723bfa,0x9b72ff,0],['m2',gear(),0xb9f500,0xb9f500,3],['m3',new T.IcosahedronGeometry(1.2,1),0xff5d8f,0xff5d8f,6]].forEach(([id,g,c,r,ph],i)=>mk(d.getElementById(id),g,{color:c,rim:r,ph,flat:i==2,size:2.5,z:6.4,cy:i==1?3.2:.5}));
const sec=d.getElementById('tech'),ph=q('.phases li'),$=i=>d.getElementById(i);
mk($('big'),tower(),{size:3.6,z:7,rim:0xb9f500,scroll:true,onP(f,p){const i=p<.15?0:p<.3?1:p<.85?2:3;ph.forEach((e,j)=>e.classList.toggle('on',j===i));$('sl').textContent=String(Math.round(f*480)).padStart(3,'0');$('sh').textContent=(f*96).toFixed(1);$('stm').textContent=String(Math.floor(f*222/60)).padStart(2,'0')+':'+String(Math.floor(f*222%60)).padStart(2,'0');$('sb').style.width=p*100+'%'}});
let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});const clk=new T.Clock();
(function loop(){requestAnimationFrame(loop);const t=clk.getElapsedTime();SC.forEach(s=>{if(!s.vis)return;let f,p=0;
if(s.o.scroll){const r=sec.getBoundingClientRect();p=cl(-r.top/(r.height-innerHeight));f=cl((p-.3)/.55);s.wm.opacity=.5-.36*f;s.grp.rotation.y=p*12.5+t*.1}
else{const c=((t+s.ph)%9)/9;f=c<.8?c/.8:1;s.grp.rotation.y=t*.35+scrollY*.003+s.ph}
const h=-s.H+f*s.H*2;s.pl.constant=f>=1?s.H+1:h;s.ring.position.y=s.glow.position.y=h;s.ring.visible=s.glow.visible=f>0&&f<1;s.grp.position.y=Math.sin(t*.8+s.ph)*.04;
s.cam.position.x+=(mx*1.2-s.cam.position.x)*.05;s.cam.position.y+=((s.o.cy??.5)-my*1-s.cam.position.y)*.05;s.cam.lookAt(0,0,0);s.o.onP&&s.o.onP(f,p);s.R.render(s.sc,s.cam)})})();
})();
