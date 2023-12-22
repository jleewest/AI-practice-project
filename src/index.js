function handleAudio(response) {
  let audio = false;
  let utterance;

  return function (event) {
    event.preventDefault();

    if (!audio) {
      console.log;
      utterance = new SpeechSynthesisUtterance();
      utterance.text = response.data.answer;
      utterance.voice = window.speechSynthesis.getVoices()[0];
      window.speechSynthesis.speak(utterance);
      audio = true;
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
    }
  };
}

function displayStory(response) {
  console.log('displaying story...');
  let onRemoveNode = function () {
    typewriter.stop();
  };
  let typewriter = new Typewriter('#story', {
    strings: [response.data.answer],
    autoStart: true,
    delay: 1,
    cursor: '',
    onRemoveNode: onRemoveNode,
  });

  let readButton = document.querySelector('#read-button');
  readButton.classList.remove('hidden');
  readButton.addEventListener('click', handleAudio(response));
}

function generateStory(event) {
  event.preventDefault();
  console.log('generating story...');

  let storyInput = document.querySelector('.story-instructions');

  let apiKey = '1adc8btb0637f4ff3663a3o5a9930eea';
  let prompt = `User instructions: Please tell a 1-2 paragraph short story about ${storyInput.value}`;
  let context = `You are a world renowned children's storyteller. Provide only a short 1-2 paragraph story with a good moral in basic HTML. Due not include a title. Make sure to follow the user instructions.`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let storyElement = document.querySelector('#story');
  document.querySelector('.story').classList.remove('hidden');
  storyElement.innerHTML = `<div class='generating'>Generating a short story about ${storyInput.value}<div class='snippet' data-title='dot-flashing'><div class='stage'><div class='dot-flashing'></div></div></div></div>`;

  axios.get(apiUrl).then(displayStory);

  event.target.reset();
}

let storyFormElement = document.querySelector('#story-generator');
storyFormElement.addEventListener('submit', generateStory);
