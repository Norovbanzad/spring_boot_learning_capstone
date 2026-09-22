"use strict";

const COURSE_API = "/api/courses";
const CATEGORY_API = "/api/categories";

const form = document.querySelector("#course-form");

const courseIdInput = document.querySelector("#course-id");
const titleInput = document.querySelector("#course-title");
const descriptionInput = document.querySelector("#course-description");
const categoryInput = document.querySelector("#course-category");
const createdAt = document.querySelector("#createdAt");
const published = document.querySelector("#published");

const submitBtn = document.querySelector("#submit-button");
const cancelBtn = document.querySelector("#cancel-button");

const tableBody = document.querySelector("#course-table-body");
const message = document.querySelector("#message");

const csrfToken = document.querySelector('meta[name="_csrf"]').content;
const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;

async function loadCategories() {
	const response = await fetch(CATEGORY_API);
	
	if(!response.ok) {
		throw new Error("Categories could not be loaded");
	}
	
	const categories = await response.json();
	categoryInput.innerHTML = `<option value="">
									Select Category
							  </option>`;
	for (let cat of categories) {
		const option = document.createElement("option");
		option.value = cat.id;
		option.textContent = cat.categoryName;
		categoryInput.appendChild(option);
	}
}

async function loadCourses() {
	try {
		const response = await fetch(COURSE_API);
		const coursesData = await response.json();
		
		if(!response.ok) {
			throw new Error("Courses could not be loaded");
		}
		renderCourses(coursesData);
	} catch(error) {
		console.log(error.message);
	}
}

function renderCourses(courses) {
	if (courses.length === 0) {
	    const newRow = document.createElement("tr");
	    const messageField = document.createElement("td");
	    messageField.textContent = "No courses available";
	    newRow.appendChild(messageField);
	    tableBody.appendChild(newRow);
	  }
	  
	tableBody.innerHTML = "";
	
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

		    const publishField = document.createElement("td");
		    publishField.textContent = course.published;

		    const createdField = document.createElement("td");
		    createdField.textContent = course.createdAt;

		    newRow.appendChild(idField);
		    newRow.appendChild(titleField);
		    newRow.appendChild(descField);
			newRow.appendChild(categoryField);
		    newRow.appendChild(createdField);
			newRow.appendChild(publishField);

		    const actionFeild = document.createElement("td");
		    actionFeild.className = 'action-buttons';

		    const editButton = document.createElement("button");
		    editButton.textContent = "Edit";
		    editButton.className = "button";
		    editButton.classList.add("edit-button");
		    editButton.dataset.id = course.id;

		    const deleteButton = document.createElement("button");
		    deleteButton.textContent = "Delete";
		    deleteButton.className = "delete-button";
		    deleteButton.classList.add("button");
		    deleteButton.dataset.id = course.id;

		    actionFeild.appendChild(editButton);
		    actionFeild.appendChild(deleteButton);
		    newRow.appendChild(actionFeild);
		    editButton.addEventListener("click", () => {
				handleEdit(course);
			});
		    deleteButton.addEventListener('click', () => {
				deleteCourse(course.id)
			});

		    tableBody.appendChild(newRow);
		  }
		  resetForm();
}

form.addEventListener('submit', handleSubmit);

cancelBtn.addEventListener("click", resetForm);

async function handleSubmit(e) {
	e.preventDefault();
	
	const id = courseIdInput.value;
	const course = {
		title : titleInput.value.trim(),
		description : descriptionInput.value.trim(),
		category_id : categoryInput.value,
		published : published.checked
	};
	
	if (course.title === "") {
		showMessage("Title required");
		return;
	}
	
	const isEditing = id !== "";
	const url = isEditing ? `${COURSE_API}/${id}` : COURSE_API;
	
	const method = isEditing ? "PUT": "POST";
	
	try {
		const response = await fetch(url, {
			method : method,
			headers : {
				"Content-Type": "application/json",
				[csrfHeader]: csrfToken
			},
			body : JSON.stringify(course)
		});
		
		if(!response.ok) {
			throw new Error("Request failed");
		}
		
		if(isEditing) {
			showMessage("Course updated");
		}
		else {
			showMessage("Course created");
		}
		
		resetForm();
		await loadCourses();
	} catch (error) {
		console.error(error);
	}
}

async function deleteCourse(id) {
	const confirmed = confirm("Are you sure to delete this course?");
	if(!confirmed) {
		return;
	}
	
	try {
		const response = await fetch(`${COURSE_API}/${id}`,{
			method : "DELETE",
			headers : {
				[csrfHeader]: csrfToken
			}
		 	});
		
		if(!response.ok) {
			throw new Error("Delete Failed");
		}
		
		
		showMessage("Course deleted");
				
		resetForm();
				
		await loadCourses();
		} catch(error) {
				console.error(error);
				showMessage("Book could not be deleted");
		}
}


function formatDateTime(value) {
	if (!value) return '';
	if (Array.isArray(value)) {
		const [y, m, d, h = 0, min = 0] = value;
		return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}T${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
	}
	return String(value).slice(0, 16);
}

function handleEdit(course) {
	courseIdInput.value = course.id;
	titleInput.value = course.title;
	descriptionInput.value = course.description;
	categoryInput.value = course.category_id;
	published.checked = course.published;
	createdAt.value = formatDateTime(course.createdAt);
	
	submitBtn.textContent = "Update course";
}

function resetForm() {
	form.reset();
	titleInput.value = "";
    published.checked = false;
	submitBtn.textContent = "Add course";
}

function showMessage(text) {
    message.textContent = text;
    message.hidden = false;
    setTimeout(() => {
        message.hidden = true;
    }, 3000)
}
	

loadCategories();
loadCourses();