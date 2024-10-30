import { darkThemeColors, lightThemeColors } from './constants.js'

// Function to generate a random color
function getRandomColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const getCurrentColors = async (windowId: number) => {
  const currentTheme = await browser.theme.getCurrent(windowId)

  if (currentTheme.colors) {
    return currentTheme.colors
  }

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  return isDarkMode ? darkThemeColors : lightThemeColors
}

// Function to update tab color
const updateTabColor = async () => {
  const color = getRandomColor()
  const windowId = browser.windows.WINDOW_ID_CURRENT

  const currentColors = await getCurrentColors(windowId)

  browser.theme.update(windowId, {
    colors: {
      ...currentColors,
      tab_selected: color
    }
  })
}

// Initialize: apply a color to current tab when the extension loads
updateTabColor()

// Update the color when the active tab changes
browser.tabs.onActivated.addListener(updateTabColor)
