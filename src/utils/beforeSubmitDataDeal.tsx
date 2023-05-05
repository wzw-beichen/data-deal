import dayjs from "dayjs";
import {
  commonDealFunc,
  initConfigItem,
  resolveOmitOriginKey,
} from "./commonUtils";
import { dateArr, defaultDateFormat } from "../constants";
import { DealConfigType } from "./type";

export const beforeSubmitDataDeal = <T extends Record<string, any>>(
  data: T,
  dealConfig: DealConfigType[] = []
) => {
  if (!dealConfig.length) {
    return data;
  }
  const newDealConfig = dealConfig.filter((item) => !item.hideInBeforeSubmt);
  const dealData = newDealConfig.reduce((total, configItem) => {
    let { value, defaultConfigItem } = initConfigItem(total, configItem);
    const { type, key } = defaultConfigItem;
    let otherValues = {};
    if (dateArr.includes(type) && value) {
      value = dayjs(value).format(defaultDateFormat[type]);
    }
    value = commonDealFunc(value, defaultConfigItem, total);
    otherValues = resolveOmitOriginKey(
      { otherValues, value },
      defaultConfigItem
    );
    return {
      ...total,
      [key]: value,
    };
  }, data);

  return dealData;
};
