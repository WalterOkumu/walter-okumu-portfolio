const form = document.getElementById('contact-form');

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      (e instanceof DOMException && e.code === 22)
      || e.code === 1014 || e.name === 'QuotaExceededError'
      || (e.name === 'NS_ERROR_DOM_QUOTA_REACHED' && storage && storage.length !== 0)
    );
  }
}

if (storageAvailable('localStorage')) {
  const inputs = [form.name, form.email, form.message];
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      const storageData = {
        fullName: form.name.value,
        email: form.email.value,
        message: form.message.value,
      };
      localStorage.setItem('data', JSON.stringify(storageData));
    });
  });

  const getData = JSON.parse(localStorage.getItem('data'));

  if (getData) {
    form.name.value = getData.fullName;
    form.email.value = getData.email;
    form.message.value = getData.message;
  }
}