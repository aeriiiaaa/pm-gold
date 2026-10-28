import React, { useState } from 'react'
import { DIRECTIONS, CONTACT_WAYS } from './data.js'
import {
  STEPS,
  getQuestion,
  getKinds,
  getZones,
  getSummary,
  isPhoneValid,
  formatPhone
} from './plan.js'

const EMPTY = {
  direction: null, // 'procedure' | 'course'
  kind: null, // процедура или курс
  zone: null,
  name: '',
  phone: '',
  way: 'Telegram',
  agree: false
}

export default function BookingQuiz() {
  const [answers, setAnswers] = useState(EMPTY)
  const [stepIndex, setStepIndex] = useState(0)
  const [showErrors, setShowErrors] = useState(false)
  const [status, setStatus] = useState('filling') // 'filling' | 'sending' | 'done'

  const step = STEPS[stepIndex]

  // Выбор на раннем шаге сбрасывает ответы после него,
  // чтобы, например, зона от «Ламинирования» не осталась у «Удаления»
  function choose(key, value) {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'direction') {
        next.kind = null
        next.zone = null
      }
      if (key === 'kind') next.zone = null
      return next
    })
  }

  function canGoNext() {
    if (step === 'direction') return answers.direction !== null
    if (step === 'kind') return answers.kind !== null
    if (step === 'zone') return answers.zone !== null
    return true
  }

  const errors = {
    name: answers.name.trim().length < 2 ? 'Напишите, как к вам обращаться' : null,
    phone: !isPhoneValid(answers.phone) ? 'Проверьте номер телефона' : null,
    agree: !answers.agree ? 'Нужно согласие на обработку данных' : null
  }
  const isValid = !errors.name && !errors.phone && !errors.agree

  function goNext() {
    if (canGoNext()) setStepIndex(stepIndex + 1)
  }

  function goBack() {
    setShowErrors(false)
    setStepIndex(stepIndex - 1)
  }

  function submit(event) {
    event.preventDefault()
    if (!isValid) {
      setShowErrors(true)
      return
    }
    // Бэкенда в учебном проекте нет, поэтому имитируем отправку.
    // На реальном сайте здесь будет запрос в CRM или Telegram-бот студии.
    setStatus('sending')
    setTimeout(() => setStatus('done'), 900)
  }

  function restart() {
    setAnswers(EMPTY)
    setStepIndex(0)
    setShowErrors(false)
    setStatus('filling')
  }

  const zones = getZones(answers)

  if (status === 'done') {
    const text =
      answers.direction === 'course'
        ? 'расскажет о программе и ближайших датах.'
        : 'чтобы договориться о бесплатной консультации.'
    const contact =
      answers.way === 'Звонок'
        ? 'Елена перезвонит вам в течение дня, '
        : 'Елена напишет вам в ' + answers.way + ' в течение дня, '
    return (
      <section className="booking">
        <h2 className="booking__question">Заявка отправлена</h2>
        <p className="booking__lead">
          Спасибо, {answers.name.trim()}! {contact}
          {text}
        </p>
        <Summary text={getSummary(answers)} />
        <a
          className="button"
          href="https://t.me/pmtkachenko"
          target="_blank"
          rel="noreferrer"
        >
          Посмотреть все работы
        </a>
        <button className="booking__again" type="button" onClick={restart}>
          Оставить ещё одну заявку
        </button>
      </section>
    )
  }

  return (
    <section className="booking">
      <form className="booking__form" onSubmit={submit} noValidate>
        <div className="booking__head">
          <h2 className="booking__question">{getQuestion(step, answers.direction)}</h2>
        </div>

        {step === 'direction' && (
          <div className="tiles tiles--big">
            {DIRECTIONS.map((d) => (
              <Tile
                key={d.id}
                title={d.title}
                caption={d.caption}
                active={answers.direction === d.id}
                onClick={() => choose('direction', d.id)}
              />
            ))}
          </div>
        )}

        {step === 'kind' && (
          <div className={'tiles' + (answers.direction === 'course' ? ' tiles--big' : ' tiles--four')}>
            {getKinds(answers.direction).map((k) => (
              <Tile
                key={k.id}
                title={k.title}
                caption={k.caption}
                active={answers.kind === k.id}
                onClick={() => choose('kind', k.id)}
              />
            ))}
          </div>
        )}

        {step === 'zone' && (
          <div className="tiles tiles--four">
            {zones.map((z) => (
              <Tile
                key={z.id}
                title={z.title}
                caption={z.price ? z.caption + ' ·\n' + z.price.replace(/ /g, '\u00a0') : z.caption}
                active={answers.zone === z.id}
                onClick={() => choose('zone', z.id)}
              />
            ))}
          </div>
        )}

        {step === 'contacts' && (
          <div className="contacts">
            <Summary text={getSummary(answers)} />

            <div className="contacts__row">
              <Field label="Имя" error={showErrors && errors.name}>
                <input
                  className="input"
                  type="text"
                  value={answers.name}
                  placeholder="Анна"
                  autoComplete="given-name"
                  onChange={(e) => choose('name', e.target.value)}
                />
              </Field>
              <Field label="Телефон" error={showErrors && errors.phone}>
                <input
                  className="input"
                  type="tel"
                  value={answers.phone}
                  placeholder="+7 (999) 123-45-67"
                  autoComplete="tel"
                  onChange={(e) => choose('phone', formatPhone(e.target.value))}
                />
              </Field>
            </div>

            <div className="contacts__ways">
              <span className="contacts__label">Где удобнее:</span>
              {CONTACT_WAYS.map((way) => (
                <button
                  key={way}
                  type="button"
                  className={'chip' + (answers.way === way ? ' chip--active' : '')}
                  onClick={() => choose('way', way)}
                >
                  {way}
                </button>
              ))}
            </div>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={answers.agree}
                onChange={(e) => choose('agree', e.target.checked)}
              />
              <span>Согласна на обработку персональных данных</span>
            </label>
            {showErrors && errors.agree && <p className="field__error">{errors.agree}</p>}
          </div>
        )}

        <div className="booking__nav">
          {stepIndex > 0 && (
            <button type="button" className="button" onClick={goBack}>
              Назад
            </button>
          )}
          {step !== 'contacts' ? (
            <button
              type="button"
              className="button"
              disabled={!canGoNext()}
              onClick={goNext}
            >
              Далее
            </button>
          ) : (
            <button
              type="submit"
              className="button button--primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

function Summary({ text }) {
  return (
    <p className="summary">
      <span>Вы выбрали:</span> {text}
    </p>
  )
}

function Tile({ title, caption, active, onClick }) {
  return (
    <button
      type="button"
      className={'tile' + (active ? ' tile--active' : '')}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="tile__title">{title}</span>
      <span className="tile__caption">{caption}</span>
    </button>
  )
}

function Field({ label, error, children }) {
  return (
    <label className={'field' + (error ? ' field--error' : '')}>
      <span className="field__label">{label}</span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}
