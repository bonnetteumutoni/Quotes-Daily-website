    function renderReflections() {
      const reflectionsList = document.getElementById('reflections-list');
      const noRefMsg = document.getElementById('no-reflections-msg');
      let reflections = JSON.parse(localStorage.getItem('reflections')) || [];
      reflectionsList.innerHTML = '';

      if (reflections.length === 0) {
        noRefMsg.style.display = 'block';
        return;
      } else {
        noRefMsg.style.display = 'none';
      }

      reflections.forEach((reflection, index) => {
        const li = document.createElement('li');
        li.className = 'reflection-item';
        const date = new Date(reflection.date).toLocaleString();
        li.innerHTML = `
          <p>${reflection.text}</p>
          <small>Saved on: ${date}</small>
          <button class="btn-remove" data-index="${index}">Remove</button>
        `;
        reflectionsList.appendChild(li);
      });

      document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', e => {
          const idx = e.target.getAttribute('data-index');
          reflections.splice(idx, 1);
          localStorage.setItem('reflections', JSON.stringify(reflections));
          renderReflections();
        });
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderReflections();
    });
