function togglePenjelasan(id) {
  var el = document.getElementById(id);
  if (!el) return;

  // jika sekarang tersembunyi, tanya untuk menampilkan
  var shown = !(el.style.display === 'none' || getComputedStyle(el).display === 'none');
  if (shown) {
    var t = confirm("Apakah Anda ingin menyembunyikan penjelasan ini?");
    if (t) el.style.display = 'none';
  } else {
    var t = confirm("Apakah Anda ingin menampilkan penjelasan ini?");
    if (t) el.style.display = 'block';
  }
}

// Mode Rapi
function modeRapi() {
  var b = document.getElementById('body');
  b.classList.remove('berantakan');
  b.classList.add('rapi');

  // Hapus style inline yang dibuat saat berantakan
  cleanupChaos();
}
// Mode Berantakan (EXTREME)
function modeBerantakan() {
  var b = document.getElementById('body');
  b.classList.remove('rapi');
  b.classList.add('berantakan');

  // Aktifkan chaos: acak posisi, rotasi, ukuran font, warna
  unleashChaos();
}

// membersihkan semua efek chaos (kembali normal)
function cleanupChaos(){
  // kembalikan semua elemen ke keadaan semula
  var all = document.querySelectorAll('.card, h4, .identitas, p, h2, h3, .tombol-row, button');
  all.forEach(function(el){
    el.style.position = '';
    el.style.left = '';
    el.style.top = '';
    el.style.transform = '';
    el.style.fontSize = '';
    el.style.background = '';
    el.style.color = '';
    el.style.zIndex = '';
    el.style.animation = '';
  });

  // kembalikan gallery container ke posisi statis (grid)
  var gallery = document.getElementById('gallery');
  if (gallery) gallery.style.position = '';
}

// buat gaya acak untuk membuat layout benar-benar berantakan
function unleashChaos(){
  // 1) ubah container gallery jadi relatif agar kita bisa posisikan anaknya absolut
  var gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.style.position = 'relative';
    // untuk supaya kartu bisa keluar dari grid, kita juga set width relatif
    gallery.style.minHeight = '500px';
  }

  // 2) ambil semua kartu, judul, paragraf, tombol dan acak posisinya
  var cards = document.querySelectorAll('.card');
  var titles = document.querySelectorAll('h4');
  var paragraphs = document.querySelectorAll('p');
  var buttons = document.querySelectorAll('button');

  // fungsi bantu: random integer
  function rnd(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }

  // acak kartu
  cards.forEach(function(card, idx){
    // buat ukuran acak
    var w = rnd(120, 380);
    card.style.width = w + 'px';

    // posisikan absolut di dalam gallery (random top/left)
    card.style.position = 'absolute';
    // top di area 0..(galleryHeight - 100)
    var gRect = gallery ? gallery.getBoundingClientRect() : {width:800, height:600};
    var maxLeft = Math.max(0, (gallery ? gallery.clientWidth : 800) - w);
    var left = rnd(-50, Math.min(maxLeft + 100, 700));
    var top = rnd(-60, Math.max(100, (idx * 40)));
    card.style.left = left + 'px';
    card.style.top = top + 'px';
    card.style.transform = 'rotate(' + rnd(-30,30) + 'deg)';
    card.style.zIndex = 100 + rnd(0,200);
    card.style.background = 'hsl(' + rnd(0,360) + ', 90%, 75%)';
    card.style.border = (rnd(2,8)) + 'px dashed hsl(' + rnd(0,360) + ',70%,40%)';
    card.style.animation = 'blink ' + (1 + Math.random()*2).toFixed(2) + 's infinite';
  });

  // acak judul (h4)
  titles.forEach(function(t){
    t.style.position = 'relative';
    t.style.left = (rnd(-40,40)) + 'px';
    t.style.transform = 'rotate(' + rnd(-20,20) + 'deg)';
    t.style.fontSize = (rnd(14,30)) + 'px';
    t.style.color = 'hsl(' + rnd(0,360) + ', 80%, 30%)';
    t.style.background = 'hsl(' + rnd(0,360) + ', 80%, 85%)';
    t.style.zIndex = 500;
    t.style.animation = 'blink ' + (1 + Math.random()*1.5).toFixed(2) + 's infinite';
  });

  // acak paragraf
  paragraphs.forEach(function(p){
    p.style.color = 'hsl(' + rnd(0,360) + ', 80%, 20%)';
    p.style.fontSize = (rnd(12,20)) + 'px';
    p.style.left = (rnd(-20,20)) + 'px';
    p.style.position = 'relative';
    p.style.zIndex = 200;
    p.style.animation = 'blink ' + (1.5 + Math.random()*2).toFixed(2) + 's infinite';
  });

  // acak tombol (warna & sedikit gerak)
  buttons.forEach(function(btn){
    btn.style.background = 'hsl(' + rnd(0,360) + ', 70%, 40%)';
    btn.style.color = 'hsl(' + rnd(0,360) + ', 90%, 95%)';
    btn.style.transform = 'rotate(' + rnd(-12,12) + 'deg)';
    btn.style.zIndex = 600;
    btn.style.animation = 'blink ' + (0.6 + Math.random()*1.4).toFixed(2) + 's infinite';
  });

  // Scroll ke atas supaya efek berantakan terlihat langsung
  window.scrollTo({top:0, behavior:'smooth'});
}

// Tombol kembali (footer)
function goBack(){
  if (document.referrer) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

// Inisialisasi: tampilkan semua penjelasan awalnya
window.addEventListener('DOMContentLoaded', function(){
  for (var i=1;i<=7;i++){
    var el = document.getElementById('p'+i);
    if (el) el.style.display = 'block';
  }
});
