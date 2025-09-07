// script.js - Handles timeline toggle, tributes, messages rotation, and dynamic year

// Timeline toggle
document.querySelectorAll('.timeline-toggle').forEach(button=>{
    button.addEventListener('click', ()=>{
      const content = button.nextElementSibling;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !expanded);
      content.style.display = expanded ? 'none' : 'block';
    });
  });
  
  // Tributes
  const tributeForm = document.getElementById('tribute-form');
  const tributeList = document.getElementById('tribute-list');
  
  function loadTributes(){
    const tributes = JSON.parse(localStorage.getItem('tributes')||'[]');
    tributeList.innerHTML='';
    tributes.forEach(t=>{
      const li = document.createElement('li');
      li.textContent = `${t.name}: ${t.message}`;
      tributeList.appendChild(li);
    });
  }
  
  tributeForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !message){ alert('Please fill in required fields'); return; }
    const tributes = JSON.parse(localStorage.getItem('tributes')||'[]');
    tributes.push({id:Date.now(), name, email, message});
    localStorage.setItem('tributes', JSON.stringify(tributes));
    loadTributes();
    tributeForm.reset();
  });
  
  loadTributes();
  
  // Messages rotation
const messages = [
    {text:'"He had a heart full of love and kindness."', author:'- John D.'},
    {text:'"Always inspired us with his generosity."', author:'- Mary S.'},
    {text:'"A wonderful friend and mentor."', author:'- Carlos R.'},
    {text:'"His laughter will always stay with us."', author:'- Lisa P.'}
  ];
  
  let messageIndex = 0;
  const messageText = document.getElementById('message-text');
  const messageAuthor = document.getElementById('message-author');
  
  function showMessage(index){
    messageText.textContent = messages[index].text;
    messageAuthor.textContent = messages[index].author;
  }
  
  // Auto-rotate messages every 5 seconds
  let messageInterval = setInterval(()=>{
    messageIndex = (messageIndex + 1) % messages.length;
    showMessage(messageIndex);
  }, 5000);
  
  // Arrow buttons
  document.getElementById('prev-message').addEventListener('click', ()=>{
    messageIndex = (messageIndex - 1 + messages.length) % messages.length;
    showMessage(messageIndex);
    clearInterval(messageInterval); // reset auto-rotation
  });
  
  document.getElementById('next-message').addEventListener('click', ()=>{
    messageIndex = (messageIndex + 1) % messages.length;
    showMessage(messageIndex);
    clearInterval(messageInterval); // reset auto-rotation
  });
  
  
  // Dynamic year
  document.getElementById('year').textContent = new Date().getFullYear();
  