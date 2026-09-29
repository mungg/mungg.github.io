(() => {
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
