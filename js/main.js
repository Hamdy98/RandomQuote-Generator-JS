const quoteText = document.querySelector(".p-quote");
const authorName = document.querySelector(".author .name");
const quoteButton = document.querySelector('button');
const soundButton = document.querySelector('.speech');
const copyButton = document.querySelector('.copy');
const twitterButton = document.querySelector('.twitter');
const copyMsg = document .querySelector('.copy-msg');

// random quote function
function randomQuote() {
  quoteButton.classList.add("loading");
  quoteButton.innerText = "Loading Quote..."; 
  // fetch random quotes from API and parsing it into javaScript object
  fetch("http://api.quotable.io/random").then(res => res.json()).then(result => {
    console.log(result);
    quoteText.innerText = result.content;
    authorName.innerText = result.author;
    quoteButton.innerText = "New Quote";
    quoteButton.classList.remove("loading");
  });
}

soundButton.addEventListener("click", () => {
  // the SpeechSynthesisUtterance is a web speech api that represents a speech request
  let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerHTML}`);
  // speak method of speechSynthesis speaks the utterance
  speechSynthesis.speak(utterance);
});

copyButton.addEventListener("click", () => {
  // copying the quote text on copyButton click
  // writeText() property writes the specific text string to the clipboard
  navigator.clipboard.writeText(quoteText.innerText);
  setTimeout(() => {
    copyMsg.style.display = 'block';
  }, 250);
  setTimeout(() => {
    copyMsg.style.display = 'none';
  }, 2000);
});

twitterButton.addEventListener("click", () => {
  let twitterUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(twitterUrl, "_blank");
});

quoteButton.addEventListener('click', randomQuote);