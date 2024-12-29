document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-btn");
  const loginContainer = document.getElementById("login-btn-container");
  const userProfileContainer = document.getElementById("user-profile-container");
  const userNameElement = document.getElementById("user-name");
  const logoutButton = document.getElementById("logout-btn");

  // Strictly check login state
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userName = localStorage.getItem("userName");

  // Reset UI on page load
  if (isLoggedIn && userName) {
      userNameElement.textContent = userName;
      loginContainer.classList.add("d-none");
      userProfileContainer.classList.remove("d-none");
  } else {
      // Ensure UI defaults to showing login button
      loginContainer.classList.remove("d-none");
      userProfileContainer.classList.add("d-none");
      localStorage.setItem("isLoggedIn", "false"); // Reset to prevent auto-updating
  }

  // Handle login link click
  loginLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "/components/login_signup/login.html"; // Redirect to login page
  });

  // Simulate form submission on login/signup page
  if (window.location.pathname.endsWith("login.html")) {
      const signUpForm = document.querySelector(".sign-up form");
      const loginForm = document.querySelector(".sign-in form");

      // Handle Sign-Up
      signUpForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const name = signUpForm.querySelector("input[placeholder='Name']").value.trim();
          const email = signUpForm.querySelector("input[placeholder='Email']").value.trim();
          const password = signUpForm.querySelector("input[placeholder='Password']").value.trim();

          if (name && email && password) {
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("userName", name);

              // Redirect to index.html
              window.location.href = "/index.html";
          } else {
              alert("Please fill in all the fields.");
          }
      });

      // Handle Login
      loginForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const email = loginForm.querySelector("input[placeholder='Email']").value.trim();
          const password = loginForm.querySelector("input[placeholder='Password']").value.trim();

          if (email && password) {
              localStorage.setItem("isLoggedIn", "true");

              // Example: Replace with backend username retrieval
              const name = "Default User"; // Replace with actual username retrieval logic
              localStorage.setItem("userName", name);

              // Redirect to index.html
              window.location.href = "/index.html";
          } else {
              alert("Please fill in all the fields.");
          }
      });
  }

  // Handle Logout
  logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.clear(); // Clear all stored data
      loginContainer.classList.remove("d-none");
      userProfileContainer.classList.add("d-none");
      window.location.href = "/components/login_signup/login.html"; // Redirect to login
  });
});
