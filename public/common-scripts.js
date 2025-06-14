const apiBase = '/api';

async function getAllCourses() {
  const res = await fetch(`${apiBase}/courses`);
  const data = await res.json();
  document.getElementById('courses-list').textContent = JSON.stringify(data, null, 2);
}

async function getCourseById() {
  const id = document.getElementById('course-id').value;
  const res = await fetch(`${apiBase}/courses/${id}`);
  const data = await res.json();
  document.getElementById('course-result').textContent = JSON.stringify(data, null, 2);
}

async function getEnrollmentProgress() {
  const userId = document.getElementById('progress-user-id').value;
  const courseId = document.getElementById('progress-course-id').value;
  const res = await fetch(`${apiBase}/enrollments/progress/${userId}/${courseId}`);
  const data = await res.json();
  document.getElementById('progress-result').textContent = JSON.stringify(data, null, 2);
}

async function cancelLesson() {
  const userId = document.getElementById('cancel-user-id').value;
  const lessonId = document.getElementById('cancel-lesson-id').value;
  const res = await fetch(`${apiBase}/enrollments/cancel-lesson`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, lessonId })
  });
  const data = await res.json();
  document.getElementById('cancel-result').textContent = JSON.stringify(data, null, 2);
}

async function addFavoriteCourse() {
  const courseId = document.getElementById('add-favorite-course-id').value;
  const res = await fetch(`${apiBase}/favorites/addFavoriteCourse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId })
  });
  const data = await res.json();
  document.getElementById('add-favorite-result').textContent = JSON.stringify(data, null, 2);
}

async function removeFavoriteCourse() {
  const courseId = document.getElementById('remove-favorite-course-id').value;
  const res = await fetch(`${apiBase}/favorites/removeFavoriteCourse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId })
  });
  const data = await res.json();
  document.getElementById('remove-favorite-result').textContent = JSON.stringify(data, null, 2);
}

async function getFavoriteCourses() {
  const res = await fetch(`${apiBase}/favorites/getFavoriteCourses`);
  const data = await res.json();
  document.getElementById('favorite-courses-list').textContent = JSON.stringify(data, null, 2);
}

async function getAllLessons() {
  const res = await fetch(`${apiBase}/lessons`);
  const data = await res.json();
  document.getElementById('lessons-list').textContent = JSON.stringify(data, null, 2);
}

async function getLessonById() {
  const id = document.getElementById('lesson-id').value;
  const res = await fetch(`${apiBase}/lessons/${id}`);
  const data = await res.json();
  document.getElementById('lesson-result').textContent = JSON.stringify(data, null, 2);
}
