interface IZerothResult {
  final: boolean;
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
