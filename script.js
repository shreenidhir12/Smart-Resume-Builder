function addProject() {
    const container = document.getElementById('projectsContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-item project-item';
    div.innerHTML = `
        <div class="form-grid two-col">
            <div class="form-group">
                <label>Project Name</label>
                <input type="text" class="projectName" placeholder="Project Title">
            </div>
            <div class="form-group">
                <label>Technologies Used</label>
                <input type="text" class="techStack" placeholder="HTML, CSS, JavaScript">
            </div>
            <div class="form-group">
                <label>GitHub Link</label>
                <input type="url" class="projectGithub" placeholder="github.com/you/project">
            </div>
            <div class="form-group">
                <label>Live Link</label>
                <input type="url" class="projectLive" placeholder="yourproject.github.io">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="projectDesc" rows="2" placeholder="Built X using Y which resulted in Z..."></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(this)">Remove</button>
    `;
    container.appendChild(div);
}

function addExperience() {
    const container = document.getElementById('experienceContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-item experience-item';
    div.innerHTML = `
        <div class="form-grid two-col">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="jobTitle" placeholder="Software Developer Intern">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="company" placeholder="Company Name">
            </div>
            <div class="form-group">
                <label>Start Date</label>
                <input type="month" class="startDate">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="month" class="endDate">
            </div>
        </div>
        <div class="form-group">
            <label>Responsibilities (one per line)</label>
            <textarea class="responsibilities" rows="3" placeholder="Built REST APIs that reduced response time by 30%..."></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(this)">Remove</button>
    `;
    container.appendChild(div);
}

function addEducation() {
    const container = document.getElementById('educationContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-item education-item';
    div.innerHTML = `
        <div class="form-grid two-col">
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="degree" placeholder="B.Tech in Computer Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="institution" placeholder="University / College Name">
            </div>
            <div class="form-group">
                <label>Year of Passing</label>
                <input type="number" class="year" placeholder="2026">
            </div>
            <div class="form-group">
                <label>CGPA / Percentage</label>
                <input type="text" class="percentage" placeholder="8.5 CGPA">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeItem(this)">Remove</button>
    `;
    container.appendChild(div);
}

function removeItem(btn) {
    btn.closest('.dynamic-item').remove();
}

function validateForm() {
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!name) { alert('Please enter your full name.'); return false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email.'); return false; }
    if (!phone || !/^\d{10}$/.test(phone)) { alert('Please enter a valid 10-digit phone number.'); return false; }
    return true;
}

function collectFormData() {
    const personalInfo = {
        fullName: document.getElementById('fullName').value.trim(),
        email:    document.getElementById('email').value.trim(),
        phone:    document.getElementById('phone').value.trim(),
        address:  document.getElementById('address').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        github:   document.getElementById('github').value.trim(),
        summary:  document.getElementById('summary').value.trim()
    };

    const skills = {
        languages:  document.getElementById('skillLanguages').value.trim(),
        frameworks: document.getElementById('skillFrameworks').value.trim(),
        tools:      document.getElementById('skillTools').value.trim(),
        other:      document.getElementById('skillOther').value.trim()
    };

    const projects = [];
    document.querySelectorAll('.project-item').forEach(item => {
        projects.push({
            name:         item.querySelector('.projectName').value.trim(),
            technologies: item.querySelector('.techStack').value.trim(),
            github:       item.querySelector('.projectGithub').value.trim(),
            live:         item.querySelector('.projectLive').value.trim(),
            description:  item.querySelector('.projectDesc').value.trim()
        });
    });

    const experiences = [];
    document.querySelectorAll('.experience-item').forEach(item => {
        experiences.push({
            jobTitle:         item.querySelector('.jobTitle').value.trim(),
            company:          item.querySelector('.company').value.trim(),
            startDate:        item.querySelector('.startDate').value,
            endDate:          item.querySelector('.endDate').value,
            responsibilities: item.querySelector('.responsibilities').value.trim()
        });
    });

    const education = [];
    document.querySelectorAll('.education-item').forEach(item => {
        education.push({
            degree:      item.querySelector('.degree').value.trim(),
            institution: item.querySelector('.institution').value.trim(),
            year:        item.querySelector('.year').value.trim(),
            percentage:  item.querySelector('.percentage').value.trim()
        });
    });

    const certifications = document.getElementById('certifications').value.trim();
    return { personalInfo, skills, projects, experiences, education, certifications };
}

document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        localStorage.setItem('resumeData', JSON.stringify(collectFormData()));
        window.location.href = 'preview.html';
    }
});

function resetForm() {
    if (!confirm('Reset all fields?')) return;
    document.getElementById('resumeForm').reset();
    ['experienceContainer','educationContainer','projectsContainer'].forEach(id => {
        const c = document.getElementById(id);
        while (c.children.length > 1) c.removeChild(c.lastChild);
        c.querySelectorAll('input, textarea').forEach(el => el.value = '');
    });
}