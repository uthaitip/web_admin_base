// Font utility for converting TTF to base64 for jsPDF
import { readFileSync } from 'fs'
import { join } from 'path'

export async function loadThaiFont() {
  try {
    // For client-side, we'll need to load fonts differently
    if (typeof window !== 'undefined') {
      // Client-side font loading
      const response = await fetch('/fonts/Sarabun-Regular.ttf')
      const arrayBuffer = await response.arrayBuffer()
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
      return base64
    }
    return null
  } catch (error) {
    console.error('Error loading Thai font:', error)
    return null
  }
}

export async function loadThaiFontBold() {
  try {
    if (typeof window !== 'undefined') {
      const response = await fetch('/fonts/Sarabun-Bold.ttf')
      const arrayBuffer = await response.arrayBuffer()
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
      return base64
    }
    return null
  } catch (error) {
    console.error('Error loading Thai bold font:', error)
    return null
  }
}