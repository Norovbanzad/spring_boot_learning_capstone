"use strict";

const COURSE_API = "/api/courses";
const USER_API = "/api/users";
const ENROLLMENT_API = "/api/enrollments";

const tableBody = document.querySelector("#course-table-body");
const message = document.querySelector("#message");

const csrfToken = document.querySelector('meta[name="_csrf"]').content;
const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;

async function findUserIdByEmail(email) {
	const response = await fetch(USER_API);
	if (!response.ok) {
		throw new Error("Users could not be loaded");
	}
	const users = await response.json();
	const user = users.find(u => u.email === email);
	if (!user) {
		throw new Error("Current user not found");
	}
	return user.id;
}

function formatDate(value) {
	if (!value) return 'N/A';
	if (Array.isArray(value)) {
		const [y, m, d] = value;
		return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
	}
	return String(value).slice(0, 10);
}

function renderCourses(courses) {
	tableBody.innerHTML = "";

	if (courses.length === 0) {
		const newRow = document.createElement("tr");
		const messageField = document.createElement("td");
		messageField.textContent = "No courses available";
		newRow.appendChild(messageField);
		tableBody.appendChild(newRow);
		return;
	}

	for (let course of courses) {
		const newRow = document.createElement("tr");

		const idField = document.createElement("td");
		idField.textContent = course.id;

		const titleField = document.createElement("td");
		titleField.textContent = course.title;

		const categoryField = document.createElement("td");
		categoryField.textContent = course.categoryName;

		const descField = document.createElement("td");
		descField.textContent = course.description;

		const createdField = document.createElement("td");
		createdField.textContent = formatDate(course.createdAt);

		const publishField = document.createElement("td");
		publishField.textContent = course.published;

		newRow.appendChild(idField);
		newRow.appendChild(titleField);
		newRow.appendChild(descField);
		newRow.appendChild(categoryField);
		newRow.appendChild(createdField);
		newRow.appendChild(publishField);

		const actionField = document.createElement("td");
		actionField.className = 'action-buttons';

		const enrollButton = document.createElement("button");
		enrollButton.textContent = "Enroll";
		enrollButton.className = "button enroll-button";
		enrollButton.dataset.id = course.id;
		enrollButton.addEventListener("click", () => {
			enroll(course.id, enrollButton);
		});

		actionField.appendChild(enrollButton);
		newRow.appendChild(actionField);

		tableBody.appendChild(newRow);
	}
}

async function loadCourses() {
	try {
		const response = await fetch(COURSE_API);
		if (!response.ok) {
			throw new Error("Courses could not be loaded");
		}
		const coursesData = await response.json();
		renderCourses(coursesData);
	} catch (error) {
		console.error(error.message);
	}
}

async function enroll(courseId, button) {
	const email = document.querySelector("#current-email").textContent.trim();

	try {
		const userId = await findUserIdByEmail(email);
		const response = await fetch(ENROLLMENT_API, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				[csrfHeader]: csrfToken
			},
			body: JSON.stringify({
				userId: userId,
				courseId: courseId,
				status: "ACTIVE"
			})
		});

		if (!response.ok) {
			throw new Error("Enrollment failed");
		}

		button.textContent = "Enrolled";
		button.disabled = true;
		button.classList.add("enrolled");
		showMessage("Successfully enrolled");
	} catch (error) {
		console.error(error);
		showMessage("Could not enroll in this course");
	}
}

function showMessage(text) {
	message.textContent = text;
	message.hidden = false;
	setTimeout(() => {
		message.hidden = true;
	}, 3000);
}

loadCourses();