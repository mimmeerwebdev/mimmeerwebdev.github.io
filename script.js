const urlParams = new URLSearchParams(window.location.search);
const tutorial = urlParams.get('tutorial');
const page = urlParams.get('page');
const mainDocElement = document.getElementById('maindoc');

// Construct the file path based on tutorial and page parameters
const filePath = `tutorials/${tutorial}/page${page}.txt`;
const navPath = `core/nav.html`;
const footPath = `core/foot.html`;

// Fetch the content from the specified file
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

fetch(navPath)
  .then(response => response.text())
  .then(navHTML => {
    const navElement = document.querySelector('header');
    navElement.innerHTML = navHTML;
  })
  .catch(error => {
    const navElement = document.querySelector('header');
    console.error('Sorry, navigation is not avalible. Error:', error);
    navElement.innerHTML = "Sorry, the header isn&apos;t here.";
  });

fetch(footPath)
  .then(response => response.text())
  .then(footHTML => {
      const footerElement = document.querySelector('footer');
    document.querySelector('footer').innerHTML = footHTML;
      footerElement.innerHTML = footHTML;
  })
  .catch(error => {
      const footerElement = document.querySelector('footer');
    console.error('Sorry, the footer isn&apost here:', error);
    footerElement.innerHTML = "Sorry, the footer isn&apos;t here.";
  });
