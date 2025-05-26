let triplets = [];
let currentIndex = 0;
let annotatorName = "";
let history = [];

async function loadTriplets() {
  const response = await fetch("triplets.json");
  triplets = await response.json();
  document.getElementById("totalTriplets").textContent = triplets.length;
}

function displayTriplet(index) {
  const t = triplets[index];
  document.getElementById("imgA").src = t.reference;
  document.getElementById("imgB").src = t.option1;
  document.getElementById("imgC").src = t.option2;
  document.getElementById("currentIndex").textContent = index + 1;
}

function submitAnnotation(choice) {
  const triplet = triplets[currentIndex];
  const timestamp = new Date().toISOString();
  const data = {
    annotator: annotatorName,
    reference: triplet.reference,
    option1: triplet.option1,
    option2: triplet.option2,
    choice: choice,
    index: currentIndex,
    timestamp: new Date().toISOString()
  };

  history.push({ index: currentIndex, ...data });
  console.log(JSON.stringify(data))

  fetch("https://script.google.com/macros/s/AKfycbyB33i4O2lo59GE2gisVYZeKteCdbemUyZ1DbmsrOgWVxXDxZ1ZVcky8Q6BMp3C0pgGVQ/exec", {
    method: "POST",
    mode: "no-cors", // optional if you handle CORS properly
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(data)  // Send JSON string as plain text
  });

  currentIndex++;
  if (currentIndex < triplets.length) {
    displayTriplet(currentIndex);
  } else {
    alert("Thanks for completing the annotation task!");
    location.reload();
  }
}

document.getElementById("startButton").addEventListener("click", () => {
  annotatorName = document.getElementById("annotatorName").value.trim();
  if (!annotatorName) {
    alert("Please enter your name.");
    return;
  }
  document.querySelector(".annotator-entry").classList.add("hidden");
  document.getElementById("annotationArea").classList.remove("hidden");
  displayTriplet(currentIndex);
});

document.getElementById("selectB").addEventListener("click", () => submitAnnotation("option1"));
document.getElementById("selectC").addEventListener("click", () => submitAnnotation("option2"));
document.getElementById("unsure").addEventListener("click", () => submitAnnotation("unsure"));

document.getElementById("back").addEventListener("click", () => {
  if (history.length === 0) return;
  const last = history.pop();
  currentIndex = last.index;
  displayTriplet(currentIndex);
});

loadTriplets();

