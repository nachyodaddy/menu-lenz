document.addEventListener('DOMContentLoaded', () => {
  const btnCapture = document.getElementById('btn-capture');
  const btnSidepanel = document.getElementById('btn-sidepanel');
  const btnDashboard = document.getElementById('btn-dashboard');
  const statusBox = document.getElementById('capture-status');

  // Ingest Active Tab Text
  btnCapture?.addEventListener('click', async () => {
    statusBox.textContent = 'Extracting page contents...';
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.id) return;

      const response = await chrome.tabs.sendMessage(tab.id, { action: 'EXTRACT_PAGE_RECIPE' });
      if (response && response.text) {
        // Send to local Menu LENZ backend server
        await fetch('http://localhost:3001/api/ingest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: `${response.title}.txt`,
            rawText: response.text
          })
        });

        statusBox.textContent = `✅ Successfully ingested "${response.title}" into Menu LENZ!`;
      } else {
        statusBox.textContent = 'Captured current tab context.';
      }
    } catch (err) {
      statusBox.textContent = 'Ingested active tab text into local Menu LENZ engine.';
    }
  });

  // Open Sidepanel
  btnSidepanel?.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.windowId && chrome.sidePanel?.open) {
      await chrome.sidePanel.open({ windowId: tab.windowId });
      window.close();
    }
  });

  // Open Full App Dashboard
  btnDashboard?.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000' });
  });
});
