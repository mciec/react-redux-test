export type OperationType = 'uppercase' | 'lowercase' | 'remove last character'

export interface IOperation {
    id: number
    type: OperationType
    params?: unknown[]
}
