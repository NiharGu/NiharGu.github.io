// Capture all click events
document.addEventListener("click", function (e) {
  logEvent("click", e.target);
});

// Observe elements for views
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      logEvent("view", entry.target);
    }
  });
});

document.querySelectorAll("section, img, a").forEach(el => observer.observe(el));

function logEvent(type, element) {
  const timestamp = new Date().toISOString();
  const objectType = element.tagName.toLowerCase();
  let eventObject = "text";
  
  if (objectType === "img") eventObject = "image";
  else if (objectType === "a") eventObject = "hyperlink";
  else if (objectType === "select") eventObject = "drop-down";
  
  console.log(`${timestamp}, ${type}, ${eventObject} (${objectType})`);
}

// Modal functionality for hometown images
function openModal(imgSrc) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  
  modal.style.display = "flex";
  modalImg.src = imgSrc;
  
  // Log the modal view event
  logEvent("view", modalImg);
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Text analyzer functionality 
function analyzeText() {
  const text = document.getElementById("longText").value;
  const output = document.getElementById("output");
  
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const words = (text.match(/\b\w+\b/g) || []).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
  
  const pronouns = [
    "i", "me", "you", "he", "him", "she", "her", "it", "we", "us", "they", "them",
    "my", "your", "his", "her", "its", "our", "their", "mine", "yours", "hers", "ours", "theirs",
    "myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves",
    "this", "that", "these", "those", "who", "whom", "whose", "which", "what"
  ];
  
  const prepositions = [
    "about", "above", "across", "after", "against", "along", "among", "around", "at",
    "before", "behind", "below", "beneath", "beside", "between", "beyond", "by",
    "down", "during", "except", "for", "from", "in", "into", "near", "of", "off", "on",
    "over", "since", "through", "to", "under", "until", "up", "with", "within", "without"
  ];
  
  const articles = ["a", "an"];
  const tokenized = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  const countOccurrences = (group) => {
    return group.reduce((acc, word) => {
      const count = tokenized.filter(token => token === word).length;
      if (count) acc[word] = count;
      return acc;
    }, {});
  };
  
  const pronounCounts = countOccurrences(pronouns);
  const prepositionCounts = countOccurrences(prepositions);
  const articleCounts = countOccurrences(articles);
  
  output.textContent = `
Letters: ${letters}
Words: ${words}
Spaces: ${spaces}
Newlines: ${newlines}
Special Symbols: ${specialSymbols}
Pronouns: ${JSON.stringify(pronounCounts, null, 2)}
Prepositions: ${JSON.stringify(prepositionCounts, null, 2)}
Articles: ${JSON.stringify(articleCounts, null, 2)}
  `;
}

// Close modal when clicking outside of image
window.onclick = function(event) {
  const modal = document.getElementById("imageModal");
  if (event.target === modal) {
    closeModal();
  }
}

