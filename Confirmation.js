(function(){
  const welcome = document.getElementById('welcomeText');

  function getName(){
    // Prefer query param ?name=XYZ, else use sessionStorage registeredUser
    const params = new URLSearchParams(location.search);
    if(params.get('name')) return params.get('name');
    try{
      const raw = sessionStorage.getItem('registeredUser');
      if(raw){
        const u = JSON.parse(raw);
        return [u.firstName, u.lastName].filter(Boolean).join(' ') || u.firstName || 'User';
      }
    }catch{}
    return 'User';
  }

  if(welcome){ welcome.textContent = `Welcome, ${getName()}`; }
})();
