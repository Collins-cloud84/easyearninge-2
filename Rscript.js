document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // You can add validation or send data to server here
  // For now, just show success message
  document.getElementById('registrationForm').style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';
});