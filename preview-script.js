// Load and display resume data
function loadResume() {
    const savedData = localStorage.getItem('resumeData');
    
    if (!savedData) {
        document.getElementById('resumePreview').innerHTML = '<p style="text-align:center;">No resume data found. Please go back and create a resume.</p>';
        return;
    }
    
    const data = JSON.parse(savedData);
    displayResume(data);
}

function displayResume(data) {
    const { personalInfo, experiences, education, skills, projects } = data;
    
    let html = `
        <div class="resume-header">
            <h1>${personalInfo.fullName || 'Your Name'}</h1>
            <div class="contact-info">
                ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
                ${personalInfo.phone ? `<span>📞 ${personalInfo.phone}</span>` : ''}
                ${personalInfo.address ? `<span>📍 ${personalInfo.address}</span>` : ''}
                ${personalInfo.linkedin ? `<span>🔗 ${personalInfo.linkedin}</span>` : ''}
            </div>
        </div>
    `;
    
    // Professional Summary
    if (personalInfo.summary) {
        html += `
            <div class="section">
                <h2>Professional Summary</h2>
                <p>${personalInfo.summary}</p>
            </div>
        `;
    }
    
    // Work Experience
    const validExperiences = experiences.filter(exp => exp.jobTitle || exp.company);
    if (validExperiences.length > 0) {
        html += `<div class="section"><h2>Work Experience</h2>`;
        validExperiences.forEach(exp => {
            html += `
                <div class="experience-item">
                    <h3>${exp.jobTitle || 'Position'}</h3>
                    <div class="company">${exp.company || 'Company'}</div>
                    ${exp.startDate || exp.endDate ? `<div class="date">${exp.startDate || ''} - ${exp.endDate || 'Present'}</div>` : ''}
                    <p>${exp.responsibilities || ''}</p>
                </div>
            `;
        });
        html += `</div>`;
    }
    
    // Education
    const validEducation = education.filter(edu => edu.degree || edu.institution);
    if (validEducation.length > 0) {
        html += `<div class="section"><h2>Education</h2>`;
        validEducation.forEach(edu => {
            html += `
                <div class="education-item">
                    <h3>${edu.degree || 'Degree'}</h3>
                    <div class="institution">${edu.institution || 'Institution'}</div>
                    <div class="date">Year: ${edu.year || 'N/A'} | ${edu.percentage || 'Grade: N/A'}</div>
                </div>
            `;
        });
        html += `</div>`;
    }
    
    // Skills
    if (skills.technical || skills.soft) {
        html += `<div class="section"><h2>Skills</h2>`;
        
        if (skills.technical) {
            const techSkills = skills.technical.split(',').map(s => s.trim());
            html += `<div class="skills-list"><strong>Technical:</strong> `;
            techSkills.forEach(skill => {
                html += `<span class="skill-tag">${skill}</span>`;
            });
            html += `</div><br>`;
        }
        
        if (skills.soft) {
            const softSkills = skills.soft.split(',').map(s => s.trim());
            html += `<div class="skills-list"><strong>Soft Skills:</strong> `;
            softSkills.forEach(skill => {
                html += `<span class="skill-tag">${skill}</span>`;
            });
            html += `</div>`;
        }
        
        html += `</div>`;
    }
    
    // Projects
    const validProjects = projects.filter(proj => proj.name);
    if (validProjects.length > 0) {
        html += `<div class="section"><h2>Projects</h2>`;
        validProjects.forEach(proj => {
            html += `
                <div class="project-item">
                    <h3>${proj.name || 'Project Name'}</h3>
                    ${proj.technologies ? `<div class="company">Technologies: ${proj.technologies}</div>` : ''}
                    <p>${proj.description || ''}</p>
                </div>
            `;
        });
        html += `</div>`;
    }
    
    document.getElementById('resumePreview').innerHTML = html;
}

function goBack() {
    window.location.href = 'index.html';
}

function downloadHTML() {
    const resumeContent = document.getElementById('resumePreview').innerHTML;
    const styles = document.querySelector('link[href="preview-style.css"]')?.href;
    
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>My Resume</title>
            <link rel="stylesheet" href="preview-style.css">
            <style>
                body {
                    padding: 20px;
                }
                .preview-header {
                    display: none;
                }
            </style>
        </head>
        <body>
            <div class="resume-preview">
                ${resumeContent}
            </div>
        </body>
        </html>
    `;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Load resume when page loads
window.onload = loadResume;