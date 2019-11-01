export let isFalling = false;
export let fallingBlockNum = 0;

// テトリス盤を読み込む
export const loadTable = () => {
    const cells = [];
    const tdArray = document.getElementsByTagName("td");

    // 各セルに各td要素を挿入
    let index = 0;
    for (let row = 0; row < 20; row++) {
        cells[row] = [];
        for (let col = 0; col < 10; col++) {
            cells[row][col] = tdArray[index];
            index++;
        }
    }

    return cells;
};

// 条件に合致したとき，落ちているブロックを止める
export const stopFallingBlocks = (cells) => {
    // 1. ブロックが底についたとき
    for (let col = 0; col < 10; col++) {
        if (cells[19][col].blockNum === fallingBlockNum) {
            isFalling = false;
            return true;
        }
    }

    // 2. 1マス下に別のブロックがあるとき
    for (let row = 18; row >= 0; row--) {
        for (let col = 0; col < 10; col++) {
            if (cells[row][col].blockNum === fallingBlockNum) {
                if (cells[row + 1][col].className !== "" && cells[row + 1][col].blockNum !== fallingBlockNum) {
                    isFalling = false;
                    return true;
                }
            }
        }
    }
}

// ブロックを1マスだけ下に落とす
export const fallBlocks = (cells) => {
    const isStopBlocks = stopFallingBlocks(cells);

    if (!isStopBlocks) {
        for (let row = 18; row >= 0; row--) {
            for (let col = 0; col < 10; col++) {
                if (cells[row][col].blockNum === fallingBlockNum) {
                    cells[row + 1][col].className = cells[row][col].className;
                    cells[row + 1][col].blockNum = cells[row][col].blockNum;
                    cells[row][col].className = "";
                    cells[row][col].blockNum = null;
                }
            }
        }
    }
};

export const deleteRow = (cells) => {
    for (let row = 19; row >= 0; row--) {
        let canDelete = true;
        for (let col = 0; col < 10; col++) {
            if (cells[row][col].className === '') {
                canDelete = false;
            }
        }
        if (canDelete) {
            // 揃った一行を消す
            for (let col = 0; col < 10; col++) {
                cells[row][col].className = '';
                cells[row][col].blockNum = null;
            }

            // 上に詰まれているブロックを一行下に落とす
            for (let downRow = row - 1; downRow >= 0; downRow--) {
                for (let col = 0; col < 10; col++) {
                    if (cells[downRow][col].className !== '') {
                        cells[downRow + 1][col].className = cells[downRow][col].className;
                        cells[downRow + 1][col].blockNum = cells[downRow][col].blockNum;
                        cells[downRow][col].className = "";
                        cells[downRow][col].blockNum = null;
                    }
                }
            }
        }
    }
};

export const gameOver = (cells) => {
    let isGameOver = false;
    for (let col = 4; col <= 5; col++) {
        if (cells[0][col].className !== "" && cells[1][col].className !== "") {
            isGameOver = true;
        }
    }

    // ゲームオーバーの場合，アラートを出す
    if (isGameOver) {
        const result = confirm("Game Over... Try Again!!\nPress Enter to Restart Game.");

        // OKならリセットして，リスタート
        if (result) {
            for (let row = 0; row < 20; row++) {
                for (let col = 0; col < 10; col++) {
                    if (cells[row][col].className !== "") {
                        cells[row][col].className = "";
                        cells[row][col].blockNum = null;
                    }
                }
            }
        }
    }
};

// ランダムにブロックを生成する
export const generateBlock = (blocks, cells) => {
    // 1. ブロックパターンからランダムに一つパターンを選ぶ
    const keys = Object.keys(blocks);
    const nextBlockKey = keys[Math.floor(Math.random() * keys.length)];
    const nextBlock = blocks[nextBlockKey];
    fallingBlockNum++;

    // 2. 選んだパターンをもとにブロックを配置する
    let pattern = nextBlock.pattern;
    for (let row = 0; row < pattern.length; row++) {
        for (let col = 0; col < pattern[row].length; col++) {
            if (pattern[row][col] === 1) {
                cells[row][col + 3].className = nextBlock.class;
                cells[row][col + 3].blockNum = fallingBlockNum;
            }
        }
    }

    // 3. ブロックを落下させる
    isFalling = true;
};
