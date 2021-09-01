function validateUsernameInput() {
  var username = document.getElementById("username-input").value;

  
  var head = /^[a-zA-Z].*/.test(username);
  

  if (head) {
    hideElement("username-head-hint");
  } else {
    showElement("username-head-hint");
  }

  var len = username.length;
  if (len >= 3) {
    hideElement("username-content-hint");
  } else {
    showElement("username-content-hint");
  }
}

/**
 * require the user to enter a password that is 8 or more characters AND contains at least
 * 1 upper case letter AND 1 number and 1 of the following special characters ( / * - + ! @
 * # $ ^ & * ).
 */
function validatePasswordInput() {
  var password = document.getElementById("password-input").value;
  var eight = password.length >= 8;
  if (eight) {
    hideElement("password-8-hint");
  } else {
    showElement("password-8-hint");
  }
  var upper = /^[A-Z].*/.test(password);
  if (upper) {
    hideElement("password-upper-hint");
  } else {
    showElement("password-upper-hint");
  }

  var number = /.*\d.*/.test(password);
  if (number) {
    hideElement("password-number-hint");
  } else {
    showElement("password-number-hint");
  }

  var special = /.*[/*\-+!@#$^&].*/.test(password);
  if (special) {
    hideElement("password-special-hint");
  } else {
    showElement("password-special-hint");
  }
}

function validateConfirmPasswordInput() {
  var password = document.getElementById("password-input").value;
  var confirm = document.getElementById("confirm-password-input").value;
  if (password == confirm) {
    hideElement("password-confirm-hint");
  } else {
    showElement("password-confirm-hint");
  }
}

function validateSubmitForm() {
    return validateUsernameInput() &&
    validatePasswordInput() &&
    validateConfirmPasswordInput();
}

function showElement(id) {
  document.getElementById(id).removeAttribute("hidden");
}

function hideElement(id) {
  document.getElementById(id).setAttribute("hidden", "hidden");
}

// using Jquery to
function hideAllHints() {
  var hints = document.getElementsByClassName("hint");
  hint.forEach((h) => {
    h.setAttribute("hidden", "hidden");
  });
}
