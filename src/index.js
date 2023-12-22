function displayStory(response) {
  //console.log(response.data.answer);
  console.log('displaying story...');
  new Typewriter('#story', {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: '',
  });
}

function generateStory(event) {
  event.preventDefault();
  console.log('generating story...');

  let storyInput = document.querySelector('.story-instructions');

  let apiKey = '1adc8btb0637f4ff3663a3o5a9930eea';
  let prompt = `User instructions: Please tell a short story about ${storyInput.value}`;
  let context = `You are a world renowned children's storyteller. Provide only a short 1-2 paragraph story with a good moral in basic HTML. Please separate each line with a <\n>. Make sure to follow the user instructions.`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let storyElement = document.querySelector('#story');
  storyElement.classList.remove('hidden');
  storyElement.innerHTML = `<div class='generating'>Generating a short story about ${storyInput.value}<div class='snippet' data-title='dot-flashing'><div class='stage'><div class='dot-flashing'></div></div></div></div>`;

  axios.get(apiUrl).then(displayStory);
}

let storyFormElement = document.querySelector('#story-generator');
storyFormElement.addEventListener('submit', generateStory);
