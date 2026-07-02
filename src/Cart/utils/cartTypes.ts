import type { productType } from "../../Functions/CreateBatomBox/Types";

export type CartProduct = Exclude<productType, null>;
