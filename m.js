document.querySelector(".control-buttons span").onclick = function() {
    let yourName = prompt("whats your name?");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    };
    document.querySelector(".control-buttons").remove();

};
let duration = 1000,
    blocksContainer = document.querySelector(".memory-game-blocks"),
    blocks = Array.from(blocksContainer.children),
    orderRange = [...Array(blocks.length).keys()];
console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

blocks.forEach((block, i) => {
    console.log(block);
    block.style.order = orderRange[i];
    block.addEventListener('click', function() {
        flipBlock(block)
    })
})

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if (allFlippedBlocks.length === 2) {
        console.log(allFlippedBlocks);
        stopClicking();
        checkMathedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add('no-clicking')
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking')
    }, duration)

}

function checkMathedBlock(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');


    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration)
        document.getElementById('fail').play();

    }
}

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
        return array;
    }
}