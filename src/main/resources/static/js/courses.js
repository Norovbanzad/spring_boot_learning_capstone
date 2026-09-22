function toggleDetails(button) {
	let card = button.closest('.course-card');
	let isOpen = card.classList.toggle('open');
	button.textContent = isOpen ? 'Less' : 'More';
}

let esc = function (value) {
	if (value === null || value === undefined) return 'N/A';
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
};

function formatDate(iso) {
	if (!iso) return 'N/A';
	if (Array.isArray(iso)) {
		let y = iso[0], m = iso[1], d = iso[2], h = iso[3] || 0, min = iso[4] || 0;
		return y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0') +
			' ' + String(h).padStart(2, '0') + ':' + String(min).padStart(2, '0');
	}
	let date = new Date(iso);
	if (isNaN(date.getTime())) return 'N/A';
	return date.toLocaleString(undefined, {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

function courseCard(course) {
	let badgeClass = course.published ? 'badge-published' : 'badge-draft';
	let badgeText = course.published ? 'Published' : 'Draft';
	let category = (course.categoryName !== null && course.categoryName !== undefined) ? esc(course.categoryName) : 'N/A';
	let description = (course.description !== null && course.description !== undefined) ? esc(course.description) : 'No description provided.';

	return '' +
		'<div class="course-card">' +
			'<div class="card-header">' +
				'<span class="badge ' + badgeClass + '">' + badgeText + '</span>' +
				'<span class="course-id">#' + esc(course.id) + '</span>' +
			'</div>' +
			'<h2 class="course-title">' + esc(course.title) + '</h2>' +
			'<p class="course-summary">' + description + '</p>' +
			'<button type="button" class="more-button" onclick="toggleDetails(this)">More</button>' +
			'<div class="course-details">' +
				'<dl>' +
					'<dt>Title</dt><dd>' + esc(course.title) + '</dd>' +
					'<dt>Description</dt><dd>' + description + '</dd>' +
					'<dt>Category</dt><dd>' + category + '</dd>' +
					'<dt>Status</dt><dd>' + badgeText + '</dd>' +
					'<dt>Created At</dt><dd>' + formatDate(course.createdAt) + '</dd>' +
				'</dl>' +
			'</div>' +
		'</div>';
}

async function loadCourses() {
	let grid = document.getElementById('course-grid');
	let empty = document.getElementById('empty-state');
	try {
		let response = await fetch('/api/courses');
		if (!response.ok) throw new Error('Failed to load courses');
		let courses = await response.json();
		if (!courses || courses.length === 0) {
			grid.hidden = true;
			empty.hidden = false;
			return;
		}
		grid.innerHTML = courses.map(courseCard).join('');
	} catch (error) {
		grid.hidden = true;
		empty.hidden = false;
		empty.textContent = 'Failed to load courses. Please try again later.';
	}
}

loadCourses();