import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegexProtocol } from './regex-protocol.regex';
import { OnlyLowerCaseLettersRegex } from './only-lowercase-letters.regex';
import { RemoveSpacesRegex } from './remove-spaces.regex';

export type ClassNames = 'OnlyLowerCaseLettersRegex' | 'RemoveSpacesReges';

@Injectable()
export class RegexFactory {
  create(className: ClassNames): RegexProtocol {
    switch (className) {
      case 'OnlyLowerCaseLettersRegex':
        return new OnlyLowerCaseLettersRegex();
      case 'RemoveSpacesReges':
        return new RemoveSpacesRegex();
      default:
        throw new InternalServerErrorException(
          `No class found for ${className}`,
        );
    }
  }
}
