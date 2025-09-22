(function(){
  const form = document.getElementById('registerForm');
  if(!form) return;

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const errors = {
    firstName: document.getElementById('firstNameError'),
    lastName: document.getElementById('lastNameError'),
    email: document.getElementById('emailError'),
    password: document.getElementById('passwordError')
  };

  function validateEmail(value){
    // simple RFC5322-inspired email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setError(field, message){
    const errorEl = errors[field.id];
    if(errorEl){ errorEl.textContent = message || ''; }
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function clearErrors(){
    Object.values(errors).forEach(el => el.textContent = '');
    [firstName, lastName, email, password].forEach(i => i.removeAttribute('aria-invalid'));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let ok = true;

    if(!firstName.value.trim()){
      setError(firstName, 'First name is required');
      ok = false;
    }
    if(!lastName.value.trim()){
      setError(lastName, 'Last name is required');
      ok = false;
    }
    if(!email.value.trim()){
      setError(email, 'Email is required');
      ok = false;
    } else if(!validateEmail(email.value.trim())){
      setError(email, 'Enter a valid email address');
      ok = false;
    }
    if(!password.value){
      setError(password, 'Password is required');
      ok = false;
    } else if(password.value.length < 8){
      setError(password, 'Use at least 8 characters');
      ok = false;
    }

    if(!ok) return;

    // Simulate successful registration
    const data = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
    };

    // For demo: store in sessionStorage so other pages can read
    try {
      sessionStorage.setItem('registeredUser', JSON.stringify(data));
    } catch {}

    alert('Registration successful!');
    // Navigate: if you have a login or schedule page, update link
    window.location.href = 'ViewSchedule.html';
  });
})();
