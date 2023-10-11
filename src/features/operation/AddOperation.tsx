import { memo, useRef, useState } from "react"
import { IOperation } from "./typings"
import Operation from "./Operation"

export type AddOperationProps = {
    addOperation: (operation: IOperation) => void
}

const defaultOperation: IOperation = { id: -1, type: "lowercase", params: [] }

const OperationAdder = memo(function ({ addOperation }: AddOperationProps) {
    const newId = useRef(1)
    const [operation, setOperation] = useState<IOperation>(defaultOperation)

    const addOperationHandler = () => {
        if (operation.type != defaultOperation.type) {
            setOperation(defaultOperation)
        }
        addOperation({ ...operation, id: newId.current })
        newId.current = newId.current + 1
    }

    console.log(`${new Date().toLocaleTimeString()}: AddOperation`)

    return (
        <>
            <label>Add new operation:</label>
            <Operation
                operation={operation}
                setOperation={(oper: IOperation) => {
                    setOperation(oper)
                }} />
            <button type="button" onClick={addOperationHandler}>Add</button>
        </>
    )
})

export default OperationAdder