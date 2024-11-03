import { isDarkThemePreferred, saveColors } from '../helpers.js'
import { colorOptions } from '../constants.js'
import { DEFAULT_COLOR, MAX_NUMBER_OF_COLORS } from './constants.js'

const colorList = document.getElementById('colorList')
const addColorButton = document.getElementById('addColorButton')

// Function to load and display colors
const loadColors = async () => {
  if (!colorList) return

  colorList.innerHTML = ''
  const { colors = isDarkThemePreferred() ? colorOptions.dark : colorOptions.light } =
    await browser.storage.local.get('colors')

  // Set initial colors if not already saved
  if (!colors || colors.length === 0) {
    await saveColors(colors)
  }

  if (addColorButton) {
    addColorButton.style.display = colors.length < MAX_NUMBER_OF_COLORS ? 'block' : 'none'
  }

  // Generate color list elements once and add them to the DOM
  const fragment = document.createDocumentFragment()
  colors.forEach((color: string, index: number) =>
    fragment.appendChild(createColorItem(color, index))
  )
  colorList.appendChild(fragment)
}

// Function to create color item elements
const createColorItem = (color: string, index: number) => {
  const colorContainer = document.createElement('div')
  colorContainer.className = 'colorContainer'

  const colorInput = createColorInput(color, index)
  const deleteButton = createDeleteButton(color, index)

  colorContainer.append(colorInput, deleteButton)
  return colorContainer
}

// Create color input for editing color value
const createColorInput = (color: string, index: number) => {
  const colorInput = document.createElement('input')
  colorInput.type = 'color'
  colorInput.value = color
  colorInput.className = 'colorInput'
  colorInput.addEventListener('input', () => updateColor(index, colorInput.value))
  return colorInput
}

// Create delete button for removing a color
const createDeleteButton = (color: string, index: number) => {
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'X'
  deleteButton.style.backgroundColor = color
  deleteButton.className = 'deleteColorButton'
  deleteButton.addEventListener('click', () => deleteColor(index))
  return deleteButton
}

// Function to add a new color
const addColor = async () => {
  const { colors = [] } = await browser.storage.local.get('colors')

  colors.push(DEFAULT_COLOR)
  await saveColors(colors)

  loadColors()
}

// Function to update color at specific index
const updateColor = async (index: number, newColor: string) => {
  const { colors = [] } = await browser.storage.local.get('colors')

  if (colors.length >= MAX_NUMBER_OF_COLORS) {
    return
  }

  colors[index] = newColor
  await saveColors(colors)

  loadColors()
}

// Function to delete color at specific index
const deleteColor = async (index: number) => {
  const { colors = [] } = await browser.storage.local.get('colors')

  if (colors.length < 2) {
    return
  }

  colors.splice(index, 1)
  await saveColors(colors)

  loadColors()
}

// Event Listeners
addColorButton?.addEventListener('click', addColor)
window.addEventListener('DOMContentLoaded', loadColors)
