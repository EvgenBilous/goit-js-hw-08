/**
 * 
 * Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.

Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.

Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
 */
import throttle from 'lodash.throttle';
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
const LOCAL_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
let userData = {};
form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  if (Object.keys(userData).length === 0) {
    return;
  }
  console.log(event.currentTarget.elements);

  const { email, message } = event.currentTarget.elements;

  if (!email.value || !message.value) {
    return alert('One of the fields is empty');
  }
  console.log(userData);
  localStorage.removeItem(LOCAL_KEY); //чистимо сторедж
  event.currentTarget.reset(); // clean form
  localStorage.clear();

  userData = {}; // clean user's data
}

function checkForm(form) {
  // validation fails if the input is blank
  if (formvalue == '') {
    alert('Error: Input is empty!');
    form.email.focus();
    return false;
  }

  // regular expression to match only alphanumeric characters and spaces
  var re = /^[\w ]+$/;

  // validation fails if the input doesn't match our regular expression
  if (!re.test(form.inputfield.value)) {
    alert('Error: Input contains invalid characters!');
    form.inputfield.focus();
    return false;
  }

  // validation was successful
  return true;
}

function handleInput(event) {
  const target = event.target;
  const formValue = target.value;
  const formName = target.name;

  userData[formName] = formValue;
  save(LOCAL_KEY, userData);
}

const formFields = document.querySelector('input');
function validateForm() {
  if (formFields.value == '') {
    alert('no data');
    return;
  }
}

// form.addEventListener('submit', e => {
//   if (email.value === '' || email.value === null) {
//     emailMessage.innerHTML = 'where is the email';
//     e.preventDefault();
//   } else {
//     return true;
//   }
// });

function loadData() {
  const lsData = load(LOCAL_KEY);
  //console.log(lsData);
  if (!lsData) return; //перевірка на пустий локалстоердж
  const formItems = form.elements;

  for (const key in lsData) {
    if (lsData.hasOwnProperty(key)) {
      //console.log(key);
      formItems[key].value = lsData[key];
      if (lsData[key]) {
        userData[key] = lsData[key]; //дефолтні значення післі завантаження форми призначаємо їх в локалсторедж
      }
    }
  }
}
loadData();
