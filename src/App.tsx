import { useEffect, useState } from 'react';
import './App.css';

const BattleShipGame = () => {

    const [gameBoardStatus, setGameBoardStatus] = useState(null);
    const [resultMessage, setRsultMessage] = useState('');
    const [buttonColor, setButtonColor] = useState('green');

    useEffect(() => {
        fetchGameBoardStatus();
    }, []);



    const fetchGameBoardStatus = async () => {
        try {
            await fetch('http://localhost:5225/BattleShipGameApi/GetGameBoardStatus', {
                method: "GET",
                headers: { "X-Api-Key": '_sajSaCK2008' }
            }).then(response => {
                return response.json()
            }).then(data => {
                setGameBoardStatus(data);

            });
        } catch (err) {
            console.log(err);
        }
    }


    const handleCannonFire = async (pos1: number, pos2: number) => {
        let formData = new FormData();

        formData.append("row", pos1);
        formData.append("col", pos2);

        try {
            let res = await fetch('http://localhost:5225/BattleShipGameApi/FireCannon', {
                method: "POST",
                body: formData
            });

            let shootResult = await res.json();
            setRsultMessage(shootResult);
            fetchGameBoardStatus();
        } catch (err) {
            console.log(err);
        }

    }

    const battleShipGameBoard = () => {
        return (
            gameBoardStatus && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 100px)', gridGap: '5px' }}>
                {gameBoardStatus.GameBoardGrid.map((row: number, rowIndex: number) =>
                    row.map((cell: number, colIndex: number) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCannonFire(rowIndex, colIndex)}
                            style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: cell === 1 ? 'red' : 'green'
                            }}>
                            {cell === 1 ? <img src="..\public\ship.jpg" style={{ width: '50px', height: '50px' }}></img> : ''}
                        </button>
                    ))
                )}</div>
        )
    }
    return (
        <div>
            <h1>Battleship Game</h1>

            <h2>Recent Shot : {resultMessage}</h2>

            <div> {gameBoardStatus && battleShipGameBoard()}</div>
        </div>
    );
}

export default BattleShipGame;