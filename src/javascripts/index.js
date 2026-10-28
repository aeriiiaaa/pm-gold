import '../stylesheets/style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import BookingQuiz from './booking/BookingQuiz.jsx'

// Монтируем компонент в блок #booking на главной странице
const container = document.getElementById('booking')
if (container) {
  createRoot(container).render(<BookingQuiz />)
}
