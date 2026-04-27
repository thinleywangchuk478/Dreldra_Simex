const questions = [
  { noun1:"བཀྲ་ཤིས་", noun2:"ཁྱིམ་", ending:"སྦོམ་ཅིག་འདུག", correct:["ཀྱི་"], audio:"q1.mp3" },
  { noun1:"ཨ་མ་", noun2:"བུ་", ending:"ལེ་ཤ་འདུག", correct:["འི་","གི་"], audio:"q2.mp3" },
  { noun1:"ཁྱིམ་", noun2:"ལྡེ་མིག་", ending:"ག་ཏེ་ཡོད?", correct:["གྱི་"], audio:"q3.mp3" },
  { noun1:"རྒྱལ་པོ་", noun2:"གཟིམ་ཅུང་", ending:"མཇལ་དགོ་མནོ་ཡི།", correct:["འི་", "གི་"], audio:"q.mp3" },
  { noun1:"ང་", noun2:"མིང་ལ་པདྨ་ཟེར་རུ་ཡང་།།", ending:" ང་རིས་པདྨ་འདྲ་བ་མེད་པར་སྐྱོ།།", correct:["ཡི་"], audio:"q3.mp3" },
  { noun1:"བཀྲིས་སྒང་", noun2:"དྲག་ཤོས་རྫོང་བདག་", ending:"ཐུགས་གཏུམ་དྲགས་ཡོད་ལོ་སྨ་རེ།", correct:["གི་"], audio:"q3.mp3" },
  { noun1:"རོ་ཁྱི་", noun2:"མཇུག་མ་", ending:"རིངམ་འདུག།", correct:["གི་", "འི་"], audio:"q3.mp3" },
  { noun1:"བླ་མ་", noun2:"ཞལ་རས་འདི་", ending:"དཀར་གསལ་ཟླ་བ་འདྲ་བས།", correct:["གི་", "འི་"], audio:"q3.mp3" },
  { noun1:"འཕྲིན་ལས་", noun2:"ལྷ་པ་སྦོམ་ནི་དེ་གིས་་", ending:"བྱ་བཟུམ་མཐོང་མས།", correct:["ཀྱི་"], audio:"q3.mp3" },
  { noun1:"དབང་ཕྱུག་", noun2:"བྱི་ལི་འདི་", ending:"སེམས་ཅན་སྟག་གིས་ བསད་ད་ནུག།", correct:["གི་"], audio:"q3.mp3" },
  { noun1:"དཔལ་ལྡན་འབྲུག་པའི་རྒྱལ་ཁབ།། དགྲ་", noun2:"ཕྱོགས་ལས་རྒྱལ་ཏེ།།", ending:"མི་སེར་དགའ་སྐྱིད་དཔལ་ལ།། སྤྱོད་པར་སྐལ་བ་བཟང་སོང་།།", correct:["ཡི་"], audio:"q3.mp3" },
  { noun1:"བུམོ་ཅུ་པད་མ་", noun2:"ངོ་རིས་འདི་ལུ་བལྟ་སྟེ་", ending:"བུ་རང་སེམས་རྩ་ལས་མ་ཆགསཔ་ཡར་སོ་ཡི།", correct:["གི་", "འི་"], audio:"q3.mp3" },
  { noun1:"ཁོ་", noun2:"མིང་", ending:"བཀྲིས་དཔལ་འབྱོར་ཟེར་སླབ་ཨིན།", correct:["གི་", "འི་"], audio:"q3.mp3" },
  { noun1:"གངས་ཀྱི་ཨེ་ཏོ་མེ་ཏོག། ཤར་ས་རི་ཁར་ཨིན་རུང་།། བརྩེ་བའི་ལགཔ་ཀྱིས་བཅགས་ཏེ།། ཁྱོད་", noun2:"རྣ་བར་བཙུགས་གེ།", ending:"", correct:["ཀྱི་"], audio:"q3.mp3" },
  { noun1:"ཕམ་", noun2:"རྒྱུ་ནོར་ལོངས་སྤྱོད།། བུ་གིས་འཕྲོ་བརླག་གཏང་ཚེ།།", ending:"ཕ་མ་དོན་ཧིང་ན་འོང་།།", correct:["གི་"], audio:"q3.mp3" },
  // add more questions with audio file names
];

let currentQ = 0;
let score = 0;
let hasScored = false;

function loadQuestion() {
  const q = questions[currentQ];
  hasScored = false;

  document.getElementById("qnum").textContent = currentQ+1;
  document.getElementById("score").textContent = score;
  document.getElementById("progress-bar").style.width = ((currentQ+1)/questions.length*100)+"%";

  document.getElementById("sent1").innerHTML = 
    q.noun1 + `<span class="marker"> ______ </span>` + q.noun2 + " " + q.ending;

  const opts = ["གི་","ཀྱི་","གྱི་","འི་","ཡི་"];
  document.getElementById("options").innerHTML = "";
  opts.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => checkAnswer(opt, btn));
    document.getElementById("options").appendChild(btn);
  });

  document.getElementById("feedback").innerHTML = "";
  document.getElementById("rule").style.display = "none";
}

