const openSettingsButton = document.getElementById('openSettingsButton')

openSettingsButton?.addEventListener('click', () => {
  browser.runtime.openOptionsPage()
})
