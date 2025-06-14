const apiBase = '/api';

async function createCourse() {
  const title = document.getElementById('create-course-title').value;
  const description = document.getElementById('create-course-description').value;
  const imageFile = document.getElementById('create-course-image').files[0];
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (imageFile) {
    formData.append('image', imageFile);
  }
  const res = await fetch(`${apiBase}/courses`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  document.getElementById('create-course-result').textContent = JSON.stringify(data, null, 2);
}

async function updateCourse() {
  const id = document.getElementById('update-course-id').value;
  const title = document.getElementById('update-course-title').value;
  const description = document.getElementById('update-course-description').value;
  const res = await fetch(`${apiBase}/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  const data = await res.json();
  document.getElementById('update-course-result').textContent = JSON.stringify(data, null, 2);
}

async function deleteCourse() {
  const id = document.getElementById('delete-course-id').value;
  const res = await fetch(`${apiBase}/courses/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  document.getElementById('delete-course-result').textContent = JSON.stringify(data, null, 2);
}

async function enrollUser() {
  const userId = document.getElementById('enroll-user-id').value;
  const courseId = document.getElementById('enroll-course-id').value;
  const res = await fetch(`${apiBase}/enrollments/enroll`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, courseId })
  });
  const data = await res.json();
  document.getElementById('enroll-result').textContent = JSON.stringify(data, null, 2);
}

async function getStudentsCount() {
  const courseId = document.getElementById('students-count-course-id').value;
  const res = await fetch(`${apiBase}/enrollments/students-count/${courseId}`);
  const data = await res.json();
  document.getElementById('students-count-result').textContent = JSON.stringify(data, null, 2);
}

async function createLesson() {
  const title = document.getElementById('create-lesson-title').value;
  const description = document.getElementById('create-lesson-description').value;
  const res = await fetch(`${apiBase}/lessons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  const data = await res.json();
  document.getElementById('create-lesson-result').textContent = JSON.stringify(data, null, 2);
}

async function updateLesson() {
  const id = document.getElementById('update-lesson-id').value;
  const title = document.getElementById('update-lesson-title').value;
  const description = document.getElementById('update-lesson-description').value;
  const res = await fetch(`${apiBase}/lessons/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  const data = await res.json();
  document.getElementById('update-lesson-result').textContent = JSON.stringify(data, null, 2);
}

async function deleteLesson() {
  const id = document.getElementById('delete-lesson-id').value;
  const res = await fetch(`${apiBase}/lessons/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  document.getElementById('delete-lesson-result').textContent = JSON.stringify(data, null, 2);
}

async function getProfile() {
  const res = await fetch(`${apiBase}/user/profile`);
  const data = await res.json();
  document.getElementById('profile-result').textContent = JSON.stringify(data, null, 2);
}

async function deleteUser() {
  const res = await fetch(`${apiBase}/user`, {
    method: 'DELETE'
  });
  const data = await res.json();
  document.getElementById('delete-user-result').textContent = JSON.stringify(data, null, 2);
}
