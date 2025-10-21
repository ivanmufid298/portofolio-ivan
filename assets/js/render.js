document.addEventListener("DOMContentLoaded", function () {
    const D = window.APP_DATA;
  
    // ===== HERO =====
    const heroName = document.querySelector("#hero .hero-container h1");
    const heroTyped = document.querySelector("#hero .hero-container .typed");
    const heroCV = document.querySelector("#hero .hero-container a.btn.btn-primary");
    if (heroName) heroName.textContent = D.title.heroName;
    if (heroTyped) heroTyped.setAttribute("data-typed-items", D.title.heroTyped.join(", "));
    if (heroCV) heroCV.href = D.links.cv;
  
    // ===== ABOUT =====
    const aboutHeading = document.querySelector("#about h3");
    const aboutIntro = document.querySelector("#about .content p.fst-italic");
    if (aboutHeading) aboutHeading.textContent = D.title.aboutHeading;
    if (aboutIntro) aboutIntro.textContent = D.about.intro;
  
    const lists = document.querySelectorAll("#about .row .col-lg-6 ul");
    const leftList = lists[0];
    const rightList = lists[1];
    const renderBiodata = (ul, items) => {
      if (!ul) return;
      ul.innerHTML = items
        .map(
          (i) =>
            `<li><i class="bi bi-chevron-right"></i> <strong>${i.label}:</strong> <span>${i.value}</span></li>`
        )
        .join("");
    };
    renderBiodata(leftList, D.about.biodataLeft);
    renderBiodata(rightList, D.about.biodataRight);
  
    // ===== SUMMARY =====
    const summaryTitle = document.querySelector("#resume .section-title h2");
    const summaryText = document.querySelector("#resume .section-title p");
    if (summaryTitle) summaryTitle.textContent = D.title.summaryHeading;
    if (summaryText) summaryText.textContent = D.summary;
  
    // ===== SKILLS =====
    const skillsSectionTitle = document.querySelector("#skills .section-title h2");
    if (skillsSectionTitle) skillsSectionTitle.textContent = D.title.skillsHeading;
  
    let skillsGrid = document.querySelector("#skills .skills-grid");
    if (!skillsGrid) {
      const wrapper = document.querySelector("#skills .container");
      skillsGrid = document.createElement("div");
      skillsGrid.className = "skills-grid";
      skillsGrid.setAttribute("data-aos", "fade-up");
      const old = document.querySelector("#skills .row.skills-content");
      if (old) old.remove();
      wrapper.appendChild(skillsGrid);
    }
    skillsGrid.innerHTML = D.skills
      .map(
        (s) => `
        <div class="progress">
          <span class="skill">${s.name} <i class="val">${s.value}%</i></span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" role="progressbar" aria-valuenow="${s.value}" aria-valuemin="0" aria-valuemax="100" style="width:${s.value}%"></div>
          </div>
        </div>`
      )
      .join("");
  
    // ===== EXPERIENCE + EDUCATION (kolom kiri) =====
    const leftCol = document.querySelector('#resume .row > .col-lg-6[data-aos="fade-up"]');
    if (leftCol) {
      // hapus semua item lama & title education lama (jika ada)
      leftCol.querySelectorAll(".resume-item").forEach((el) => el.remove());
      leftCol.querySelectorAll("h3.resume-title").forEach((el, idx) => {
        if (idx > 0) el.remove();
      });
  
      const expTitle = document.createElement("h3");
      expTitle.className = "resume-title";
      expTitle.textContent = D.title.experienceHeading;
      // jika sudah ada, replace teksnya saja
      const existingTitle = leftCol.querySelector("h3.resume-title");
      if (existingTitle) existingTitle.textContent = D.title.experienceHeading;
      else leftCol.prepend(expTitle);
  
      D.experience.forEach((exp) => {
        const div = document.createElement("div");
        div.className = "resume-item";
        div.innerHTML = `
          <h4>${exp.role}</h4>
          <h5>${exp.period}</h5>
          <p><em>${exp.company}</em></p>
          <ul>${exp.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
        `;
        leftCol.appendChild(div);
      });
  
      const eduTitle = document.createElement("h3");
      eduTitle.className = "resume-title";
      eduTitle.textContent = D.title.educationHeading;
      leftCol.appendChild(eduTitle);
  
      D.education.forEach((edu) => {
        const div = document.createElement("div");
        div.className = "resume-item";
        div.innerHTML = `
          <h4>${edu.degree}</h4>
          <h5>${edu.period}</h5>
          <p><em>${edu.school}</em></p>
          ${
            edu.bullets
              ? `<ul>${edu.bullets.map((x) => `<li>${x}</li>`).join("")}</ul>`
              : `<p>${edu.desc || ""}</p>`
          }
        `;
        leftCol.appendChild(div);
      });
    }
  
    // ===== CERTIFICATES (kolom kanan) =====
    const rightCol = document.querySelector('#resume .row > .col-lg-6[data-aos-delay="100"]');
    if (rightCol) {
      const certTitle = rightCol.querySelector("h3.resume-title");
      if (certTitle) certTitle.textContent = D.title.certificatesHeading;
  
      rightCol.querySelectorAll(".resume-item").forEach((el) => el.remove());
      D.certificates.forEach((c) => {
        const div = document.createElement("div");
        div.className = "resume-item";
        div.innerHTML = `
          <h4>${c.title}</h4>
          <h5>${c.period}</h5>
          <p><em>${c.org}</em></p>
          ${c.link ? `<a href="${c.link}" target="_blank" rel="noopener">Download</a>` : ""}
        `;
        rightCol.appendChild(div);
      });
    }
  });
  