document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form"); 
    const nameInput = document.getElementById("card-name");
    const cardNameShow = document.getElementById("card-name-show");
    const cardNumberInput = document.getElementById("card-number");
    const cardNumberShow = document.getElementById("card-number-show");
    const monthCardInput = document.getElementById("month-card");
    const yearCardInput = document.getElementById("year-card");
    const cardDateShow = document.getElementById("card-expiry-date");
    const cardCVC = document.getElementById("cvc-card");
    const cardSecurityShow = document.getElementById("card-security-show");
    const cardCheckSucces = document.getElementById("card-check");

    function formatCardNumber(value) {
        return value.replace(/\D/g, "").replace(/(\d{16})(?=\d)/g, "$1 ").substring(0, 19);
    }

    cardCVC.addEventListener("input", function() {
        cardCVC.value = cardCVC.value.replace(/\D/g, "").slice(0, 3);
        cardSecurityShow.textContent = cardCVC.value.trim() || '000';
    });

    monthCardInput.addEventListener("input", function () {
        monthCardInput.value = monthCardInput.value.replace(/\D/g, "").slice(0, 2);
        let value = monthCardInput.value;

        // Permitir solo valores entre 1 y 12
        if (value < 1 || value > 12) {
            monthCardInput.setCustomValidity("Please enter a value between 1 and 12");
        } else {
            monthCardInput.setCustomValidity(""); // Resetea el mensaje de error
        }
        updateExpiryDate();
    });

    yearCardInput.addEventListener("input", function () {
        yearCardInput.value = yearCardInput.value.replace(/\D/g, "").slice(0, 2);
        updateExpiryDate();
    });

    function updateExpiryDate() {
        const month = monthCardInput.value.padStart(2, "0"); // Asegurar formato MM
        const year = yearCardInput.value.padStart(2, "0"); // Asegurar formato YY
        cardDateShow.textContent = `${month}/${year}`;
    }

    nameInput.addEventListener("input", function() {
        nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 25);
        cardNameShow.textContent = nameInput.value.trim() || "Jane Appleseed";
    });

    cardNumberInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, ""); // Eliminar todos los caracteres no numéricos
        let formattedValue = formatCardNumber(value); // Formatear el número de la tarjeta
        e.target.value = formattedValue;
        cardNumberShow.textContent = formattedValue || "0000 0000 0000 0000";
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario para validar manualmente

        const nameValue = nameInput.value.trim();
        const cardNumberValue = cardNumberInput.value.replace(/\s/g, ""); // Eliminar espacios para validación
        const monthValue = monthCardInput.value.trim();
        const yearValue = yearCardInput.value.trim();
        const cvcValue = cardCVC.value.trim();

        const nameError = nameInput.nextElementSibling; 
        const cardNumberError = cardNumberInput.nextElementSibling;
        const cardCVCError = cardCVC.nextElementSibling;

        let isValid = true;

        if (nameValue.length === 0) {
            nameError.style.display = "block";
            isValid = false;
        } else {
            nameError.style.display = "none";
        }

        if (cardNumberValue.length !== 16) {
            cardNumberError.style.display = "block";
            isValid = false;
        } else {
            cardNumberError.style.display = "none";
        }

        if (cvcValue.length !== 3) {
            cardCVCError.style.display = "block";
            isValid = false;
        } else {
            cardCVCError.style.display = "none";
        }

        if (monthValue.length !== 2 || yearValue.length !== 2) {
            isValid = false;
        }

        if (isValid) {
            form.style.display = "none";
            cardCheckSucces.style.display = "block";
        }
    });

    const continueButton = cardCheckSucces.querySelector(".form__button");
    continueButton.addEventListener("click", function () {
        form.style.display = "block";
        cardCheckSucces.style.display = "none";
        form.reset();
        cardNumberShow.textContent = "0000 0000 0000 0000";
        cardNameShow.textContent = "Jane Appleseed";
        cardDateShow.textContent = "00/00";
        cardSecurityShow.textContent = "000";
    });
});