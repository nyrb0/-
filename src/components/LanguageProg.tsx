import { ChangeEvent, FC } from 'react';
import { LanguageType } from '../types/languageKey.type';
import { languagesList } from '../constant/languageList';
import PrimaryButton from './PrimaryButton';

interface LanguageProgProps {
    onChange: (l: LanguageType) => void;
    selected: LanguageType;
}

const LanguageProg: FC<LanguageProgProps> = ({ selected, onChange }) => {
    return (
        <div className={'df'} style={{ gap: 10 }}>
            {Object.keys(languagesList).map(lang => (
                <PrimaryButton
                    key={lang}
                    backgroundColor={lang === selected ? '#fff' : 'transparent'}
                    color={lang === selected ? '#000' : '#fff'}
                    onClick={() => onChange(lang as LanguageType)}
                >
                    {lang}
                </PrimaryButton>
            ))}
        </div>
    );
};

export default LanguageProg;

// import { ChangeEvent, FC } from 'react';
// import { LanguageType } from '../types/languageKey.type';
// import { languagesList } from '../constant/languageList';
// import s from '../styles/LanguageProg.module.scss';

// interface LanguageProgProps {
//     onChange: (l: LanguageType) => void;
//     value: LanguageType;
// }

// const LanguageProg: FC<LanguageProgProps> = ({ value, onChange }) => {
//     return (
//         <div className={s.language}>
//             <select
//                 value={value}
//                 onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as LanguageType)}
//             >
//                 {Object.keys(languagesList).map(lang => (
//                     <option key={lang} value={lang}>
//                         {lang}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// export default LanguageProg;