function checkAnswer(selected, buttonElement) {
  const q = questions[currentQ];
  const fb = document.getElementById("feedback");

  const markerHTML = `<span class="marker">${selected}</span>`;
  document.getElementById("sent1").innerHTML = 
    q.noun1 + markerHTML + q.noun2 + " " + q.ending;

  const isCorrect = q.correct.includes(selected);

  if (isCorrect) {
    buttonElement.style.background = "#28a745";
    buttonElement.style.color = "white";
    fb.innerHTML = `✅ ལེགས་སོ། ལན་ཕོག་ཅི།`;
    fb.className = "feedback correct";

    if (!hasScored) {
      score += 10;
      document.getElementById("score").textContent = score;
      hasScored = true;
      playAudio(q.audio);  // 🔊 play Dzongkha audio file
    }
  } else {
    buttonElement.style.background = "#dc3545";
    buttonElement.style.color = "white";
    fb.innerHTML = `❌ མ་ཕོག།<br>ལེགས་ཤོམ་སྦེ་བལྟ། མ་པ་ལས་མ་ཤེས་པ་ཅིན་ (Hint) གུར་ཨེབ།`;
    fb.className = "feedback wrong";
    if (navigator.vibrate) navigator.vibrate([80,50,80]);
  }
}

function playAudio(applause) {
  const audio = new Audio("sounds/" + applause);
  audio.play();
}

document.getElementById("hintBtn").addEventListener("click", () => {
  document.getElementById("rule").style.display = "block";
});
document.getElementById("nextBtn").addEventListener("click", () => {
  currentQ++;
  if (currentQ >= questions.length) {
    currentQ = 0; // restart
    score = 0;    // reset score if you want
  }
  loadQuestion();
});


window.onload = loadQuestion;


  function checkAnswer(selected, buttonElement) {
  const q = questions[currentQ];
  const fb = document.getElementById("feedback");
  const questionBox = document.getElementById("sent1"); // your sentence div

  // update sentence with chosen marker
  const markerHTML = `<span class="marker">${selected}</span>`;
  questionBox.innerHTML = q.noun1 + markerHTML + q.noun2 + " " + q.ending;

  const isCorrect = q.correct.includes(selected);

  // reset styles
  document.querySelectorAll("#options button").forEach(b => {
    b.classList.remove("option-correct", "option-wrong");
  });
  questionBox.classList.remove("question-correct", "question-wrong");

  if (isCorrect) {
    buttonElement.classList.add("option-correct");
    questionBox.classList.add("question-correct");
    fb.innerHTML = `✅ ལེགས་སོ། ལན་ཕོག་ཅི།`;
    fb.className = "feedback correct";

    if (!hasScored) {
      score += 10;
      document.getElementById("score").textContent = score;
      hasScored = true;
      playAudio(q.audio);
    }
  } else {
    buttonElement.classList.add("option-wrong");
    questionBox.classList.add("question-wrong");
    fb.innerHTML = `❌ མ་ཕོག།<br>ལེགས་ཤོམ་སྦེ་བལྟ། མ་པ་ལས་མ་ཤེས་པ་ཅིན་ Hint གུར་ཨེབ།`;
    fb.className = "feedback wrong";
    if (navigator.vibrate) navigator.vibrate([80,50,80]);
  }
}
function startMusic() {
  const bg = document.getElementById("bgMusic");
  bg.play().catch(err => {
    console.log("Autoplay blocked, will start after user interaction.");
  });
}

// Try to start on load
window.onload = () => {
  loadQuestion();
  startMusic();
};

// Also ensure it starts after first click
document.body.addEventListener("click", () => {
  startMusic();
}, { once: true });
window.onload = () => {
  loadQuestion();   // your quiz setup
  const bg = document.getElementById("bgMusic");
  bg.volume = 0.2;  // softer background volume
  bg.play().catch(err => {
    console.log("Autoplay may be blocked by browser settings.");
  });
};
window.onload = () => {
  loadQuestion();   // your quiz setup
  const bg = document.getElementById("bgMusic");
  bg.volume = 0.2;  // softer background volume
  bg.play().catch(err => {
    console.log("Autoplay may be blocked by browser settings.");
  });
};

document.getElementById("musicToggle").addEventListener("click", () => {
  const bg = document.getElementById("bgMusic");
  const btn = document.getElementById("musicToggle");
  if (bg.muted) {
    bg.muted = false;
    btn.textContent = "🔊 Mute";
  } else {
    bg.muted = true;
    btn.textContent = "🔈 Unmute";
  }
});

