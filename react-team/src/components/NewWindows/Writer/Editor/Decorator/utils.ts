import { ContentBlock } from "draft-js";

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.30
 */


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
