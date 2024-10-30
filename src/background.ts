import { colorOptions, darkThemeColors, lightThemeColors } from './constants.js'

const isDarkThemePreferred = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getRandomTabColor() {
  const colors = isDarkThemePreferred() ? colorOptions.dark : colorOptions.light
  const randomIndex = Math.floor(Math.random() * colors.length)

  return colors[randomIndex]
}

const getThemeColors = (theme: browser._manifest.ThemeType) => {
  if (theme.colors) {
    return theme.colors
  }

  return isDarkThemePreferred() ? darkThemeColors : lightThemeColors
}

const updateTabColor = async () => {
  const windowId = browser.windows.WINDOW_ID_CURRENT
  const theme = await browser.theme.getCurrent(windowId)

  const themeColors = getThemeColors(theme)
  const tabColor = getRandomTabColor()
  console.log('tabColor', tabColor)

  browser.theme.update(windowId, {
    colors: {
      ...themeColors,
      tab_selected: tabColor
    }
  })
}

// Initialize: apply a color to current tab when the extension loads
updateTabColor()

// Update the color when the active tab changes
browser.tabs.onActivated.addListener(updateTabColor)
