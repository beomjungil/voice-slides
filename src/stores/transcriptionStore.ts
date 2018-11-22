import { observable, action, toJS, computed } from 'mobx';
import shortid from 'shortid';
interface IZerothResult {
  final: boolean;
  id?: string;
  transcript: string;
  likelihood?: number;
  'segment-length'?: number;
  'segment-start'?: number;
  'total-length'?: number;
  'word-alignment'?: IWordAlignMent[];
}

interface IWordAlignMent {
  start: number;
  length: number;
  word: string;
  confidence: number;
}

export class TranscriptionStore {
  @observable
  partialResult: string = '';

  @observable
  data: IZerothResult[] = [];

  @action
  updateResult = (result: IZerothResult) => {
    if (result.final) {
      this.partialResult = '';
      console.log(result, this.partialResult);
      const oldArray: IZerothResult[] = this.histories;
      oldArray.push({ ...result, id: shortid.generate() });
      this.data = oldArray;
    } else {
      this.partialResult = result.transcript;
    }
  };

  @computed
  get histories(): IZerothResult[] {
    return toJS(this.data);
  }
}

export default new TranscriptionStore();
