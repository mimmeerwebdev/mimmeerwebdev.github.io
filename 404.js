function handle404() {
  // Choose a random 404 error page
  const errorFiles = ['unicorn.txt', 'blackhole.txt', '//other error pages']; // List of error files
  const randomErrorFile = errorFiles[Math.floor(Math.random() * errorFiles.length)];
  const randomErrorPath = 'core/errors/404/' + randomErrorFile;

  // Fetch the random 404 error page
  fetch(randomErrorPath)
    .then(response => response.text())
    .then(errorContent => {
      const errorContentElement = document.getElementById('error-content');
      errorContentElement.innerHTML = errorContent;
    })
    .catch(error => {
      // Handle the error if the random 404 page cannot be fetched
      console.error('Error fetching 404 error page:', error);
      const errorContentElement = document.getElementById('error-content');
      errorContentElement.innerHTML = '<h1>Oops! Page Not Found</h1>
<h3>We couldn&apos;t find what you&apos;re looking for.</h3>

<p>It seems like you&apos;ve taken a wrong turn on the internet highway. Don&apos;t worry, we&apos;re here to help you get back on track.</p>

<p>What to do next:
<ul>
<li>Double-check the address: Make sure you&apos;ve typed the URL correctly.</li>
<li>Use your browser&apos;s back button: This might take you back to the previous page.</li>
<li>Try searching our website: Use the search bar to find what you&apos;re looking for.</li>
<li>Contact our support team: If you&apos;re still having trouble, please contact us at webdev-support@mimmeer.anonaddy.com.</li>
</ul>
</p>';
    });
}

// Call the handle404 function to trigger the error handling
handle404();
