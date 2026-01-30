const display = document.getElementById("display");
const historyDiv = document.getElementById("history");
const sound = document.getElementById("clickSound");

let soundOn = true;

function playSound() {
  if (soundOn) {
    sound.currentTime = 0;
    sound.play();
  }
}

function appendValue(value) {
  playSound();
  display.value += value;
}

function clearDisplay() {
  playSound();
  display.value = "";
}

function deleteLast() {
  playSound();
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    playSound();
    const expression = display.value;
    const result = eval(expression);
    display.value = result;
    addToHistory(expression, result);
  } catch {
    display.value = "Erro";
  }
}

function addToHistory(expression, result) {
  const item = document.createElement("div");
  item.textContent = `${expression} = ${result}`;
  historyDiv.prepend(item);

  if (historyDiv.children.length > 10) {
    historyDiv.removeChild(historyDiv.lastChild);
  }
}


document.getElementById("soundToggle").onclick = () => {
  soundOn = !soundOn;
};


document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};


document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || e.key === ".") appendValue(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) appendValue(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Escape") clearDisplay();
});

