import { pickArrayItem } from "c-fn-utils";
import dayjs from "dayjs";
import {
  commonDealFunc,
  initConfigItem,
  resolveOmitOriginKey,
} from "./commonUtils";
import { dateArr } from "../constants";
import { DealConfigType } from "./type";

export const afterRequestDataDeal = (
  data: Record<string, any>,
  dealConfig: DealConfigType[] = []
) => {
  if (!dealConfig.length) {
    return data;
  }
  const newDealConfig = dealConfig.filter((item) => !item.hideInAfterRequest);
  const dealData = newDealConfig.reduce((total, configItem) => {
    let { value, defaultConfigItem } = initConfigItem(total, configItem);
    const { type } = defaultConfigItem;
    const endType = Array.isArray(type) ? pickArrayItem(type) : type;
    let otherValues = {};
    if (value && dateArr.includes(endType)) {
      value = dayjs(value);
    }
    value = commonDealFunc(value, defaultConfigItem, total);
    otherValues = resolveOmitOriginKey(
      { otherValues, value },
      defaultConfigItem
    );
    return {
      ...total,
      ...otherValues,
    };
  }, data);

  return dealData;
};
