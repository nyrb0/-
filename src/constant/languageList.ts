import { go } from '@codemirror/lang-go';
import { python } from '@codemirror/lang-python';
import { LanguageType } from '../types/languageKey.type';

export const languagesList: Record<LanguageType, any> = {
    Python: python(),
    Go: go(),
};
