import { memo, useState } from "react"
import { IOperation, OperationType } from "./typings"
import { useAppDispatch } from "../../app/hooks";
import { fetchParamForOperation } from "../transformer/operationsSlice";

export type SetRemoveOperationProps = {
    operation: IOperation,
    setOperation?: (operation: IOperation) => void,
    removeOperation?: (id: number) => void,
}


const Operation = memo(({ operation, setOperation, removeOperation }: SetRemoveOperationProps) => {
    
    const dispatch = useAppDispatch();
    const [fetchParam, setFetchParam] = useState("")

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (setOperation === undefined)
            return
        const newOperationType = e.target.value as OperationType
        setOperation({ ...operation, type: newOperationType })
    }

    const handleRemove = (id: number) => {
        if (removeOperation === undefined)
            return
        removeOperation(id)
    }

    const handleParamsChange = async () => {
        if (operation.params == undefined || operation.params == null) return
        const response = await dispatch(fetchParamForOperation({ id: operation.id, name: fetchParam}))
        console.log(`${response}`)
    }
    console.log(`${new Date().toLocaleTimeString()}: Update/Remove ${operation.id}`)

    return (
        <div>
            {operation.id}:{operation.type}
            <select
                id={`${operation.id}`}
                title="typeSelector"
                value={operation.type}
                onChange={handleTypeChange}>
                <option value='uppercase'>uppercase</option>
                <option value='lowercase'>lowercase</option>
                <option value='remove last character'>remove last character</option>
            </select>
            {operation.params ? operation.params[0] as string : ""}
            {removeOperation ?
                <button
                    type="button"
                    onClick={() => handleRemove(operation.id)}>
                    Remove
                </button>
                : null}
            <input
                title="param"
                type="text" value={fetchParam} onChange={(e) => setFetchParam(e.target.value)} />
            <button
                type="button"
                onClick={() => handleParamsChange()} >Get Age</button>

        </div>
    )
})

export default Operation