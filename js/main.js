import { isFalling, fallingBlockNum, loadTable, fallBlocks, gameOver, deleteRow, generateBlock } from './game.js';
import { moveLeft, moveRight } from './key-ope.js';
import { blocks } from './blocks.js';

const main = () => {
    // テトリス盤の読み込み
    const cells = loadTable();

    let speed;
    document.getElementById('btn-start-game').addEventListener('click', () => {
        // 難易度設定
        const gameLevel = document.getElementById('dropdown-game-level').value;
        if (gameLevel === '') {
            alert('Please Choose Game Level!!');
            return;
        }
        if (gameLevel === 'easy') {
            speed = 1500;
        }
        if (gameLevel === 'normal') {
            speed = 1000;
        }
        if (gameLevel === 'hard') {
            speed = 500;
        }
        if (gameLevel === 'veteran') {
            speed = 100;
        }
        if (gameLevel === 'insane') {
            speed = 10;
        }

        // ゲーム進行
        setInterval(() => {
            if (isFalling) {
                fallBlocks(cells, fallingBlockNum);
            }
            if (!isFalling) {
                gameOver(cells);
                deleteRow(cells);
                generateBlock(blocks, cells);
            }
        }, speed);
    });

    // キー操作
    document.addEventListener("keydown", (event) => {
        if (event.keyCode === 37) {
            moveLeft(cells, fallingBlockNum);
        }
        if (event.keyCode === 39) {
            moveRight(cells, fallingBlockNum);
        }
        if (event.keyCode === 40) {
            fallBlocks(cells);
        }
    });
};

main();
