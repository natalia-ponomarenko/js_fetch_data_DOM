'use strict';

const baseUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = (url) => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(
          `${response.status} - ${response.statusText}`
        ));
      }
    });

  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(response => resolve(response.json()));

    setTimeout(() => {
      reject(new Error('Error!'));
    }, 5000);
  });
};

const getPhonesDetails = (list) => {
  const listOfPhones = list.map(phone => phone.id);

  const preparedList = listOfPhones.map(
    phoneId => fetch(
      `${detailsUrl}${phoneId}.json`)
      .then(response => response.json()
      )
  );

  return Promise.all(preparedList);
};

const displayList = (preparedList) => {
  const list = document.createElement('ul');

  preparedList.forEach(element => {
    const domElement = document.createElement('li');

    domElement.textContent = element.name;
    list.append(domElement);
  });

  document.body.append(list);
};

getPhones(baseUrl)
  .then(getPhonesDetails)
  .then(displayList);
