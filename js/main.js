/* スクロールリビール（IntersectionObserver） */
(function(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(el=>el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  },{threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  items.forEach((el,i)=>{
    el.style.transitionDelay = (i % 3 * 80) + 'ms';
    io.observe(el);
  });
})();

/* 作品モーダル（全体デザインのポップアップ） */
(function(){
  const modal = document.getElementById('workModal');
  if(!modal) return;
  const img     = document.getElementById('modalImg');
  const cat     = document.getElementById('modalCat');
  const title   = document.getElementById('modalTitle');
  const desc    = document.getElementById('modalDesc');
  const actions = document.getElementById('modalActions');
  const media   = modal.querySelector('.modal__media');
  const closeBtn= modal.querySelector('.modal__close');
  let lastFocused = null;

  function open(card){
    lastFocused = card;
    const d = card.dataset;
    img.src = d.image || '';
    img.alt = (d.title || '') + ' の全体デザイン';
    cat.textContent   = d.cat   || '';
    title.textContent = d.title || '';
    desc.textContent  = d.desc  || '';
    actions.innerHTML = '';
    if(d.url){
      const a = document.createElement('a');
      a.className = 'modal__link';
      a.href = d.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.innerHTML = 'サイトを見る <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';
      actions.appendChild(a);
    }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(()=>{ modal.classList.add('is-open'); media.scrollTop = 0; });
    closeBtn.focus();
  }
  function close(){
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(()=>{ modal.hidden = true; }, 320);
    if(lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-modal]').forEach(card=>{
    card.addEventListener('click', e=>{ e.preventDefault(); open(card); });
  });
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e=>{ if(e.target === modal) close(); });
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape' && !modal.hidden) close(); });
})();
