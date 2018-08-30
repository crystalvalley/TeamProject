import { ContentBlock, ContentState } from 'draft-js';
import { findWithRegex } from '../utils';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.30
 * @version : 2018.08.30
 */

const MENTION_REGEX: RegExp =/\@[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.;\-]+/g;

export function mentionStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  findWithRegex(MENTION_REGEX, contentBlock, callback);
}