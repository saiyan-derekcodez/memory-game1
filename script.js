/**
 * Hey what's up gang👋, so the purpose of this assignment is to get us familiar with the concept of 'onboarding', which in this case
 * I will take to mean, understanding the concept being built (the code) without been there when it was written and also knowing
 * what to change in order to get it to work
 *
 * This assignment consists of multiple TODO: each one specifies what should be done and a hint on how to do it so walk through them
 * and if you complete them properly you should have a working game just like in the 'Game play.mov' file attached to the code.
 *
 * Once you finished send a message to the group chat.
 *
 * Have a nice weekend 😁
 */



const fruits = ['banana', 'apple', 'cucumber', 'grapes', 'watermelon', 'avocado', 'guava', 'pineapple'];
const board = document.getElementById('board');

/**
 * This function duplicates each fruit and then returns a shuffled array
 * each fruits must appear only 2 times
 * @param {Array} fruits
 * @returns {Array} randomizedFruits
 */
function generateARandomSequenceOfFruits (fruits) {
  let dup = fruits;
  fruits = fruits.concat(dup);

  return fruits.sort(() => Math.random() - 0.5);
}


/**
 * This function draws a board, following a rows X cols grid pattern
 */
function drawBoard() {
  const randomizedFruits = generateARandomSequenceOfFruits(fruits);

  for (let i = 0; i < randomizedFruits.length; i++) {
    board.innerHTML += `
      <div class="grid-item" data-value="${randomizedFruits[i]}">
        <div class="back">
          <img src="./images/${randomizedFruits[i]}.jpeg" />
        </div>
        <div class="front">
          <img src="./images/back.jpeg" />
        </div>
      </div>
    `;
  }
}

/**
 * This is a simple function that checks if the values in the current pair (pair.dataset.value) is same and
 * returns either `true` or `false`
 * @param {Array} pair
 * @returns {boolean}
 */
function compareCurrentPair(pair) {
  return pair[0].dataset.value === pair[1].dataset.value;
}

/**
 * This is where the real magic happens, this listens to every move, keeps track of progress and reports on it
 */
function registerMovements() {
  // This logic here is in order to win you must select all fruits (fruits.length) since each fruit appears twice hence * 2
  // then +4 gives you 4 extra chances for errors (2 sets)
  const maxAttempts = (fruits.length * 2) + 4;

  let noOfAttempts = 0;
  let points = 0;
  let currentPair = [];

  [].forEach.call(board.children, child => {
    child.addEventListener('click', () => {
      if (noOfAttempts === maxAttempts) {
        alert(`You have exhausted your lifes, reload and play again 🥰, You earned ${points} points`)
        return;
      }

      child.classList.add('flip');

      noOfAttempts++

      currentPair.push(child)

      if (currentPair.length == 2) {
        const isSameItem = compareCurrentPair(currentPair);

        // marked current pair as selected
        if (isSameItem) {
          // removes the flip event from it
          currentPair.forEach(elem => {
            const clonedElem = elem.cloneNode(true);
            elem.parentNode.replaceChild(clonedElem, elem);
          })

          // give 5 points each time
          points += 5;
        } else {
          // flip them back
          currentPair.forEach(pair => {
            setTimeout(() => {
              pair.classList.toggle('flip')
            }, 500)
          })
        }

        currentPair = [];

      }

    })
  })

}

/**
 * This function begins the game process
 */
function startGame() {
  drawBoard();

  registerMovements();
}

// begin games
startGame();
