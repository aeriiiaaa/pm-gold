import { DIRECTIONS, PROCEDURES, COURSES, ZONES } from './data.js'

// Порядок шагов одинаковый для обеих веток: направление → вид → зона → контакты
export const STEPS = ['direction', 'kind', 'zone', 'contacts']

// Вопрос-заголовок для каждого шага
export function getQuestion(step, direction) {
  if (step === 'direction') return 'Выберите, с чего начнём'
  if (step === 'kind') return direction === 'course' ? 'Какой курс вам подходит?' : 'Какая процедура интересует?'
  if (step === 'zone') return direction === 'course' ? 'Какую зону хотите освоить?' : 'Какую зону?'
  return 'Как с вами связаться?'
}

// Варианты для шага 2 зависят от направления
export function getKinds(direction) {
  return direction === 'course' ? COURSES : PROCEDURES
}

// Варианты для шага 3 зависят от того, что выбрали на шаге 2
export function getZones(answers) {
  if (answers.direction === 'course') return ZONES.course
  return ZONES[answers.kind] || []
}

// Строка «Вы выбрали: Перманент · Губы · от 10 500 ₽»
export function getSummary(answers) {
  const kind = getKinds(answers.direction).find((k) => k.id === answers.kind)
  const zone = getZones(answers).find((z) => z.id === answers.zone)
  const parts = []
  if (answers.direction === 'course') parts.push('Обучение')
  if (kind) parts.push(kind.title)
  if (zone) parts.push(zone.title)
  const price = answers.direction === 'course' ? kind && kind.price : zone && zone.price
  if (price) parts.push(price)
  return parts.join(' · ')
}

export function getDirectionTitle(id) {
  const d = DIRECTIONS.find((item) => item.id === id)
  return d ? d.title : ''
}

// Телефон: 10 цифр после +7
export function isPhoneValid(phone) {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 11
}

// Маска «+7 (999) 123-45-67»
export function formatPhone(value) {
  let digits = value.replace(/\D/g, '')
  if (digits[0] === '8' || digits[0] === '7') digits = digits.slice(1)
  digits = digits.slice(0, 10)
  if (digits.length === 0) return ''

  let result = '+7 (' + digits.slice(0, 3)
  if (digits.length >= 3) result += ')'
  if (digits.length > 3) result += ' ' + digits.slice(3, 6)
  if (digits.length > 6) result += '-' + digits.slice(6, 8)
  if (digits.length > 8) result += '-' + digits.slice(8, 10)
  return result
}
