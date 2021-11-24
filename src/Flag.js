import React from 'react'

const Flag = () => {
    return (
        <>
            <div className="modal">
                <button type="submit" onClick={() => window.location.reload(false)}>x</button>
                <h2>Game over</h2>
            </div>
        </>
    )
}
export default Flag