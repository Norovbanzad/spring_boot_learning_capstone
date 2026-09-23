"use strict";

const CATEGORY_API = "/api/categories";

const form = document.querySelector("#course-form");

const categoryIdInput = document.querySelector("#course-id");
const nameInput = document.querySelector("#course-title");
const descriptionInput = document.querySelector("#course-description");

const submitBtn = document.querySelector("#submit-button");
const cancelBtn = document.querySelector("#cancel-button");

const tableBody = document.querySelector("#category-table-body");
const message = document.querySelector("#message");

const csrfToken = document.querySelector('meta[name="_csrf"]').content;
const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;


async function loadCategories() {
	try {
		const response = await fetch(CATEGORY_API);
		const categoriesData = await response.json();
		
		if(!response.ok) {
			throw new Error("Categories could not be loaded");
		}
		renderCategories(categoriesData);
	} catch(error) {
		console.log(error.message);
	}
}

function renderCategories(categories) {
	if (categories.length === 0) {
	    const newRow = document.createElement("tr");
	    const messageField = document.createElement("td");
	    messageField.textContent = "No categories available";
	    newRow.appendChild(messageField);
	    tableBody.appendChild(newRow);
	  }
	  
	tableBody.innerHTML = "";
	
	for (let cat of categories) {
		const newRow = document.createElement("tr");
		    const idField = document.createElement("td");
		    idField.textContent = cat.id;

		    const nameField = document.createElement("td");
		    nameField.textContent = cat.categoryName;
			
		    const descField = document.createElement("td");
		    descField.textContent = cat.description;

		    newRow.appendChild(idField);
		    newRow.appendChild(nameField);
		    newRow.appendChild(descField);
		

		    const actionFeild = document.createElement("td");
		    actionFeild.className = 'action-buttons';

		    const editButton = document.createElement("button");
		    editButton.textContent = "Edit";
		    editButton.className = "button";
		    editButton.classList.add("edit-button");
		    editButton.dataset.id = cat.id;

		    const deleteButton = document.createElement("button");
		    deleteButton.textContent = "Delete";
		    deleteButton.className = "delete-button";
		    deleteButton.classList.add("button");
		    deleteButton.dataset.id = cat.id;

		    actionFeild.appendChild(editButton);
		    actionFeild.appendChild(deleteButton);
		    newRow.appendChild(actionFeild);
		    editButton.addEventListener("click", () => {
				handleEdit(cat);
			});
		    deleteButton.addEventListener('click', () => {
				deleteCourse(cat.id)
			});

		    tableBody.appendChild(newRow);
		  }
		  resetForm();
}

form.addEventListener('submit', handleSubmit);

cancelBtn.addEventListener("click", resetForm);

async function handleSubmit(e) {
	e.preventDefault();
	
	const id = categoryIdInput.value;
	const category = {
		categoryName : nameInput.value.trim(),
		description : descriptionInput.value.trim(),
	};
	
	if (category.categoryName === "") {
		showMessage("Name required");
		return;
	}
	
	const isEditing = id !== "";
	const url = isEditing ? `${CATEGORY_API}/${id}` : CATEGORY_API;
	
	const method = isEditing ? "PUT": "POST";
	
	try {
		const response = await fetch(url, {
			method : method,
			headers : {
				"Content-Type": "application/json",
				[csrfHeader]: csrfToken
			},
			body : JSON.stringify(category)
		});
		
		if(!response.ok) {
			throw new Error("Request failed");
		}
		
		if(isEditing) {
			showMessage("Category updated");
		}
		else {
			showMessage("Category created");
		}
		
		resetForm();
		await loadCategories();
	} catch (error) {
		console.error(error);
	}
}

async function deleteCourse(id) {
	const confirmed = confirm("Are you sure to delete this category?");
	if(!confirmed) {
		return;
	}
	
	try {
		const response = await fetch(`${CATEGORY_API}/${id}`,{
			method : "DELETE",
			headers : {
				[csrfHeader]: csrfToken
			}
		 	});
		
		if(!response.ok) {
			throw new Error("Delete Failed");
		}
		
		
		showMessage("Category deleted");
				
		resetForm();
				
		await loadCategories();
		} catch(error) {
				console.error(error);
				showMessage("Category could not be deleted");
		}
}

function handleEdit(category) {
	categoryIdInput.value = category.id;
	nameInput.value = category.categoryName;
	descriptionInput.value = category.description;
	submitBtn.textContent = "Update category";
}

function resetForm() {
	form.reset();
	nameInput.value = "";
	descriptionInput.value = "";
	submitBtn.textContent = "Add category";
}

function showMessage(text) {
    message.textContent = text;
    message.hidden = false;
    setTimeout(() => {
        message.hidden = true;
    }, 3000)
}
	

loadCategories();