$(document).ready(function() {
    const $form = $('#registrationForm');
    const $successBox = $('#success-box');
    const $errorBox = $('#error-box');
    const $resetBtn = $('#btn-reset');

    $form.on('submit', function(event) {
        event.preventDefault();
        
        $successBox.hide();
        $errorBox.hide();

        if (validateForm()) {
            showSuccess();
        } else {
            showError();
        }
    });

    $resetBtn.on('click', function() {
        resetForm();
    });

    function showError() {
        $errorBox.show();
        alert("Submission Failed! Please check the red fields.");
        $(window).scrollTop(0);
    }

    function validateForm() {
        let isValid = true;

        const $fullName = $('#fullName');
        if ($fullName.val().trim() === "") {
            setError($fullName, "Full Name is required.");
            isValid = false;
        } else {
            setSuccess($fullName);
        }

        const $contactNumber = $('#contactNumber');
        const contactValue = $contactNumber.val().trim();
        const phonePattern = /^[0-9]{11}$/; 
        
        if (contactValue === "") {
            setError($contactNumber, "Contact number is required.");
            isValid = false;
        } else if (!phonePattern.test(contactValue)) {
            setError($contactNumber, "Must be exactly 11 digits (numbers only).");
            isValid = false;
        } else {
            setSuccess($contactNumber);
        }

        const $email = $('#email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if ($email.val().trim() === "") {
            setError($email, "Email address is required.");
            isValid = false;
        } else if (!emailPattern.test($email.val().trim())) {
            setError($email, "Please enter a valid email (e.g., name@email.com).");
            isValid = false;
        } else {
            setSuccess($email);
        }

        const $address = $('#address');
        if ($address.val().trim() === "") {
            setError($address, "Address is required.");
            isValid = false;
        } else {
            setSuccess($address);
        }

        const genderValue = $('input[name="gender"]:checked').val();
        const $genderError = $('#error-gender');

        if (!genderValue) {
            $genderError.text("Please select a gender.");
            $genderError.addClass('visible');
            isValid = false;
        } else {
            $genderError.removeClass('visible');
        }

        const $academicInfo = $('#academicInfo');
        if ($academicInfo.val().trim() === "") {
            setError($academicInfo, "Academic Program is required.");
            isValid = false;
        } else {
            setSuccess($academicInfo);
        }

        const $year = $('#year');
        if ($year.val() === null || $year.val() === "") {
            setError($year, "Please select a year level.");
            isValid = false;
        } else {
            setSuccess($year);
        }

        return isValid;
    }

    function setError($inputElement, message) {
        const $errorDisplay = $('#error-' + $inputElement.attr('id'));
        $inputElement.addClass('input-error');
        if($errorDisplay.length) {
            $errorDisplay.text(message);
            $errorDisplay.addClass('visible');
        }
    }

    function setSuccess($inputElement) {
        const $errorDisplay = $('#error-' + $inputElement.attr('id'));
        $inputElement.removeClass('input-error');
        if($errorDisplay.length) {
            $errorDisplay.removeClass('visible');
        }
    }

    function showSuccess() {
        $errorBox.hide();
        alert("SUCCESS! \n\nRegistration Complete. Your information has been submitted.");
        $successBox.show();
        $(window).scrollTop(0);

        setTimeout(function() {
            $successBox.hide();
            resetForm();
        }, 3000);
    }

    function resetForm() {
        $form[0].reset();
        $successBox.hide();
        $errorBox.hide();
        
        $('.input-error').removeClass('input-error');
        $('.error-message').removeClass('visible');
    }
});