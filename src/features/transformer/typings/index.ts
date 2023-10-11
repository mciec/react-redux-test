import { IOperation } from "../../operation/typings";
import { ILoading } from "../../typings";

export interface IOperations extends ILoading {
    operations: IOperation[],
    xxx?: string
}
