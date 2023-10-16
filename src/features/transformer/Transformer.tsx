import Operation from "../operation/Operation"
import OperationAdder from "../operation/AddOperation"
import { useCallback, useEffect, useState } from "react"
import { IOperation } from "../operation/typings"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addOperation, deleteOperation, selectOperations, updateOperation } from "./operationsSlice"
import Connector from "../SignalRConnection/SignalRConnection"

const Transformer = () => {

    const [messages, setMessages] = useState<string[]>([])
    const [message, setMessage] = useState<string>("")
    const dispatch = useAppDispatch();
    const operationsSlice = useAppSelector(selectOperations);
    const { sendMessageToQueue, events, connect } = Connector()

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

    useEffect(() => {
        events((message) => { setMessages((prev) => [...prev, message]) })
    }, [events]);

    function handleSendMessage(): void {
        sendMessageToQueue(message)
        setMessage("")
    }

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

            <button type="button" onClick={() => handleSendMessage()}>Send message</button>
            <button type="button" onClick={() => connect()}>Reconnect</button>
            <input type="text" title="message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <div>
                {messages.map((msg) => (<div>{msg}</div>))}
            </div>
        </div>
    )
}

export default Transformer
