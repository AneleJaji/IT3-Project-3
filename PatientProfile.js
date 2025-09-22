(function(){
  const list = document.getElementById('allergyList');
  const addBtn = document.getElementById('addAllergyBtn');
  const notes = document.getElementById('notes');
  const saveNotesBtn = document.getElementById('saveNotesBtn');

  const KEY = 'patientProfile.demo.v1';
  const state = load();

  // init
  if(state.allergies && list){
    list.innerHTML = '';
    state.allergies.forEach(a => addAllergyItem(a.name, a.severity));
  }
  if(state.notes && notes){
    notes.value = state.notes;
  }

  if(addBtn){
    addBtn.addEventListener('click', () => {
      const name = prompt('Allergy name?');
      if(!name) return;
      const severity = prompt('Severity (low/medium/high)?', 'low');
      const sev = String(severity||'low').toLowerCase();
      const normalized = ['low','medium','high'].includes(sev) ? sev : 'low';
      addAllergyItem(name, normalized);
      state.allergies.push({name, severity: normalized});
      save();
    });
  }

  if(saveNotesBtn){
    saveNotesBtn.addEventListener('click', () => {
      state.notes = notes.value;
      save();
      alert('Notes saved');
    });
  }

  function addAllergyItem(name, severity){
    const li = document.createElement('li');
    const pill = document.createElement('span');
    pill.className = 'pill ' + (severity==='high'?'high':severity==='medium'?'medium':'');
    pill.textContent = severity.charAt(0).toUpperCase()+severity.slice(1);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;

    li.appendChild(nameSpan);
    li.appendChild(pill);
    list.appendChild(li);
  }

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return { allergies: [
        {name:'Seafood', severity:'high'},
        {name:'Penicillin', severity:'medium'}
      ], notes: '' };
      return JSON.parse(raw);
    }catch{
      return { allergies: [], notes: '' };
    }
  }
  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch{}
  }
})();
