export const moveLeft = (cells, fallingBlockNum) => {
    // 落ちているブロックが一番左にある場合，ブロックを左に移動しない
    for (let row = 0; row < 20; row++) {
        if (cells[row][0].className !== '' && cells[row][0].blockNum === fallingBlockNum) {
            return;
        }
    }

    // 左隣に別のブロックがある場合，ブロックを左に移動しない
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (cells[row][col].blockNum === fallingBlockNum) {
                if (cells[row][col - 1].className !== '' && cells[row][col - 1].blockNum !== fallingBlockNum) {
                    return;
                }
            }
        }
    }

    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (cells[row][col].blockNum === fallingBlockNum) {
                cells[row][col - 1].className = cells[row][col].className;
                cells[row][col - 1].blockNum = cells[row][col].blockNum;
                cells[row][col].className = "";
                cells[row][col].blockNum = null;
            }
        }
    }
};

export const moveRight = (cells, fallingBlockNum) => {
    // 落ちているブロックが一番右にある場合，ブロックを右に移動しない
    for (let row = 0; row < 20; row++) {
        if (cells[row][9].className !== '' && cells[row][9].blockNum === fallingBlockNum) {
            return;
        }
    }

    // 右隣に別のブロックがある場合，ブロックを右に移動しない
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (cells[row][col].blockNum === fallingBlockNum) {
                if (cells[row][col + 1].className !== '' && cells[row][col + 1].blockNum !== fallingBlockNum) {
                    return;
                }
            }
        }
    }

    for (let row = 0; row < 20; row++) {
        for (let col = 9; col >= 0; col--) {
            if (cells[row][col].blockNum === fallingBlockNum) {
                cells[row][col + 1].className = cells[row][col].className;
                cells[row][col + 1].blockNum = cells[row][col].blockNum;
                cells[row][col].className = "";
                cells[row][col].blockNum = null;
            }
        }
    }
};
