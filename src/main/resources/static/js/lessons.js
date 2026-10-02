"use strict";

const LESSON_API = "/api/lessons";
const COURSE_API = "/api/courses";

const form = document.querySelector("#course-form");
const lessonId = document.querySelector("#lesson-id");
const lessonTitle = document.querySelector("#lesson-title");
const lessonContent = document.querySelector("#lesson-content");
const courseTitle = document.querySelector("#course-category");
const published = document.querySelector("#published");
const lessonPosition = document.querySelector("#position");
const submitBtn = document.querySelector("#submit-button");
const cancelBtn = document.querySelector("#cancel-button");
const tableBody = document.querySelector("#lesson-table-body");
const message = document.querySelector("#message");

const csrfToken = document.querySelector('meta[name="_csrf"]').content;
const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;

async function loadCourses() {
	const response = await fetch(COURSE_API);

	if(!response.ok) {
		throw new Error("Courses could not be loaded");
	}

	const courses = await response.json();
	courseTitle.innerHTML = `<option value="">
								Select Course
							</option>`;
	for (let c of courses) {
		const option = document.createElement("option");
		option.value = c.id;
		option.textContent = c.title;
		courseTitle.appendChild(option);
	}
}

async function loadLessons() {
	try {
		const response = await fetch(LESSON_API);
		if (!response.ok) {
			throw new Error("Lessons could not be loaded");
		}
		const lessons = await response.json();
		renderLessons(lessons);
	} catch (error) {
		console.error(error.message);
		showMessage("Lessons could not be loaded");
	}
}

function renderLessons(lessons) {
	tableBody.innerHTML = "";

	if (lessons.length === 0) {
		const newRow = document.createElement("tr");
		const messageField = document.createElement("td");
		messageField.colSpan = 7;
		messageField.textContent = "No lessons for this course";
		newRow.appendChild(messageField);
		tableBody.appendChild(newRow);
		return;
	}

	for (let lesson of lessons) {
		const newRow = document.createElement("tr");

		const lessonId = document.createElement("td");
		lessonId.textContent = lesson.id;

		const lessonTitle = document.createElement("td");
		lessonTitle.textContent = lesson.title;

		const lessonContent = document.createElement("td");
		lessonContent.textContent = lesson.content;

		const courseTitle = document.createElement("td");
		courseTitle.textContent = lesson.courseTitle;

		const lessonPosition = document.createElement("td");
		lessonPosition.textContent = lesson.position;

		const published = document.createElement("td");
		published.textContent = lesson.published;
		
		newRow.appendChild(lessonId);
		newRow.appendChild(lessonTitle);
		newRow.appendChild(lessonContent);
		newRow.appendChild(courseTitle);
		newRow.appendChild(lessonPosition);
		newRow.appendChild(published);
		
		const actionField = document.createElement("td");
		actionField.className = "action-buttons";

		const publishButton = document.createElement("button");
		publishButton.textContent = lesson.published ? "Unpublish" : "Publish";
		publishButton.className = "button";
		publishButton.classList.add(lesson.published ? "delete-button" : "edit-button");
		publishButton.addEventListener("click", () => {
			togglePublish(lesson.id, publishButton);
		});

		actionField.appendChild(publishButton);
		newRow.appendChild(actionField);

		tableBody.appendChild(newRow);
	}
}

async function togglePublish(id, button) {
	button.disabled = true;

	try {
		const response = await fetch(`${LESSON_API}/${id}/publish`, {
			method: "PUT",
			headers: {
				[csrfHeader]: csrfToken
			}
		});

		if (!response.ok) {
			throw new Error("Request failed");
		}

		showMessage("Lesson updated");
		await loadLessons();
	} catch (error) {
		console.error(error);
		button.disabled = false;
		showMessage("Lesson could not be updated");
	}
}

form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
	e.preventDefault();

	const id = lessonId.value;
	const lesson = {
		title : lessonTitle.value.trim(),
		content : lessonContent.value.trim(),
		published : published.checked,
		position : lessonPosition.value,
		courseId : courseTitle.value ? Number(courseTitle.value) : null
	};

	if (lesson.title === "") {
		showMessage("Title required");
		return;
	}

	const isEditing = id !== "";
	const url = isEditing ? `${LESSON_API}/${id}` : LESSON_API;

	const method = isEditing ? "PUT" : "POST";

	try {
		const response = await fetch(url, {
			method : method,
			headers : {
				"Content-Type": "application/json",
				[csrfHeader] : csrfToken
			},
			body : JSON.stringify(lesson)
		});

		if (!response.ok) {
			throw new Error("Request failed");
		}

		if (isEditing) {
			showMessage("Lesson updated");
		}
		else {
			showMessage("Lesson created");
		}

		resetForm();
		await loadLessons();
	} catch(error) {
		console.error(error);
	}
}

function resetForm() {
	form.reset();
	lessonTitle.value = "";
    published.checked = false;
	submitBtn.textContent = "Add lesson";
}

function showMessage(text) {
	message.textContent = text;
	message.hidden = false;
	setTimeout(() => {
		message.hidden = true;
	}, 3000);
}
loadCourses();
loadLessons();
