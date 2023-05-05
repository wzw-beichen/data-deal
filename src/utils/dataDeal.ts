import { afterRequestDataDeal } from "./afterRequestDataDeal";
import { beforeSubmitDataDeal } from "./beforeSubmitDataDeal";
import { DealConfigType } from "./type";

export type DataDealType = "afterRequest" | "beforeSubmit";

export const dataDeal = <T extends Record<string, any>>(
  data: T,
  dealConfig: DealConfigType[] = [],
  type: DataDealType = "beforeSubmit"
) => {
  let func = afterRequestDataDeal;
  if (type === "beforeSubmit") {
    func = beforeSubmitDataDeal;
  }
  return func(data, dealConfig);
};
