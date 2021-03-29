import React, { useState, useRef, useEffect } from "react"
import { v4 as uuid } from "uuid"
import { swap } from "./util"
import InputRow from "./InputRow"

const DynamicInput = () => {
  const [rows, setRows] = useState([])
  // this'll help target the input with focus
  const [refControlIndex, setRefControlIndex] = useState(-1)
  // refs stores references to all the currently targetable inputs
  const refs = useRef([])

  useEffect(() => {
    if (refs.current[refControlIndex]) {
      refs.current[refControlIndex].focus()
    }
  }, [rows])

  const handleAddRow = () => {
    setRows([...rows, { id: uuid(), content: "" }])
    setRefControlIndex(rows.length)
  }

  const handleDeleteRow = (row, rowIndex) => {
    const newRows = rows.filter(r => r.id !== row.id)
    // determining where focus is to go upon deletion of current row
    if (rowIndex === rows.length - 1) {
      setRefControlIndex(rowIndex - 1)
    } else {
      setRefControlIndex(rowIndex)
    }

    setRows(newRows)
  }

  const handleMoveUp = row => {
    const list = [...rows]
    // i index of item to be moved up
    const i = list.findIndex(item => item.id === row.id)
    //check if we have the item and can move it up
    if (i === -1 || i === 0) {
      console.warn("tried to move 1st item or absent item up")
      // hack to trigger re-render and firing of use effect and refocus
      // on first element (analogously for handleMoveDown)
      setRows([...rows])
      return
    }
    swap(list, i, i - 1)

    setRows(list)
    setRefControlIndex(i - 1)
  }

  const handleMoveDown = row => {
    const list = [...rows]
    // index of element to be moved down
    const i = list.findIndex(item => item.id === row.id)

    if (i === -1 || i === list.length - 1) {
      console.warn("tried to move last item or absent item down")
      setRows([...rows])
      return
    }

    swap(list, i, i + 1)

    setRows(list)
    setRefControlIndex(i + 1)
  }

  const handleInputChange = (key, row, index, event) => {
    // using the fact that row references an object already in state (rows)
    row[key] = event.target.value
    setRows([...rows])
    // make sure to set the change index to this element on input change, else
    // focus might jump elsewhere
    setRefControlIndex(index)
  }

  return (
    <>
      <h1 className="title">Dynamic Inputs</h1>
      <button className="add-row btn" onClick={handleAddRow}>
        +
      </button>
      <section className="row-container">
        {rows.map((row, i) => {
          return (
            <InputRow
              key={row.id}
              refs={refs}
              handleInputChange={handleInputChange}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
              handleDeleteRow={handleDeleteRow}
              rowsId={i}
              row={row}
            />
          )
        })}
      </section>
    </>
  )
}

export default DynamicInput
