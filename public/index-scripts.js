const apiBase = '/api';

async function signup() {
  const firstName = document.getElementById('signup-firstName').value;
  const lastName = document.getElementById('signup-lastName').value;
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
  const role = document.getElementById('signup-role').value;

  const res = await fetch(`${apiBase}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, username, password, role })
  });
  const data = await res.json();
  document.getElementById('signup-result').textContent = JSON.stringify(data, null, 2);

  if (res.ok) {
    if (role === 'teacher') {
      window.location.href = 'teacher.html';
    } else if (role === 'student') {
      window.location.href = 'student.html';
    }
  }
}

async function signin() {
  const username = document.getElementById('signin-username').value;
  const password = document.getElementById('signin-password').value;

  const res = await fetch(`${apiBase}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  document.getElementById('signin-result').textContent = JSON.stringify(data, null, 2);

  if (res.ok) {
    const token = data.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;
    if (role === 'teacher') {
      window.location.href = 'teacher.html';
    } else if (role === 'student') {
      window.location.href = 'student.html';
    } else {
      alert('Неизвестная роль');
    }
  }
}
