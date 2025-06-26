(async function () {
  const username = localStorage.getItem("username");
  const passwordHash = localStorage.getItem("passwordHash");

  if (!username || !passwordHash) {
    window.location.href = "index.html";
    return;
  }

  const response = await fetch("https://verdant-lebkuchen-c33346.netlify.app/.netlify/functions/check-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, passwordHash })
  });

  const result = await response.json();

  if (!result.success) {
    localStorage.removeItem("username");
    localStorage.removeItem("passwordHash");
    window.location.href = "index.html";
  }
})();
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable dragging of any images or links
  document.addEventListener('dragstart', e => e.preventDefault());

  // Disable text/image selection
  document.addEventListener('selectstart', e => e.preventDefault());

  // Disable Ctrl+S, Ctrl+P, Ctrl+U
  document.addEventListener('keydown', function(e) {
    if (
      (e.ctrlKey && ['s', 'p', 'u'].includes(e.key.toLowerCase())) || 
      (e.key === 'F12') // Block dev tools
    ) {
      e.preventDefault();
    }
  });
  // === Toggle Main Folder ===
  document.getElementById("arrow-unit1").addEventListener("click", () => {
    const folder = document.getElementById("folder-unit1");
    folder.classList.toggle("open");

    const notes = document.getElementById("subfolder-unit1-notes");
    const assigns = document.getElementById("subfolder-unit1-assignments");

    const visible = folder.classList.contains("open");
    notes.style.display = visible ? "flex" : "none";
    assigns.style.display = visible ? "flex" : "none";

    // Hide any open subfiles
    document.getElementById("files-unit1-notes").classList.remove("open");
    document.getElementById("subfolder-unit1-notes").classList.remove("open");
    document.getElementById("files-unit1-assignments").classList.remove("open");
    document.getElementById("subfolder-unit1-assignments").classList.remove("open");
  });

  // === Toggle Subfolder: Notes ===
  document.getElementById("arrow-unit1-notes").addEventListener("click", (e) => {
    e.stopPropagation();
    const sub = document.getElementById("subfolder-unit1-notes");
    const files = document.getElementById("files-unit1-notes");

    sub.classList.toggle("open");
    files.classList.toggle("open");
  });

  // === Toggle Subfolder: Assignments ===
  document.getElementById("arrow-unit1-assignments").addEventListener("click", (e) => {
    e.stopPropagation();
    const sub = document.getElementById("subfolder-unit1-assignments");
    const files = document.getElementById("files-unit1-assignments");

    sub.classList.toggle("open");
    files.classList.toggle("open");
  });

  // === File Viewer ===
  document.querySelectorAll('.subfile-item').forEach(file => {
    file.addEventListener('click', () => {
      const type = file.getAttribute('data-type');
      const src = file.getAttribute('data-src');
      const viewer = document.getElementById('viewer');

      if (type === 'pdf') {
        viewer.innerHTML = `<iframe src="${src}" frameborder="0"></iframe>`;
      } else if (type === 'image') {
        viewer.innerHTML = `<img src="${src}" alt="File preview" />`;
      } else {
        viewer.innerHTML = `<p>Unsupported file type.</p>`;
      }
    });
  });
