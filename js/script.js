(()=>{const d=document,q=s=>[...d.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* progresso + header */
const bar=d.createElement('div');bar.id='prog';d.body.prepend(bar);const hd=d.querySelector('.site-header');
addEventListener('scroll',()=>{const h=d.documentElement;bar.style.width=scrollY/(h.scrollHeight-h.clientHeight)*100+'%';hd&&hd.classList.toggle('min',scrollY>40)},{passive:true});
/* menu mobile */
const bg=d.querySelector('.burger'),nv=d.getElementById('barraNav');bg&&bg.addEventListener('click',()=>{const o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)});nv&&nv.addEventListener('click',e=>e.target.tagName==='A'&&nv.classList.remove('open'));
/* titulo palavra por palavra */
q('[data-split]').forEach(h=>{let i=0;const w=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=d.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim())return f.append(t);const s=d.createElement('span');s.className='w';s.innerHTML='<i style="animation-delay:'+(.15+i++*.09)+'s">'+t+'</i>';f.append(s)});c.replaceWith(f)}else w(c)})};w(h)});
/* reveal */
q('.produto-card,.tile,.step,.cards3>div,.cta,.mail-form,.sh,.sobre>div').forEach(e=>e.classList.add('rv'));
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
/* ===== CENA 3D: peça sendo impressa camada por camada ===== */
const box=d.getElementById('scene');if(!box||!window.THREE||RM)return;
let R;try{R=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){return}
const T=THREE,sc=new T.Scene(),cam=new T.PerspectiveCamera(38,1,.1,50);cam.position.set(0,.5,6.2);
R.setPixelRatio(Math.min(devicePixelRatio,2));R.localClippingEnabled=true;box.append(R.domElement);d.querySelector('.fb')?.remove();
const pl=new T.Plane(new T.Vector3(0,-1,0),0),g=new T.TorusKnotGeometry(1.05,.34,240,36,2,3);
const m=new T.MeshStandardMaterial({color:0x723bfa,metalness:.35,roughness:.32,clippingPlanes:[pl],side:T.DoubleSide});
m.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace('void main(){','varying float vY;\nvoid main(){').replace('#include <begin_vertex>','#include <begin_vertex>\nvY=(modelMatrix*vec4(transformed,1.)).y;');s.fragmentShader=s.fragmentShader.replace('void main(){','varying float vY;\nvoid main(){').replace('#include <dithering_fragment>','gl_FragColor.rgb*=.72+.28*step(.5,fract(vY*34.));\n#include <dithering_fragment>')};
const solid=new T.Mesh(g,m),wire=new T.Mesh(g,new T.MeshBasicMaterial({color:0x9b72ff,wireframe:true,transparent:true,opacity:.14}));
const ring=new T.Mesh(new T.TorusGeometry(1.75,.012,8,100),new T.MeshBasicMaterial({color:0xb9f500}));ring.rotation.x=Math.PI/2;
const glow=new T.Mesh(new T.CircleGeometry(1.75,64),new T.MeshBasicMaterial({color:0xb9f500,transparent:true,opacity:.07,side:T.DoubleSide}));glow.rotation.x=Math.PI/2;
const grp=new T.Group();grp.add(solid,wire);sc.add(grp,ring,glow);
sc.add(new T.AmbientLight(0xffffff,.55));const k=new T.DirectionalLight(0xffffff,1.6);k.position.set(3,4,5);const r2=new T.PointLight(0xb9f500,2.4,12);r2.position.set(-3.5,1,-2);const r3=new T.PointLight(0x9b72ff,3,12);r3.position.set(3,-2,-3);sc.add(k,r2,r3);
const fit=()=>{const w=box.clientWidth,h=box.clientHeight;R.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix()};fit();addEventListener('resize',fit);
let mx=0,my=0,vis=true;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(box);
const lay=d.getElementById('lay'),pb=d.querySelector('.bar i'),clk=new T.Clock(),TOP=1.75;
(function loop(){requestAnimationFrame(loop);if(!vis)return;const t=clk.getElapsedTime(),c=(t%9)/9,p=c<.8?c/.8:1,h=-TOP+p*TOP*2;
pl.constant=h;ring.position.y=glow.position.y=h;ring.visible=glow.visible=c<.8;grp.rotation.y=t*.35+scrollY*.003;grp.position.y=Math.sin(t*.8)*.05;
cam.position.x+=(mx*1.4-cam.position.x)*.05;cam.position.y+=(.5-my*1.2-cam.position.y)*.05;cam.lookAt(0,0,0);
if(lay){lay.textContent=String(Math.round(p*300)).padStart(3,'0')+' / 300'}if(pb)pb.style.width=p*100+'%';R.render(sc,cam)})();
})();
