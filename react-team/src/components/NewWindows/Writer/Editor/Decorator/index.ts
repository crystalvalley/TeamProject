import DecoTag from "./DecoratorComponent/DecoTag";
import { tagStrategy } from "./DecoratorStrategy/TagDecorator";
import { CompositeDecorator } from "draft-js";
import { mentionStrategy } from "./DecoratorStrategy/MentionDecorator";
import DecoMention from "./DecoratorComponent/DecoMention";

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.30
 */

export const SNSDecorator = new CompositeDecorator([
    {
        strategy: tagStrategy,
        component: DecoTag
    },
    {
        strategy : mentionStrategy,
        component : DecoMention
    }
]);
