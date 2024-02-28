
function toggleDropdown(id) { // Skapar en funktion som skapar en dropdown
    let dropdown = document.getElementById(id); // Hämtar elementet med angivet id och lägger i en variabel
    if (dropdown.style.display === "none" || dropdown.style.display === "") { // Om dropdown elementet är dolt eller inte definierad
        dropdown.style.display = "block"; // Visa dropdown menyn
    } else {
        dropdown.style.display = "none"; // Annars dölj dropdown menyn
    }
}


function validateInput(inputElement, Pattern) { // Skapar en funktion som validerar inmatning
  inputElement.addEventListener('blur', function() { // Lägger till en lyssnare för om använndaren går ifrån input elementet
    const existingErrorMessage = inputElement.parentNode.querySelector('.error-message'); // Hämtar eventuellt befintligt felmeddelande
    if (!Pattern.test(inputElement.value)) { // Om inmatningen inte matchar mönstret
      if (!existingErrorMessage) { // Och om det inte redan finns ett felmeddelande
        const errorMessage = document.createElement('div'); // Skapar ett nytt div element
        errorMessage.textContent = 'Du har skrivit fel!, åtgärda eller dö!'; // Där texten för felmeddelandet ska vara i
        errorMessage.classList.add('error-message'); // Lägger till en klass för att styla felmeddelandet
        inputElement.parentNode.appendChild(errorMessage); // Lägger till felmeddelandet som ett barn till föräldern till inputElement
      }
    } else { // Om inmatningen matchar mönstret
      if (existingErrorMessage) { // Och om det finns ett befintligt felmeddelande
        inputElement.parentNode.removeChild(existingErrorMessage); // Ta bort det befintliga felmeddelandet
      }
    }
  });
}


function validateForm(key, pattern) { // Skapar en funktion som validerar alla input element med en viss typ
  const inputs = document.querySelectorAll('input[type="' + key + '"]'); // Hämtar alla input-element av den angivna typen
  inputs.forEach(function(input) { // Loopar igenom varje input-element
    const Fpattern = pattern; // Tilldelar det angivna mönstret till en lokal variabel
    validateInput(input, Fpattern); // Använder funktionen validateInput för att validera varje input med det angivna mönstret
  });
}

const textPattern = /^[a-zA-Z]+$/; // Regex-mönster för att matcha alfabetiska tecken
validateForm('text', textPattern); // Anropar validateForm för att validera input-element av typen 'text' med det angivna regex-mönstret
const adressPattern = /^[a-zA-ZåäöÅÄÖ]+\s\d{1,3}$/; // Regex-mönster för att matcha adresser
validateForm('address', adressPattern); // Anropar validateForm för att validera input-element av typen 'address' med det angivna regex-mönstret
const postNummerPattern = /^\d{5}(?:[-\s]\d{4})?$/; // Regex-mönster för att matcha postnummer
validateForm('zip', postNummerPattern); // Anropar validateForm för att validera input-element av typen 'zip' med det angivna regex-mönstret
const telefonPattern = /^\d{3}-\d{3} \d{2} \d{2}$/; // Regex-mönster för att matcha telefonnummer
validateForm('tel', telefonPattern); // Anropar validateForm för att validera input-element av typen 'tel' med det angivna regex-mönstret
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex-mönster för att matcha e-postadresser
validateForm('email', emailPattern); // Anropar validateForm för att validera input-element av typen 'email' med det angivna regex-mönstret


const logoText = document.querySelector('.logo-text2'); // Hämtar elementet med klassen 'logo-text2'
let count = localStorage.getItem('logoCount') || 0; // Hämtar värdet från local storage eller sätter det till 0 om det inte finns
logoText.textContent = count; // Sätter innehållet av 'logoText' till värdet av 'count'
const buttons = document.querySelectorAll('.product-button'); // Hämtar alla element med klassen 'product-button'
buttons.forEach(button => { // För varje 'product-button' lägger till en eventlyssnare
  button.addEventListener('click', () => { // Lägger till en klick-händelse
    count++; // Ökar räknaren med 1
    logoText.textContent = count; // Uppdaterar innehållet av 'logoText' med det nya värdet av 'count'
    localStorage.setItem('logoCount', count); // Sparar det nya värdet av 'count' i local storage
  });
});


document.querySelectorAll('.product-button').forEach(button => { // För varje 'product-button' lägger till en eventlyssnare
  button.addEventListener('click', function() { // Lägger till en klick-händelse
    const title = this.parentElement.querySelector('.product-title').textContent; // Hämtar texten från elementet med klassen 'product-title'
    const price = this.parentElement.querySelector('.product-price').textContent; // Hämtar texten från elementet med klassen 'product-price'
    let shoppingData = JSON.parse(localStorage.getItem('shoppingData')) || []; // Hämtar datan från local storage eller skapar en tom array om det inte finns
    shoppingData.push({ title, price }); // Lägger till den nya datan i arrayen
    localStorage.setItem('shoppingData', JSON.stringify(shoppingData)); // Sparar den uppdaterade datan i local storage
  });
});

document.addEventListener('DOMContentLoaded', function() { // Lägger till en eventlyssnare
  const shoppingData = JSON.parse(localStorage.getItem('shoppingData')); // Hämta datan från local storage
  const shoppingList = document.getElementById('shopping-list');
  shoppingData.forEach(item => { // För varje objekt i shoppingData
    const listItem = document.createElement('li'); // Skapar ett nytt li-element
    const priceText = item.price.replace(/\D/g, ''); // Extraherar numeriska värden med hjälp av reguljära uttryck
    const price = parseFloat(priceText); // Parsar det numeriska värdet som en float
    listItem.textContent = `${item.title} - ${price} kr`; // Använder det parsade prisvärdet
    shoppingList.appendChild(listItem); // Lägger till det nya li-elementet i shopping-list elementet
  });
  const totalSum = shoppingData.reduce((sum, item) => sum + parseFloat(item.price.replace(/\D/g, '')), 0); // Använder det parsade prisvärdet i reduce-funktionen och Beräknar den totala summan av alla priser
  const shoppingTotalElement = document.getElementById('shopping-total'); // Visa den totala summan i elementet #shopping-total
  shoppingTotalElement.textContent = `Totalbelopp: ${totalSum} kr`;
});


function validateAllInputs() { // Skapar  en funktion som validerar alla input element i ett formulär
  const inputs = document.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) { // För varje input-element
    const input = inputs[i];
    const pattern = input.getAttribute('pattern'); // Läser in det angivna regex-mönstret från pattern attributet
    if (pattern) { // Om det finns ett mönster
      if (!new RegExp(pattern).test(input.value)) { // Testa om värdet matchar mönstret
        return false; // Returnera falskt om det inte matchar mönstret
      }
    } else { // Om det inte finns något mönster
      if (input.value.trim() === '') { // Lägg till denna rad för att kontrollera om fälten är tomma
        return false; // Returnera falskt om fältet är tomt
      }
    }
  }
  return true; // Returnera sant om alla valideringar lyckades
}

document.getElementById('checkout-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Förhindra standardformuläret
  if (validateAllInputs()) { // Om alla valideringar lyckades
    window.location.href = 'C:/Users/herrv/Documents/Projektarbete/bestallning.html'; // Gå till beställningssidan
  }
});