import { ContentBlock, ContentState } from 'draft-js';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.28
 */

const HASHTAG_REGEX: RegExp = /\#[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.;\-]+/g;

export function tagStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}
export function findWithRegex(regex: RegExp, contentBlock: ContentBlock, callback: (start: number, end: number) => void) {
  const text = contentBlock.getText();
  let matchArr;
  let start = 0;
  matchArr = regex.exec(text)
  while (matchArr !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
    matchArr = regex.exec(text)
  }
}

/*
export function tagStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {  
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    }, callback
  )
}
*/