function generateStory(event) {
  event.preventDefault();

  new Typewriter('#story', {
    strings: 'Hello World',
    autoStart: true,
    delay: 1,
    cursor: '',
  });
}

let storyFormElement = document.querySelector('#story-generator');
storyFormElement.addEventListener('submit', generateStory);
