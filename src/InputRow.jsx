import React from "react"

const InputRow = ({
  rowsId,
  row,
  refs,
  handleInputChange,
  handleMoveUp,
  handleMoveDown,
  handleDeleteRow
}) => {
  return (
    <div className="row">
      <input
        type="text"
        className="row-input"
        value={row.content}
        onChange={event => handleInputChange("content", row, rowsId, event)}
        // ref for a list of inputs on rows
        ref={el => (refs.current[rowsId] = el)}
      />
      <button className="row-up btn" onClick={() => handleMoveUp(row)}>
        ↑
      </button>
      <button className="row-down btn" onClick={() => handleMoveDown(row)}>
        ↓
      </button>
      <button
        className="row-delete btn"
        onClick={() => handleDeleteRow(row, rowsId)}>
        x
      </button>
    </div>
  )
}

export default InputRow
