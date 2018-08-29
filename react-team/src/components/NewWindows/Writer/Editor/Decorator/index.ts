import DecoTag from "./DecoratorComponent/DecoTag";
import { tagStrategy } from "./TagDecorator";
import { CompositeDecorator } from "draft-js";

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.28
 */

export const SNSDecorator = new CompositeDecorator([
    {
        strategy: tagStrategy,
        component: DecoTag
    },
]);
