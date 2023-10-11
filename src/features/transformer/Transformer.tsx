import Operation from "../operation/Operation"
import OperationAdder from "../operation/AddOperation"
import { useCallback } from "react"
import { IOperation } from "../operation/typings"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addOperation, deleteOperation, selectOperations, updateOperation } from "./operationsSlice"

const Transformer = () => {

    //const [operations, setOperations] = useState<IOperation[]>([])
    const dispatch = useAppDispatch();
    const operationsSlice = useAppSelector(selectOperations);

    const handleRemove = useCallback((id: number) => {
        //setOperations((prev) => prev.filter((op) => op.id != id))
        dispatch(deleteOperation(id))
        console.log(`Removed ${id}`)
    }, [dispatch])

    const handleAdd = useCallback((oper: IOperation) => {
        //setOperations((prev) => [...prev, oper])
        dispatch(addOperation(oper))
        console.log(`Added ${oper.id} - ${oper.type}`)
    }, [dispatch])

    const handleUpdate = useCallback((oper: IOperation) => {
        //setOperations((prev) => prev.map((op) => op.id === oper.id ? oper : op))
        dispatch(updateOperation(oper))
        console.log(`Operation ${oper.id} changed -> ${oper.type}`)
    }, [dispatch])

    return (
        <div>
            <OperationAdder addOperation={handleAdd} />
            <ul>
                {operationsSlice.operations.map((oper) =>
                    <li key={oper.id}>
                        <Operation
                            key={oper.id}
                            operation={oper}
                            setOperation={handleUpdate}
                            removeOperation={handleRemove} />
                    </li>
                )
                }

            </ul>
        </div>
    )
}

export default Transformer