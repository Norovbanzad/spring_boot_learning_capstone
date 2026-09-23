"use strict";

const LESSON_API = "/api/lessons";
const COURSE_API = "/api/courses";

const courseId = document.querySelector('meta[name="course-id"]').content;
const tableBody = document.querySelector("#lesson-table-body");
const message = document.querySelector("#message");
const subtitle = document.querySelector("#course-subtitle");

const csrfToken = document.querySelector('meta[name="_csrf"]').content;
const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;

async function loadCourse() {
	try {
		const response = await fetch(`${COURSE_API}/${courseId}`);
		if (!response.ok) {
			throw new Error("Course could not be loaded");
		}
		const course = await response.json();
		subtitle.textContent = `Lessons for "${course.title}"`;
	} catch (error) {
		console.error(error.message);
	}
}

async function loadLessons() {
	try {
		const response = await fetch(`${LESSON_API}/course/${courseId}`);
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
		messageField.colSpan = 6;
		messageField.textContent = "No lessons for this course";
		newRow.appendChild(messageField);
		tableBody.appendChild(newRow);
		return;
	}

	for (let lesson of lessons) {
		const newRow = document.createElement("tr");

		const idField = document.createElement("td");
		idField.textContent = lesson.id;

		const positionField = document.createElement("td");
		positionField.textContent = lesson.position;

		const titleField = document.createElement("td");
		titleField.textContent = lesson.title;

		const contentField = document.createElement("td");
		contentField.textContent = lesson.content;

		const publishedField = document.createElement("td");
		publishedField.textContent = lesson.published;

		newRow.appendChild(idField);
		newRow.appendChild(positionField);
		newRow.appendChild(titleField);
		newRow.appendChild(contentField);
		newRow.appendChild(publishedField);

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

function showMessage(text) {
	message.textContent = text;
	message.hidden = false;
	setTimeout(() => {
		message.hidden = true;
	}, 3000);
}

loadCourse();
loadLessons();
