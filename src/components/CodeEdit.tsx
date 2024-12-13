import ReactCodeMirror from '@uiw/react-codemirror';
import { FC, useState } from 'react';
import { LanguageType } from '../types/languageKey.type';
import { languagesList } from '../constant/languageList';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { material } from '@uiw/codemirror-theme-material';
import axios from 'axios';
import PrimaryButton from './PrimaryButton';
import { OutputType } from '../types/types';

interface CodeIditProps {
    language: LanguageType;
    data: (d: OutputType) => void;
}
const CodeEdit: FC<CodeIditProps> = ({ language, data }) => {
    const [code, setCode] = useState('');

    const handleRun = async () => {
        try {
            const response = await axios.post('http://localhost:3000/run-code', {
                language,
                output: code,
                status: 'success',
            });
            if (response.status === 201) {
                data(response.data);
            }
        } catch (err) {
            throw new Error(`Language ${language} is not supported`);
        }
    };

    return (
        <div>
            <div className='df jcfe run-btn'>
                <PrimaryButton backgroundColor={'green'} onClick={handleRun} borderColor={'transparent'}>
                    Run 🏃🏻
                </PrimaryButton>
            </div>
            <ReactCodeMirror
                value={code}
                width='100vw'
                height='100vh'
                extensions={[languagesList[language]]}
                onChange={value => setCode(value)}
                theme={tokyoNight}
            />
        </div>
    );
};

export default CodeEdit;
