import ReactCodeMirror from '@uiw/react-codemirror';
import { FC, useState } from 'react';
import { LanguageType } from '../types/languageKey.type';
import { languagesList } from '../constant/languageList';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { material } from '@uiw/codemirror-theme-material';
import axios from 'axios';
import PrimaryButton from './PrimaryButton';

type Output = {
    id: number;
    output: string;
    language: string;
};

interface CodeIditProps {
    language: LanguageType;
    data: (d: Output) => void;
}
const CodeEdit: FC<CodeIditProps> = ({ language, data }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState<{ status: 'error'; error: string }>();

    const handleRun = async () => {
        try {
            const response = await axios.post('http://localhost:3000/run-code', {
                language,
                output: code,
            });
            const res = response.data;
            data(res);
        } catch (err) {
            setError({ status: 'error', error: `Language ${language} is not supported` });
            throw new Error('Language ${language} is not supported');
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
