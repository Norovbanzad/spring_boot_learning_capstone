"use strict";

const ENROLLMENT_API = "/api/student/enrollments";

const tableBody = document.querySelector("#enrollment-table-body");

function formatDate(value) {
	if (!value) return 'N/A';
	if (Array.isArray(value)) {
		const [y, m, d] = value;
		return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
	}
	return String(value).slice(0, 10);
}

function renderEnrollments(enrollments) {
	tableBody.innerHTML = "";

	if (enrollments.length === 0) {
		const newRow = document.createElement("tr");
		const messageField = document.createElement("td");
		messageField.textContent = "You are not enrolled in any course yet.";
		newRow.appendChild(messageField);
		tableBody.appendChild(newRow);
		return;
	}

	for (let enrollment of enrollments) {
		const newRow = document.createElement("tr");

		const idField = document.createElement("td");
		idField.textContent = enrollment.id;

		const courseField = document.createElement("td");
		courseField.textContent = enrollment.title;

		const statusField = document.createElement("td");
		statusField.textContent = enrollment.status;

		const dateField = document.createElement("td");
		dateField.textContent = formatDate(enrollment.enrolledAt);

		newRow.appendChild(idField);
		newRow.appendChild(courseField);
		newRow.appendChild(statusField);
		newRow.appendChild(dateField);

		tableBody.appendChild(newRow);
	}
}

async function loadEnrollments() {
	try {
		const response = await fetch(ENROLLMENT_API);
		if (!response.ok) {
			throw new Error("Enrollments could not be loaded");
		}
		const enrollments = await response.json();
		renderEnrollments(enrollments);
	} catch (error) {
		console.error(error.message);
	}
}

loadEnrollments();