const urlParams = new URLSearchParams(window.location.search);
const tutorial = urlParams.get('tutorial');
const page = urlParams.get('page');
const mainDocElement = document.getElementById('maindoc');

// Construct the file path based on tutorial and page parameters
const filePath = `tutorials/${tutorial}/page${page}.txt`;
const navPath = `core/nav.html`;
const footPath = `core/foot.html`;

// Fetch the tutorial content
fetch(filePath)
  .then(response => response.text())
  .then(text => {
    // Split the text into lines
    const lines = text.split('\n');

    // Update the title within the existing `<title>` tag
    document.querySelector('title').textContent = lines[0];

    // Display the remaining lines as content within the target element
    mainDocElement.innerHTML = lines.slice(1).join('<br>');
  })
  .catch(error => {
    // Handle 404 errors here
    const errorFiles = ['unicorn.txt', 'blackhole.txt', 'digital.txt', 'stock.txt']; // List of error files
    const randomErrorFile = errorFiles[Math.floor(Math.random() * errorFiles.length)];
    const randomErrorPath = 'core/errors/404/' + randomErrorFile;

    fetch(randomErrorPath)
      .then(response => response.text())
      .then(errorContent => {
        mainDocElement.innerHTML = errorContent;
      })
      .catch(error => {
        // Handle the error if the random 404 page cannot be fetched
        console.error('Error fetching 404 error page:', error);
        mainDocElement.innerHTML = '<h1>404 - Page Not Found</h1><p>This is a missing page, one most fought after... JUST KIDDING! It&apos;s a 404 page.</p>';
      });
  });

// Fetch the navigation content
fetch(navPath)
  .then(response => response.text())
  .then(navHTML => {
    const headerElement = document.querySelector('header');
    headerElement.innerHTML = navHTML;
  })
  .catch(error => {
    console.error('Error fetching navigation:', error);
  });

// Fetch the footer content
fetch(footPath)
  .then(response => response.text())
  .then(footHTML => {
    const footerElement = document.querySelector('footer');
    footerElement.innerHTML = footHTML;
  })
  .catch(error => {
    console.error('Error fetching footer:', error);
  });
