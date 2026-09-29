(() => {
  const publications = document.querySelector('#publications');
  const toggle = publications?.querySelector('.publications-toggle');
  if (toggle) {
    const papers = Array.from(publications.querySelectorAll('.bibliography > li'));
    const heading = publications.querySelector('h2');
    let expanded = false;
    const updatePublications = () => {
      papers.slice(6).forEach(paper => { paper.hidden = !expanded; });
      heading.textContent = expanded ? 'Publications' : 'Selected publications';
      toggle.textContent = expanded ? 'Show selected publications' : `Show all publications (${papers.length})`;
      toggle.setAttribute('aria-expanded', String(expanded));
    };
    toggle.hidden = false;
    updatePublications();
    toggle.addEventListener('click', () => {
      expanded = !expanded;
      updatePublications();
      if (!expanded) heading.scrollIntoView({ block: 'start' });
    });
  }
  const viewport = document.querySelector('.news-window');
  const table = viewport?.querySelector('table');
  if (!table) return;

  const updateNewsHeight = () => {
    const visibleRows = Array.from(table.rows).slice(0, 3);
    if (!visibleRows.length) return;
    const first = visibleRows[0].getBoundingClientRect();
    const last = visibleRows[visibleRows.length - 1].getBoundingClientRect();
    viewport.style.setProperty('--news-preview-height', `${last.bottom - first.top}px`);
  };

  updateNewsHeight();
  new ResizeObserver(updateNewsHeight).observe(table);
  document.fonts.ready.then(updateNewsHeight);
})();
