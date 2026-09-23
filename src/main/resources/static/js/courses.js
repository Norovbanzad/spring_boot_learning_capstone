let esc = function (value) {
	if (value === null || value === undefined) return 'N/A';
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
};

function courseCard(course) {
	let badgeClass = course.published ? 'badge-published' : 'badge-draft';
	let badgeText = course.published ? 'Published' : 'Draft';
	let description = (course.description !== null && course.description !== undefined) ? esc(course.description) : 'No description provided.';

	return '' +
		'<div class="course-card">' +
			'<div class="card-header">' +
				'<span class="badge ' + badgeClass + '">' + badgeText + '</span>' +
				'<span class="course-id">#' + esc(course.id) + '</span>' +
			'</div>' +
			'<h2 class="course-title">' + esc(course.title) + '</h2>' +
			'<p class="course-summary">' + description + '</p>' +
			'<a class="more-button" href="/admin/courses/' + encodeURIComponent(course.id) + '/lessons">More</a>' +
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