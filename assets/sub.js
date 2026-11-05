(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var bar=$('.bar'),bg=$('#burger');
  if(bg)bg.onclick=function(){bg.setAttribute('aria-expanded',bar.classList.toggle('open'))};
  var mq=matchMedia('(max-width:760px)'),rd=$$('[data-rd]');
  function applyRd(){rd.forEach(function(d){d.open=!mq.matches})}
  applyRd();mq.addEventListener&&mq.addEventListener('change',applyRd);
  document.addEventListener('click',function(e){var s=e.target.closest('[data-rd]>summary');if(s&&!mq.matches)e.preventDefault()});
  var back=$('[data-history-back]');
  if(back)back.addEventListener('click',function(){if(history.length>1&&document.referrer.indexOf(location.host)>-1)history.back();else location.href=$('[data-home-link]').href});
  $$('.cat-nav').forEach(function(n){var a=$('.is-active',n);if(a)n.scrollLeft=a.offsetLeft-n.offsetLeft-16});
  // formularze: wiadomość e-mail (strona statyczna nie ma serwera)
  $$('form[data-mail]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();
    var t=[].slice.call(f.elements).filter(function(x){return x.name&&x.value}).map(function(x){return x.name+': '+x.value}).join('\n');
    location.href='mailto:domino@nieruchomosci-stw.pl?subject='+encodeURIComponent(f.dataset.subject||'')+'&body='+encodeURIComponent(t)})});
  // filtry ofert
  var ff=$('[data-filters]'),list=$('[data-list]');
  if(ff&&list){var cards=$$('.pcard',list),none=$('[data-none]'),q=new URLSearchParams(location.search);
    function v(n){var e=$('[data-f='+n+']',ff);return e?e.value:''}
    ['cat','city','amin','amax'].forEach(function(n){var e=$('[data-f='+n+']',ff);if(e&&q.get(n))e.value=q.get(n)});
    function run(){var c=v('cat'),ci=v('city'),a0=+v('amin'),a1=+v('amax'),p0=+v('pmin'),p1=+v('pmax'),n=0;
      cards.forEach(function(k){var d=k.dataset,ok=(!c||d.cats.split(' ').indexOf(c)>-1)&&(!ci||d.city===ci)&&(!a0||+d.area>=a0)&&(!a1||+d.area<=a1)&&(!p0||+d.price>=p0)&&(!p1||+d.price<=p1);k.hidden=!ok;if(ok)n++});
      none.hidden=n>0}
    ff.addEventListener('submit',function(e){e.preventDefault();run()});ff.addEventListener('change',run);run()}
  // galeria
  var gm=$('.g-main');
  if(gm){var ts=$$('.g-t'),urls=ts.map(function(t){return t.dataset.full}),idx=0,img=$('img',gm);
    var lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.innerHTML='<img alt=""><button class="lb-x" aria-label="Zamknij">×</button><button class="lb-p" aria-label="Poprzednie">‹</button><button class="lb-n" aria-label="Następne">›</button>';document.body.appendChild(lb);
    var li=$('img',lb);function show(i){idx=(i+urls.length)%urls.length;img.src=urls[idx];li.src=urls[idx]}
    ts.forEach(function(t,i){t.addEventListener('click',function(){show(i)})});
    gm.addEventListener('click',function(){show(idx);lb.hidden=false});
    $('.lb-x',lb).onclick=function(){lb.hidden=true};$('.lb-p',lb).onclick=function(){show(idx-1)};$('.lb-n',lb).onclick=function(){show(idx+1)};
    lb.addEventListener('click',function(e){if(e.target===lb)lb.hidden=true});
    document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)})}
})();
