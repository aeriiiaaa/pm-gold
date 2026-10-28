// Все тексты, цены и варианты в одном месте.
// Чтобы поменять цену или добавить зону, правим только этот файл.

export const DIRECTIONS = [
  {
    id: 'procedure',
    title: 'Процедура',
    caption: 'Перманент, коррекция, удаление старого татуажа, ламинирование'
  },
  {
    id: 'course',
    title: 'Обучение',
    caption: 'Курс с нуля и повышение квалификации для мастеров'
  }
]

// Ветка «Процедура», шаг 2
export const PROCEDURES = [
  { id: 'permanent', title: 'Перманент', caption: 'Брови, губы, межресничка, стрелка' },
  { id: 'correction', title: 'Коррекция', caption: 'Через 30–45 дней после первой процедуры' },
  { id: 'removal', title: 'Удаление', caption: 'Старый татуаж: лазер или ремувер' },
  { id: 'lamination', title: 'Ламинирование', caption: 'Ресницы и брови' }
]

// Ветка «Обучение», шаг 2
export const COURSES = [
  {
    id: 'beginner',
    title: 'С нуля',
    caption: 'Для тех, кто осваивает профессию. Индивидуально или в паре, практика на живых моделях',
    price: null
  },
  {
    id: 'pro',
    title: 'Повышение квалификации',
    caption: 'Для практикующих мастеров. Одна зона, 2 дня · 40 000 ₽',
    price: '40 000 ₽'
  }
]

// Шаг 3: какие зоны показываем, зависит от выбора на шаге 2.
export const ZONES = {
  permanent: [
    { id: 'brows', title: 'Брови', caption: 'Пудровое напыление', price: 'от 10 500 ₽' },
    { id: 'lips', title: 'Губы', caption: 'Акварель и тинты', price: 'от 10 500 ₽' },
    { id: 'lashes', title: 'Межресничка', caption: 'Ресницы визуально гуще', price: 'от 10 000 ₽' },
    { id: 'arrow', title: 'Стрелка', caption: 'Растушёванная стрелка', price: 'от 11 500 ₽' }
  ],
  correction: [
    { id: 'brows', title: 'Брови', caption: 'Добавляем цвет и доводим форму', price: '7 000 ₽' },
    { id: 'lips', title: 'Губы', caption: 'Выравниваем оттенок', price: '7 000 ₽' },
    { id: 'lashes', title: 'Межресничка', caption: 'Усиливаем плотность', price: '7 000 ₽' },
    { id: 'arrow', title: 'Стрелка', caption: 'Уточняем линию', price: '7 500 ₽' }
  ],
  removal: [
    { id: 'brows', title: 'Брови', caption: 'Лазер или ремувер', price: 'от 3 000 ₽' },
    { id: 'lips', title: 'Губы', caption: 'Лазер или ремувер', price: 'от 3 000 ₽' },
    { id: 'lashes', title: 'Глаза', caption: 'Межресничка и стрелки', price: 'от 3 000 ₽' }
  ],
  lamination: [
    { id: 'lashlam', title: 'Ресницы', caption: 'Изгиб и окрашивание на 6–8 недель', price: '3 000 ₽' },
    { id: 'browlam', title: 'Брови', caption: 'Укладка и окрашивание', price: '3 000 ₽' }
  ],
  course: [
    { id: 'brows', title: 'Брови', caption: 'Пудровое напыление' },
    { id: 'lips', title: 'Губы', caption: 'Акварель и тинты' },
    { id: 'lashes', title: 'Межресничка', caption: 'Прокрашивание межресничного пространства' },
    { id: 'arrow', title: 'Стрелка', caption: 'Растушёванная стрелка' }
  ]
}


export const CONTACT_WAYS = ['Telegram', 'WhatsApp', 'Звонок']
