// Add Experience Function
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const experienceDiv = document.createElement('div');
    experienceDiv.className = 'experience-item';
    experienceDiv.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="jobTitle" placeholder="e.g., Software Developer">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" class="company" placeholder="Company Name">
        </div>
        <div class="form-row">
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
            <label>Responsibilities</label>
            <textarea class="responsibilities" rows="3" placeholder="Describe your responsibilities..."></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeExperience(this)">Remove</button>
    `;
    container.appendChild(experienceDiv);
}

function removeExperience(button) {
    button.parentElement.remove();
}

// Add Education Function
function addEducation() {
    const container = document.getElementById('educationContainer');
    const educationDiv = document.createElement('div');
    educationDiv.className = 'education-item';
    educationDiv.innerHTML = `
        <div class="form-group">
            <label>Degree</label>
            <input type="text" class="degree" placeholder="e.g., B.Tech in CS">
        </div>
        <div class="form-group">
            <label>Institution</label>
            <input type="text" class="institution" placeholder="University/College Name">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Year of Passing</label>
                <input type="number" class="year" placeholder="2024">
            </div>
            <div class="form-group">
                <label>Percentage/CGPA</label>
                <input type="text" class="percentage" placeholder="8.5 CGPA">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeEducation(this)">Remove</button>
    `;
    container.appendChild(educationDiv);
}

function removeEducation(button) {
    button.parentElement.remove();
}

// Add Project Function
function addProject() {
    const container = document.getElementById('projectsContainer');
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-item';
    projectDiv.innerHTML = `
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="projectName" placeholder="Project Title">
        </div>
        <div class="form-group">
            <label>Technologies Used</label>
            <input type="text" class="techStack" placeholder="HTML, CSS, JavaScript">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="projectDesc" rows="2" placeholder="Project description..."></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeProject(this)">Remove</button>
    `;
    container.appendChild(projectDiv);
}

function removeProject(button) {
    button.parentElement.remove();
}

// Form Validation
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!fullName) {
        alert('Please enter your full name');
        return false;
    }

    if (!email) {
        alert('Please enter your email');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!phone) {
        alert('Please enter your phone number');
        return false;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }

    return true;
}

// Collect all form data
function collectFormData() {
    // Personal Info
    const personalInfo = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        linkedin: document.getElementById('linkedin').value,
        summary: document.getElementById('summary').value
    };

    // Experience
    const experiences = [];
    document.querySelectorAll('.experience-item').forEach(item => {
        experiences.push({
            jobTitle: item.querySelector('.jobTitle').value,
            company: item.querySelector('.company').value,
            startDate: item.querySelector('.startDate').value,
            endDate: item.querySelector('.endDate').value,
            responsibilities: item.querySelector('.responsibilities').value
        });
    });

    // Education
    const education = [];
    document.querySelectorAll('.education-item').forEach(item => {
        education.push({
            degree: item.querySelector('.degree').value,
            institution: item.querySelector('.institution').value,
            year: item.querySelector('.year').value,
            percentage: item.querySelector('.percentage').value
        });
    });

    // Skills
    const skills = {
        technical: document.getElementById('technicalSkills').value,
        soft: document.getElementById('softSkills').value
    };

    // Projects
    const projects = [];
    document.querySelectorAll('.project-item').forEach(item => {
        projects.push({
            name: item.querySelector('.projectName').value,
            technologies: item.querySelector('.techStack').value,
            description: item.querySelector('.projectDesc').value
        });
    });

    return { personalInfo, experiences, education, skills, projects };
}

// Save to Local Storage
function saveToLocalStorage(data) {
    localStorage.setItem('resumeData', JSON.stringify(data));
}

// Handle Form Submit
document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const resumeData = collectFormData();
        saveToLocalStorage(resumeData);
        
        // Redirect to preview page
        window.location.href = 'preview.html';
    }
});

// Reset Form
function resetForm() {
    if (confirm('Are you sure you want to reset all data?')) {
        document.getElementById('resumeForm').reset();
        
        // Clear dynamic fields
        const expContainer = document.getElementById('experienceContainer');
        const eduContainer = document.getElementById('educationContainer');
        const projContainer = document.getElementById('projectsContainer');
        
        // Keep only first item in each container
        while(expContainer.children.length > 1) expContainer.removeChild(expContainer.lastChild);
        while(eduContainer.children.length > 1) eduContainer.removeChild(eduContainer.lastChild);
        while(projContainer.children.length > 1) projContainer.removeChild(projContainer.lastChild);
        
        // Clear input values
        document.querySelectorAll('.experience-item input, .experience-item textarea').forEach(input => input.value = '');
        document.querySelectorAll('.education-item input').forEach(input => input.value = '');
        document.querySelectorAll('.project-item input, .project-item textarea').forEach(input => input.value = '');
    }
}