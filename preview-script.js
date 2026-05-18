function esc(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatDate(monthStr) {
    if (!monthStr) return 'Present';
    const [year, month] = monthStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(month,10)-1]} ${year}`;
}

function formatLink(url, label) {
    if (!url) return '';
    return `<a href="${esc(url)}" target="_blank">${esc(label)}</a>`;
}

function formatDesc(text) {
    if (!text) return '';
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 1) return `<p class="r-entry-desc">${esc(lines[0])}</p>`;
    return `<ul class="r-entry-desc">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>`;
}

function buildResume(data) {
    const { personalInfo: p, skills, projects, experiences, education, certifications } = data;
    let html = '';

    const contactParts = [];
    if (p.phone)    contactParts.push(esc(p.phone));
    if (p.email)    contactParts.push(`<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>`);
    if (p.address)  contactParts.push(esc(p.address));
    if (p.linkedin) contactParts.push(formatLink(p.linkedin, 'LinkedIn'));
    if (p.github)   contactParts.push(formatLink(p.github, 'GitHub'));

    html += `
        <div class="r-header">
            <div class="r-name">${esc(p.fullName || 'Your Name')}</div>
            <div class="r-contact">${contactParts.join('<span class="sep"> | </span>')}</div>
        </div>`;

    if (p.summary) {
        html += `<div class="r-section">
            <div class="r-section-title">Summary</div>
            <div class="r-summary">${esc(p.summary)}</div>
        </div>`;
    }

    const skillRows = [
        { label: 'Languages',  val: skills.languages },
        { label: 'Frameworks', val: skills.frameworks },
        { label: 'Tools',      val: skills.tools },
        { label: 'Other',      val: skills.other }
    ].filter(r => r.val);

    if (skillRows.length) {
        html += `<div class="r-section">
            <div class="r-section-title">Skills</div>
            <div class="r-skills-table">
                ${skillRows.map(r => `<span class="r-skill-label">${esc(r.label)}</span><span class="r-skill-value">${esc(r.val)}</span>`).join('')}
            </div>
        </div>`;
    }

    const validProjects = (projects || []).filter(pr => pr.name);
    if (validProjects.length) {
        html += `<div class="r-section"><div class="r-section-title">Projects</div>`;
        validProjects.forEach(pr => {
            const links = [
                pr.github ? formatLink(pr.github, 'GitHub') : '',
                pr.live   ? formatLink(pr.live, 'Live') : ''
            ].filter(Boolean).join(' &nbsp;·&nbsp; ');
            html += `<div class="r-entry">
                <div class="r-entry-header">
                    <span class="r-entry-title">${esc(pr.name)}</span>
                    ${links ? `<span class="r-entry-links">${links}</span>` : ''}
                </div>
                ${pr.technologies ? `<div class="r-entry-meta">${esc(pr.technologies)}</div>` : ''}
                ${formatDesc(pr.description)}
            </div>`;
        });
        html += `</div>`;
    }

    const validExp = (experiences || []).filter(e => e.jobTitle || e.company);
    if (validExp.length) {
        html += `<div class="r-section"><div class="r-section-title">Work Experience</div>`;
        validExp.forEach(exp => {
            html += `<div class="r-entry">
                <div class="r-entry-header">
                    <span class="r-entry-title">${esc(exp.jobTitle || 'Role')}</span>
                    <span class="r-entry-links">${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}</span>
                </div>
                <div class="r-entry-sub">${esc(exp.company || '')}</div>
                ${formatDesc(exp.responsibilities)}
            </div>`;
        });
        html += `</div>`;
    }

    const validEdu = (education || []).filter(e => e.degree || e.institution);
    if (validEdu.length) {
        html += `<div class="r-section"><div class="r-section-title">Education</div>`;
        validEdu.forEach(edu => {
            html += `<div class="r-entry">
                <div class="r-entry-header">
                    <span class="r-entry-title">${esc(edu.degree || 'Degree')}</span>
                    ${edu.year ? `<span class="r-entry-links">${esc(edu.year)}</span>` : ''}
                </div>
                <div class="r-entry-sub">${esc(edu.institution || '')}</div>
                ${edu.percentage ? `<div class="r-entry-meta">${esc(edu.percentage)}</div>` : ''}
            </div>`;
        });
        html += `</div>`;
    }

    if (certifications) {
        const certs = certifications.split('\n').map(c => c.trim()).filter(Boolean);
        if (certs.length) {
            html += `<div class="r-section">
                <div class="r-section-title">Certifications</div>
                <ul class="r-cert-list">${certs.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
            </div>`;
        }
    }

    return html;
}

function loadResume() {
    const saved = localStorage.getItem('resumeData');
    const el = document.getElementById('resumePreview');
    if (!saved) {
        el.innerHTML = '<p style="text-align:center;color:#888;padding:40px;">No data found. <a href="index.html">Go back.</a></p>';
        return;
    }
    el.innerHTML = buildResume(JSON.parse(saved));
}

function goBack() { window.location.href = 'index.html'; }

function downloadHTML() {
    const content = document.getElementById('resumePreview').innerHTML;
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Resume</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'IBM Plex Sans',sans-serif;padding:40px;max-width:780px;margin:0 auto;color:#1a1a1a;font-size:13.5px;line-height:1.55}.r-header{border-bottom:2px solid #0a0a0a;padding-bottom:14px;margin-bottom:20px}.r-name{font-size:26px;font-weight:600;letter-spacing:-0.5px;margin-bottom:6px}.r-contact{display:flex;flex-wrap:wrap;gap:4px 20px;font-size:12.5px;color:#444}.r-contact a{color:#444;text-decoration:none}.r-section{margin-bottom:18px}.r-section-title{font-size:11px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;border-bottom:1px solid #0a0a0a;padding-bottom:4px;margin-bottom:12px}.r-summary{font-size:13.5px;line-height:1.6}.r-skills-table{display:grid;grid-template-columns:120px 1fr;gap:5px 16px;font-size:13px}.r-skill-label{font-weight:500;color:#444;font-size:12.5px}.r-entry{margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #e8e8e8}.r-entry:last-child{border-bottom:none}.r-entry-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px}.r-entry-title{font-weight:600;font-size:14px}.r-entry-links{font-size:11.5px;color:#777;display:flex;gap:12px;flex-shrink:0;margin-left:12px}.r-entry-links a{color:#777;text-decoration:none}.r-entry-sub{font-size:13px;color:#444;font-weight:500;margin-bottom:2px}.r-entry-meta{font-size:12px;color:#777;margin-bottom:5px;font-family:'IBM Plex Mono',monospace}.r-entry-desc{font-size:13px;line-height:1.6}.r-entry-desc ul{padding-left:16px}.r-entry-desc li{margin-bottom:3px}.r-cert-list{list-style:none;font-size:13px}.r-cert-list li{padding:3px 0;border-bottom:1px solid #e8e8e8}.sep{color:#ccc}</style>
</head><body>${content}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'resume.html';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
}

window.onload = loadResume;