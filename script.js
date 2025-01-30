// Carousel
let currentIndex = 0;

function moveSlide(direction) {
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalItems - 1;
  } else if (currentIndex >= totalItems) {
    currentIndex = 0;
  }

  const carousel = document.querySelector('.carousel');
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// tooltip for box
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.box').forEach((box) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = box.getAttribute('data-tooltip');
    box.appendChild(tooltip);
  });
});

// input field
let input_element = document.querySelector('input');

input_element.addEventListener('keyup', () => {
  input_element.setAttribute('value', input_element.value);
});

// submit btn
document.addEventListener('DOMContentLoaded', () => {
  // Add error tooltips dynamically to each input container
  document.querySelectorAll('.input-contain').forEach((container) => {
    const errorTooltip = document.createElement('div');
    errorTooltip.className = 'error-tooltip';
    errorTooltip.textContent = container.getAttribute('data-tooltip');
    container.appendChild(errorTooltip);

    const input = container.querySelector('input');

    // Hide error tooltip when user starts typing
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        errorTooltip.style.visibility = 'hidden';
        errorTooltip.style.opacity = '0';
        container.classList.remove('show-error-tooltip');
      }
    });
  });

  // Handle form submission
  document.getElementById('submit-btn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission

    let firstEmptyField = false; // To track the first empty field
    let allFieldsFilled = true; // To check if all fields are filled

    document.querySelectorAll('.input-contain').forEach((container) => {
      const input = container.querySelector('input');
      const errorTooltip = container.querySelector('.error-tooltip');

      if (!input.value.trim() && !firstEmptyField) {
        // Show error tooltip for the first empty field
        errorTooltip.style.visibility = 'visible';
        errorTooltip.style.opacity = '1';
        container.classList.add('show-tooltip');
        firstEmptyField = true; // Stop showing error for other fields
        allFieldsFilled = false;
      }
    });

    if (allFieldsFilled) {
      // Show success popup if all fields are filled
      showPopup('Your form has been submitted successfully!');
    }
  });

  // Function to show popup dialog
  function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-dialog';
    popup.innerHTML = `
      <div class="popup-content">
        <p style="font-weight:700; text-align:center; font-size: 24px">Thanks for contacting</p>
        <hr/>
        <p>${message}</p>
        <p>We will get back to you soon.</p>
        <button id="close-popup">OK</button>
      </div>
    `;

    document.body.appendChild(popup);

    // Close popup on button click
    document.getElementById('close-popup').addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  }
});
